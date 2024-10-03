import torch.nn as nn
from utils import replicate
from attention import MultiHeadAttention
from embed import Embedding, PositionalEncoding

class TransformerBlock(nn.Module):

    def __init__(self,
                 embed_dim=512,
                 heads=8,
                 expansion_factor=4,
                 dropout=0.2
                 ):
        
        super(TransformerBlock, self).__init__()

        self.attention = MultiHeadAttention(embed_dim, heads)
        self.norm = nn.LayerNorm(embed_dim)

        self.feed_forward = nn.Sequential(
            nn.Linear(embed_dim, expansion_factor * embed_dim),
            nn.ReLU(),
            nn.Linear(embed_dim * expansion_factor, embed_dim),
        )

        self.dropout = nn.Dropout(dropout)

    def forward(self, key, query, value, mask=None):

        attention_out = self.attention(key, query, value, mask)

        attention_out = attention_out + value

        attention_norm = self.dropout(self.norm(attention_out))

        fc_out = self.feed_forward(attention_norm)

        fc_out = fc_out + attention_norm

        fc_norm = self.dropout(self.norm(fc_out))

        return fc_norm
    
class Encoder(nn.Module):

    def __init__(self,
                 seq_len,
                 vocab_size,
                 embed_dim=512,
                 num_blocks=6,
                 expansion_factor=4,
                 heads=8,
                 dropout=0.2
                 ):
        
        super(Encoder, self).__init__()

        self.embedding = Embedding(vocab_size, embed_dim)

        self.positional_encoder = PositionalEncoding(embed_dim, seq_len)

        self.blocks = replicate(TransformerBlock(embed_dim, heads, 
                                                 expansion_factor, dropout), num_blocks)
        
    def forward(self, x):
        out = self.positional_encoder(self.embedding(x))
        for block in self.blocks:
            out = block(out, out, out)

        return out
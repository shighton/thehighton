import torch.nn as nn
import torch.nn.functional as F
from utils import replicate
from attention import MultiHeadAttention
from embed import PositionalEncoding
from encoder import TransformerBlock

class DecoderBlock(nn.Module):

    def __init__(self,
                 embed_dim=512,
                 heads=8,
                 expansion_factor=4,
                 dropout=0.2,
                 ):
        super(DecoderBlock, self).__init__()

        self.attention = MultiHeadAttention(embed_dim, heads)

        self.norm = nn.LayerNorm(embed_dim)

        self.dropout = nn.Dropout(dropout)

        self.transformerBlock = TransformerBlock(embed_dim, heads, expansion_factor, dropout)

    def forward(self, key, query, x, mask):

        decoder_attention = self.attention(x, x, x, mask)

        value = self.dropout(self.norm(decoder_attention + x))

        decoder_attention_output = self.transformerBlock(key, query, value)

        return decoder_attention_output
    
class Decoder(nn.Module):
    
    def __init__(self,
                 target_vocab_size,
                 seq_len,
                 embed_dim=512,
                 num_blocks=6,
                 expansion_factor=4,
                 heads=8,
                 dropout=0.2
                 ):
        
        super(Decoder, self).__init__()

        self.embedding = nn.Embedding(target_vocab_size, embed_dim)

        self.positional_encoder = PositionalEncoding(embed_dim, seq_len)

        self.blocks = replicate(DecoderBlock(embed_dim, heads, expansion_factor, dropout), num_blocks)

        self.dropout = nn.Dropout(dropout)

    def forward(self, x, encoder_output, mask):

        x = self.dropout(self.positional_encoder(self.embedding(x)))

        for block in self.blocks:
            x = block(encoder_output, x, encoder_output, mask)

        return x
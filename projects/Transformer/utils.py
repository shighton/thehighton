import copy
import torch.nn as nn

def replicate(block, N=6) -> nn.ModuleList:

    block_stack = nn.ModuleList([copy.deepcopy(block) for _ in range(N)])

    return block_stack
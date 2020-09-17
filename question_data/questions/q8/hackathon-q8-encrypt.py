#!/usr/bin/env python3
import random

key = {50:'ata', 25:'cat', 10:'gtg', 5:'tcc', 2:'gca', 1:'agt'}
stop = 'taa'
word = "help-i-am-trapped-in-an-icosahedron-capsid"

encodedDNA = ""

for c in range(0,len(word)):
    character = word[c]
    #convert character to ascii
    ascii_num = ord(character)
    out_code = []
    while ascii_num > 0:
        for k in key.keys():
            if ascii_num - k >= 0:
                out_code.append(key[k])
                ascii_num -= k
    random.shuffle(out_code)
    out_code.append(stop)
    out = "".join(out_code)
    encodedDNA += out

print(encodedDNA)

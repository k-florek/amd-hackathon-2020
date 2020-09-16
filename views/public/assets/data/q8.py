#!/usr/bin/env python3

key = {'ata':50, 'agt':1, 'cat':25, 'gtg':10, 'gca':2, 'tcc':5, 'taa':'stop'}

DNAcrypt = "agtgcaataagttccgtgcatgtgtaatcctccatagcaagtagtgcacatgtgtaagtgtcccatatatccgcaagtgtgtaagtgtccataagtagtgcaagtgcagtgtcccattaacatagttccgcagtggcataacatgcagcatccatagtggtgagttaagcacatgtggcatccagttaaagtcatgtggcaagtagtgcatccatataagtgtcccatgcaagttccagtatagtgtaacatgtgtccagtgcagcataatccagtgcaagtgcatccgtggtgcattccatataaataagttcccatgtggtggcaagtagtgcagcatcctaaagtgcaagttccagtcatgcaatagtgtaaagtgcacatagtgtgagtatagcatcctccgtgtaacatagtgtgtccagtgcaagttccatagtggcataaatacatgcagcaagttccagtgtgtcctaaagttccgtgatagcatcccatgcataagcatcccatgcagtgagttaaagttccatagcacatgcagtggtgtaagcatccgtgagtgcacattccatagtgtaacattccgcaagtgtggcataaagttccgcaatagtgagtagtgcacattaagcatcctccgtggtgagtatagcacattaagcatccagtgcagtgcattaatcccatgtggcaatagcaagtgtgtaaagttcctccagtgtgatacatgcataaagtgcagcatccatagtgtccgtgagtcattaaagtagtgcaagtgcagtggcatccagtgtgcattccatataaagttccgcagcaatagtgagtcatagttaaataagtagtcatgtgtccgtggcataacattccagtgcagcaagttccgtgatataatccgtgcatagtatagcatccgcataatccagtataagtgcagtgcatagtgcagtggcatcctaagtggtgcatagtatagcaagtgcatcctcctaatccagtgtggtgatatcccatgcagcataatccgcagtgagtgcacattaagcaagtgtgcattcctccagtatataacattccagtgcaatagtgagtgcaagttaacatgcatccagtagtgtgagtgcaatagtgtcctaaagtagttcctccgtgagtgcacatgcaagtatagcagtgtaagcaagttccgtggtgcatgcaatataagtgtccagttccatagcacatgcataa"

def decode_DNA(encoded_seq,decoded_seq=""):
    cursor = 0
    code = 0
    if len(encoded_seq) == 0:
        return decoded_seq

    codon = encoded_seq[cursor:cursor+3]
    while key[codon] != "stop":
        code += key[codon]
        cursor += 3
        codon = encoded_seq[cursor:cursor+3]
        if cursor >= len(encoded_seq):
            break
    decoded_seq += chr(code)
    return decode_DNA(encoded_seq[cursor:],decoded_seq)

print decode_DNA(DNAcrypt)

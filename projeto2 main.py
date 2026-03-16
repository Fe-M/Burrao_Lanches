nome = input("Digite seu nome: ")
nível = int(input("Digite o seu nível: "))
missões = int(input("Digite quantas missões você concluiu: "))

if missões < 1:
     print("Você ainda nem começou sua jornada!")
elif nível < 5 or missões < 3:
     print(f"{nome}, você ainda é um aventureiro iniciante.")
elif nível >= 5 and nível <= 9 and missões >= 3:
     print(f"{nome}, você já é um aventureiro experiente!")
elif nível >= 10 and missões >= 10:
     print(f"Incrível, {nome}! Você faz parte da elite da guilda!")
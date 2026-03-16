nome = input("Digite seu nome:")
idade = int( input("Digite sua idade:") )
treino = int( input("Quantos anos de treinamento você tem?:") )

if idade >= 16 and treino >= 2: 
    print(f"Parabéns, {nome} você está Permitido")
else:
    print(f"Sinto muito, {nome} você está Bloqueado")
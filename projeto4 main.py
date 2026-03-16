import random

def ataque_jogador():
    return random.randint(3,6)
def curar():
    return random.randint(2,5)
def ataque_goblin():
    return random.randint(2,4)
def moedas():
    return random.randint(5,20)

vida_jogador = 20
vida_goblin = 15

print("Um goblin aparece em sua frente, ele quer te atacar. O que você faz? ")

while vida_jogador > 0 and vida_goblin > 0:

    print(" |   ATACAR   |   CURAR   |   FUGIR   | ")
    acao = input("... ")

    if acao.lower() == "atacar":
        dano = ataque_jogador()
        vida_goblin -= dano
        print(f"Você causou {dano} de dano!")

    elif acao.lower() == "curar":
        cura = curar()
        vida_jogador = min(vida_jogador + cura, 20)
        print(f"Você recuperou {cura} de vida!")

    elif acao.lower() == "fugir":
        print("Você conseguiu fugir com vida... dessa vez. ") 
        break

    else:
        print("Tente novamente, dessa vez um dos comandos... ")
        continue

    if vida_goblin > 0:
       dano = ataque_goblin()
       vida_jogador -= dano
       print(f"O goblin te atacou e causou {dano} de dano!")

       print(f"Sua vida: {vida_jogador} ")
       print(f"Vida do Goblin: {vida_goblin} ")

if vida_jogador <= 0:
    print("Você morreu, mais sorte na proxima vida. ")

elif vida_goblin <= 0:
    print(f"Você venceu! Saqueando os bolsos dele você encontrou {moedas()} moedas. ")
import random

segredo = random.randint ( 1,10 )
tentativa = 0

numero = int( input ("Tente adivinhar meu numero... ") )

while numero != segredo:

     tentativa += 1

     if numero > segredo:
         print("O número secreto é menor!")

     else:
         print("O número secreto é maior!")

     numero = int( input ("Tente novamente... ") )

tentativa += 1

print(f"Parabéns! Você descobriu o número em {tentativa} tentativas!")
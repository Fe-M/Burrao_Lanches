// RA: 2840482613003
// Nome: Felipe dos Santos Moura

# include <iostream>

using namespace std;

int main () {
    
float n1, n2, ma;

cout << "Digite a primeira nota: ";
cin >> n1;

cout << "Digite a segunda nota: ";
cin >> n2;

ma = (n1+n2)/2;

cout << "A média é " << ma << endl;

if (ma<=3)
    cout << "Reprovado";
else if (ma>3 && ma<7)
    cout << "Exame";
    else
        cout << "Aprovado";
        
return 0;
}
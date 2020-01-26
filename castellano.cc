#include <iostream>
#include <string>
using namespace std; 

int main (){
    cout << "[" << endl; 

    string s; 
    while (cin >> s){
        if (s[0] >= 65 and s[0]<= 90){
            s[0] += 32; 
        }
        if (s[s.size()-1] == 44){
            s.pop_back();
        }
        if ((s[0] >= 65 and s[0]<= 90) or (s[0]>= 97 and s[0]<= 122)){
            s[0]-=32; 
            cout << "{\"palabra\": \""<< s << "\"}," << endl; 
        }
    }
    cout << "]" << endl; 
}
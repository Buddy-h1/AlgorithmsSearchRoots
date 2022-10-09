#include <iostream>
#include <vector>
#include <cmath>
#include <locale>

using namespace std;

struct IntervalWithRoot {
    long double leftInterval;
    long double rightIntarval;
};

//Область определения функции
const long double LEFTBOARD = -50;
const long double RIGHTBOARD = 50;

const long double STEP = 0.8;
const long double eps = 0.001;

long double functionRes(long double x) {
    return -4 * exp(x) + x * exp(x); //Вариант 7 (нахождение корня производной)
}

void searchRoot(long double left) {
    long double x0 = left;  // Начальное приближение
    long double x1;
    int k = 0;
    cout << "x0 = " << x0 << endl;
    for (;;)
    {
        k++;
        x1 = x0 - 0.0088 * (-4 * exp(x0) + x0 * exp(x0));
        if (fabs(x1 - x0) < eps) {
            cout << "------------" << endl;
            cout << "Итерация №" << k << "." << " Следующее приближение (x" << k << ") = " << fixed << x1 << endl;
            cout << "Текущий eps: " << fabs(x1 - x0) << endl;
            break;
        }
        cout << "------------" << endl;
        cout << "Итерация №" << k << "." << " Следующее приближение (x" << k << ") = " << fixed << x1 << endl;
        cout << "Текущий eps: " << fabs(x1 - x0) << endl;
        x0 = x1;
    }
    cout << endl;
    cout << "Корень найден: " << fixed << x1 << endl;
}


int main() {
    setlocale(LC_ALL, "Russian");
    vector<IntervalWithRoot> intervalS;
    long double leftCarriage = LEFTBOARD;
    long double rightCarriage = LEFTBOARD + STEP;

    //Определение интервалов с корнями в заданных границах
    while (rightCarriage < RIGHTBOARD) {
        long double t1 = functionRes(leftCarriage);
        long double t2 = functionRes(rightCarriage);
        if (functionRes(leftCarriage) * functionRes(rightCarriage) < 0) { //проверка промежутка на наличие корней
            IntervalWithRoot intervalWithRoot;
            intervalWithRoot.leftInterval = leftCarriage;
            intervalWithRoot.rightIntarval = rightCarriage;
            intervalS.push_back(intervalWithRoot);
        }
        else if (functionRes(leftCarriage) * functionRes(rightCarriage) == 0) { //если конец интервала попал на корень
            IntervalWithRoot intervalWithRoot;
            intervalWithRoot.leftInterval = leftCarriage - 0.5;
            intervalWithRoot.rightIntarval = rightCarriage + 0.5;
            intervalS.push_back(intervalWithRoot);
            leftCarriage += STEP + 0.1;
            rightCarriage += STEP;
            continue;
        }
        leftCarriage += STEP;
        rightCarriage += STEP;
    }

    if (intervalS.size() > 0) {
        cout << "Найдены следующие интервалы с корнями:" << endl;
        for (int i = 0; i < intervalS.size(); i++) {
            cout << fixed << "[" << intervalS[i].leftInterval << "; " << intervalS[i].rightIntarval << "]" << endl;
        }
        cout << endl;
    }
    cout << "Решение методом простых итераций:" << endl;
    cout << "Заданный eps: " << eps << endl;
    for (int i = 0; i < intervalS.size(); i++) {
        cout << "Определение " << i + 1 << "-го корня" << endl;
        searchRoot(intervalS[i].leftInterval);
    }

}
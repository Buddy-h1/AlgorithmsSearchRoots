#include <iostream>
#include <vector>
#include <cmath>
#include <locale>

using namespace std;

struct IntervalWithRoot {
    long double leftInterval;
    long double rightIntarval;
};

//������� ����������� �������
const long double LEFTBOARD = -50;
const long double RIGHTBOARD = 50;

const long double STEP = 0.8;
const long double eps = 0.001;

long double functionRes(long double x) {
    return -4 * exp(x) + x * exp(x); //������� 7 (���������� ����� �����������)
}

void searchRoot(long double left) {
    long double x0 = left;  // ��������� �����������
    long double x1;
    int k = 0;
    cout << "x0 = " << x0 << endl;
    for (;;)
    {
        k++;
        x1 = x0 - 0.0088 * (-4 * exp(x0) + x0 * exp(x0));
        if (fabs(x1 - x0) < eps) {
            cout << "------------" << endl;
            cout << "�������� �" << k << "." << " ��������� ����������� (x" << k << ") = " << fixed << x1 << endl;
            cout << "������� eps: " << fabs(x1 - x0) << endl;
            break;
        }
        cout << "------------" << endl;
        cout << "�������� �" << k << "." << " ��������� ����������� (x" << k << ") = " << fixed << x1 << endl;
        cout << "������� eps: " << fabs(x1 - x0) << endl;
        x0 = x1;
    }
    cout << endl;
    cout << "������ ������: " << fixed << x1 << endl;
}


int main() {
    setlocale(LC_ALL, "Russian");
    vector<IntervalWithRoot> intervalS;
    long double leftCarriage = LEFTBOARD;
    long double rightCarriage = LEFTBOARD + STEP;

    //����������� ���������� � ������� � �������� ��������
    while (rightCarriage < RIGHTBOARD) {
        long double t1 = functionRes(leftCarriage);
        long double t2 = functionRes(rightCarriage);
        if (functionRes(leftCarriage) * functionRes(rightCarriage) < 0) { //�������� ���������� �� ������� ������
            IntervalWithRoot intervalWithRoot;
            intervalWithRoot.leftInterval = leftCarriage;
            intervalWithRoot.rightIntarval = rightCarriage;
            intervalS.push_back(intervalWithRoot);
        }
        else if (functionRes(leftCarriage) * functionRes(rightCarriage) == 0) { //���� ����� ��������� ����� �� ������
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
        cout << "������� ��������� ��������� � �������:" << endl;
        for (int i = 0; i < intervalS.size(); i++) {
            cout << fixed << "[" << intervalS[i].leftInterval << "; " << intervalS[i].rightIntarval << "]" << endl;
        }
        cout << endl;
    }
    cout << "������� ������� ������� ��������:" << endl;
    cout << "�������� eps: " << eps << endl;
    for (int i = 0; i < intervalS.size(); i++) {
        cout << "����������� " << i + 1 << "-�� �����" << endl;
        searchRoot(intervalS[i].leftInterval);
    }

}
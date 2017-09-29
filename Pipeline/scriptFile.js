/*
@author: Весь код данной лабораторной работы полностью разработан ст. группы 521701 Македоном Е.А.
*/

"use strict"                //Использование современного стандарта

var m = 3;                  //Инициализация переменной m со значением 3
var p = 8;                  //Инициализация переменной p со значением 8

function run() {            //Основная функция запуска программы
    if (isNaN(m) || m == 0 || isNaN(p) || p < 2) {
        alert("Ошибка ввода");
        return;
    }       //Проверка введенных значений на корректность данных

    var table = document.getElementById("table");                 //Инициализация переменной, получающая элемент из HTML документа
    var firstVector = document.getElementById("firstVector");     //Инициализация переменной, получающая элемент из HTML документа
    var secondVector = document.getElementById("secondVector");   //Инициализация переменной, получающая элемент из HTML документа

    var arr1 = [];                //Обьявление массива для хранения 1-го вектора чисел
    var arr2 = [];                //Обьявление массива для хранения 2-го вектора чисел
    setArrEl(arr1, arr2);         //Вызов функции, заполняющей два массива 10-ыми числами заданной разрядности

    drawTable(m, p, table);                 //Отрисовка пустой таблицы
    drawVectors(m, firstVector, arr1);      //Отрисовка заполненного 1-го вектора
    drawVectors(m, secondVector, arr2);     //Отрисовка заполненного 2-го вектора

    for (var i = 0; i < m; i++) {
        action(arr1[i], arr2[i], i, table);     //запуск функции умножения пары чисел со сдвигом вправо
    }
}

function drawVectors(m, vector, arr) {
    var html = "<tr>";

    for (var i = 0; i < m; i++) {
        html += "<td>";
        html += arr[i];
        html += "</td>";
    }

    vector.innerHTML = html + "</tr>";
}       //функция отрисовки векторов
function drawTable(m, p, table) {
    var html = "";

    for (var i = 0; i < p + m - 1; i++) {
        html += "<tr>";

        for (var j = 0; j < p + 1; j++) {
            if (j == 0) {
                html += "<td>";
                html += "Time " + (i + 1);
                html += "</td>";
            }

            else html += "<td></td>";
        }

        html += "</tr>";
    }

    table.innerHTML = html;
    document.body.appendChild(table);
}            //функция отрисовки таблицы
function setM(text) {
    m = +text;
}                        //функция установления введенного значения M
function setP(text) {
    p = +text;
}                       //функция установления введенного значения P
function setArrEl(arr1, arr2) {
    var pBegin = p;
    var pEnd = pBegin + 1;

    var numBegin = 2, numEnd = 2;

    for (var i = 0; i < pBegin - 2; i++) {
        numBegin *= 2;
    }

    for (var i = 0; i < pEnd - 2; i++) {
        numEnd *= 2;
    }

    --numEnd;
    for (var i = 0; i < m; i++) {
        arr1[i] = Math.floor(numBegin + Math.random() * (numEnd - numBegin + 1));
        arr2[i] = Math.floor(numBegin + Math.random() * (numEnd - numBegin + 1));
    }
}               //Функция заполенния 2-х массивов 10-ыми числами заданной разрядности
function toBinary(num) {
    var arr = [];
    while (true) {
        if (num <= 1) {
            arr.push(1);
            arr.reverse();
            break;
        }

        arr.push(num % 2);
        num = (num - (num % 2)) / 2;
    }

    return +arr.join("");
}                       //функция перевода числа в 2-ую систему счисления
function toDecimal(rez) {
    var sum = 0;
    var arr = rez.slice();

    arr.reverse();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
            var k = 2;

            for (var j = 0; j < i - 1; j++) {
                k *= 2;
            }

            if (i == 0) k = 1;

            sum += k;
        }
    }

    return sum;
}                      //функция перевода числа в 10-ую систему счисления
function action(num1, num2, index, table) {        //функция, выполняющая умножение 2 чисел со сдвигом вправо и записывающая в таблицу каждый этап умножения
    num1 = toBinary(num1).toString().split("");
    num2 = toBinary(num2).toString().split("");

    num1.unshift(0);
    var rez = num1.slice();

    table.rows[index].cells[1].innerHTML += "sum = " + rez.join("") + "<br>" + "pair: " + (index + 1);

    for (var i = 1; i < p; i++) {
        num1.unshift(0);

        if (num2[i] == 0) {
            if (i == p - 1) {
                rez.push(0);
                break;
            }

            table.rows[index + i].cells[i + 1].innerHTML += "sum = " + rez.join("") + "<br>" + "pair: " + (index + 1);
            rez.push(0);
            continue;
        }

        rez.push(0);
        if (num2[i] == 1) {
            for (var j = 0; j < num1.length; j++) {
                rez[j] = +rez[j] + +num1[j];
            }

            sortDischarge(rez);

            if (i == p - 1) break;
            table.rows[index + i].cells[i + 1].innerHTML += "sum = " + rez.join("") + "<br>" + "pair: " + (index + 1);
        }
    }

    table.rows[index + p - 1].cells[p].innerHTML += "result = " + toDecimal(rez) + "<br>" + "pair: " + (index + 1);
}
function sortDischarge(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 2) {
            arr[i] = 0;
            ++arr[i - 1];
            i = -1;
        }
    }
}       //функция перевода лишнего разряда после этапа сложения (сортировка разрядов)

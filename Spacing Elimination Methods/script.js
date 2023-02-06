let resultGlobal = "";

function saveInResultGlobal(result) {
    result = result.replaceAll('<br>', '\n');
    resultGlobal = result;
}

function showHelpEquation(id){
    element = document.getElementById(id);
    state = element.style.display;
    if (state =='block') element.style.display='none';
    else element.style.display='block';
}

function changeMethod() {
    element = document.getElementById('method');
    method = element.value;
    accretion = document.getElementById('accretion');
    count_iterations = document.getElementById('count_iterations');
    epsilon = document.getElementById('epsilon');
    if (method == 'half_division') {
        accretion.style.display='none';
        count_iterations.style.display='none';
        epsilon.style.display='block';
    }
    else if (method == 'dichotomy') {
        accretion.style.display='block';
        count_iterations.style.display='none';
        epsilon.style.display='block';
    }
    else if (method == 'golden_ratio') {
        accretion.style.display='none';
        count_iterations.style.display='none';
        epsilon.style.display='block';
    }
    else if (method == 'fibonacci') {
        accretion.style.display='none';
        count_iterations.style.display='block';
        epsilon.style.display='none';
    }
}

function findRoot() {
    element = document.getElementById('method');
    method = element.value;
    if (method == 'half_division') {
        methodHalfDivision();
    }
    else if (method == 'dichotomy') {
        methodDichotomy();
    }
    else if (method == 'golden_ratio') {
        methodGoldenRatio();
    }
    else if (method == 'fibonacci') {
        methodFibonacci();
    }
}

function valueEquation(x) {
    equation = document.getElementById('equation').value;
    const parser = math.parser();
    let arg = "f(" + x + ")";
    parser.evaluate("f(x)=" + equation);
    return (parser.evaluate(arg))
}

function methodHalfDivision() {
    let result = "";
    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;

    let nIter = 1;
    let left_border = document.getElementById('interval_from').value;
    let right_border = document.getElementById('interval_to').value;
    let eps = document.getElementById('eps').value;
    left_border = (+left_border);
    right_border = (+right_border);
    eps = (+eps);
    let m;
    while (eps <= Math.abs(right_border - left_border)) {
        result += "Итерация: " + (nIter++) + "<br>";
        m = (left_border + right_border) / 2;
        result += "m =  " + m + "<br>";
        result += "f(m) = f(" + m + ") = " + valueEquation(m) + "<br>";
        let x1 = left_border + ((right_border - left_border) / 4);
        let x2 = right_border - ((right_border - left_border) / 4);
        result += "x1 =  " + x1 + "<br>";
        result += "x2 =  " + x2 + "<br>";
        result += "f(x1) = f(" + x1 + ") = " + valueEquation(x1) + "<br>";
        result += "f(x2) = f(" + x2 + ") = " + valueEquation(x2) + "<br>";

        if (valueEquation(x1) < valueEquation(m)) {
            result += "f(x1) < f(m) => Исключается правый подинтервал<br>";
            right_border = m;
            m = x1;
        }
        else {
            "f(x1) >= f(m) поэтому сравнивается f(x2) >= f(m)<br>";
            if (valueEquation(x2) < valueEquation(m)) {
                result += "f(x2) < f(m) => Исключается левый подинтервал<br>";
                m = x2;
                left_border = m;
            }
            else {
                result += "f(x2) >= f(m) => Исключаются левый и правый подинтервалы<br>";
                left_border = x1;
                right_border = x2;
            }
        }
        result += "Новые границы поиска: [" + left_border + "; " + right_border + "]" + "<br>";
        result += "Проверка критерия останова (eps = " + eps + "): " + Math.abs(right_border - left_border) + " <= " + eps + "<br><br>";
        if (nIter > 202) {
            result += "<span class=\"help-back\">Было проделано более 200 итераций. Не удалось найти окончательный минимум функции с данными параметрами.</span><br><br>"
            break;
        }
    }
    result += "x_min = " + m + "<br>";
    result += "f(x_min) = " + valueEquation(m) + "<br>";

    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;
}

function methodGoldenRatio() {
    let result = "";
    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;

    let nIter = 1;
    let left_border = document.getElementById('interval_from').value;
    let right_border = document.getElementById('interval_to').value;
    let eps = document.getElementById('eps').value;
    left_border = (+left_border);
    right_border = (+right_border);
    eps = (+eps);
    let xmin;
    let t = 0.618034;
    let x1 = right_border - t * (right_border - left_border);
    let x2 = left_border + t * (right_border - left_border);
    while (eps <= Math.abs(right_border - left_border))
    {
        result += "Итерация: " + (nIter++) + "<br>";
        result += "x1 =  " + x1 + "<br>";
        result += "x2 =  " + x2 + "<br>";
        result += "f(x1) = f(" + x1 + ") = " + valueEquation(x1) + "<br>";
        result += "f(x2) = f(" + x2 + ") = " + valueEquation(x2) + "<br>";
        if (valueEquation(x2) < valueEquation(x1))
            left_border = x1;
        else
            right_border = x2;
        x1 = right_border - t * (right_border - left_border);
        x2 = left_border + t * (right_border - left_border);
        result += "Новые границы поиска: [" + left_border + "; " + right_border + "]" + "<br>";
        result += "Проверка критерия останова (eps = " + eps + "): " + Math.abs(right_border - left_border) + " <= " + eps + "<br><br>";
        if (nIter > 202) {
            result += "<span class=\"help-back\">Было проделано более 200 итераций. Не удалось найти окончательный минимум функции с данными параметрами.</span><br><br>"
            break;
        }
    }
    result += "x_min = " + (xmin = (left_border + right_border) * 0.5) + "<br>";
    result += "f(x_min) = " + valueEquation(xmin) + "<br>";

    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;
}

function methodDichotomy() {
    let result = "";
    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;

    let nIter = 1;
    let left_border = document.getElementById('interval_from').value;
    let right_border = document.getElementById('interval_to').value;
    let eps = document.getElementById('eps').value;
    let sigma = document.getElementById('sigma').value;
    left_border = (+left_border);
    right_border = (+right_border);
    eps = (+eps);
    sigma = (+sigma);
    let x1;
    let x2;
    while (eps <= Math.abs(right_border - left_border)) {
        x1 = (left_border + right_border - sigma) / 2;
		x2 = (left_border + right_border + sigma) / 2;
        result += "Итерация: " + (nIter++) + "<br>";
        result += "x1 =  " + x1 + "<br>";
        result += "x2 =  " + x2 + "<br>";
        result += "f(x1) = f(" + x1 + ") = " + valueEquation(x1) + "<br>";
        result += "f(x2) = f(" + x2 + ") = " + valueEquation(x2) + "<br>";
        if(valueEquation(x1) < valueEquation(x2)) {
            result += "f(x1) < f(x2)<br>";
			right_border = x2;
		}
		else {
            result += "f(x1) >= f(x2)<br>";
			left_border = x1;
		}
        result += "Новые границы поиска: [" + left_border + "; " + right_border + "]" + "<br>";
        result += "Проверка критерия останова (eps = " + eps + "): " + Math.abs(right_border - left_border) + " <= " + eps + "<br><br>";
        if (nIter > 202) {
            result += "<span class=\"help-back\">Было проделано более 200 итераций. Не удалось найти окончательный минимум функции с данными параметрами.</span><br><br>"
            break;
        }
    }
    result += "x_min = " + ((x1 + x2) / 2) + "<br>";
    result += "f(x_min) = " + valueEquation(((x1 + x2) / 2)) + "<br>";

    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;
}

function valueFibonacci(n) {
    let oldValue = 0;
    let value = 1;
    let hold;
    if (n < 1) return(0);
    for (let i = 1; i < n; i++) {
        hold = value;
        value += oldValue;
        oldValue = hold;
    }
    return(value);
}

function methodFibonacci() {
    let result = "";
    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;

    let nIter = 1;
    let left_border = document.getElementById('interval_from').value;
    let right_border = document.getElementById('interval_to').value;
    let eps = document.getElementById('eps').value;
    let count_iters = document.getElementById('count_iters').value;
    left_border = (+left_border);
    right_border = (+right_border);
    eps = (+eps);
    count_iters = (+count_iters);
    let x1 = left_border + (right_border - left_border) * valueFibonacci(count_iters) / valueFibonacci(count_iters + 2);;
    let x2 = left_border +  right_border - x1;
    let f_x1 = valueEquation(x1);
    let f_x2 = valueEquation(x2);
    result += "x1 =  " + x1 + "<br>";
    result += "x2 =  " + x2 + "<br>";
    result += "f(x1) = f(" + x1 + ") = " + valueEquation(x1) + "<br>";
    result += "f(x2) = f(" + x2 + ") = " + valueEquation(x2) + "<br><br>";
    while (count_iters--) {
        result += "Итерация: " + (nIter++) + "<br>";
        if (f_x1 > f_x2) {
            result += "f(x1) < f(x2) =><br>";
            left_border = x1;
            result += "Новые границы поиска: [" + left_border + "; " + right_border + "]" + "<br>";
            x1 = x2;
            result += "x1 = x2, то есть x1 = " + x1 + "<br>";
            x2 = right_border - (x1 - left_border);
            result += "Теперь x2 = " + x2 + "<br>";
            f_x1 = f_x2;
            f_x2 = valueEquation(x2);
            result += "f(x1) = " + f_x1 + "<br>";
            result += "f(x2) = " + f_x2 + "<br><br>";
        } else {
            result += "f(x1) >= f(x2) =><br>";
            right_border = x2;
            result += "Новые границы поиска: [" + left_border + "; " + right_border + "]" + "<br>";
            x2 = x1;
            result += "x2 = x1, то есть x2 = " + x2 + "<br>";
            x1 = left_border + (right_border - x2);
            result += "Теперь x1 = " + x1 + "<br>";
            f_x2 = f_x1;
            f_x1 = valueEquation(x1);
            result += "f(x1) = " + f_x1 + "<br>";
            result += "f(x2) = " + f_x2 + "<br><br>";
        }
    }
    result += "x_min = " + ((x1 + x2) / 2) + "<br>";
    result += "f(x_min) = " + valueEquation(((x1 + x2) / 2)) + "<br>";

    saveInResultGlobal(result);
    document.getElementById("result").innerHTML = result;
}

function downloadFile() {
    let filename = "spacing_elimination_method";
    element = document.getElementById('method');
    method = element.value;
    if (method == 'half_division') {
        filename = 'half_division_result.txt';
    }
    else if (method == 'dichotomy') {
        filename = 'dichotomy_result.txt';
    }
    else if (method == 'golden_ratio') {
        filename = 'golden_ratio_result.txt';
    }
    else if (method == 'fibonacci') {
        filename = 'fibonacci_result.txt';
    }
    let data = resultGlobal;
    let type = 'text/plain';

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

var reader;

function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true; 
    } else {
        alert('Файловые API не полностью поддерживаются вашим браузером. Требуется откат.');
        return false;
    }
}


function readText(filePath) {
    var output = "";
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            displayContents(output);
        };
        reader.readAsText(filePath.files[0]);
    }
    else if(ActiveXObject && filePath) {
        try {
            reader = new ActiveXObject("Scripting.FileSystemObject");
            var file = reader.OpenTextFile(filePath, 1);
            output = file.ReadAll();
            file.Close();
            displayContents(output);
        } catch (e) {
            if (e.number == -2146827859) {
                alert('Не удается получить доступ к локальным файлам из-за настроек безопасности браузера'); 
            }
        }       
    }
    else {
        return false;
    }       
    return true;
}   

function displayContents(txt) {

    console.log(txt);   
    
    var arrayOfStrings = txt.split('\n');
    document.getElementById('equation').value = arrayOfStrings[0];

    arrayOfStrings[1] = arrayOfStrings[1].substring(1, arrayOfStrings[1].length-2);
    var arrayInterval = arrayOfStrings[1].split(';');

    document.getElementById('interval_from').value = arrayInterval[0];
    document.getElementById('interval_to').value = arrayInterval[1];

    element = document.getElementById('method');
    method = element.value;
    if (method == 'half_division') {
        document.getElementById('eps').value = arrayOfStrings[2];
    }
    else if (method == 'dichotomy') {
        document.getElementById('eps').value = arrayOfStrings[2];
        document.getElementById('sigma').value = arrayOfStrings[3];
    }
    else if (method == 'golden_ratio') {
        document.getElementById('eps').value = arrayOfStrings[2];
    }
    else if (method == 'fibonacci') {
        document.getElementById('count_iters').value = arrayOfStrings[2];
    }
}
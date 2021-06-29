let bdy = document.getElementById('body');
let first = document.getElementById('firstName');
let last = document.getElementById('lastName');
let date = document.getElementById('date');
let submit = document.getElementById('submit');
let user = document.getElementById('userID');
let cert = document.getElementById('certificateID');
let certId = [],x,y;
let userId = [];
let select = document.getElementById('sel');
let arr = [];

let key = Object.keys(localStorage);

let ldj = [];

user.remove();
cert.remove();

let sele = document.getElementById('sele');
let btn = document.getElementById('btt');
let sec2 = document.getElementById('sec2');
let sec3 = document.getElementById('sec3');

function show() {
    if(sele.value === 'new student') {
        sec2.setAttribute('style', 'display: block;');
        sec3.setAttribute('style', 'display: none;');
    }else {
        sec3.setAttribute('style', 'display: block;');
        sec2.setAttribute('style', 'display: none;');
    }
}
btn.addEventListener('click', show)

let btn2 = document.getElementById('submit2');
let ava = document.getElementById('ava');
let reg = document.getElementById('reg');
function check() {
    let lett = document.getElementById('lett').value;
    let numb = document.getElementById('numb').value;
    let use = 'SPINE ' + lett + numb;
    console.log(use);
    key = Object.keys(localStorage);
    for(let i = 0; i<key.length; i++) {
        if(use == key[i]) {
            ava.setAttribute('style', 'display: block;');
            reg.setAttribute('style', 'display: none;');
            console.log('Available');
        }
        if(use != key[i]) {
            ava.setAttribute('style', 'display: none;');
            reg.setAttribute('style', 'display: block;');
            console.log('Register');
        }
    }
}
btn2.addEventListener('click', check);


function hmmm(){
    let objValue = Object.values(localStorage);
    for(let i = 0; i<objValue; i++) {
        let valArr = [];
        if(valArr.length < 1) {
            objValue = Object.values(localStorage);
            let parse = JSON.parse(objValue[i]);
            valArr.push(parse);
            console.log(valArr);
        }else {
            console.log('i am happy');
        }
    }
}

let count = 0;
function generate() {
    if(first.value === '' || last.value === '' || date.value === '') {
        
    }else {
        x = first.value;
        y = last.value;
        if(count === 0) {
            certId = [];
            certIdGen();
            userId = [];
            userIdGen();
        }else{
            if(first.value === arr[0] && last.value === arr[1] && date.value === arr[2] && select.value === arr[3]) {
                
            }else {
                certId = [];
                certIdGen();
                userId = [];
                userIdGen();
            }
        }
        count++;
    }
}


function certIdGen() {
    for(let i=0; i<x.length; i++) {
        let firs = x.toLowerCase().charCodeAt(i) -96;
        certId.push(firs);
    }
    
    for(let i=0; i<y.length; i++) {
        let las = y.toLowerCase().charCodeAt(i) -96;
        certId.push(las);
    }
    
    function pushing() {
        arr = [];
        arr.push(first.value);
        arr.push(last.value);
        arr.push(date.value);
        arr.push(select.value);
    }
    pushing();
    
    function getDayMonthYear(){
        d = new Date(date.value);
        day = d.getDate();
        month = d.getMonth()+1;
        year = d.getFullYear() % 100;
        certId.push(day);
        certId.push(month);
        certId.push(year);
    }
    getDayMonthYear();
    
    function shuffleArray(arr) {
        arr.sort(() => Math.random() - 0.5);
    }
    shuffleArray(certId);
    cert.innerHTML = 'SMOP' + certId.join('');
}

let valParseArr = [];
function createObj() {
    let value = {
        gr : user.innerHTML,
        tr: {
            firstName: first.value,
            lastName: last.value,
            DOR: date.value,
            course: {
                course: select.value,
                certificateId: cert.innerHTML,
            }
        },
    }
    let v1 = Object.values(value)[0];
    let v2 = Object.values(value)[1];
    let val = JSON.stringify(v2);
    localStorage.setItem(v1, val);
}


let yy = [];
let cli = 0;
let cou = 0;
function userIdGen() {
    cli++;
    key = Object.keys(localStorage);    
    if(key.length === 0) {
        let iniFi = x[0].toUpperCase();
        userId.push(iniFi);
        let iniLa = y[0].toUpperCase();
        userId.push(iniLa);
        let click = '000000'+ cli;
        userId.push(click);
        user.innerHTML = 'SPINE ' + userId.join('');
        
        let shw = document.createElement('p');
        shw.innerHTML = 'YOUR USER ID IS ' + user.innerHTML;
        shw.setAttribute('id', 'shw');
        sec2.appendChild(shw);
        shw.addEventListener('click', ()=> {
            shw.remove();
        });
    }else {
        function cal() {
            for(let i=0; i<key.length; i++) {
                let iniFi = x[0].toUpperCase();
                userId.pop();
                userId.pop();
                userId.pop();
                userId.push(iniFi);
                
                yy.push(parseInt(key[i].slice(8)));
                let bigg = Math.max.apply(null, yy);
                
                let iniLa = y[0].toUpperCase();
                userId.push(iniLa);
                click = '000000' + `${bigg +1}`;
                userId.push(click);
                user.innerHTML = 'SPINE ' + userId.join('');
            }
            let shw = document.createElement('p');
            shw.innerHTML = 'YOUR USER ID IS ' + user.innerHTML;
            shw.setAttribute('id', 'shw');
            sec2.appendChild(shw);
            shw.addEventListener('click', ()=> {
                shw.remove();
            });
        }
        cal();
    }
    createObj();
}

submit.addEventListener('click', generate);




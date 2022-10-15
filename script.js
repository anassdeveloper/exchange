"use strict";

const app_overlay = document.querySelector('.app_overlay');
const number = document.querySelector('#number');
const select = document.querySelector('select');
const btn = document.querySelector('.money button');
const b = document.querySelector('.loader b');
const loader = document.querySelector('.loader');
const money = document.querySelector('.money');

let currencies, timer, ramz;

setTimeout(() => {
    app_overlay.style.display = 'none';
}, 5000);

number.onchange = (e) => {
    btn.style.display = 'block';
    if(number.value <= 0){
        btn.style.pointerEvents = 'none';
    }else{
        btn.style.pointerEvents = 'auto';
    }
}

btn.addEventListener('click', (e) => {
    let counter = 0;
    if(!number.value) return;
    switch(select.value){
        case "euro":
            ramz = "€"
            currencies = 10.72;
            break;
        case "usd":
            ramz = "$"
            currencies = 11.03;
            break;
        case "yen":
            ramz = "¥";
            currencies = 0.074;
            break;
        case "yuan":
            ramz = "元"
            currencies = 1.53;
            break;
        case "turki":
            ramz = "₺";
            currencies = 0.59;
            break;
        default: currencies = 0;
    }

    timer = setInterval(() => {
        if(counter === 4){
            b.innerText = '';
            loader.style.display = 'none';
            btn.style.display = 'none';
            
            if(document.querySelector('.result')){
                document.querySelector('.result span')
                .innerText = number.value + ramz;
                document.querySelector('.result b')
                .innerText = exchange(+number.value).toFixed(2) + "MAD";
            }else{
                let html = `
             <div class="result">
                <span> 
                <strong>${number.value + ramz}</strong></span>
                <b>${exchange(+number.value).toFixed(2)}MAD</b>
                <p>حيث فاطمة الزهراء كيدوخها الدرهم</p>
                <p>${Math.trunc(exchange(+number.value) * 20)}بالريال </p>
                <h4>${1 + select.value} = ${currencies} MAD</h4>
             </div>
            `;
            money.insertAdjacentHTML('beforeend', html)
            }
            
            number.value = "";
            return clearInterval(timer)
        };
        loader.style.display = 'flex';
        b.innerText = counter;
        counter++;

    }, 1000)
    
    
})

function exchange(a){
    return a * currencies
}

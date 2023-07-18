
let mapBlock = document.querySelector('.map-block');
let map = document.querySelector('.map');
let info = document.querySelector('.info');
info.innerHTML = 'Найди клад! У тебя есть на это <span>50</span> попыток.';
let dot;
let dotCoords;

function getDot() {
    dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.top = rundomNum(map.clientHeight - 200, map.offsetTop + 100) + 'px';
    dot.style.left = rundomNum(map.clientWidth - 200, map.offsetLeft + 100) + 'px';
    mapBlock.appendChild(dot);
    dotCoords = {
        dotTop: +dot.getBoundingClientRect().top + window.scrollY,
        dotLeft: +dot.getBoundingClientRect().left + window.scrollX,
    }

}

function rundomNum(max, min) {
    return Math.floor(Math.random() * (max - min) + min)
}


const getDistanceHint = (distance) => {
    if (distance < 20) {
        info.innerHTML = `Клад найден! Ты сделал это с <span>${countClick}</span> попытки`;
        return '1';
    } if (distance < 50) {
        info.innerHTML = `Очень горячо, осталось <span>${countClick}</span>`;
        return 'red';
    } if (distance < 100) {
        info.innerHTML = `Горячо, осталось <span>${countClick}</span>`;
        return 'orange';
    } if (distance < 300) {
        info.innerHTML = `Тепло, осталось <span>${countClick}</span>`;
        return 'yellow';
    } if (distance < 500) {
        info.innerHTML = `Холодно, осталось <span>${countClick}</span>`;
        return 'cyan';
    } if (distance < 800) {
        info.innerHTML = `Очень холодно, осталось <span>${countClick}</span>`;
        return 'blue';
    } else {
        info.innerHTML = `Замёрзнешь, осталось <span>${countClick}</span>`;
        return 'black';
    }
};



getDot();

let countClick = 50;
mapBlock.addEventListener('mousedown', (event) => {
    countClick--;
    let rotate;
    if (event.target.classList.contains('map') && countClick > 0) {
        let diffX = Math.abs(event.pageX - dotCoords.dotLeft);
        let diffY = Math.abs(event.pageY - dotCoords.dotTop);
        let minDistanse = getDistanse(diffX, diffY);;
        let atr = getDistanceHint(minDistanse);
        if (countClick % 2 === 0) {
            rotate = '-30deg';
        } else {
            rotate = '30deg';
        }
        createTrace(event, mapBlock, atr, rotate);
    }
    if(countClick === 0){
        info.innerHTML = 'К сожалению, эта попытка была последней.';  
    }
    return false;
})

function createTrace(e, el, arg, deg) {
    let trace = document.createElement('div');
    let image = document.createElement('img');
    image.setAttribute('src', `image/${arg}.png`);
    trace.append(image);
    trace.style.top = `${e.offsetY}px`;
    trace.style.left = `${e.offsetX}px`;
    el.append(trace);
    if (arg === '1') {
        trace.classList.add('winner');
        return;
    } else {
        trace.classList.add('trace');
        trace.style.transform = `rotate(${deg})`;
        return;
    }

}

const getDistanse = (x, y) => x > y ? x : y;

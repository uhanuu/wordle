/**
 * 백스페이스 두번
 * 사용설명서
 * 색 나오고 wait하고 넘어가기
 * 클릭 처음 백 스페이스 수정하기
 * start 하면 시작하기
 */
const 답 = "ㅅㅜㅂㅏㄱ";
const indexControll = [4,9,14,19,24];
const indexBackControll = [0,5,10,15,20,25];
const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
const enter = "Enter";
const backspace = "Backspace";

let index = 0;
let stop = 0;

document.querySelector("button").addEventListener("click", colorCheck);
const alphabetBtns = document.querySelectorAll('.alphabet-btn');
const inputs = document.querySelectorAll('.input');
const info = document.querySelector('div.info');

const timmer = document.querySelector("h3.timmer");
let timeOutCount;


function wait(sec){
    let start = Date.now(), now = start;

    while(now - start < sec * 1000){
        now = Date.now();
    }
}

function timeCount(){
    let sec = 30;
    timmer.innerText = `남은 시간: 30`;  
    timeOutCount = setInterval(function(){
    if(sec > 0){
        sec -= 1;
        replaceSec = String(sec).padStart(2,"0");
    }
    if(sec == 0){
        sec = 30;
    }
    timmer.innerText = `남은 시간: ${replaceSec}`;  
    },1000);
}

function answerSizeUp(){
    const template = `
    <div class="answer">
        <input class="input">
        <input class="input">
        <input class="input">
        <input class="input">
        <input class="input">
    </div>
    `;
    document
        .querySelector(".submission")
        .insertAdjacentHTML("beforebegin", template);
}
    

function colorCheck(){
    const input = document.querySelectorAll(".input");
    let count = 0;
    clearInterval(timeOutCount);
    timeCount();
    enterControll();

    //1. 위치까지 맞으면 초록칠
    //2. 위치는 안 맞으면 노란칠
    //3. 그것들 다 아니면 회색칠
    for (let i = 0; i < 5; i++) {
        const answerValue = input[i].value;

        if (answerValue == 답[i] && answerValue != "") {
            input[i].style.background = "green";
        } else if (답.includes(answerValue) && answerValue != "") {
            //includes() == 문자열 검사
            input[i].style.background = "yellow";
        } 
        else {
            input[i].style.background = "lightgrey";
        }
        input[i].classList.remove("input"); //?
    }


    for (let i = 0; i < 5; i++) {
        if (input[i].style.background == "green") {
            count++;
        }
        if (count === 5) {
            alert("정답 입니다.");
            clearInterval(timeOutCount);
        }
    }
    if(stop){
        alert("다음 기회에 도전하새요");
        clearInterval(timeOutCount);
        wait(3);
        window.location.href = 'file:///Users/ryu/javaScript/wordle/index.html';
    }
}


const handleClickAlphabetBtn = (e) => {

    const inputValue = e.target.value;

  if(inputs[index].value !== "")
    if(inputValue === enter){
        colorCheck();
    }
    else if(inputValue === backspace){
        inputs[index].value = "";
        console.log(index);
    }
    else{
        console.log("anything");
    }
  else{
    if(regex.test(inputValue)){
        const keyValue = inputValue;
        inputs[index].value = keyValue;
           if(!indexControll.includes(index) ){
               ++index;
           }
   }
   else if(inputValue === enter){
       colorCheck();
   }
   else if(inputValue === backspace){
       if(index > 0){
         if(!indexBackControll.includes(index) ){
            --index; 
             inputs[index].value = "";
         }
        console.log(index);

       }
   }
   else{
       console.log("anything");
   }
  }
};


alphabetBtns.forEach((alphabetBtn) => {
    alphabetBtn.addEventListener('click', handleClickAlphabetBtn);
});

 //backspace 2번 눌러야 되는거 수정하기//

const handleKeyboard = (e) => {
  const inputValue = e.key;
  if(inputs[index].value !== "")
    if(inputValue === enter){
        colorCheck();
    }
    else if(inputValue === backspace){
        inputs[index].value = "";
        console.log(index);
    }
    else{
        console.log("anything");
    }
  else{
    if(regex.test(inputValue)){
        const keyValue = inputValue;
        inputs[index].value = keyValue;
           if(!indexControll.includes(index) ){
               ++index;
           }
   }
   else if(inputValue === enter){
       colorCheck();
   }
   else if(inputValue === backspace){
       if(index > 0){
         if(!indexBackControll.includes(index) ){
            --index; 
             inputs[index].value = "";
         }
        console.log(index);

       }
   }
   else{
       console.log("anything");
   }
  }
};

function enterControll(){
    if(index <= 4){
        index = 5;
        setTimeout(colorCheck,30000);
    }
    else if(index <= 9){
        index = 10;
        setTimeout(colorCheck,30000);
    }
    else if(index <= 14){
        index = 15;
        setTimeout(colorCheck,30000);
    }
    else if(index <= 19){
        index = 20;
        setTimeout(colorCheck,30000);
    }
    else if(index <= 24){
        index = 25;
        setTimeout(colorCheck,30000);
    }
    else {
        stop = 1;
    }
}

addEventListener("keydown", handleKeyboard);


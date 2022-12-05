const randomControl = 10;
const regex = /^[0-9]+$/;

const indexControl = [3];
const indexBackControl = [0,4];
const enter = "Enter";
const backspace = "Backspace";

let result = "";
let stop = 0;
let index = 0;
let timeControl;

const submitControl = document.querySelector("button.submit-button");
const alphabetBtns = document.querySelectorAll('.alphabet-btn');
const timmer = document.querySelector("h3.timmer");

function resultController(){
    while(1){
        value = Math.floor(Math.random() * randomControl);
        if(value !== 0){
            break;
        }
    }
    return value;
}

while(1){
    let num1 = resultController();
    let num2 = Math.floor(Math.random() * randomControl);
    let num3 = Math.floor(Math.random() * randomControl);
    let num4 = Math.floor(Math.random() * randomControl);
    
    if(num1 !== num2 && num1 !== num3 && num1 !== num4
        && num2 !== num3 && num2 !== num4 && num3 !== num4){
      result = `${num1}${num2}${num3}${num4}`;
      break;
    }
}

console.log(result);


function timeCount(){
    let sec = 30;
    timmer.innerText = `남은 시간: 30`;  
    timeControl = setInterval(function(){
    if(sec > 0){
        sec -= 1;
        replaceSec = String(sec).padStart(2,"0");
    }
    if(sec == 0){
        timmer.innerText = `남은 시간: 00`;  
        sec = 30;
    }
    timmer.innerText = `남은 시간: ${replaceSec}`;  
    },1000);
}

function answerSizeUp(){
    const template = `
    <div class="answer">
        <input required maxlength="1" class="input" readonly/>
        <input required maxlength="1" class="input" readonly/>
        <input required maxlength="1" class="input" readonly/>
        <input required maxlength="1" class="input" readonly/>
      </div>`;
    document
        .querySelector(".submit-button")
        .insertAdjacentHTML("beforebegin", template);
}


function colorCheck(){
    const input = document.querySelectorAll("div.answer .input");
    let count = 0;
    clearInterval(timeControl);
    timeCount();
    enterController();

    //1. 위치까지 맞으면 초록칠
    //2. 위치는 안 맞으면 노란칠
    //3. 그것들 다 아니면 회색칠
    for (let i = 0; i < 4; i++) {
        const answerValue = input[i].value;

        if (answerValue == result[i] && answerValue != "") {
            input[i].style.background = "green";

        } else if (result.includes(answerValue) && answerValue != "") {
            //includes() == 문자열 검사
            input[i].style.background = "yellow";
        } 
        else {
            input[i].style.background = "lightgrey";
        }
        input[i].classList.remove("input"); 
    }

    for (let i = 0; i < 4; i++) {
        if (input[i].style.background == "green") {
            count++;
        }
        if (count === 4) {
            alert("정답 입니다.");
            clearInterval(timeControl);
        }
    }
    answerSizeUp();
}


submitControl.addEventListener("click",colorCheck);

const handleClickAlphabetBtn = (e) => {
    const inputs = document.querySelectorAll("div.answer .input");
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
           if(!indexControl.includes(index) ){
               ++index;
           }
   }
   else if(inputValue === enter){
       colorCheck();
   }
   else if(inputValue === backspace){
       if(index > 0){
         if(!indexBackControl.includes(index) ){
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
  const inputs = document.querySelectorAll("div.answer .input");
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
        alert("키보드 입력은 숫자만 가능합니다");
    }
  else{
    if(regex.test(inputValue)){
        const keyValue = inputValue;
        inputs[index].value = keyValue;

           if(!indexControl.includes(index) ){
               ++index;
           }
   }
   else if(inputValue === enter){
       colorCheck();
   }
   else if(inputValue === backspace){
       if(index > 0){
         if(!indexBackControl.includes(index) ){
            --index; 
             inputs[index].value = "";
         }
        console.log(index);

       }
   }
   else{
        alert("키보드 입력은 숫자만 가능합니다");
   }
  }
};

function enterController(){
    if(index <= 3){
        index = 0;
        setTimeout(colorCheck,30000);
    }
}

addEventListener("keydown", handleKeyboard);
var btn = document.getElementsByTagName("input")[0];//找到input
var time = document.getElementById("time");//找到時間
var combo = document.getElementById("combo");//找到分數
btn.addEventListener("click", gamestart);//規劃點選動作
var flag = 0; //遊戲開始為1，停止為0
var sec = 0;
var count = 0;
var wait = new Array();
var thedog = document.getElementsByClassName("cell");

function gamestart() { //遊戲開始
  flag = 1;
  count = 0;
  sec = 60;
  combo.textContent = `成績分數:0`;
  time.textContent = `剩餘時間:60s`;
  btn.removeEventListener("click", gamestart);//關閉點選

  var start = setInterval(function () { //倒數計時開始，每秒做顯示剩餘時間
    if (sec == 0) { //0則停止重複延遲
      clearInterval(start);
      flag = 0;
      btn.addEventListener("click", gamestart);//開放點選
    }
    else {
      sec--;
      time.textContent = `剩餘時間:${sec}s`;
    }
  }, 1000);

  for (let i = 0; i < 100; i++) { //100次機會
    let timeout = Math.floor(Math.random() * 57000);  //range=0.1~56.9,放大到毫秒=>0~59999
    let who = Math.floor(Math.random() * 9); //0~8
    let delay=Math.floor(Math.random()*3)+1; //1~3

    setTimeout(function () { //指定好100隻的時間軸
      showdog(who, delay, i);
    }, timeout);
  }
}

function showdog(who, delay, id) {
  if (thedog[who].title != "state") {//如果狗狗不是等待中，那麼往下一個位置推，並再晚0.5秒出現
    let next = (who + 1) % 9;
    setTimeout(function () {
      showdog(next, delay, id);
    }, 500);
  }
  else {//狗狗處於等待中
    /*改飢餓狀態*/
    thedog[who].src = "assets/img/on.webp";
    thedog[who].title = "hungry";
    thedog[who].alt = id;
    thedog[who].style.backgroundColor = "lightblue";

    wait[id] = setTimeout(function () {//N秒後回到等待狀態，並記下此事為wait[id]
      thedog[who].src = "assets/img/Bro-image.jpg";
      thedog[who].title = "state";
      thedog[who].style.backgroundColor = null;
    }, delay * 1000);
  }
}

document.onkeydown = keyboard; //每次的鍵盤動作都會送到keyboardc函式
function keyboard() {//鍵盤動作轉為who對象編號
  switch (event.keyCode) {
    case 97:
      getcombo(6);
      break;
    case 98:
      getcombo(7);
      break;
    case 99:
      getcombo(8);
      break;
    case 100:
      getcombo(3);
      break;
    case 101:
      getcombo(4);
      break;
    case 102:
      getcombo(5);
      break;
    case 103:
      getcombo(0);
      break;
    case 104:
      getcombo(1);
      break;
    case 105:
      getcombo(2);
      break;
  }
}
function getcombo(who) {//每次按下指定鍵時
  if (thedog[who].title == "hungry" && flag) {//如果是飢餓狀態
    /*改餵食狀態*/
    thedog[who].src = "assets/img/off.jpg";
    thedog[who].title = "eating";
    thedog[who].style.backgroundColor = "lightgreen";
    id = thedog[who].alt;
    clearTimeout(wait[id]); //取消之前的倒數恢復

    /*加分*/
    count++;
    combo.textContent = `成績分數:${count}`;

    /*1秒後改等待狀態*/
    setTimeout(function () {
      thedog[who].src = "assets/img/Bro-image.jpg";
      thedog[who].title = "state";
      thedog[who].alt = null;
      thedog[who].style.backgroundColor = null;
    }, 1000);
  }
}
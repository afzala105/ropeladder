let kotakTerakhir = `Finish`;

const board = document.querySelector(".board-cont")

const bg = document.querySelector(".bg");

function createTile(cont, x, per){
  document.body.style.setProperty("--per", per);
  
  let line = x / per;
  --line;
  //console.log(line)
  for(let n = line; n >= 0; n--){
    let row = document.createElement('div');
    row.setAttribute('class','row');
    
    for(let i = line; i >= 0; --i){
      let box = document.createElement("div");
      box.setAttribute('class','tile');
      let num = document.createElement("div");
      num.setAttribute('class','num');
    
      num.textContent = (x);
      box.appendChild(num);
      row.appendChild(box);
      --x;
    }
    board.appendChild(row);
  }
  
}

createTile(board, 100,10);
let all = document.getElementsByClassName("tile")
let step = all[0].offsetWidth;

document.body.style.setProperty("--start", `-${step}px`);
//console.log(step);

let rule = {
  "long" : Math.sqrt(all.length)*step,
  "height" : Math.sqrt(all.length)*step,
  "size" : step,
  "maxStep" : all.length
}

let stepSound = new Audio("./assets/step.mp3");

function getActive(){
  let tmp = document.querySelector('.active');
  
  let ind = parseInt(tmp.childNodes[0].textContent)
  
  return (all.length - ind);
}

function gulirNext(){
  let now = getActive();
  all[now].classList.remove('active')
  if(now - 1 < 0){
    now = all.length;
    //return "stop";
    
  }
  all[now-1].classList.add('active')
  stepSound.play();
}

function gulirPrev(){
  let now = getActive();
  all[now].classList.remove('active')
  if(now + 1 >= all.length){
    now = -1;
  }
  all[now+1].classList.add('active')
  stepSound.play();
}

let vid = document.querySelector("#vid");
vid.src = "./video/1.mp4";
const vidCont= document.querySelector(".vid-cont");

function playVideo(){
  musik.pause();
  vidCont.style.display = "flex";
}



function autoGulir(many){
  let reverse = false;
  let n = 0;
  let si = setInterval(()=>{
    console.log(getActive())
    if(getActive() == 0 || reverse == true){
      reverse = true
      gulirPrev();
    }
    else{
       gulirNext();
    }
    ++n;
    if(n >= many){
      n = 0;
      //bisa pakai ini untuk pilih video dengan cek Tile yg active;
      //getActive()
     
      setTimeout(()=>{
        cekTile();
      }, 500);
      
      clearInterval(si);
    }
  },500)
}

function closeVid(el){
  musik.play();
  el.parentNode.style.display = "none"
  if(vid.play()){
    vid.load();
  }
}

//.active -> .activeOut -> .activeIn -> .active
let arrLadder = [6,19,28,32,41,52,64,75,83];
let mapLadder = {
  "6" : "24",
  "19" : "37",
  "28" : "84",
  "32" : "50",
  "41" : "80",
  "52" : "88",
  "64" : "78",
  "75" : "93",
  "83" : "97"
}
let arrSnake = [44, 56, 62, 89, 95, 99];
let mapSnake = {
  "44" : "14",
  "56" : "29",
  "62" : "4",
  "89" : "48",
  "95" : "77",
  "99" : "35"
}
//let arrSnake = [44, 55, 70, 92, 95, 99];
/*
let mapSnake = {
  "44" : "7",
  "55" : "35",
  "70" : "4",
  "92" : "48",
  "95" : "90",
  "99" : "22"
}
*/

const warpSound = new Audio("./assets/warp.mp3")
//warpSound.play()
function initWarpSound(){
  warpSound.load();
 
}

function getDown(tileNum){
  warpSound.play();
  let now = getActive();
  let target = (all.length) - parseInt(mapSnake[tileNum]);
  all[now].classList.replace('active','activeOut');
  setTimeout(()=>{
    all[now].classList.remove('activeOut');
    all[target].classList.add('activeIn');
  }, 2000);
  setTimeout(()=>{
    all[target].classList.replace('activeIn', 'active');
    initWarpSound()
  },2000*2);
}

function getUp(tileNum){
  warpSound.play();
  let now = getActive();
  let target = (all.length) - parseInt(mapLadder[tileNum]);
  all[now].classList.replace('active','activeUp');
  setTimeout(()=>{
    all[now].classList.remove('activeUp');
    all[target].classList.add('activeShow');
  }, 3075);
  setTimeout(()=>{
    all[target].classList.replace('activeShow', 'active');
    initWarpSound()
  },4800);
}

function cekTile(){
  let now = getActive();
  let key = parseInt(all[now].childNodes[0].textContent);
  //console.log(key);
  if(arrSnake.indexOf(key) > -1){
    //mapSnake[key];
    getDown(key)
    
    setTimeout(()=>{
      playVideo();
    }, 4200);
    
  }
  else if(arrLadder.indexOf(key) > -1){
    //lebih baik animasi dibedakan
    getUp(key)
    
    setTimeout(()=>{
      playVideo();
    }, 5000);
    
  }
  else{
    //playVideo();
    if(getActive() == 0){
      pesanFinish()
    }
    else{
      playVideo(); 
    }
  }
}

let timeLimit = 0;
function timer(){
  let maxTime = new Date();
  maxTime = maxTime.getTime() + (1000*60*60) // 1jam;
  return maxTime;
}

function countDown(){
  let nowTime = new Date();
  nowTime = nowTime.getTime();
  return timeLimit - nowTime;
}

function timeLeft(time){
  let minutes = Math.floor(time/1000/60);
  let seconds = Math.floor((time%(1000*60)) /1000);
  
  return [minutes, seconds];
}

let menit = document.getElementById("menit");
let detikCont = document.getElementById("second");
let detik = document.getElementById("detik");

function countDownAnimation(){
  detikCont.style.animation = "rotasi 60s infinite linear";
  detik.style.animation = "reverseRotasi 60s infinite linear";
}

function countDownAnimationStop(){
  detikCont.style.animation = "none";
  detik.style.animation = "none";
}


let waktuMundur = setInterval(()=>{
  if(timeLimit > 0){
  let waktu = timeLeft(countDown());
  menit.textContent = waktu[0]
  detik.textContent = waktu[1]
  if(waktu[0] < 0 && waktu[1] < 0){
    clearInterval(waktuMundur);
    countDownAnimationStop();
    finishGame();
  }
  }
},1000)
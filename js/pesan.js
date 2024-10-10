function pesan(text){
  let pDiv = document.createElement("div");
  let pText = document.createElement("p");
  let cText = document.createElement("button");
  
  cText.textContent = "Tutup";
  pText.textContent = text;
  pDiv.appendChild(pText);
  pDiv.appendChild(cText);
  pDiv.setAttribute("class","pesan");
  pDiv.classList.add("pesanMasuk");
  
  document.body.appendChild(pDiv);
  
  cText.addEventListener("click",(e)=>{
    if(!musik.play()){
      musik.play();
    }
    else{
      if(getActive() == 99 && tStart > 0){
        playVideo();
      }
    }
    launchFullScreen(document.documentElement); // the whole page

    pDiv.classList.replace("pesanMasuk","pesanKeluar");
    setTimeout(function() {
      document.body.removeChild(pDiv);
      calcTime();
      if(openTime == true && reloadPage == false){
        reloadPage = true;
      }
      else if(openTime == true && reloadPage == true){
        location.reload()
        console.log("reload : " +reloadPage);
      }
      else {
        //nothing to do
      }
    }, 500);
    //pDiv.style.display = "none";
  } )
}

function fw() {
  confetti({
  particleCount: 300,
  spread: 80,
  origin: { y: 0.6 },
});
}

const win = new Audio("./assets/win.mp3")

function pesanFinish(){
  musik.load();
  win.load();
  win.play();
  pesan("Selamat Anda telah menyelesaikan permainan!");
  fw();
  timeFinish();
  //simpanData();
}

let tStart = 0;
let tFinish = 0;
let tDuration = 0;
let openTime = false;
let reloadPage = false;

function timeStart(){
  tStart = new Date();
  tStart = tStart.getTime();
  console.log(`Penghitung waktu dimulai`);
  timeLimit = timer();
  countDownAnimation();
}
function timeFinish(){
  tFinish = new Date();
  tFinish = tFinish.getTime();
  console.log(`Penghitung waktu berakhir`);
}

function calcTime(){
  if(tStart > 0 && tFinish > 0 && openTime == false){
    openTime = true;
    tDuration = tFinish - tStart;
    let tmp = tDuration;
    let jam = Math.floor(tmp/1000/60/60);
    let mnt = Math.floor((tmp%(1000*60*60))/1000/60);
    let dtk = Math.floor((tmp%(1000*60))/1000);
    if(jam < 1){
    pesan(`Waktu bermain : ${mnt} menit ${dtk} detik, ${kotakTerakhir}`);
    create(data, 'waktu', `${mnt} menit ${dtk} detik, ${kotakTerakhir}`);
    console.log(`Waktu bermain : ${mnt} menit ${dtk} detik, ${kotakTerakhir}`);
    }
    else {
    pesan(`Waktu bermain : ${jam} jam ${mnt} menit ${dtk} detik, ${kotakTerakhir}`);
    create(data, 'waktu', `${jam} jam ${mnt} menit ${dtk} detik, ${kotakTerakhir}`);
    console.log(`Waktu bermain : ${jam} jam ${mnt} menit ${dtk} detik, ${kotakTerakhir}`);
    }
    simpanData();
  }
  else{
    console.log("Menunggu waktu selesai")
  }
}

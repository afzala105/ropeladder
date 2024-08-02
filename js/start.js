const musik = new Audio("./assets/musikLatar.mp3");
musik.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

function init(){
  diceSound.load();
  musik.play();
  initWarpSound();
  pesan("Selamat Datang ! \n Silakan tekan dadu untuk memulai permainan")
  all[all.length -1].classList.add('active');
  timeStart();
}

// Find the right method, call on correct element
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

// Launch fullscreen for browsers that support it!
//launchFullScreen(document.documentElement); // the whole page
//launchFullScreen(document.getElementById("videoElement")); // any individual element

function initNew(){
  diceSound.load();
  musik.play();
  initWarpSound();
  //pesan("Selamat Datang ! \n Silakan tekan dadu untuk memulai permainan")
  all[all.length -1].classList.add('active');
  //timeStart();
  loginStart();
}
//use init() to start


function finish(){
  all[getActive()].classList.remove('active')
  all[0].classList.add('active');
  cekTile()
  
}

//init();

initNew()
//loginStart();

function finishGame(){
  kotakTerakhir = `Kotak Terakhir : ${100 - getActive()}`;
  all[getActive()].classList.remove('active');
  all[0].classList.add('active');
  setTimeout(cekTile, 1000);
}

function backGame(){
  pesan("Selamat kembali ke permainan !");
}
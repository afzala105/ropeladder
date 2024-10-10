let tutupEl = (el, time) => { return new Promise((resolve, reject)=>{

  setTimeout(function() {
    el.style.animation = "none";
    resolve(el.style.display = "none");
    reject(Error("Failure"));
  }, time);
})
}

let data = Object.assign({}, {
  "nama" : "",
  "unit" : "",
  "kec" : "",
  "kab" : "",
  "waktu" : ""
});

const penting = document.getElementById('penting');
const mulai = document.getElementById('mulai');
let login = document.getElementById('login');

function showPenting(){
  penting.style.display = "block";
}
function hidePenting(){
  penting.style.display = "none";
}


function create(obj, el, val){
  cekData();
  obj[el] = val;
}

function cekData(){
  let kunci = [false, false, false, false];
  let n = 0;
  //let arrData = new Map(data);
  for(let el in data){
    //console.log(`cek : ${el} , ${data[el]}`);
    if(data[el] == ""){
      kunci[n] = false;
    }
    else {
      kunci[n] = true;
    }
    ++n;
  }
  let ok = 0;
  for(let k of kunci){
    if(k == true){
      ++ok;
      //console.log(ok)
    }
  }
  if(ok >= 4){
    hidePenting()
    mulai.classList.replace('disabled','ok');
    mulai.removeAttribute('disabled');
  }
  else {
    showPenting()
    if(mulai.classList.contains('ok')){
      mulai.classList.replace('ok','disabled');
      mulai.setAttribute('disabled','');
    }
  }
}

cekData()

mulai.addEventListener('click',()=>{
  tutupEl(form, 50).then(
    (res)=>{
      tutupEl(login, 50);
    },
    (er)=>{
      console.log(er)
    }
    )
  .then(
    (res)=>{
      init()
    },
    (er)=>{
      console.log(er)
    }
    );
})


const tips = document.querySelector("#tips");
const riwayat = document.querySelector("#riwayat");
const form = document.querySelector("#form");
const konfirmasi = document.querySelector("#konfirmasi");

let tutupHome = document.getElementsByClassName("tutupHome");

function petunjuk(){
  tips.style.animation = "homeIn 0.5s"
  tips.style.display = "flex";
}

let endButton = false;
function konfirm(text){
  konfirmasi.style.animation = "homeIn 0.5s";
  konfirmasi.style.display = "flex";

  let teksKonfirmasi = document.getElementById('teksKonfirmasi');
  teksKonfirmasi.textContent = text;

  let iya = document.getElementById('trueKonfirmasi');
  let tidak = document.getElementById('falseKonfirmasi');

  iya.onclick = ()=> {
    //return true;
    endButton = true;
    konfirmasi.style.animation = "";
    konfirmasi.style.animation = "homeOut 0.7s"
    tutupEl(konfirmasi, 700).then(
      function(res){
        console.log(res)

      },
      function(er){console.log(er)}
      )

    finishGame()
  }

  tidak.onclick = ()=>{
    //return false;

    konfirmasi.style.animation = "";
    konfirmasi.style.animation = "homeOut 0.7s"
    tutupEl(konfirmasi, 700).then(
      function(res){
        console.log(res)

      },
      function(er){console.log(er)}
      )

    backGame()
  }
}

function history(){
  riwayat.style.animation = "homeIn 0.5s"
  riwayat.style.display = "block";
}

function mainkan(){

  form.style.animation = "homeIn 0.5s"
  form.style.display = "flex";
}

for(let tutup of tutupHome){

  tutup.addEventListener("click", (e) => {
  //console.log("tutup");
    let tmp = e.target.parentNode.parentNode
  //.style.display = "none";

    tmp.style.animation = "homeOut 0.7s"
    tutupEl(tmp, 700).then(
      function(res){
        console.log(res)

      },
      function(er){console.log(er)}
      )
  })
}

function loginStart(){
  login.style.display = "flex";
  if(localStorage.getItem('masterData') === null){
    localStorage.setItem('masterData','{}');
  }
  pesan("Selamat Datang dalam Permainan!");
}


function simpanData(){
  let sData = data;
  let masterData = JSON.parse(localStorage.getItem('masterData'));
  let panjang = Object.keys(masterData).length;
  console.log(panjang);
  console.log(sData);
  
  
  //let tmp = {}
  
  create(masterData, ++panjang, sData);
  
  console.log(masterData)
  
  masterData = JSON.stringify(masterData);
  localStorage.setItem('masterData', masterData);
  //localStorage.setItem('masterData', sData)
  console.log(localStorage.getItem('masterData'));
  
}


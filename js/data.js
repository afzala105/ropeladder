function getAllData(){
  let masterData = JSON.parse(localStorage.getItem('masterData'));
  console.log(masterData);
  
  return masterData;
  /*
  for(let key in masterData){
    if(masterData.hasOwnProperty(key)){
      console.log(masterData[key]);
    }
    
  }
  */
}
let dataRiwayat = document.getElementById('dataRiwayat')

let allData = getAllData()
let tableData = document.createElement('table');
tableData.setAttribute('class','tableData');
tableData.setAttribute('border','10');
tableData.setAttribute('cellpadding','5');
tableData.setAttribute('cellspacing','1');

let kolom = [ 
              "Nama",
              "Unit",
              "Kecamatan",
              "Kabupaten",
              "Waktu Permainan"
            ]

let trJ = document.createElement('tr');
for(let i = 0; i < 5; ++i){
  let th = document.createElement('th')
  th.textContent = kolom[i];
  trJ.appendChild(th)
}
tableData.appendChild(trJ);


if(Object.keys(allData).length > 0){
  for(let key in allData){
    if(allData.hasOwnProperty(key)){
      let tr = document.createElement('tr'); 
      for(let el in allData[key]){
        let td = document.createElement('td')
        td.textContent = allData[key][el];
        tr.appendChild(td)
      }
      tableData.appendChild(tr)
      //console.log(masterData[key]);
    }
  }

  dataRiwayat.appendChild(tableData)
  let nodata = document.querySelector("#nodata");
  nodata.style.display = "none";

}

console.log(dataRiwayat)


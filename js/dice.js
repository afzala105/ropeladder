const dice = document.querySelector('.dice');
const tirai = document.querySelector("#tirai");
tirai.style.display = "none";

const diceSound = new Audio("./assets/gulir.mp3");




const randomDice = () => {
  const random = Math.floor(Math.random() * 10);
  
  
  if(random >= 1 && random <= 6)
  {
    rollDice(random);
  }
  else {
    randomDice();
  }
}

const rollDice = random => {
  dice.style.animation = "rolling 2s linear";
  tirai.style.display = "block";
  diceSound.play();
  
  setTimeout(()=>{
    switch (random) {
      case 1 :
        dice.style.transform = "rotateX(0deg) rotateY(0deg)";
        console.log(1)
        autoGulir(1);
        break;
      case 3 :
        dice.style.transform = "rotateX(0deg) rotateY(90deg)";
        console.log(3)
        autoGulir(3);
        break;
      case 4 :
        dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
        console.log(4)
        autoGulir(4);
        break;
      case 6 :
        dice.style.transform = "rotateX(180deg) rotateY(0deg)";
        console.log(6)
        autoGulir(6);
        break;
      case 2 :
        dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
        console.log(2)
        autoGulir(2);
        break;
      case 5 :
        dice.style.transform = "rotateX(90deg) rotateY(0deg)";
        console.log(5)
        autoGulir(5);
        break;
      default :
      
        break;
    }
    
    dice.style.animation = "none";
    tirai.style.display = "none";
    if(diceSound.play()){
      diceSound.load()
    }
  }, 2100);
}
console.log(dice)
dice.addEventListener("click", randomDice);
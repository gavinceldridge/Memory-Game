const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let lastClicked = null;
let canClick = true;
let matches = 0;
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  if(lastClicked === null && canClick){//first guess
    event.target.style.background = event.target.classList[0];
    lastClicked = event.target;
  }else if(lastClicked === event.target){//same card clicked twice
    event.target.style.background = "white";
    lastClicked = null;
  }else if(lastClicked.classList[0] === event.target.classList[0] && canClick){//match
      matches++;
      event.target.style.background = event.target.classList[0];
      lastClicked = null;

      if(matches === 5){//win
        setTimeout(function(){
          alert("Congrats, you won!");
          setTimeout(function(){
            location.reload();
          }, 1000);
        }, 100);
      }
  }else if(canClick){//miss
      console.log(`The last color was ${lastClicked.classList[0]}`);
      canClick = false;
      event.target.style.background = event.target.classList[0];
      setTimeout(function(){
        canClick = true;
        lastClicked.style.background = "white";
        event.target.style.background = "white";
        lastClicked = null;
      }, 1000);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
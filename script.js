"use strict";

// Variables Declartion

let number = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;
let win = false;
let darkMode = true;

console.log(number);

// Main Function

function changeText(className, text) {
  document.querySelector(className).textContent = text;
}

function changeStyle(className, property, propertyValue) {
  document.querySelector(className).style[property] = propertyValue;
}

function changeVariable(varName, varValue) {
  document.querySelector(":root").style.setProperty(varName, varValue);
}

// Click Events

// Check Event

document.querySelector(".check").addEventListener("click", function () {
  if (score > 0 && !win) {
    let value = document.querySelector(".guess").value;
    if (value > 20 || value < 1 || Math.ceil(value) != value) {
      changeText(".message", "Invalid Number!");
      changeStyle(".message", "color", "#E4000F");
    } else {
      changeStyle(".message", "color", "inherit");
      if (value == number) {
        changeText(".message", "Correct Number!");
        changeText(".display", number);
        win = true;
        document.querySelector(".guess").disabled = true;
        changeStyle("body", "backgroundColor", "#60B347");

        if (score > highScore) {
          highScore = score;
          changeText(".highscore", highScore);
        }
      } else {
        score = score - 1;
        changeText(".score", score);

        if (score == 0) {
          changeText(".message", "GAME OVER");
          document.querySelector(".guess").disabled = true;
          changeStyle(".message", "color", "#E4000F");
        } else {
          document.querySelector(".guess").value = "";
          if (value > number) {
            if (value - number <= 3) {
              changeText(".message", "📈 High!");
            } else {
              changeText(".message", "📈 Too High!");
            }
          } else {
            if (number - value <= 3) {
              changeText(".message", "📉 Low!");
            } else {
              changeText(".message", "📉 Too Low!");
            }
          }
        }
      }
    }
  }
});

// Play Again Event

document.querySelector(".again").addEventListener("click", function () {
  changeStyle("body", "backgroundColor", "var(--background)");
  changeStyle(".message", "color", "inherit");
  number = Math.trunc(Math.random() * 20 + 1);
  score = 20;
  win = false;
  document.querySelector(".guess").disabled = false;
  changeText(".message", "Start guessin...");
  changeText(".score", score);
  changeText(".display", "?");
  console.log(number);
});

// Dark Mode Event

document.querySelector(".dark").addEventListener("click", function () {
  if (darkMode) {
    darkMode = false;
    changeVariable("--background", "#eee");
    changeVariable("--text-color", "#222");
    changeStyle(".dark", "background-image", `url("img/moon.png")`);
  } else {
    darkMode = true;
    changeVariable("--background", "#222");
    changeVariable("--text-color", "#eee");
    changeStyle(".dark", "background-image", `url("img/sun.png")`);
  }
});

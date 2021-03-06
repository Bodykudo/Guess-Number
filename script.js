"use strict";

// Variables Declartion

let number = Math.trunc(Math.random() * 20 + 1);
let score = 10;
let highScore = 0;
let win = false;
let darkMode = true;
const enterdNumbers = new Set();

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

// Check Event

document.querySelector(".check").addEventListener("click", function () {
  if (score > 0 && !win) {
    let value = Number(document.querySelector(".guess").value);
    if (value > 20 || value < 1 || Math.ceil(value) != value) {
      changeText(".message", "Invalid Number!");
      changeStyle(".message", "color", "#E4000F");
    } else if (enterdNumbers.has(value)) {
      changeText(".message", `You've already entered this number!`);
      changeStyle(".message", "color", "#E4000F");
    } else {
      changeStyle(".message", "color", "inherit");
      if (value == number) {
        changeText(".message", "Correct Number!");
        changeText(".display", number);
        win = true;
        document.querySelector(".guess").disabled = true;
        changeStyle("html", "backgroundColor", "#60B347");
        changeStyle("body", "backgroundColor", "#60B347");

        if (score > highScore) {
          highScore = score;
          changeText(".highscore", highScore);
        }
      } else {
        score--;
        changeText(".score", score);
        enterdNumbers.add(value);

        if (score == 0) {
          changeText(".message", "GAME OVER");
          document.querySelector(".guess").disabled = true;
          changeStyle(".message", "color", "#E4000F");
        } else {
          document.querySelector(".guess").value = "";
          if (value > number) {
            if (value - number <= 3) {
              changeText(".message", "???? High!");
            } else {
              changeText(".message", "???? Too High!");
            }
          } else {
            if (number - value <= 3) {
              changeText(".message", "???? Low!");
            } else {
              changeText(".message", "???? Too Low!");
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
  changeStyle("html", "backgroundColor", "var(--background)");
  changeStyle(".message", "color", "inherit");
  number = Math.trunc(Math.random() * 20 + 1);
  score = 10;
  win = false;
  enterdNumbers.clear();
  document.querySelector(".guess").disabled = false;
  changeText(".message", "Start guessing...");
  changeText(".score", score);
  changeText(".display", "?");
  console.log(number);
  document.querySelector(".guess").value = "";
});

// Dark Mode Event

document.querySelector(".dark").addEventListener("click", function () {
  if (darkMode) {
    darkMode = false;
    changeVariable("--background", "#eee");
    changeVariable("--text-color", "#222");
    document.querySelector(".dark").classList.remove("fa-sun");
    document.querySelector(".dark").classList.add("fa-moon");
  } else {
    darkMode = true;
    changeVariable("--background", "#222");
    changeVariable("--text-color", "#eee");
    document.querySelector(".dark").classList.remove("fa-moon");
    document.querySelector(".dark").classList.add("fa-sun");
  }
});

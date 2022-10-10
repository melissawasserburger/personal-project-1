// TODO: correctly change guest name after form submission
let guestName;
// these are text options the char on screen will display
const dialogOptions = new Array(
  "Oh, hello there! Who might you be?",
  `Welcome, ${guestName}! It's good to have you here. What brings you to my site today?`,
  "Sure! My name is Melissa, and I'm a junior software developer.",
  "I like challenging myself with new coding projects, playing tennis, and visiting new places.",
  "I would love to tell you more, so check out this 'About' page.",
  "You can also see some of my projects or get in touch with me here.",
  "See you around.",
  "Click here to see my contact information.",
  "That would be awesome! I'm really proud of the projects I've worked on.",
  "Head to the 'Projects' page to see some of my best!",
  "You can hang out here as long as you'd like.",
  "There are some places to go up here if you get bored."
);
// these variables control how the text is "typed" out/if it will be skipped
/*
TODO: increase type speed
TODO: apply/remove skip option efficiently
TODO: all instances of setTimeout should be controlled by a variable --> if skipped, should show div instantly
*/
let textPosition = 0;
let option = 10;
const optionLen = dialogOptions[option].length;
let skipped = false;
const speed = 100;

// clicking "start" begins the start sequence
const welcomeBtn = document.getElementById("welcome-btn");
welcomeBtn.addEventListener("click", (e) => {
  welcomeBtn.style.display = "none";
  const character = document.getElementById("character");
  character.style.display = "block";
  character.style.animation = "move-right 4s linear forwards";
  startSequence();
});

// fn added as event listener to window to skip dialog
// event listener will be removed as a result of clicking
function skipDialog() {
    skipped = true;
    textPosition = optionLen - 1; // will activate } else { clause in typeDialog()
  }

function startSequence() {
  const dialog = document.getElementById("dialog");
  const dialogBubbleOne = document.getElementById("dialog-bubble-1");
  const dialogBubbleTwo = document.getElementById("dialog-bubble-2");
  const formEntry = document.getElementById("form-entry");
  setTimeout(() => {
    dialogBubbleTwo.style.display = "block";
  }, 4500);
  setTimeout(() => {
    dialogBubbleOne.style.display = "block";
  }, 4800);
  setTimeout(() => {
    dialog.style.display = "flex";
  }, 5000);
  setTimeout(() => {
    window.addEventListener("click", skipDialog);
    option = 0;
    typeDialog();
  }, 5000);
  setTimeout(() => {
    formEntry.style.display = "flex";
  }, 9500);

}

// event listener automatically removed, regardless if activated
//! adding window.addEventListener() at beginning of fn doesn't work due to recursion
function typeDialog() {
  const dialogText = document.getElementById("dialog-text");
  const skip = document.getElementById("click-to-skip");

  skip.style.display = "block";
  dialogText.innerHTML =
    dialogOptions[option].substring(0, textPosition) +
    "<span id='typewriter'>_</span>";

  if (textPosition++ != optionLen) {
    setTimeout(typeDialog, speed);
  } else {
    textPosition = 0;
    skip.style.display = "none";
    window.removeEventListener("click", skipDialog);
  }
 
}

const nameForm = document.getElementById("name-prompt");
const responseForm = document.getElementById("response-prompt");
nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
   // const formData = new FormData(e.target);
    e.target.style.display = "none";
    //guestName = formData.get("name");

    // event listener to skip dialog added again
    window.addEventListener("click", skipDialog);
    option = 1;
    typeDialog();
    nameForm.style.display = "none";
    setTimeout(() => {
        responseForm.style.display = "flex"
    }, 9000)
});

// currently, window event listener only added for first dialog message
responseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const response = document.getElementById("response");
    e.target.style.display = "none";
    switch (response.value) {
        case "about":
            window.addEventListener("click", skipDialog);
            option = 2;
            typeDialog();
            setTimeout(() => {
                option = 3;
                typeDialog();
            }, 7000);
            setTimeout(() => {
                window.addEventListener("click", skipDialog);
                option = 4;
                typeDialog();
            }, 18000);
            setTimeout(() => {
                window.addEventListener("click", skipDialog);
                option = 5;
                typeDialog();
            }, 26000);
            break;
        case "contact":
            window.addEventListener("click", skipDialog);
            option = 7;
            typeDialog();
            break;
        case "projects":
            window.addEventListener("click", skipDialog);
            option = 8;
            typeDialog();
            setTimeout(() => {
                option = 9;
                typeDialog();
            }, 9000)
            break;
        case "other":
            window.addEventListener("click", skipDialog);
            option = 10;
            typeDialog();
            setTimeout(() => {
                option = 11;
                typeDialog();
            }, 6000)
            break;
        default:
            option = 10;
            typeDialog();
    }
})

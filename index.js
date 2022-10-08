let guestName;
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
let textPosition = 0;
let option;
const speed = 100;

const welcomeBtn = document.getElementById("welcome-btn");
welcomeBtn.addEventListener("click", (e) => {
  welcomeBtn.style.display = "none";
  const character = document.getElementById("character");
  character.style.display = "block";
  character.style.animation = "move-right 4s linear forwards";
  startSequence();
});

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
    option = 0;
    typeDialog();
  }, 5000);
  setTimeout(() => {
    formEntry.style.display = "flex";
  }, 9500)
}

function typeDialog() {
  const dialogText = document.getElementById("dialog-text");
  const optionLen = dialogOptions[option].length;

  dialogText.innerHTML =
    dialogOptions[option].substring(0, textPosition) +
    "<span id='typewriter'>_</span>";

  if (textPosition++ != optionLen) {
    setTimeout(typeDialog, speed);
  }
}

const nameForm = document.getElementById("name-prompt");
const responseForm = document.getElementById("response-prompt");
nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    e.target.style.display = "none";
    textPosition = 0;
    guestName = formData.get("name");
    option = 1;
    typeDialog();
    nameForm.style.display = "none";
    setTimeout(() => {
        responseForm.style.display = "flex"
    }, 9000)
});

responseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const response = document.getElementById("response");
    console.log(response.value);
})

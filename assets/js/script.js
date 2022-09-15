// declaring all UI buttons as variables
const generateBtn = document.querySelector("#generate");
const confirmGenerate = document.querySelector("#submit");

const lengthButton_1 = document.querySelector("#length-option-1");
const lengthButton_2 = document.querySelector("#length-option-2");

const characterType_1 = document.querySelector("#character-option-1");
const characterType_2 = document.querySelector("#character-option-2");
const characterType_3 = document.querySelector("#character-option-3");
const characterType_4 = document.querySelector("#character-option-4");

const closeWindow = document.querySelector(".close-window");

// managing the states of prompt window and selection windows
let promptWindowIsOpen = false;
let showLengthSelection = false;
let showCharacterSelection = false;

// creating password criteria object
let criteria = {
  length: "",
  characterArray: [],
};

// create a function for opening up the prompt window when the 'generate password' button is clicked
function openPromptWindow() {
  document.querySelector(".prompt-window").style.display = "block"; // showing prompt window
  document.querySelector("#user-input-1").style.display = "block"; // showing password length selection window
  document.querySelector("#user-input-2").style.display = "none"; // character type selection window is not shown untill a length selection is made

  promptWindowIsOpen = true;
  showLengthSelection = true;
  showCharacterSelection = false;
}

function openCharacterSelection() {
  document.querySelector("#user-input-1").style.display = "none"; // when character type selection windown is opened, hide length selection window
  document.querySelector("#user-input-2").style.display = "block";

  showLengthSelection = false;
  showCharacterSelection = true;
}

// when a password is generated or the closeWindow button is clicked, the prompt window will close
function closePromptWindow() {
  document.querySelector("#user-input-1").style.display = "none";
  document.querySelector("#user-input-2").style.display = "none";
  document.querySelector(".prompt-window").style.display = "none";

  // needs to clear everything in the object to start over
  criteria.length = "";
  criteria.characterArray = [];

  promptWindowIsOpen = false;
  showCharacterSelection = false;
  showLengthSelection = false;
}

// function responsible for the algorithm of password generation
function generatePassword(passwordLength, characterTypes) {
  // takes in two parameters
  let characterString = characterTypes.join(""); // need to convert the characterArray to string.
  let totalNumberOfCharacters = characterString.length; //find out how many characters are in the characterString.
  let passwordArray = []; //randomly generated password is first stored in an Array
  let passwordString = ""; //the password array is then converted into a string

  if (characterString.length !== 0 && passwordLength === "6 to 12") {
    let length = Math.floor(Math.random() * (13 - 6) + 6); //generate a random integer between 6 - 12

    for (let i = 0; i < length; i++) {
      let randomArrayIndex = Math.floor(
        Math.random() * (totalNumberOfCharacters - 0) + 0 // this ensures the range of random integer will be between 1 and the total number of characters available
      ); //choosing a random character from the characterArray
      passwordArray.push(characterString.charAt(randomArrayIndex)); // pushing the character into an Array one at a time.
    }
  } else if (characterString.length !== 0 && passwordLength === "8 to 128") {
    let length = Math.floor(Math.random() * (129 - 8) + 8); //generate a random integer between 6 - 12

    for (let i = 0; i < length; i++) {
      let randomArrayIndex = Math.floor(
        Math.random() * (totalNumberOfCharacters - 0) + 0
      ); //choosing a random character from the characterArray
      passwordArray.push(characterString.charAt(randomArrayIndex));
    }
  } else {
    window.prompt("Must select at least 1 character type!"); // user will be alerted when none of the character type is selected.
  }

  passwordString = passwordArray.join(""); // convert the password array into a string, ready to return.

  return passwordString;
}

// Write password to the #password input
function writePassword() {
  const password = generatePassword(criteria.length, criteria.characterArray); // passing the length and characterArray properties of the criteria object as parameters
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

  closePromptWindow(); // after everything is done, close prompt window.

  // Enable all buttons again.
  characterType_1.disabled = false;
  characterType_2.disabled = false;
  characterType_3.disabled = false;
  characterType_4.disabled = false;
}

// Add event listener to generate button
generateBtn.addEventListener("click", openPromptWindow);

lengthButton_1.addEventListener("click", function () {
  // when the UI "6 to 12" button is selected
  criteria.length = "6 to 12";
  openCharacterSelection(); // jumps to the next character type selection window
});

lengthButton_2.addEventListener("click", function () {
  criteria.length = "8 to 128";
  openCharacterSelection();
});

characterType_1.addEventListener("click", function () {
  // when the UI "UPPERCASE LETTER" button is selected
  criteria.characterArray.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ"); // add this string containing only uppercase letters to characterArray.
  characterType_1.disabled = true; // disable the button after it is selected to avoid repeatedly adding the same string.
});

characterType_2.addEventListener("click", function () {
  criteria.characterArray.push("abcdefghijklmnopqrstuvwxyz");
  characterType_2.disabled = true; // disable the button after it is selected to avoid repeatedly adding the same string.
});

characterType_3.addEventListener("click", function () {
  criteria.characterArray.push("0123456789");
  characterType_3.disabled = true; // disable the button after it is selected to avoid repeatedly adding the same string.
});

characterType_4.addEventListener("click", function () {
  criteria.characterArray.push("!#$%^&*:<>@~");
  characterType_4.disabled = true; // disable the button after it is selected to avoid repeatedly adding the same string.
});

closeWindow.addEventListener("click", closePromptWindow); // user can also close the prompt window before generating the password

confirmGenerate.addEventListener("click", writePassword); // generate the password

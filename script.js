let currentStep = 1;
let yesButtonSize = 1;

// Move to the next question
function nextQuestion(isYes) {
  const currentQuestion = document.getElementById(`question${currentStep}`);
  let errorMessage = "";

  if (currentStep === 1 && isYes === false) {
    alert("Maybe next time! 😢");
    return;
  }

  // Handle transition page after the first card
  if (currentStep === 1) {
    const audio = document.getElementById("backgroundAudio");
    audio.volume = 0.2
    audio.play(); // Play the audio
    document.getElementById(`question${currentStep}`).classList.add("hidden");
    currentStep++; // Advance to the transition page
    document.getElementById(`question2-transition`).classList.remove("hidden");

    // Automatically proceed to the next question after a delay
    setTimeout(() => {
      document.getElementById("question2-transition").classList.add("hidden");
      document
        .getElementById(`question${currentStep}`)
        .classList.remove("hidden");
    }, 5000); // 3-second delay before moving to the next page
    return;
  }

  // Validation for each step
  if (currentStep === 3 && !selectedActivity) {
    errorMessage = "we're not even cuddling? :(";
  }

  if (currentStep === 4 && !selectedFood) {
    errorMessage = "that's it... empty-bellied";
  }

  if (currentStep === 5 && !selectedDessert) {
    errorMessage = "bb, you have to choose ONE";
  }

  if (errorMessage) {
    showInlineError(currentQuestion, errorMessage);
    return; // Stops progress if there’s an error
  }

  hideInlineError(currentQuestion); // Hide any previous errors
  currentQuestion.classList.add("hidden");
  currentStep++;
  document.getElementById(`question${currentStep}`).classList.remove("hidden");

}

// Go back to the previous question
function prevQuestion() {
  document.getElementById(`question${currentStep}`).classList.add("hidden");
  currentStep--;

  // Reset the Yes button size if backtracking to the first card
  if (currentStep === 1) {
    const yesButton = document.getElementById("yesButton");
    yesButton.style.transform = "scale(1)"; // Reset size to default
  }

  document.getElementById(`question${currentStep}`).classList.remove("hidden");
}

// Make the Yes button bigger when No is clicked
function makeYesBigger() {
  yesButtonSize += 0.2;
  const yesButton = document.getElementById("yesButton");
  yesButton.style.transform = `scale(${yesButtonSize})`;
}

function validateDate() {
  const dateInput = document.getElementById("date").value;
  const requiredDate = "2025-02-14"; // Required date
  const dateError = document.getElementById("date-error");

  if (dateInput !== requiredDate) {
    dateError.textContent = "silly goose, valentine's isn't on that day";
    dateError.classList.add("show-error");
    return;
  }

  dateError.textContent = ""; // Clear error message
  dateError.classList.remove("show-error");
  nextQuestion(); // Proceed only if the date is correct
}

function showInlineError(questionElement, message) {
  let errorSpan = questionElement.querySelector(".error-message");
  
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message", "show-error");
    questionElement.appendChild(errorSpan);
  }

  errorSpan.textContent = message;
}

function hideInlineError(questionElement) {
  const errorSpan = questionElement.querySelector(".error-message");
  if (errorSpan) {
    errorSpan.textContent = "";
    errorSpan.classList.remove("show-error");
  }
}


// Show the summary
function showSummary() {
  const date = document.getElementById("date").value;

  // Dynamically generate the summary HTML
  const summaryHTML = `
      <h2>sounds good! love ya bb 💕</h2>
      <p><strong>date:</strong> ${date}</p>
      <div class="summary-item">
        <img src="${getActivityImage(
          selectedActivity
        )}" alt="${selectedActivity}">
        <p><strong>for the day: </strong> ${selectedActivity}</p>
      </div>
      <div class="summary-item">
        <img src="${getFoodImage(selectedFood)}" alt="${selectedFood}">
        <p><strong>for the tummy: </strong> ${selectedFood}</p>
      </div>
      <div class="summary-item">
        <img src="images/ant.gif" alt="${selectedDessert}">
        <p><strong>for the night: </strong> me</p>
      </div>
    `;
// Show teaser screen
const teaserScreen = document.getElementById("teaser-screen");
teaserScreen.classList.add("teaser-visible");

// Hide teaser and show summary after 0.5 seconds
setTimeout(() => {
  teaserScreen.classList.remove("teaser-visible");
  document.getElementById("summaryText").innerHTML = summaryHTML;
  document.getElementById(`question${currentStep}`).classList.add("hidden");
  document.getElementById("summary").classList.remove("hidden");
}, 3300); // 500ms delay before switching to summary
}

// Helper functions to map selections to images
function getActivityImage(activity) {
  console.log("Activity:", activity);
  switch (activity) {
    case "cuddle in bed":
      return "images/bed.jpg";
    case "jb":
      return "images/jb.jpg";
    case "magic puzzle":
      return "images/puzzle.jpg";
    case "mystery golf":
      return "images/kulnari.png";
    default:
      return "images/ant.gif"; // Fallback image
  }
}

function getFoodImage(food) {
  switch (food) {
    case "pasta":
      return "images/rvlt.jpg";
    case "korean":
      return "images/umyongbaek.jpg";
    case "japanese":
      return "images/senryo.jpg";
    case "hotpot":
      return "images/guofuhotpot.jpg";
    default:
      return "images/ant.gif"; // Fallback image
  }
}

function getDessertImage(dessert) {
  switch (dessert) {
    case "Ice Cream":
      return "ice-cream.jpg";
    case "Cake":
      return "cake.jpg";
    case "Chocolates":
      return "chocolates.jpg";
    case "Cookies":
      return "cookies.jpg";
    default:
      return "default-dessert.jpg"; // Fallback image
  }
}

let selectedFood = ""; // Variable to store the selected food
let selectedActivity = ""; // Variable to store the selected activity
let selectedDessert = ""; // Variable to store the selected dessert

function selectFood(food) {
  selectedFood = food; // Save the selected food place

  // Remove 'selected' class from all options
  const options = document.querySelectorAll(".food-option");
  options.forEach((option) => option.classList.remove("selected"));

  // Add 'selected' class to the clicked option
  event.currentTarget.classList.add("selected");
}

function selectActivity(activity) {
  selectedActivity = activity; // Save the selected activity

  // Remove 'selected' class from all options
  const options = document.querySelectorAll(".activity-option");
  options.forEach((option) => option.classList.remove("selected"));

  // Add 'selected' class to the clicked option
  event.currentTarget.classList.add("selected");
}

function selectDessert(dessert) {
  selectedDessert = dessert; // Save the selected dessert

  // Remove 'selected' class from all options
  const options = document.querySelectorAll(".dessert-option");
  options.forEach((option) => option.classList.remove("selected"));

  // Add 'selected' class to the clicked option
  event.currentTarget.classList.add("selected");
}

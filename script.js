let currentStep = 1;
let yesButtonSize = 1;

// Move to the next question
function nextQuestion(isYes) {
  if (currentStep === 1 && isYes === false) {
    alert("Maybe next time! 😢");
    return;
  }

  // Handle transition page after the first card
  if (currentStep === 1) {
    const audio = document.getElementById("backgroundAudio");
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

  // Hide the current question and show the next
  document.getElementById(`question${currentStep}`).classList.add("hidden");
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

// Show the summary
function showSummary() {
  const date = document.getElementById("date").value;

  // Dynamically generate the summary HTML
  const summaryHTML = `
      <h2>can't wait! love ya bb 💕</h2>
      <p><strong>Date:</strong> ${date}</p>
      <div class="summary-item">
        <img src="${getActivityImage(
          selectedActivity
        )}" alt="${selectedActivity}">
        <p><strong>Activity:</strong> ${selectedActivity}</p>
      </div>
      <div class="summary-item">
        <img src="${getFoodImage(selectedFood)}" alt="${selectedFood}">
        <p><strong>Food:</strong> ${selectedFood}</p>
      </div>
      <div class="summary-item">
        <img src="${getDessertImage(selectedDessert)}" alt="${selectedDessert}">
        <p><strong>Dessert:</strong> ${selectedDessert}</p>
      </div>
    `;

  document.getElementById("summaryText").innerHTML = summaryHTML;

  // Hide the current question and show the summary
  document.getElementById(`question${currentStep}`).classList.add("hidden");
  document.getElementById("summary").classList.remove("hidden");
}

// Helper functions to map selections to images
function getActivityImage(activity) {
  switch (activity) {
    case "cuddle in bed until lunch":
      return "/images/bed.jpg";
    case "Movie Night":
      return "movie-night.jpg";
    case "Picnic":
      return "picnic.jpg";
    case "Romantic Walk":
      return "romantic-walk.jpg";
    default:
      return "default-activity.jpg"; // Fallback image
  }
}

function getFoodImage(food) {
  switch (food) {
    case "Italian Bistro":
      return "italian-bistro.jpg";
    case "Sushi Paradise":
      return "sushi-paradise.jpg";
    case "Steakhouse Delight":
      return "steakhouse-delight.jpg";
    case "Vegan Garden":
      return "vegan-garden.jpg";
    default:
      return "default-food.jpg"; // Fallback image
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

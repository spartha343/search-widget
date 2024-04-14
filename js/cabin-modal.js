// Function to show the modal
function showPassengerModal() {
  document.getElementById("passengerModal").classList.remove("hidden");
}

// Function to hide the modal
function hidePassengerModal() {
  document.getElementById("passengerModal").classList.add("hidden");
}

// Event listener for 'tc' input field to show the modal
document.getElementById("tc").addEventListener("click", function (event) {
  event.stopPropagation(); // Prevents the click event from bubbling up to the document
  showPassengerModal();
});

// Event listener for clicks on the document body to hide the modal
document.body.addEventListener("click", function (event) {
  // Check if the click occurred outside the modal
  if (!event.target.closest("#passengerModal")) {
    hidePassengerModal();
  }
});

// Function to handle passenger count
function updatePassengerCount(type, action) {
  let countElement;
  if (type === "adults") {
    countElement = document.getElementById("adultsCount");
  } else if (type === "children") {
    countElement = document.getElementById("childrenCount");
  }
  let count = parseInt(countElement.textContent);

  // Prevent decrementing below 1 for adults
  if (type === "adults" && action === "decrement" && count === 1) {
    return; // Do nothing if count is already 1
  }

  if (action === "increment") {
    count++;
  } else if (action === "decrement" && count > 0) {
    count--;
  }
  countElement.textContent = count;
}

// Event listener for the "Apply" button inside the modal
document.getElementById("applyButton").addEventListener("click", function () {
  hidePassengerModal();

  // Get the number of adults and children from the modal
  const adultsCount = parseInt(
    document.getElementById("adultsCount").textContent
  );
  const childrenCount = parseInt(
    document.getElementById("childrenCount").textContent
  );

  // Set the value of the 'tc' input field
  document.getElementById(
    "tc"
  ).value = `${adultsCount} Adult, ${childrenCount} Children`;
});

// Event listeners for passenger buttons
document.body.addEventListener("click", function (event) {
  if (event.target.matches("#adultsMinusBtn")) {
    updatePassengerCount("adults", "decrement");
  } else if (event.target.matches("#adultsPlusBtn")) {
    updatePassengerCount("adults", "increment");
  } else if (event.target.matches("#childrenMinusBtn")) {
    updatePassengerCount("children", "decrement");
  } else if (event.target.matches("#childrenPlusBtn")) {
    updatePassengerCount("children", "increment");
  }
});

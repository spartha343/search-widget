const cityData = [
  { city: "Brisbane", code: "BNE", country: "Australia" },
  { city: "Bali (Denpasar)", code: "DPS", country: "Indonesia" },
  { city: "Barcelona", code: "BCN", country: "Spain" },
  { city: "Bangkok Suvarnabhumi", code: "BKK", country: "Thailand" },
  { city: "Berlin Brandenburg", code: "BER", country: "Germany" },
  { city: "Budapest", code: "BUD", country: "Hungary" },
  { city: "Cairns", code: "CNS", country: "Australia" },
  { city: "Copenhagen", code: "CPH", country: "Denmark" },
  { city: "Cairo", code: "CAI", country: "Egypt" }
];

function showSuggestions(value, id, oppositeInputValue) {
  const suggestionsList = document.getElementById(id);
  suggestionsList.innerHTML = ""; // Clear previous suggestions

  if (value.length >= 0) {
    const filteredCities = cityData.filter(
      (city) =>
        (city.city.toLowerCase().includes(value.toLowerCase()) ||
          city.country.toLowerCase().includes(value.toLowerCase())) &&
        city.city.toLowerCase() !== oppositeInputValue.toLowerCase() // Filter out the city selected in the opposite input
    );

    if (filteredCities.length > 0) {
      suggestionsList.classList.remove("hidden");
      filteredCities.forEach((city) => {
        const suggestionItem = document.createElement("li");
        suggestionItem.innerHTML = `
        <div class='flex items-center'>
        <i class="fa-solid fa-plane-departure"></i>
        <div class='ml-3'>
          <h3 class='font-semibold'>${city.city}, ${city.code}</h3>
          <p>${city.country}</p>
        </div>
        </div>
        `;
        suggestionItem.onclick = () => {
          document.getElementById(id.slice(0, -12)).value = city.city;
          suggestionsList.classList.add("hidden");
        };
        suggestionsList.appendChild(suggestionItem);
      });
    } else {
      suggestionsList.classList.add("hidden");
    }
  } else {
    suggestionsList.classList.add("hidden");
  }
}

document.getElementById("from").addEventListener("focus", function () {
  const toValue = document.getElementById("to").value;
  showSuggestions(this.value, "from-suggestions", toValue);
});

document.getElementById("to").addEventListener("focus", function () {
  const fromValue = document.getElementById("from").value;
  showSuggestions(this.value, "to-suggestions", fromValue);
});

document.addEventListener("click", function (event) {
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");
  const fromSuggestions = document.getElementById("from-suggestions");
  const toSuggestions = document.getElementById("to-suggestions");

  // Check if the clicked element is not the "from" input field or its suggestions box
  if (event.target !== fromInput && event.target !== fromSuggestions) {
    fromSuggestions.classList.add("hidden"); // Hide the suggestions box
  }

  // Check if the clicked element is not the "to" input field or its suggestions box
  if (event.target !== toInput && event.target !== toSuggestions) {
    toSuggestions.classList.add("hidden"); // Hide the suggestions box
  }
});

function swapInputs() {
  const fromValue = document.getElementById("from").value;
  const toValue = document.getElementById("to").value;
  document.getElementById("from").value = toValue;
  document.getElementById("to").value = fromValue;

  // Clear any existing suggestions
  document.getElementById("from-suggestions").classList.add("hidden");
  document.getElementById("to-suggestions").classList.add("hidden");
}

flatpickr(".date-input", {
  showMonths: 2,
  mode: "range",
  minDate: "today",
  onChange: function (selectedDates, dateStr, instance) {
    // When selecting dates in any input field
    if (
      selectedDates.length === 1 ||
      selectedDates[0].toDateString() === selectedDates[1].toDateString()
    ) {
      // If only one date is selected, set it as the depart date
      document.getElementById("depart").value = dateStr;
      document.getElementById("return").value = ""; // Reset the return date
    } else if (selectedDates.length === 2) {
      // If two dates are selected, set the first one as depart date and the second one as return date
      document.getElementById("depart").value = instance.formatDate(
        selectedDates[0],
        "Y-m-d"
      );
      document.getElementById("return").value = instance.formatDate(
        selectedDates[1],
        "Y-m-d"
      );
    }
  }
});

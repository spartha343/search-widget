// Function to open the modal
function openModal() {
  const modal = document.getElementById("searchModal");
  modal.classList.remove("hidden");
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("searchModal");
  modal.classList.add("hidden");
}

// Add event listener to the search button
document
  .querySelector('input[type="submit"]')
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const fromValue = document.getElementById("from").value;
    const toValue = document.getElementById("to").value;
    const departValue = document.getElementById("depart").value;
    const returnValue = document.getElementById("return").value;
    const tcValue = document.getElementById("tc").value;
    const addNearByAirportsFrom = document.getElementById(
      "addNearByAirportsFrom"
    ).checked;
    const addNearByAirportsTo = document.getElementById(
      "addNearByAirportsTo"
    ).checked;
    const directFlights = document.getElementById("directFlights").checked;

    const searchConfigurations = {
      from: fromValue,
      to: toValue,
      depart: departValue,
      return: returnValue,
      travellersAndCabinClass: tcValue,
      addNearbyAirportsFrom: addNearByAirportsFrom,
      addNearbyAirportsTo: addNearByAirportsTo,
      directFlights: directFlights
    };

    const formattedConfigurations = JSON.stringify(
      searchConfigurations,
      null,
      2
    ); // Format as JSON object with 2 spaces indentation

    document.getElementById("searchConfigurations").textContent =
      formattedConfigurations;
    openModal();
  });

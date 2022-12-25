let weekDates = [];
let weekDays = [];

/**
 *  It will create a list of coming five working days in a format.
 *  @returns nothing
 */
function getTheWeekDates() {
  let todayDate = new Date();
  let firstDate = todayDate.getDate();
  let month = todayDate.getMonth();
  let year = todayDate.getFullYear();
  let currentDay = todayDate.getDay();

  if (todayDate.getHours() < 9) {
    weekDates.push(firstDate + "-" + (month + 1) + "-" + year);
    weekDays.push(currentDay);
  }

  for (iterator = firstDate + 1; ; ) {
    x = new Date(todayDate.setDate(iterator));

    if (x.getDay() != 0 && x.getDay() != 6) {
      weekDays.push(x.getDay());
      let dateoftheday = iterator + "-" + (month + 1) + "-" + year;
      weekDates.push(dateoftheday);
    }
    iterator++;
    if (currentDay == x.getDay()) break;
  }
}

/**
 * It will update the weekDays array with the respective week day value in words.
 *  @returns nothing
 */
function weekDayInwords() {
  for (iterator = 0; iterator <= 4; iterator++) {
    weekDays[iterator] =
      weekDays[iterator] == 0
        ? "Sunday"
        : weekDays[iterator] == 1
        ? "Monday"
        : weekDays[iterator] == 2
        ? "Tuesday"
        : weekDays[iterator] == 3
        ? "Wednesday"
        : weekDays[iterator] == 4
        ? "Thursday"
        : weekDays[iterator] == 5
        ? "Friday"
        : weekDays[iterator] == 6
        ? "Saturday"
        : "None";
  }
}
// reference where the preference form is appended. 
let preferenceArea = document.getElementById("foodform");

/**
 *  It creates the food preference form update the form with the respective division
 * in user dashboard.
 *  @returns nothing
 */
function createFoodpreferenceForm() {
  let division = document.createElement("div");
  division.setAttribute("class", "preferenceform");
  let form = document.createElement("form");
  form.setAttribute("class", "formdata");
  form.onsubmit = function () {
    return false;
  };
  form.id = "form";
  let dateCell = document.createElement("select");
  let foodpreferenceCell = document.createElement("p");
  let foodcategoryCell = document.createElement("p");
  let savebuttonCell = document.createElement("p");
  let image = document.createElement("img");
  dateCell.id = "date";
  dateCell.setAttribute("class", "date-style");
  createDateList(dateCell);
  createFoodpreferenceDropdown(foodpreferenceCell);
  createFoodcategoryDropdown(foodcategoryCell);
  createSavebutton(savebuttonCell);
  image.src = "assests/tick.png";
  form.appendChild(dateCell);
  form.appendChild(foodpreferenceCell);
  form.appendChild(foodcategoryCell);
  form.appendChild(savebuttonCell);
  division.appendChild(form);
  let tickImage = document.createElement("img");
  tickImage.src = "assests/tick.png";
  tickImage.setAttribute("class", "tick-img");
  tickImage.id = "image";
  division.appendChild(tickImage);
  preferenceArea.appendChild(division);
}

/**
 * It creates a dropdown for to get food preference as yes or no and append to the form.
 * @param {reference} foodpreferenceCell 
 *  @returns nothing
 */
function createFoodpreferenceDropdown(foodpreferenceCell) {
  var selectList = document.createElement("select");
  var option3 = document.createElement("option");
  option3.text = "None";
  selectList.appendChild(option3);
  var option1 = document.createElement("option");
  option1.text = "Yes";
  selectList.appendChild(option1);
  var option2 = document.createElement("option");
  option2.text = "No";
  selectList.appendChild(option2);
  selectList.setAttribute("class", "food-dropdown");
  selectList.id = "food-preference";
  selectList.setAttribute("required", "");
  foodpreferenceCell.appendChild(selectList);
}

/**
 * It creates a dropdown for to get food category as veg or non-veg and append to the form.
 * @param {reference} foodcategoryCell 
 *  @returns nothing
 */

function createFoodcategoryDropdown(foodcategoryCell) {
  var selectList = document.createElement("select");
  var option4 = document.createElement("option");
  option4.text = "None";
  selectList.appendChild(option4);
  var option1 = document.createElement("option");
  option1.text = "Veg";
  selectList.appendChild(option1);
  var option2 = document.createElement("option");
  option2.text = "Non-Veg";
  selectList.appendChild(option2);
  var option3 = document.createElement("option");
  option3.text = "Nil";
  selectList.appendChild(option3);
  selectList.setAttribute("class", "food-dropdown");
  selectList.id = "food-category";
  selectList.setAttribute("required", "");
  foodcategoryCell.appendChild(selectList);
}

/**
 * It creates a save button and append to form.
 * @param {reference} savebuttonCell 
 * @retunrs nothing
 */
function createSavebutton(savebuttonCell) {
  let savebutton = document.createElement("button");
  savebutton.innerText = "Save";
  savebutton.setAttribute("class", "save-button");
  savebutton.id = "button";
  savebutton.onclick = function () {
    addDataToJson(this.id);
  };
  savebuttonCell.appendChild(savebutton);
}

/**
 * It will call the function , that creates the prefernce form to update food count 
 * for a week.
 * @retunrs nothing
 */
function createFoodpreferenceFormForWeek() {
  createFoodpreferenceForm();
}

/**
 * It will append the dates to the dropdown dynamically based on the calculation. 
 * @param {reference} dateCell 
 * @retunrs nothing
 */
function createDateList(dateCell) {
  var option = document.createElement("option");
  option.text = "Please select the date";
  dateCell.appendChild(option);
  for (iterator = 0; iterator < 5; iterator++) {
    var option = document.createElement("option");
    option.text = weekDates[iterator] + `(${weekDays[iterator]})`;
    dateCell.appendChild(option);
  }
}

/**
 * It will displays the save indication in UI, when the user submits the food preference.
 * @param {string} id 
 * @retunrs nothing
 */
function updateSaveIndicationInUI(id) {
  let image = document.getElementById("image");
  image.style.display = "block";
  setTimeout(() => {
    image.style.display = "none";
  }, 4000);
}

// It triggers when the page loads
  getTheWeekDates();
  weekDayInwords();
  createFoodpreferenceFormForWeek();

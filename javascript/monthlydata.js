let dateOfFoodpreference;
let foodPreferenceList;
let foodCategoryList;
let userdata;

/**
 * It will get all users data and update in UI. 
 * @retunrs nothing
 */
async function userFoodPreferenceOfMonth() {
  userdata = await getTheuserData();
  dateOfFoodpreference = userdata.Date;
  foodPreferenceList = userdata.foodPreference;
  foodCategoryList = userdata.foodCategory;
  updateTheFoodPreferenceInUI(
    dateOfFoodpreference,
    foodPreferenceList,
    foodCategoryList
  );
}

// It triggers when the page loads
window.onload = userFoodPreferenceOfMonth();

let fooddataContainer = document.getElementById("fooddata-container");

/**
 * It will food preference data of an employee in userpage.
 * @param {object} dateOfFoodpreference 
 * @param {object} foodPreferenceList 
 * @param {object} foodCategoryList 
 * @returns nothing
 */
function updateTheFoodPreferenceInUI(
  dateOfFoodpreference,
  foodPreferenceList,
  foodCategoryList
) {
  for (iterator = 0; iterator < dateOfFoodpreference.length; iterator++) {
    createDivisionToPopulateData(
      dateOfFoodpreference[iterator],
      foodPreferenceList[iterator],
      foodCategoryList[iterator]
    );
  }
}

/**
 * It creates an division and update the given value in ui.
 * @param {string} date 
 * @param {string} foodPreference 
 * @param {string} foodCategory 
 * @returns nothing
 */
function createDivisionToPopulateData(date, foodPreference, foodCategory) {
  let division = document.createElement("div");
  division.setAttribute("class", "dataentry");
  let dateContent = document.createElement("p");
  dateContent.setAttribute("class", "date-space");
  dateContent.innerText = date;
  let preferenceOfFood = document.createElement("p");
  preferenceOfFood.setAttribute("class", "foodpreferencetext");
  preferenceOfFood.innerText = foodPreference;
  let categoryOfFood = document.createElement("p");
  categoryOfFood.innerText = foodCategory;
  division.appendChild(dateContent);
  division.appendChild(preferenceOfFood);
  division.appendChild(categoryOfFood);
  fooddataContainer.appendChild(division);
}

let categoryFilter = document.getElementById("category-filter");
let preferenceFilter = document.getElementById("preference-filter");

// Onchange listener to triggers an filter action
categoryFilter.addEventListener("change", () => {
  getFilterDataBasedOnCategory("category");
});

// Onchange listener to triggers an filter action
preferenceFilter.addEventListener("change", () => {
  getFilterDataBasedOnCategory("preference");
});

/**
 * It will perform filter based on the select preference of the field and update in ui.
 * @param {string} filtertype 
 * @returns nothing
 */
function getFilterDataBasedOnCategory(filtertype) {
  const query1 = categoryFilter.value;
  const query2 = preferenceFilter.value;
  fooddataContainer.replaceChildren();
  if (filtertype == "category") {
    if (query1 == "None") {
      alert("Select the value to filter");
    } else {
      let iterator = 0;
      foodCategoryList.filter((v) => {
        if (v == query1) {
          updateDataBasedOnFilterData(iterator);
        }
        iterator++;
      });
    }
  } else {
    if (query2 == "None") {
      alert("Select the value to filter");
    } else {
      let iterator = 0;
      foodPreferenceList.filter((v) => {
        if (v == query2) {
          updateDataBasedOnFilterData(iterator);
        }
        iterator++;
      });
    }
  }
}

/**
 * Replaces the existing content and display the food preference as per the selected preferenece.
 * @param {number} iterator 
 * @returns nothing
 */
function updateDataBasedOnFilterData(iterator) {
  createDivisionToPopulateData(
    dateOfFoodpreference[iterator],
    foodPreferenceList[iterator],
    foodCategoryList[iterator]
  );
}

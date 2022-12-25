const vegFoodprice = document.getElementById("vegfoodprice");
const nonVegfoodprice = document.getElementById("non-vegfoodprice");

/**
 *  It stores the total food count and also based on category in server.
 *  @returns nothing
 */
async function fareDetailstoreInJson() {
  if (vegFoodprice.value == "" || nonVegfoodprice.value == "")
    alert("All fields are Required!");
  else {
    await sendHttpRequestToPostFareDetails(
      vegFoodprice.value,
      nonVegfoodprice.value
    );
    alert("Price details is updated!");
  }
}

/**
 *  send  requets to the server and get employee data and find the index of the todaydate in array
 * and as per calculate the food count.
 *  @returns nothing
 */
async function getEmployeeData() {
  let employeeData = await sendHttpRequestGetEmployeeData();
  getTheIndexOfArrayForCurrentdate(employeeData);
  calculateCount(employeeData);
}

let indexlist = [];
let indexListDate = {};
let vegCount = 0;
let nonvegCount = 0;
let yesCount = 0;
let noCount = 0;
let dateContent = 0;

/**
 * It finds the index of the todaydate in the assigned array for an employee.
 * @param {object} employeeData 
 *  @returns nothing
 */
function getTheIndexOfArrayForCurrentdate(employeeData) {
  let todayDate = new Date();
  dateContent =
    todayDate.getDate() +
    "-" +
    (todayDate.getMonth() + 1) +
    "-" +
    todayDate.getFullYear();

  Object.values(employeeData).forEach((val) => {
    let index = -1;
    if (val.hasOwnProperty("Date")) {
      for (let element of val.Date) {
        let selectedDate = element.split("(")[0];
        if (selectedDate == dateContent) {
          index++;
          break;
        }
      }
      indexlist.push(index);
    }
  });
}

/**
 * It calculate the count of the food as ex: How many specified 'Yes' and 'No'
 * and also based on category ex: Veg or Non-veg.
 * @param {object} employeeData 
 *  @returns nothing
 */
function calculateCount(employeeData) {
  let iterator = 0;
  Object.values(employeeData).forEach((val) => {
    if (
      val.hasOwnProperty("foodPreference") &&
      val.hasOwnProperty("foodCategory") &&
      indexlist[iterator] != -1 &&
      iterator < indexlist.length
    ) {
      if (val.foodPreference[indexlist[iterator]] == "Yes") {
        yesCount++;
      }
      if (val.foodPreference[indexlist[iterator]] == "No") {
        noCount++;
      }
      if (val.foodCategory[indexlist[iterator]] == "Veg") {
        vegCount++;
      }
      if (val.foodCategory[indexlist[iterator]] == "Non-Veg") {
        nonvegCount++;
      }
      iterator++;
    }
  });
  updateFoodcountOnUI(yesCount, noCount, vegCount, nonvegCount);
  storeCountInJson(dateContent, vegCount, nonvegCount, vegCount + nonvegCount);
}

/**
 * It update the food count on the admin dashboard page.
 * @param {number} yesCount 
 * @param {number} noCount 
 * @param {number} vegCount 
 * @param {number} nonvegCount 
 *  @returns nothing
 */
function updateFoodcountOnUI(yesCount, noCount, vegCount, nonvegCount) {
  document.getElementById("yes-count").innerText = yesCount;
  document.getElementById("no-count").innerText = noCount;
  document.getElementById("veg-count").innerText = vegCount;
  document.getElementById("nonveg-count").innerText = nonvegCount;
}

/**
 * It will store the date , veg count , nonveg count and total food count in the server for
 * future use.
 * @param {string} dateContent 
 * @param {number} vegCount 
 * @param {number} nonvegCount 
 * @param {number} totalCount 
 *  @returns nothing
 */
async function storeCountInJson(
  dateContent,
  vegCount,
  nonvegCount,
  totalCount
) {
  console.log(dateContent, vegCount, nonvegCount, totalCount);
  await sendHttpRequestToPostFoodCount(
    dateContent,
    vegCount,
    nonvegCount,
    totalCount
  );
}

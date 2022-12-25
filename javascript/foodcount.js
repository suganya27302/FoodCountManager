/**
 *  send request to server and get the total food count deatils of the month.
 *  @returns nothing
 */
async function getTotalFoodCountData() {
  let totalFoodCount = await sendHttpRequestGetTotalFoodCount();
  console.log('totalFoodCount: ', totalFoodCount);
  updateTheFoodCountOfMonthInUI(totalFoodCount);
}
// reference where need to append the food count data in admin page
let foodcountContainer = document.getElementById("foodcount-container");

/**
 * update the food count data based on category in admin page.
 * @param {object} totalFoodCount 
 * @returns nothing
 */
function updateTheFoodCountOfMonthInUI(totalFoodCount) {
  for (let property in totalFoodCount) {
    let division = document.createElement("div");
    division.setAttribute("class", "category-count");
    let dateReference = document.createElement("p");
    let vegcount = document.createElement("p");
    let nonvegcount = document.createElement("p");
    let totalcount = document.createElement("p");  
    updateMonthlycountDataOnUI(property, dateReference);
    updateMonthlycountDataOnUI(totalFoodCount[property].vegCount, vegcount);
    updateMonthlycountDataOnUI(
      totalFoodCount[property].nonvegCount,
      nonvegcount
    );
    updateMonthlycountDataOnUI(totalFoodCount[property].totalCount, totalcount);
    console.log(property);
    division.appendChild(dateReference);
    division.appendChild(totalcount);
    division.appendChild(vegcount);
    division.appendChild(nonvegcount);
    foodcountContainer.appendChild(division);
  
  }}
/**
 * It will update the given value to the given reference.
 * @param {string} value 
 * @param {reference} referenceObject 
 *  @returns nothing
 */
function updateMonthlycountDataOnUI(value, referenceObject) {
  referenceObject.innerText = value;
}

// It triggers when the page loads
window.onload =getTotalFoodCountData();

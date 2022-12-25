let vegFoodCount = 0;
let nonVegFoodCount = 0;
let vegFoodcount = document.getElementById("vegFoodCount");
let nonvegFoodcount = document.getElementById("non-vegFoodCount");
let totalFoodcount = document.getElementById("totalFoodCount");

/**
 * It will get the price data from server and update the price details of the food in UI
 * @returns nothing
 */
async function updateFareDetailsInUI() {
  let priceDetails = await sendHttpRequestGetPriceDetails();
  let vegfoodPrice = document.getElementById("vegfood-price");
  let nonVegfoodprice = document.getElementById("nonvegfood-price");

  vegfoodPrice.innerText = "- " + priceDetails.vegFoodprice + " rs";
  nonVegfoodprice.innerText = "- " + priceDetails.nonVegfoodprice + " rs";

  updateFareDetailsOfMonthInUI(priceDetails);
}

/**
 * It get the user food preference data from server.
 * @returns nothing
 */
async function userFoodPreferenceDataOfMonth() {
  let userdata = await getTheuserData();
  let foodPreferenceList = userdata.foodPreference;
  let foodCategoryList = userdata.foodCategory;
  calculateFoodCountAndFoodPrice(foodPreferenceList, foodCategoryList);
}

/**
 * It will calculate total food count based on the category aswell and update in ui.
 * @param {array} foodPreferenceList 
 * @param {array} foodCategoryList 
 * @returns nothing
 */
function calculateFoodCountAndFoodPrice(foodPreferenceList, foodCategoryList) {
  for (iterator = 0; iterator < foodPreferenceList.length; iterator++) {
    if (
      foodPreferenceList[iterator] == "Yes" &&
      foodCategoryList[iterator] == "Veg"
    )
      vegFoodCount++;
    if (
      foodPreferenceList[iterator] == "Yes" &&
      foodCategoryList[iterator] == "Non-Veg"
    )
      nonVegFoodCount++;
  }
  updateFareDetailsInUI();

}

/**
 * Update the food price based on category in user page.
 * @param {object} priceDetails 
 * @returns nothing
 */
function updateFareDetailsOfMonthInUI(priceDetails) {
  document.getElementById("vegFoodprice").innerText =
    vegFoodCount * priceDetails.vegFoodprice;
  document.getElementById("non-vegFoodprice").innerText =
    nonVegFoodCount * priceDetails.nonVegfoodprice;
  document.getElementById("totalFoodprice").innerText =
    vegFoodCount * priceDetails.vegFoodprice +
    nonVegFoodCount * priceDetails.nonVegfoodprice;
    vegFoodcount.innerText = vegFoodCount;
    nonvegFoodcount.innerText = nonVegFoodCount;
    totalFoodcount.innerText = vegFoodCount + nonVegFoodCount;
  
}

/**
 * It triggers when the page loads and update the food preference form and fare details in ui.
 */
window.onload = () => {
  userFoodPreferenceDataOfMonth();
};

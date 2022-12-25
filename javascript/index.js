const userName = document.getElementById("signup-username");
const employeeID = document.getElementById("signup-employeeid");
const password = document.getElementById("signup-password");
const confirmPassword = document.getElementById("signup-confirmpassword");
const signupSubmit = document.getElementById("signup-submit");

const employeeIDLogin = document.getElementById("login-employeeid");
const passwordLogin = document.getElementById("login-password");
let valid = false;
let nameOfUser;
const foodpreferenceDivision = document.getElementById("foodpreference");

/**
 * It will send the request to the server and store the user data in json while signup
 * and validate the login credential in server.
 * @param {string} userChoice 
 * @returns nothing
 */
async function handleSubmit(userChoice) {
  if (userChoice == "signup")
    await sendHttpRequestToPostUserDetails(
      userName.value,
      employeeID.value,
      password.value
    );
  else {
    let response = await sendHttpRequestToPostUserDetailsAndValidate(
      employeeIDLogin.value,
      passwordLogin.value
    );
    return response;
  }
}

/**
 * IT will validate the input data while registering, if it is empty it alerts.
 * @returns nothing
 */
function validUserDetails() {
  if (
    userName.value == "" ||
    password.value == "" ||
    employeeID.value == "" ||
    confirmPassword.value == ""
  )
    alert("All fields are required");
  else {
    if (CheckPassword()) checkForValidPassword();
    
    if (valid) {
      handleSubmit("signup");
    }
  }
}

/**
 * It validate the password entered is as per the format, to make it strong.
 * @returns boolean
 */
function CheckPassword() {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (password.value.match(passw) && password.value != "") {
    valid = true;
    return true;
  } else {
    alert(
      "Please Enter atleast one Number, one UpperCase, one Lowercase and minimum 8 Characters in password field"
    );
    password.style.border = "2px solid red";
    password.value = "";
    valid = false;
    return false;
  }
}

/**
 * Ensure the entered password matches with the confirm password.
 * @returns nothing
 */
function checkForValidPassword() {
  if (password.value == "") {
    alert("Please Enter the password again.");
    confirmPassword.style.border = "2px solid red";
    valid = false;
  } else if (password.value != confirmPassword.value) {
    alert("Password doesn't Match");
    confirmPassword.style.border = "2px solid red";
    confirmPassword.value = "";
    valid = false;
  } else {
    valid = true;
    confirmPassword.style.border = "1px solid grey";
  }
}

/**
 * validate user login and decides ,redirects the respective dashboard.
 * @returns nothing
 */
async function isUserValid() {
  if (employeeIDLogin.value == "" || passwordLogin.value == "")
    alert("All fields are required");
  else {
    let response = await handleSubmit("login");
    
    if (response.data == "success" && response.employeeID != "S-181997") {
      window.location.href = "user.html";
    } else {
      window.location.href = "admin.html";
    }
  }
}

/**
 * It send request to server and store food preference of the employee.
 * @param {string} id 
 * @returns nothing
 */
async function storeDataOfEmployee(id) {
  const datevalue = document.getElementById("date");
  const foodPreference = document.getElementById("food-preference");
  const foodCategory = document.getElementById("food-category");

  await sendHttpRequestToPostUserFoodPreference(
    datevalue.value,
    foodPreference.value,
    foodCategory.value
  );
}

/**
 * Validate the input field and to store data in json , request is initiated,
 * update the save indication in ui.
 * @param {string} id 
 * @returns nothing
 */
function addDataToJson(id) {
  if (validateInputField()) {
    storeDataOfEmployee(id);
    updateSaveIndicationInUI(id);
  }
}

/**
 * validate the food preference form field , if the field is empty it alerts
 * @returns nothing
 */
function validateInputField() {
  const datevalue = document.getElementById("date");
  const foodPreference = document.getElementById("food-preference");
  const foodCategory = document.getElementById("food-category");

  if (
    datevalue.value == "Please select the date" ||
    foodPreference.value == "None" ||
    foodCategory.value == "None"
  ) {
    alert("All fields are required!");
    return false;
  }
  if (
    (foodPreference.value == "No" && foodCategory.value == "Veg") ||
    (foodPreference.value == "No" && foodCategory.value == "Non-Veg") ||
    (foodPreference.value == "Yes" && foodCategory.value == "Nil")
  ) {
    alert("Select the valid data!");
    return false;
  }
  return true;
}

/**
 * Sending a post request to store the user details in json file
 * by taking  username, employee ID and password as input.
 * @param {string} nameOfTheUser
 * @param {number} employeeID
 * @param {string} userPassword
 * @return {promise} response
 */
function sendHttpRequestToPostUserDetails(
  nameOfTheUser,
  employeeID,
  userPassword
) {
  let response = new Promise(async (resolve, reject) => {
    let userDetail = await fetch(`http://127.0.0.1:8000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameOfTheUser: nameOfTheUser,
        employeeID: employeeID,
        userPassword: userPassword,
      }),
    });
    if (userDetail.ok) {
      resolve();
      window.location.href = "index.html";
    } else {
      let error = await userDetail.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * Sending a post request to store the current employee ID in json file and validate the user is a
 * valid user or not, by taking employee ID and password as input.
 * @param {string} employeeID
 * @param {string} userPassword
 * @return {promise} response
 */
function sendHttpRequestToPostUserDetailsAndValidate(employeeID, userPassword) {
  let response = new Promise(async (resolve, reject) => {
    let userData = await fetch(`http://127.0.0.1:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeID: employeeID,
        userPassword: userPassword,
      }),
    });
    if (userData.ok) {
      resolve(userData.json());
    } else {
      let error = await userData.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * Sending a get request to fetch the username from json file.
 * @return {promise} response
 */
function sendHttpRequestGetCurrentUserName() {
  let response = new Promise(async (resolve, reject) => {
    let CurrentUserName = await fetch("http://127.0.0.1:8000/getusername", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (CurrentUserName.ok) {
      resolve(CurrentUserName.json());
    } else {
      let error = await CurrentUserName.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * Sending http request to store the food preference details of the employee.
 * @param {string} Date 
 * @param {string} foodPreference 
 * @param {string} foodCategory 
 * @returns {promise} response
 */
function sendHttpRequestToPostUserFoodPreference(
  Date,
  foodPreference,
  foodCategory
) {
  let response = new Promise(async (resolve, reject) => {
    let userData = await fetch(`http://127.0.0.1:8000/storeuserdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Date: Date,
        foodPreference: foodPreference,
        foodCategory: foodCategory,
      }),
    });
    if (userData.ok) {
      resolve(userData.json());
    } else {
      let error = await userData.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * Request to get the user data from server.
 * @returns {promise} response
 */
function sendHttpRequestGetFoodpreferenceData() {
  let response = new Promise(async (resolve, reject) => {
    let userDetails = await fetch("http://127.0.0.1:8000/getfoodpreference", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (userDetails.ok) {
      resolve(userDetails.json());
    } else {
      let error = await userDetails.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * It sends a request to server to store the prices details in json.
 * @param {number} vegFoodprice 
 * @param {number} nonVegfoodprice 
 * @returns {promise} response
 */
function sendHttpRequestToPostFareDetails(vegFoodprice, nonVegfoodprice) {
  let response = new Promise(async (resolve, reject) => {
    let userData = await fetch(`http://127.0.0.1:8000/faredetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vegFoodprice: vegFoodprice,
        nonVegfoodprice: nonVegfoodprice,
      }),
    });
    if (userData.ok) {
      resolve(userData.json());
    } else {
      let error = await userData.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * It will get the price details from the server.
 * @returns {promise} response
 */
function sendHttpRequestGetPriceDetails() {
  let response = new Promise(async (resolve, reject) => {
    let userDetails = await fetch("http://127.0.0.1:8000/getPricedetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (userDetails.ok) {
      resolve(userDetails.json());
    } else {
      let error = await userDetails.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * It will get the employee info from the server
 * @returns {promise} response
 */
function sendHttpRequestGetEmployeeData() {
  let response = new Promise(async (resolve, reject) => {
    let employeeDetails = await fetch("http://127.0.0.1:8000/getemployeedata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (employeeDetails.ok) {
      resolve(employeeDetails.json());
    } else {
      let error = await employeeDetails.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * It will send a request to server to store the food count data based on the category in json.
 * @param {string} dateContent 
 * @param {number} vegCount 
 * @param {number} nonvegCount 
 * @param {number} totalCount 
 * @returns {promise} response 
 */
function sendHttpRequestToPostFoodCount(
  dateContent,
  vegCount,
  nonvegCount,
  totalCount
) {
  let response = new Promise(async (resolve, reject) => {
    console.log(dateContent, vegCount, nonvegCount, totalCount);

    let userData = await fetch(`http://127.0.0.1:8000/storefoodcount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateContent: dateContent,
        vegCount: vegCount,
        nonvegCount: nonvegCount,
        totalCount: totalCount,
      }),
    });
    if (userData.ok) {
      resolve(userData.json());
    } else {
      let error = await userData.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

/**
 * It get the total food count from the server.
 * @returns {promise} response
 */
function sendHttpRequestGetTotalFoodCount() {
  let response = new Promise(async (resolve, reject) => {
    let foodCount = await fetch("http://127.0.0.1:8000/gettotalfoodcount", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (foodCount.ok) {
      resolve(foodCount.json());
    } else {
      let error = await foodCount.json();
      alert(error.Error);
      reject("Something went wrong..");
    }
  });
  return response;
}

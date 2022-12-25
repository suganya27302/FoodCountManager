/**
 * Importing the neccessary packages.
 */
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

/* Read the json file and convert into object to append the data */
let data = fs.readFileSync("./data/userdata.json", "utf8");
data = JSON.parse(data);

let presentUser = fs.readFileSync("./data/currentuser.json", "utf8");
presentUser = JSON.parse(presentUser);

let foodCount = fs.readFileSync("./data/foodcount.json", "utf8");
foodCount = JSON.parse(foodCount);
console.log("foodCount: ", foodCount);

/**
 * body-parser, which is used to fetch input data from body.
 * extended is set to false, it returns objects.
 * Note: If extended is set to true it returns object of objects
 * and qslibrary is used to parse object
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Render the Webpage using the middleware.
 */
app.use("/", express.static("./"));

/**
 * Respond to the request to capture the user details and
 * store the user details in the json file.
 * If the username is already in the object, it returns with an error message.
 * If the data is not captured properly, it displays error message to page.
 * */
app.post("/signup", function (request, response) {
  try {
    if (!request.body) throw new Error("Request body is null ");
    else {
      if (
        !(
          request.body.nameOfTheUser &&
          request.body.employeeID &&
          request.body.userPassword
        )
      )
        throw new Error("Request body argument values are null");
      else {
        console.log(data);
        if (!(request.body.employeeID in data)) {
          let userinfo = {
            Username: request.body.nameOfTheUser,
            password: request.body.userPassword,
            Date: [],
            foodPreference: [],
            foodCategory: [],
          };
          data[request.body.employeeID] = userinfo;
          let userData = JSON.stringify(data);
          fs.writeFile("./data/userdata.json", userData, () => {});

          response.status(200).json({ data: "success" });
          //   response.redirect("index.html");
          response.end();
        } else {
          response.status(404).json({ Error: "Username already exists" });
          response.end();
        }
      }
    }
  } catch (error) {
    let date = new Date();
    let errorMessage =
      "\n" +
      date.toDateString() +
      " " +
      date.toLocaleTimeString() +
      " " +
      error.message +
      " in http://127.0.0.1" +
      request.url;
    // create a logger file and append the error message
    fs.appendFile("logger.txt", errorMessage, function (err) {
      console.log(errorMessage);
    });

    response.status(404).json({
      Error:
        "Not a valid Endpoint,Please check with it." + "\n" + error.message,
    });
  }
});

/**
 * Respond to the request to capture the user details and
 * Check whether the user exists or not.
 * If the username or password are wrong, it returns with an error message.
 * If the data is not captured properly, it displays error message to page.
 * */
app.post("/login", function (request, response) {
  try {
    if (!request.body) throw new Error("Request body is null ");
    else {
      if (!(request.body.employeeID && request.body.userPassword))
        throw new Error("Request body argument values are null");
      else {
        if (
          request.body.employeeID in data &&
          data[request.body.employeeID].password === request.body.userPassword
        ) {
          let currentuserInfo = {
            CurrentUserID: request.body.employeeID,
            CurrentUsername: data[request.body.employeeID].Username,
          };
          presentUser["CurrentUser"] = currentuserInfo;
          let userData = JSON.stringify(presentUser);
          fs.writeFile("./data/currentuser.json", userData, () => {});

          response
            .status(200)
            .json({ data: "success", employeeID: request.body.employeeID });
          response.end();
        } else {
          response
            .status(404)
            .json({ Error: "Invalid user. Please enter valid credential." });
          response.end();
        }
      }
    }
  } catch (error) {
    let date = new Date();
    let errorMessage =
      "\n" +
      date.toDateString() +
      " " +
      date.toLocaleTimeString() +
      " " +
      error.message +
      " in http://127.0.0.1" +
      request.url;
    // create a logger file and append the error message
    fs.appendFile("logger.txt", errorMessage, function (err) {
      console.log(errorMessage);
    });

    response.status(404).json({
      Error:
        "Not a valid Endpoint,Please check with it." + "\n" + error.message,
    });
  }
});

/* Respond to the request and send the current username  to client*/
app.get("/getusername", function (request, response) {
  try {
    response.status(200).json(presentUser);
    response.end();
  } catch (error) {
    response.status(404).json({
      Error: "Not a valid Endpoint,Please check with it.",
    });
  }
});

app.listen(8000, () => {
  console.log("Server listening at http://127.0.0.1:8000/");
});

/**
 * Respond to the request to capture the user details and
 * store it in json.
 * If the data is not captured properly, it displays error message to page.
 * */

app.post("/storeuserdata", function (request, response) {
  try {
    if (!request.body) throw new Error("Request body is null ");
    else {
      if (
        !(
          request.body.Date &&
          request.body.foodPreference &&
          request.body.foodCategory
        )
      )
        throw new Error("Request body argument values are null");
      else {
        let flag = true;
        for (
          let iterator = 0;
          iterator < data[presentUser["CurrentUser"].CurrentUserID].Date.length;
          iterator++
        ) {
          if (
            data[presentUser["CurrentUser"].CurrentUserID].Date[iterator] ===
            request.body.Date
          ) {
            // console.log(iterator);
            data[presentUser["CurrentUser"].CurrentUserID].foodPreference[
              iterator
            ] = request.body.foodPreference;

            data[presentUser["CurrentUser"].CurrentUserID].foodCategory[
              iterator
            ] = request.body.foodCategory;

            flag = false;
            break;
          }
        }
        if (flag) {
          let userinfo = {
            Date: request.body.Date,
            foodPreference: request.body.foodPreference,
            foodCategory: request.body.foodCategory,
          };
          // console.log(data[presentUser["CurrentUser"]].Date);
          data[presentUser["CurrentUser"].CurrentUserID].Date.push(
            userinfo.Date
          );
          data[presentUser["CurrentUser"].CurrentUserID].foodPreference.push(
            userinfo.foodPreference
          );
          data[presentUser["CurrentUser"].CurrentUserID].foodCategory.push(
            userinfo.foodCategory
          );
        }
        let userData = JSON.stringify(data);
        fs.writeFile("./data/userdata.json", userData, () => {});
        response.status(200).json({ data: "success" });
        //   response.redirect("index.html");
        response.end();
      }
    }
  } catch (error) {
    let date = new Date();
    let errorMessage =
      "\n" +
      date.toDateString() +
      " " +
      date.toLocaleTimeString() +
      " " +
      error.message +
      " in http://127.0.0.1" +
      request.url;
    // create a logger file and append the error message
    fs.appendFile("logger.txt", errorMessage, function (err) {
      console.log(errorMessage);
    });

    response.status(404).json({
      Error:
        "Not a valid Endpoint,Please check with it." + "\n" + error.message,
    });
  }
});

/* Respond to the request and send the food preference data of the current user to client*/
app.get("/getfoodpreference", function (request, response) {
  try {
    response.status(200).json(data[presentUser["CurrentUser"].CurrentUserID]);
    response.end();
  } catch (error) {
    response.status(404).json({
      Error: "Not a valid Endpoint,Please check with it.",
    });
  }
});

app.post("/faredetails", function (request, response) {
  try {
    if (!request.body) throw new Error("Request body is null ");
    else {
      if (!(request.body.vegFoodprice && request.body.nonVegfoodprice))
        throw new Error("Request body argument values are null");
      else {
        data[
          presentUser["CurrentUser"].CurrentUserID
        ].Pricedetails.vegFoodprice = request.body.vegFoodprice;
        data[
          presentUser["CurrentUser"].CurrentUserID
        ].Pricedetails.nonVegfoodprice = request.body.nonVegfoodprice;

        let userData = JSON.stringify(data);
        fs.writeFile("./data/userdata.json", userData, () => {});

        response.status(200).json({ data: "success" });
        response.end();
      }
    }
  } catch (error) {
    let date = new Date();
    let errorMessage =
      "\n" +
      date.toDateString() +
      " " +
      date.toLocaleTimeString() +
      " " +
      error.message +
      " in http://127.0.0.1" +
      request.url;
    // create a logger file and append the error message
    fs.appendFile("logger.txt", errorMessage, function (err) {
      console.log(errorMessage);
    });

    response.status(404).json({
      Error:
        "Not a valid Endpoint,Please check with it." + "\n" + error.message,
    });
  }
});

/* Respond to the request and send the price details updated by the admin to client*/
app.get("/getPricedetails", function (request, response) {
  try {
    response.status(200).json(data["S-181997"].Pricedetails);
    response.end();
  } catch (error) {
    response.status(404).json({
      Error: "Not a valid Endpoint,Please check with it.",
    });
  }
});

/* Respond to the request and send the all employee data to client , here the client is admin*/
app.get("/getemployeedata", function (request, response) {
  try {
    response.status(200).json(data);
    response.end();
  } catch (error) {
    response.status(404).json({
      Error: "Not a valid Endpoint,Please check with it.",
    });
  }
});

/**
 * Respond to the request to capture the user food count and
 * store it in json.
 * If the data is not captured properly, it displays error message to page.
 * */

app.post("/storefoodcount", function (request, response) {
  try {
    if (!request.body) throw new Error("Request body is null ");
    else {
      if (
        !(
          (request.body.dateContent &&
            request.body.vegCount &&
            request.body.nonvegCount &&
            request.body.totalCount) ||
          request.body.vegCount == 0 ||
          request.body.nonvegCount == 0 ||
          request.body.totalCount == 0
        )
      ) {
        throw new Error("Request body argument values are null");
      } else {
        let userinfo = {
          vegCount: request.body.vegCount,
          nonvegCount: request.body.nonvegCount,
          totalCount: request.body.totalCount,
        };
        foodCount[request.body.dateContent] = userinfo;
        let userData = JSON.stringify(foodCount);
        fs.writeFile("./data/foodcount.json", userData, () => {});
        response.status(200).json({ data: "success" });
        response.end();
      }
    }
  } catch (error) {
    let date = new Date();
    let errorMessage =
      "\n" +
      date.toDateString() +
      " " +
      date.toLocaleTimeString() +
      " " +
      error.message +
      " in http://127.0.0.1" +
      request.url;
    // create a logger file and append the error message
    fs.appendFile("logger.txt", errorMessage, function (err) {
      console.log(errorMessage);
    });

    response.status(404).json({
      Error:
        "Not a valid Endpoint,Please check with it." + "\n" + error.message,
    });
  }
});

/* Respond to the request and send the total food count with category count to client*/
app.get("/gettotalfoodcount", function (request, response) {
  try {
    response.status(200).json(foodCount);
    response.end();
  } catch (error) {
    response.status(404).json({
      Error: "Not a valid Endpoint,Please check with it.",
    });
  }
});

/**
 * It gets the current username from the servers and displays in ui.
 *  @returns nothing
 */
async function displayCurrentUsernameInUI() {
  let nameOfUser = await sendHttpRequestGetCurrentUserName();
  let currentUsername = document.getElementById("current-username");
  currentUsername.innerText = nameOfUser.CurrentUser.CurrentUsername;
}

// It triggers when the page loads
window.onload=displayCurrentUsernameInUI();

/**
 * when the user clicks the logout button in application , this function will triggers
 * and redirects to login page.
 *  @returns nothing
 */
function logout() {
  window.location.href = "index.html";
}

/**
 * It get the users data from the server by sending a request.
 * @returns promises
 */
async function getTheuserData() {
  let response = await sendHttpRequestGetFoodpreferenceData();
  return response;
}

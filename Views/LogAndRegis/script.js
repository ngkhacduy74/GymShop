// Select elements
const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
  document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    formPopup.classList[link.id === "signup-link" ? "add" : "remove"](
      "show-signup"
    );
  });
});

// Validation functions
function validateFullName() {
  const fullNameInput = document.getElementById("fullname");
  const fullName = fullNameInput.value.trim();
  const validNameRegex = /^[a-zA-Z\s]+$/;

  if (!validNameRegex.test(fullName)) {
    fullNameInput.style.border = "2px solid red";
    // alert(
    //   "Full Name must not contain special characters. Only letters and spaces are allowed."
    // );
    return false;
  }

  if (fullName.length <= 5) {
    fullNameInput.style.border = "2px solid red";
    // alert("Full Name must be longer than 5 characters.");
    return false;
  }
  fullNameInput.style.border = "";
  return true;
}

function validateUserName() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();
  const validNameRegex = /^[a-zA-Z\s]+$/;

  if (!validNameRegex.test(username)) {
    usernameInput.style.border = "2px solid red";
    // alert(
    //   "Username must not contain special characters. Only letters and spaces are allowed."
    // );
    return false;
  }

  if (username.length <= 8) {
    usernameInput.style.border = "2px solid red";
    // alert("Username must be longer than 8 characters.");
    return false;
  }
  usernameInput.style.border = "";
  return true;
}

function validateEmail() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!validEmailRegex.test(email)) {
    emailInput.style.border = "2px solid red";
    alert("Invalid email format. Please enter a valid email.");
    return false;
  }
  emailInput.style.border = "";
  return true;
}

function validateRePassword() {
  const passwordInput = document.getElementById("password");
  const rePasswordInput = document.getElementById("repassword");

  if (passwordInput.value !== rePasswordInput.value) {
    showError(rePasswordInput, "Confirm Password must match the Password.");
    return false;
  }

  clearError(rePasswordInput);
  return true;
}
function validatePhoneNumber() {
  const phoneInput = document.getElementById("phone");
  const phoneNumber = phoneInput.value.trim();
  const validPhoneRegex = /^[0-9]{10}$/;

  if (!validPhoneRegex.test(phoneNumber)) {
    phoneInput.style.border = "2px solid red";
    // alert("Phone Number must be exactly 10 digits, with no spaces or letters.");
    return false;
  }
  phoneInput.style.border = "";
  return true;
}

// Validate and submit form
document
  .getElementById("signup_submit")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const isFullNameValid = validateFullName();
    const isUserNameValid = validateUserName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhoneNumber();
    // const repassword = validateRePassword();
    if (isFullNameValid && isUserNameValid && isEmailValid && isPhoneValid) {
      try {
        const response = await fetch("/auth/create-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: document.getElementById("fullname").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            password: document.getElementById("password").value,
            gender: document.getElementById("gender").value,
          }),
        });

        if (response.ok) {
          alert("Create User Successfully!");
          location.reload();
        } else {
          alert("Create User Fail!");
        }
      } catch (err) {
        console.error("Error while calling API:", err);
      }
    } else {
      alert("Please correct the errors in the form before submitting.");
    }
  });
document.getElementById("fullname").addEventListener("blur", validateFullName);
document.getElementById("username").addEventListener("blur", validateUserName);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("phone").addEventListener("blur", validatePhoneNumber);
// document
//   .getElementById("repassword")
//   .addEventListener("blur", validateRePassword);

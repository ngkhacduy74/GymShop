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

document
  .getElementById("signup_submit")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Create User Successfully!");
        location.reload();
      } else {
        alert("Create User Fail!");
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    }
  });
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup form");
  const submitButton = document.getElementById("signup_submit");
  const inputs = form.querySelectorAll("input[required], select[required]");

  // Hàm kiểm tra lỗi cho từng trường
  const validateField = (field) => {
    const errorMessage = field.nextElementSibling;

    if (!errorMessage || !errorMessage.classList.contains("error-message")) {
      return true; // Không có span lỗi thì bỏ qua
    }

    // Nếu trường trống
    if (!field.value.trim()) {
      errorMessage.textContent = "This field is required.";
      return false;
    }

    // Kiểm tra các điều kiện riêng (nếu có)
    if (field.type === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) {
        errorMessage.textContent = "Please enter a valid email.";
        return false;
      }
    }

    if (field.id === "phone") {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(field.value.trim())) {
        errorMessage.textContent =
          "Phone number must be 10 digits and contain only numbers.";
        return false;
      }
    }

    if (field.type === "password" && field.id === "confirmPassword") {
      const password = form.querySelector(
        "input[type='password']:nth-of-type(1)"
      );
      if (field.value !== password.value) {
        errorMessage.textContent = "Passwords do not match.";
        return false;
      }
    }

    // Xóa thông báo lỗi nếu trường hợp lệ
    errorMessage.textContent = "";
    return true;
  };

  // Hàm kiểm tra toàn bộ form
  const validateForm = () => {
    let isValid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  };

  // Thêm các thông báo lỗi bên dưới các trường
  inputs.forEach((input) => {
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    input.parentNode.appendChild(errorSpan);

    input.addEventListener("input", () => {
      validateField(input);
    });
  });

  // Xử lý sự kiện submit của form
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Thu thập dữ liệu từ form
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        const response = await fetch("/create-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          alert("User created successfully: " + result.message);
          form.reset(); // Reset form sau khi thành công
        } else {
          const error = await response.json();
          alert("Error: " + error.message);
        }
      } catch (err) {
        alert("An error occurred: " + err.message);
      }
    } else {
      // Nếu form không hợp lệ, hiển thị thông báo lỗi
      alert("Please fix the errors before submitting.");
    }
  });
});

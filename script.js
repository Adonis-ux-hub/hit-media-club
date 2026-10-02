// Get the form
const form = document.getElementById("registrationForm");

// Get the form fields
const name = document.getElementById("name");
const department = document.getElementById("department");
const phone = document.getElementById("userPhone");
const email = document.getElementById("email");
const reason = document.getElementById("reason");

// Get error message areas
const nameError = document.getElementById("nameError");
const departmentError = document.getElementById("departmentError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const reasonError = document.getElementById("reasonError");


// ==============================
// NAME VALIDATION
// ==============================

function validateName() {

    let nameValue = name.value.trim();

    if (nameValue === "") {

        nameError.textContent = "Please enter your full name.";
        return false;

    } else if (nameValue.length < 3) {

        nameError.textContent = "Name must be at least 3 characters.";
        return false;

    } else if (!/^[A-Za-z ]+$/.test(nameValue)) {

        nameError.textContent = "Name should contain letters only.";
        return false;

    } else {

        nameError.textContent = "";
        return true;
    }
}


// ==============================
// DEPARTMENT VALIDATION
// ==============================

function validateDepartment() {

    let departmentValue = department.value.trim();

    if (departmentValue === "") {

        departmentError.textContent =
            "Please enter the department you want to join.";

        return false;

    } else {

        departmentError.textContent = "";
        return true;
    }
}


// ==============================
// PHONE VALIDATION
// ==============================

function validatePhone() {

    let phoneValue = phone.value.trim();

    // Zimbabwe phone number
    let phonePattern = /^(\+263|0)7[0-9]{8}$/;

    if (phoneValue === "") {

        phoneError.textContent =
            "Please enter your phone number.";

        return false;

    } else if (!phonePattern.test(phoneValue)) {

        phoneError.textContent =
            "Enter a valid Zimbabwe phone number.";

        return false;

    } else {

        phoneError.textContent = "";
        return true;
    }
}


// ==============================
// EMAIL VALIDATION
// ==============================

function validateEmail() {

    let emailValue = email.value.trim();

    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {

        emailError.textContent =
            "Please enter your email address.";

        return false;

    } else if (!emailPattern.test(emailValue)) {

        emailError.textContent =
            "Please enter a valid email address.";

        return false;

    } else {

        emailError.textContent = "";
        return true;
    }
}


// ==============================
// REASON VALIDATION
// ==============================

function validateReason() {

    let reasonValue = reason.value.trim();

    if (reasonValue === "") {

        reasonError.textContent =
            "Please explain why you want to join.";

        return false;

    } else if (reasonValue.length < 10) {

        reasonError.textContent =
            "Please enter at least 10 characters.";

        return false;

    } else {

        reasonError.textContent = "";
        return true;
    }
}


// ==============================
// FORM SUBMISSION
// ==============================

form.addEventListener("submit", function(event) {

    // Prevent submission until validation is complete
    event.preventDefault();

    // Store validation results
    let validName = validateName();
    let validDepartment = validateDepartment();
    let validPhone = validatePhone();
    let validEmail = validateEmail();
    let validReason = validateReason();


    // Check whether ALL fields are valid
    if (
        validName &&
        validDepartment &&
        validPhone &&
        validEmail &&
        validReason
    ) {

        alert("Form validated successfully!");

        // Send information to PHP
        form.submit();

    } else {

        alert("Please correct the errors in the form.");

    }

});


// ==============================
// INTERACTIVE CHARACTER COUNTER
// ==============================

reason.addEventListener("input", function() {

    let currentCharacters = reason.value.length;

    let maximumCharacters = 300;

    document.getElementById("characterCount").textContent =
        currentCharacters + " / " +
        maximumCharacters + " characters";

});


// ==============================
// VALIDATE WHEN USER LEAVES FIELD
// ==============================

name.addEventListener("blur", validateName);

department.addEventListener("blur", validateDepartment);

phone.addEventListener("blur", validatePhone);

email.addEventListener("blur", validateEmail);

reason.addEventListener("blur", validateReason);


// ==============================
// LOOP
// ==============================

const fields = [
    name,
    department,
    phone,
    email,
    reason
];

for (let i = 0; i < fields.length; i++) {

    fields[i].addEventListener("focus", function() {

        fields[i].style.borderColor = "#2F5597";

    });

}

function toggleMenu() {
    document.getElementById("mobileNav").classList.toggle("active");
}
function togglePassword() {
    const toggleBtn = document.querySelector("#toggle-btn");
    const passwordInput = document.querySelector("#password-input");

    toggleBtn.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleBtn.innerHTML = '<i class="ri-eye-close-line"></i>';
        } else {
            passwordInput.type = "password";
            toggleBtn.innerHTML = '<i class="ri-eye-line"></i>';
        }
    })
}
togglePassword();

const nameContainer = document.querySelector("#name-container");
const emailContainer = document.querySelector("#email-container");
const passwordContainer = document.querySelector("#password-container");

const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");

const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");



// For Nickname
nameInput.addEventListener("input", function () {
    function countWords(inputName) {
        let trimmedName = inputName.trim();
        let wordArray = trimmedName.replace(/\s+/g, " ").split(" ");

        var wordLength = null;
        if (!(wordArray[0] === "")) {
            wordLength = wordArray.length;
        } else {
            wordLength = 0;
        }

        return wordLength;
    }

    wordLength = countWords(nameInput.value);
    // console.log(wordLength);

    if (wordLength > 0 && wordLength <= 2) {
        nameContainer.classList.add("input-success")
    } else if (wordLength === 0) {
        nameContainer.classList.remove("input-success")
        nameContainer.classList.remove("input-error")
    } else {
        nameContainer.classList.remove("input-success")
        nameContainer.classList.add("input-error")
    }
});


// For Email
// This Function only allows the following characters:
// Alphabets, Numbers, Special Characters: + - _ @ . , Whitespace(s)
function validateSpecialChars(str) {
    const regex = /^[+\-a-zA-Z0-9_@.\s]+$/;
    return regex.test(str);
}

// This Function is for validating that hyphens are always present between the alphabets OR numbers
// Thats why this only allows lowercase letter, uppercase letter, or digit
function validateChar(char){
    return /^[a-zA-Z0-9]$/.test(char)
}


emailInput.addEventListener("change", function () {
    const email = emailInput.value;

    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (email.length === 0){
        emailError.textContent = ""
    }

    else if (!validateSpecialChars(email)) {
        emailContainer.classList.remove("input-success")
        emailContainer.classList.add("input-error")
        emailError.textContent = "Email contains invalid characters!"
    } 
    
    else if (email.includes(" ")){
        emailContainer.classList.remove("input-success")
        emailContainer.classList.add("input-error")
        emailError.textContent = "Email contains whitespace!"
    } 
    
    else if (!email.includes("@") || !email.includes(".")){
        emailContainer.classList.remove("input-success")
        emailContainer.classList.add("input-error")
        emailError.textContent = "Email is invalid!"
    } 
    else if (atIndex > dotIndex){
        emailContainer.classList.remove("input-success")
        emailContainer.classList.add("input-error")
        emailError.textContent = "Email is invalid!"
    } 
    
    else if(email.indexOf("+") > atIndex){
        emailContainer.classList.remove("input-success")
        emailContainer.classList.add("input-error")
        emailError.textContent = "Plus is not allowed in domain!"
    } 
    
    else if (email.indexOf("_") > atIndex){
        emailContainer.classList.remove("input-success")
        emailContainer.classList.add("input-error")
        emailError.textContent = "Underscore is not allowed in domain!"
    }

    else if(email.includes("-")){
        emailCharArr = email.split("")
        emailCharArr.forEach((char, index) => {
            if (char === "-"){
                if(!(validateChar(emailCharArr[index-1]) && validateChar(emailCharArr[index+1]))){
                    // console.log(emailCharArr[index-1])
                    // console.log(emailCharArr[index+1])
                    emailContainer.classList.remove("input-success")
                    emailContainer.classList.add("input-error")
                    emailError.textContent = "Hyphen is not allowed here!"
                }else{
                    emailContainer.classList.remove("input-error")
                    emailContainer.classList.add("input-success")
                    emailError.textContent = "Email is valid!"
                }
            }
        })
    }
    
    else {
        emailContainer.classList.remove("input-error")
        emailContainer.classList.add("input-success")
        emailError.textContent = "Email is valid!"
    }

});


// For Password
passwordInput.addEventListener("input", function () {
    let pass = passwordInput.value
    // console.log(pass)

    function isAlphabetic(str) {
        return /^[A-Za-z]+$/.test(str);
    }

    function includesNumber(str) {
        return /\d/g.test(str);
    }

    function includesSpecialChar(str) {
        return /[^a-zA-Z0-9\s]/.test(str);
    }

    function includesUpperCase(ps) {
        let passArr = ps.split("")
        let upperPassArr = ps.toUpperCase().split("")
        let isUpper;
        for (let i = 0; i < passArr.length; i++) {
            if (passArr[i] === upperPassArr[i] && isAlphabetic(passArr[i])) {
                isUpper = true;
                break;
            } else {
                isUpper = false;
            }
        }
        return isUpper;
    }

    function includesLowerCase(ps) {
        let passArr = ps.split("")
        let lowerPassArr = ps.toLowerCase().split("")
        let isLower;
        for (let i = 0; i < passArr.length; i++) {
            if (passArr[i] === lowerPassArr[i] && isAlphabetic(passArr[i])) {
                isLower = true;
                break;
            } else {
                isLower = false;
            }
        }
        return isLower;
    }


    if (pass.includes(" ")) {
        passwordContainer.classList.remove("input-success")
        passwordContainer.classList.add("input-error")
        passwordError.textContent = "Password contains whitespace!"
    } else {
        if (pass.length === 0){
            passwordContainer.classList.remove("input-success")
            passwordContainer.classList.remove("input-error")
            passwordError.textContent = "Password must be atleast 8 characters"  
        }

        else if (!includesUpperCase(pass)) {
            passwordContainer.classList.remove("input-success")
            passwordContainer.classList.add("input-error")
            passwordError.textContent = "Include an uppercase letter!"
        }

        else if (!includesLowerCase(pass)) {
            passwordContainer.classList.remove("input-success")
            passwordContainer.classList.add("input-error")
            passwordError.textContent = "Include a lowercase letter!"
        }

        else if (!includesNumber(pass)) {
            passwordContainer.classList.remove("input-success")
            passwordContainer.classList.add("input-error")
            passwordError.textContent = "Include a number!"
        }

        else if (!includesSpecialChar(pass)) {
            passwordContainer.classList.remove("input-success")
            passwordContainer.classList.add("input-error")
            passwordError.textContent = "Include a special character!"
        }

        else if (pass.length < 8) {
            passwordContainer.classList.remove("input-success")
            passwordContainer.classList.add("input-error")
            passwordError.textContent = "Password must be atleast 8 characters"
        }

        else {
            passwordContainer.classList.remove("input-error")
            passwordContainer.classList.add("input-success")
            passwordError.textContent = "Great Password!"
        }
    }
})

// For Signup Button
const signupBtn = document.querySelector("#signup-btn")
const form = document.querySelector("form")

signupBtn.addEventListener("click", function(e){
    e.preventDefault()
    if (nameContainer.classList.contains("input-success") && emailContainer.classList.contains("input-success") && passwordContainer.classList.contains("input-success")){
        signupBtn.textContent = "Signed Up!"
        setTimeout(() => {
            form.submit()
            // location.href = "index.html"
        }, 700)
    }else{
        alert("Fill the fields correctly.")
    }
})
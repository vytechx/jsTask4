const form = document.getElementById("myForm");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const streetAddress = document.getElementById("street-address");
const address2 = document.getElementById("street-address-2");
const city = document.getElementById("city");
const state = document.getElementById("state");
const postal = document.getElementById("postal");
const phone = document.getElementById("number");
const hearHow = document.getElementById("hear-select");
const feedback = document.getElementById("feedback");
const suggestions = document.getElementById("suggestions");
const otherInput = document.getElementById("other");

hearHow.addEventListener("change", () => {
    if (hearHow.value === "other") {
        otherInput.style.display = "block";
    } else {
        otherInput.style.display = "none";
    }
});

form.addEventListener("submit", (e) => {
    let errors = []; 
    e.preventDefault();

    if ((firstName.value.trim() === "" || firstName.value == null) || (lastName.value.trim() === "" || lastName.value == null)) {
        document.getElementById("name-section").style.backgroundColor = "var(--light-red)";
        document.querySelector("#name-section .required-error").innerText = "This field is required.";
        document.querySelector("#name-section .required-error").style.display = "block";
        errors.push(firstName);
    }
    else {
        document.getElementById("name-section").style.backgroundColor = "";
        document.querySelector("#name-section .required-error").style.display = "none";
    }
    if ((streetAddress.value.trim() === "" || streetAddress.value == null) || (address2.value.trim() === "" || address2.value == null) || (city.value.trim() === "" || city.value == null) || (state.value.trim() === "" || state.value == null) || (postal.value.trim() === "" || postal.value == null)) {
        document.getElementById("address-section").style.backgroundColor = "var(--light-red)";
        document.querySelector("#address-section .required-error").innerText = "This field is required.";
        document.querySelector("#address-section .required-error").style.display = "block";
        errors.push(streetAddress);
    }
    else {
        document.getElementById("address-section").style.backgroundColor = "";
        document.querySelector("#address-section .required-error").style.display = "none";
    }

    const phoneValue = phone.value.trim();
    const numberErrorEl = document.querySelector("#number-section #invalid-error");
    const numberReqEl = document.querySelector("#number-section .required-error");
    if (phoneValue === "" || phoneValue == null) {
        document.getElementById("number-section").style.backgroundColor = "var(--light-red)";
        numberReqEl.innerText = "This field is required.";
        numberReqEl.style.display = "block";
        errors.push(phone);
    }
    else if (phoneValue && /\D/.test(phoneValue)) {
        numberReqEl.style.display = "none";
        document.getElementById("number-section").style.backgroundColor = "var(--light-red)";
        numberErrorEl.innerText = "Only numbers are allowed.";
        numberErrorEl.style.display = "block";
        errors.push(phone);
    }
    else {
        document.getElementById("number-section").style.backgroundColor = "";
        numberErrorEl.style.display = "none";
    }

    const emailValue = email.value.trim();
    const emailErrorEl = document.getElementById("email-error");

    emailErrorEl.style.display = "none";
    document.getElementById("email-section").style.backgroundColor = "";

    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        document.getElementById("email-section").style.backgroundColor = "var(--light-red)";
        emailErrorEl.innerText = "Please enter a valid email address.";
        emailErrorEl.style.display = "block";
        errors.push(email);
    } else {
        document.getElementById("email-section").style.backgroundColor = "";
        emailErrorEl.style.display = "none";
    }

    const hearErrorEl = document.querySelector("#hear-section .required-error");
    if (hearHow.value == ""){
        document.getElementById("hear-section").style.backgroundColor = "var(--light-red)";
        hearErrorEl.innerText = "This field is required.";
        hearErrorEl.style.display = "block";
        errors.push(hearHow);
    }
    else {
        document.getElementById("hear-section").style.backgroundColor = "";
        hearErrorEl.style.display = "none";
    }
    if (hearHow.value === "other") {
        const otherInputText = document.getElementById("other-input-text");
        if (otherInputText.value.trim() === "" || otherInputText.value == null) {
            document.getElementById("hear-section").style.backgroundColor = "var(--light-red)";
            hearErrorEl.innerText = "This field is required.";
            hearErrorEl.style.display = "block";
            errors.push(otherInputText);
        }
        else {
            otherInputText.style.display = "none";
            hearErrorEl.style.display = "none";
            hearHow.value = otherInputText.value;
        }
    }
    
    const yes = document.getElementById("yes");
    const maybe = document.getElementById("maybe");
    const no = document.getElementById("no");
    let recommended = "";
    if (yes.checked){
        recommended = recommended + yes.value;
    }
    if (maybe.checked){
        recommended = recommended +", " + maybe.value;
    }
    if (no.checked){
        recommended = recommended +", " + no.value;
    }

    
    const tableInputs = [];
    const tableRows = document.querySelectorAll("table tbody tr");
    tableRows.forEach(row => {
        const inputs = Array.from(row.querySelectorAll("input"));
        const obj = {};
        for (let i = 0; i < 3; i++) {
            const input = inputs[i];
            const key = input.name;
            obj[key] = input ? input.value : "";
        }
        tableInputs.push(obj);
    });


    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        address: streetAddress.value,
        address2: address2.value,
        city: city.value,
        state: state.value,
        postal: postal.value,
        phone: phone.value,
        hearMethod: hearHow.value,
        feedback: feedback.value,
        suggestions: suggestions.value,
        recommend: recommended,
        tableData: tableInputs
    }

    if (errors.length > 0) {
        errors[0].scrollIntoView({ behavior: 'smooth' });
    }
    else {
        form.reset();
        document.getElementById("popup").style.display = "block";
        console.log(data);
    }


});
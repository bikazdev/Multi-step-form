const contentContainer = document.querySelector(".content");
const formContainer = document.querySelector(".form-container");
const plansContainer = document.querySelector(".plans-container");
const addOnsContainer = document.querySelector(".add-ons-container");
const finishContainer = document.querySelector(".finish-container");
const confirmContainer = document.querySelector(".confirm-container");
const headerContent = document.querySelector(".c-header");
const nextBtn = document.querySelector(".next");
const backBtn = document.querySelector(".back");
const confirmBtn = document.querySelector(".confirm");
const stepNumbers = document.querySelectorAll(".number");
const optionStepNumbers = document.querySelectorAll(".option");
const yearlyCheckBox = document.querySelector(".yearly");
const labelInput = document.querySelectorAll(".add-on");
const addOnsPrice = document.querySelectorAll(".add-on-price");
const finishAddOnsContainer = document.querySelector(".finish-add-ons");
const finishPlanContainer = document.querySelector(".finish-plan");
const finishTotalPrice = document.querySelector(".finish-total-price");
const inputs = formContainer.querySelectorAll("input");

let count = 1;

let myProduct = [];
let emptyFlag;


// Input validation conditions
inputs.forEach(function (input) {
  input.addEventListener("input", function (e) {
    if (e.target.validity.valueMissing) {
      e.target.nextElementSibling.innerHTML = "This field is required";
      input.style.border = '1px solid var(--primary-strawberry-red)'
    } else if (e.target.validity.patternMismatch) {
      e.target.nextElementSibling.innerHTML = `Valid ${e.target.type === 'tel' ? 'phone' : 'email'} required`;
        
      input.style.border = '1px solid var(--primary-strawberry-red)'
      console.log(input);
    } else {
      e.target.nextElementSibling.innerHTML = "";
      input.style.border = ''
    }
  });
  if(input.type === 'tel'){
    input.addEventListener("focus", () => {
      if (!input.value) {
        input.value = "+1";
      }
    });
    input.addEventListener("input", () => {
      if (!input.value.startsWith("+1")) {
        input.value = "+1";
      }
    });
  }
});

nextBtn.addEventListener("click", function () {
  emptyFlag = false;
  for (let input of inputs) {
    if (input.validity.valueMissing || input.validity.patternMismatch) {
      emptyFlag = true;
      input.nextElementSibling.innerHTML = "This field is required";
      input.style.border = '1px solid var(--primary-strawberry-red)'
    }
  }
  if (!emptyFlag) {
    count++;
    hideBtn(count, nextBtn, backBtn, confirmBtn);
    findStep(headerContent, products);
    displayStepNumber(stepNumbers, products);
  }
});

backBtn.addEventListener("click", function () {
  count--;
  hideBtn(count, nextBtn, backBtn, confirmBtn);
  findStep(headerContent, products);
  displayStepNumber(stepNumbers, products);
});

confirmBtn.addEventListener("click", function () {
  confirmContainer.classList.add("active");
  nextBtn.parentElement.style.display = "none";
  headerContent.style.display = "none";
  finishContainer.style.display = "none";

});


//If the annual option is activated, the prices of plans and add-ons will increase
yearlyCheckBox
  .querySelector("input")
  .addEventListener("click", function (event) {
    if (event.target.checked) {
      yearlyCheckBox.querySelector(".y").classList.add("active");
      yearlyCheckBox.querySelector(".m").classList.remove("active");
      // (2 free months) is active
      plansContainer.querySelectorAll(".caption span").forEach(function (span) {
        span.style.display = "block";
      });

      // By activating the annual option, this method takes the first digit of the plan prices and then adds 0 to that number
      plansContainer.querySelectorAll("p").forEach(function (pm) {
        pm.innerHTML = pm.innerHTML.split("/")[0] + "0/" + "yr";
        console.log(pm.innerHTML.split('/'));
      });
      addOnsPrice.forEach(function (addOn) {
        addOn.innerHTML = addOn.innerHTML.split("/")[0] + "0/" + "yr";
      });
      labelInput.forEach(function (input) {
        input.classList.remove("active");
        input.querySelector("input").removeAttribute("checked");
        input.querySelector("input").checked = false;
      });
      products[2].addOns.find(function (addOn) {
        addOn.isActive = false;
      });
    } else {
      yearlyCheckBox.querySelector(".y").classList.remove("active");
      yearlyCheckBox.querySelector(".m").classList.add("active");
      plansContainer.querySelectorAll(".caption span").forEach(function (span) {
        span.style.display = "none";
      });
      plansContainer.querySelectorAll("p").forEach(function (pm) {
        pm.innerHTML = pm.innerHTML.split("/")[0].split("0")[0] + "/mo";
      });
      addOnsPrice.forEach(function (addOn) {
        addOn.innerHTML = addOn.innerHTML.split("/")[0].split("0")[0] + "/mo";
      });
      labelInput.forEach(function (input) {
        input.classList.remove("active");
        input.querySelector("input").removeAttribute("checked");
        input.querySelector("input").checked = false;
      });
      products[2].addOns.find(function (addOn) {
        addOn.isActive = false;
      });
    }

  });

// If the desired input is activated, the checked attribute is added to it, and if it is deactivated, this attribute is removed
labelInput.forEach(function (input) {
  input.addEventListener("change", function (event) {
    let getInput = event.target;
    let getTitle = input.querySelector("h4").textContent;
    if (getInput.checked) {
      getInput.setAttribute("checked", "");
      input.classList.add("active");
      addOnsHandler(products, getTitle);
    } else {
      getInput.removeAttribute("checked");
      input.classList.remove("active");
      addOnsHandler(products, getTitle);
    }
  });
});


// If the object title is specific to the add-on and the add-on title is equal, the isActive option should be true or false
function addOnsHandler(product, getTitle) {
  let getProduct = product[2].addOns.find(function (addOn) {
    return addOn.title === getTitle;
  });
  if (!getProduct.isActive) {
    getProduct.isActive = true;
  } else {
    getProduct.isActive = false;
  }
}


// If the object ID is equal to the desired counter, the desired step will be displayed
function findStep(headerContent, allProductObj) {
  let getProduct = allProductObj.find(function (product) {
    return count === product.id;
  });

  switch (getProduct.id) {
    case 1:
      stepsHeaderHandler(headerContent, getProduct);
      nextStepHandler(
        plansContainer,
        addOnsContainer,
        finishContainer,
        // Shows this item
        formContainer
      );
      break;
    case 2:
      stepsHeaderHandler(headerContent, getProduct);
      nextStepHandler(
        formContainer,
        addOnsContainer,
        finishContainer,
        // Shows this item
        plansContainer
      );

      break;
    case 3:
      stepsHeaderHandler(headerContent, getProduct);
      nextStepHandler(
        formContainer,
        plansContainer,
        finishContainer,
        // Shows this item
        addOnsContainer
      );
      break;
    case 4:
      stepsHeaderHandler(headerContent, getProduct);
      nextStepHandler(
        formContainer,
        plansContainer,
        addOnsContainer,
        // Shows this item
        finishContainer
      );

      if (yearlyCheckBox.querySelector("input").checked) {
        finishHandler(products);
        finalStepPriceAddOnsHandler(
          myProduct,
          finishAddOnsContainer,
          yearlyCheckBox
        );
      } else {
        finishHandler(products);
        finalStepPriceAddOnsHandler(
          myProduct,
          finishAddOnsContainer,
          yearlyCheckBox
        );
      }
      finalPlanPriceHandler(myProduct, finishPlanContainer, yearlyCheckBox);
      totalPriceHandler(myProduct, yearlyCheckBox);
      break;
  }
}

// Total calculation
function totalPriceHandler(myProduct, yearlyCheckBox) {
  let totalPrice = 0;
  let getAddOnPrice = myProduct[1].map(function (product) {
    return Number(product.price);
  });

  for (let i = 0; i < getAddOnPrice.length; i++) {
    totalPrice += getAddOnPrice[i];
  }

  if (yearlyCheckBox.querySelector("input").checked) {
    finishTotalPrice.lastElementChild.innerHTML =
      "+$" + (totalPrice + myProduct[0].price) + "0/yr";
  } else {
    finishTotalPrice.lastElementChild.innerHTML =
      "+$" + (totalPrice + myProduct[0].price) + "/mo";
  }
}

// Calculate the price of the selected plan in the final step
function finalPlanPriceHandler(myProduct, finishPlanContainer, yearActive) {
  finishPlanContainer.innerHTML = "";
  finishPlanContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="finish-plan-caption">
      <h4>${
        yearlyCheckBox.querySelector("input").checked
          ? myProduct[0].title + " (Yearly)"
          : myProduct[0].title + " (Monthly)"
      }</h4>
      <a href="#" onclick='changePlanHandler(event)'>Change</a>
    </div>
    <span>${
      yearActive.querySelector("input").checked
        ? "$" + myProduct[0].price + "0/yr"
        : "$" + myProduct[0].price + "/mo"
    }</span>
  `
  );
}


// Calculate the final price and display it in the final step
function finalStepPriceAddOnsHandler(myProduct, finishAddOnsContainer, yearActive) {
  finishAddOnsContainer.innerHTML = "";
  myProduct[1].forEach(function (addOns) {
    let finishAddOn = document.createElement("div");
    finishAddOn.classList.add("finish-add-on");
    let finishAddOnName = document.createElement("span");
    finishAddOnName.classList.add("finish-add-on");
    let finishAddOnPrice = document.createElement("span");
    finishAddOnPrice.classList.add("finish-add-on");

    finishAddOnName.innerHTML = addOns.title;
    finishAddOnPrice.innerHTML = yearActive.querySelector("input").checked
      ? "$" + addOns.price + "0/yr"
      : "$" + addOns.price + "/mo";

    finishAddOn.append(finishAddOnName, finishAddOnPrice);
    finishAddOnsContainer.append(finishAddOn);
  });
}

function changeButton(event) {
  event.preventDefault();
  count = 2;
  hideBtn(count, nextBtn, backBtn, confirmBtn);
  findStep(headerContent, products);
  displayStepNumber(stepNumbers, products);
}

// Transfer all active add-ons and plans from the main array to the desired array
function finishHandler(products) {
  let getPlan = products[1].plans.filter(function (plan) {
    return plan.isActive === true;
  });
  let getAddOns = products[2].addOns.filter(function (addOn) {
    return addOn.isActive === true;
  });
  myProduct = []; 
  myProduct.push(...getPlan, getAddOns);
}

// Header management of each stage
function stepsHeaderHandler(headerContent, getProduct) {
  headerContent.innerHTML = "";
  headerContent.insertAdjacentHTML(
    "beforeend",
    `<h3>${getProduct.headerName}</h3>
      <p>${getProduct.headerDes}</p>`
  );
}

function plansHandler(contentContainer, getProduct) {
  // Get all the plans
  let plansElem = contentContainer.querySelectorAll(".plan");
  plansElem.forEach(function (plan) {
    // After clicking on each plan, the previous plan will be deactivated and the clicked plan will be activated
    plan.addEventListener("click", function () {
      removeActivePlan(plansElem);
      plan.classList.add("active");

      let getPlan = getProduct.plans.find(function (getPlan) {
        return getPlan.title === plan.querySelector("h4").innerHTML;
      });
      if (getPlan.isActive === false) {
        disableAllPlans(getProduct.plans);
        getPlan.isActive = true;
      }
    });
  });
}

// Disable all plans
function disableAllPlans(element) {
  element.map(function (el) {
    el.isActive = false;
  });
}

// Remove active plan after click
function removeActivePlan(element) {
  element.forEach(function (el) {
    el.classList.remove("active");
  });
}

// Hide the steps and show the desired step
function nextStepHandler(item1, item2, item3, show) {
  item1.classList.remove("active");
  item2.classList.remove("active");
  item3.classList.remove("active");
  show.classList.add("active");
}

// Hide the buttons and show the desired button
function hideBtn(count, nextBtn, backBtn, confirmBtn) {
  if (count === 1) {
    nextBtn.classList.remove("active");
    backBtn.classList.add("active");
    confirmBtn.classList.remove("active");
  } else if (count === 4) {
    nextBtn.classList.add("active");
    backBtn.classList.remove("active");
    confirmBtn.classList.add("active");
  } else {
    nextBtn.classList.remove("active");
    confirmBtn.classList.remove("active");
    backBtn.classList.remove("active");
  }
}

// Display step number
function displayStepNumber(stepNumbers, products) {
  // Display the step number and clear the active step after going to the next step
  stepNumbers.forEach(function (step, index) {
    step.innerHTML = index + 1;
    step.classList.remove("active");
  });

  // Finding the ID of the desired object with the activated step counter
  let productId = products.find(function (product) {
    return product.id === count;
  });

  switch (productId.id) {
    case 1:
      stepNumbers[0].classList.add("active");
      break;
    case 2:
      stepNumbers[1].classList.add("active");
      break;
    case 3:
      stepNumbers[2].classList.add("active");
      break;
    case 4:
      stepNumbers[3].classList.add("active");
      break;
  }
}

plansHandler(contentContainer, products[1]);
findStep(headerContent, products);
displayStepNumber(stepNumbers, products);

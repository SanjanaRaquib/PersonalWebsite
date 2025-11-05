'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// filter function with normalized strings
const filterFunc = function (selectedValue) {
  const normalizedValue = selectedValue.trim().toLowerCase();

  filterItems.forEach(item => {
    const itemCategory = (item.dataset.category || "").trim().toLowerCase();

    if (normalizedValue === "all" || normalizedValue === itemCategory) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// add event in all select items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText;
    selectValue.innerText = selectedValue;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// add event in all filter button items for large screen
filterBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.textContent.trim();
    selectValue.textContent = selectedValue;
    filterFunc(selectedValue);

    filterBtn.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
navigationLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.textContent.trim().toLowerCase();

    let pageFound = false;

    pages.forEach(page => {
      const pageName = page.dataset.page.trim().toLowerCase();
      const isMatch = pageName === targetPage;

      page.classList.toggle("active", isMatch);
      if (isMatch) pageFound = true;
    });

    navigationLinks.forEach(navLink => {
      navLink.classList.toggle("active", navLink === link);
    });

    // fallback: if no match, show home
    if (!pageFound) {
      const homePage = document.querySelector('[data-page="home"]');
      if (homePage) homePage.classList.add("active");
    }

    window.scrollTo(0, 0);
  });
});



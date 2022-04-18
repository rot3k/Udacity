/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

// Variable for "section" element
const sections = document.querySelectorAll("section");
// Variable for nav ul
const navList = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// create nav function
function createNav() {
  // Variable for store data (data-nav)
  const fragment = document.createDocumentFragment();
  // Iteration for sections (li, a)
  for (const section of sections) {
    // Variable for anchor name
    const sectionData = section.getAttribute("data-nav");
    // Create li
    const li = document.createElement("li");
    // Create anchor
    const anchor = document.createElement("a");
    // add menu_link class to anchor
    anchor.classList.add("menu__link");
    // add name for anchor
    anchor.innerText = sectionData;
    // add scrollTo function (check below)
    scrollTo(anchor, section);
    //append anchor to li
    li.appendChild(anchor);
    //append li to date structure
    fragment.appendChild(li);
  }
  // append li to ul
  navList.appendChild(fragment);
}

// check element location
function findSectionLocation(e) {
  let isIntoView;
  let location = e.getBoundingClientRect();
  if (location.top <= 150 && location.bottom >= 150) {
    isIntoView = true;
  }
  return isIntoView;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

createNav();

// Add class 'active' to section when near top of viewport
function activeSection() {
  for (const section of sections) {
    if (findSectionLocation(section)) {
      // if there is not your-active-class on the current viewpoint
      if (!section.classList.contains("your-active-class")) {
        // add your-active-class
        section.classList.add("your-active-class");
      }
    } else {
      // if there is, remove your-active-class
      section.classList.remove("your-active-class");
    }
  }
}

// Scroll to anchor ID using scrollTO event
// if e1 is clicked, screen would be scrolled to e2
function scrollTo(e1, e2) {
  e1.addEventListener("click", function (e) {
    e.preventDefault();
    e2.scrollIntoView({
      behavior: "smooth",
    });
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
document.addEventListener("scroll", activeSection);

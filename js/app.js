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
 * Define Global Variables
 */

const pageSections =
  document.querySelectorAll("section");

const pageNavbar = document.querySelector(
  "#navbar__list"
);

/**
 * End Global Variables
 */

// build the nav
// Scroll to anchor ID using scrollTO event

console.log(
  `There is ${pageSections.length} sections in the page`
);

pageSections.forEach(function (sec) {
  const dataNav = sec.getAttribute("data-nav");
  const link = document.createElement("li");
  link.textContent = dataNav;
  link.classList.add("menu__link");
  pageNavbar.appendChild(link);

  link.addEventListener(
    "click",
    function (eventObj) {
      eventObj.preventDefault();
      sec.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  );
});

// Add class 'active' to section when near top of viewport
// refrence of Api: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

let callback = (entries, observer) => {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      let activeSec = entry.target;

      pageSections.forEach(function (sec) {
        if (
          sec.classList.contains(
            "your-active-class"
          )
        ) {
          //remove active class from all sections

          sec.classList.remove(
            "your-active-class"
          );

          // Scroll to section on link click
          //iterate over links

          const navbarLinks =
            document.querySelectorAll(
              ".menu__link"
            );
          navbarLinks.forEach(function (link) {
            if (
              link.textContent ===
              activeSec.getAttribute("data-Nav")
            ) {
              link.classList.add("active-link");
            } else {
              link.classList.remove(
                "active-link"
              );
            }
          });
        }
      });

      // Set section as active
      activeSec.classList.add(
        "your-active-class"
      );
    }
  });
};

let options = {
  root: null,
  rootMargin: "10px",
  threshold: 0.8,
};

pageSections.forEach(function (sec) {
  let observer = new IntersectionObserver(
    callback,
    options
  );
  observer.observe(sec);
});

// Add a scroll to top button on the page
// back to top button
const pageTop = document.querySelector(
  ".top-element"
);

const topButton =
  document.querySelector("#toTop");
topButton.addEventListener(
  "click",
  function (eventObj) {
    document;
    eventObj.preventDefault();
    pageTop.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
);

//Make the button only visible when the user scrolls below the fold of the page.

const pageHeader =
  document.getElementById("toTop");

let mainCallback = (entries, observer) => {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      // let activeSec = entry.target;
      pageHeader.style.cssText =
        "visibility: hidden;";
    } else {
      pageHeader.style.cssText =
        "visibility: visible;";
    }
  });
};

let options2 = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
};

let pageMain =
  document.querySelector("#section1");

let mainObserver = new IntersectionObserver(
  mainCallback,
  options2
);
mainObserver.observe(pageMain);

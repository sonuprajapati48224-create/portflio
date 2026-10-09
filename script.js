
"use strict";

// 1. Test JavaScript connection
console.log("Hello World!");

for (let i = 1; i <= 5; i++) {
    console.log(`Hello ${i}`);
}

console.log("Vishnu's portfolio JavaScript is connected!");

// 2. Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close mobile menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Close menu with Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// 3. Automatically update footer year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// 4. Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, " +
    ".project-card, .contact-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("js-reveal");
        observer.observe(element);
    });
}

// 5. Highlight the current navigation section
const sections = document.querySelectorAll("main section[id]");
const navItems = navLinks.querySelectorAll('a[href^="#"]');

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        const isCurrent =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isCurrent);
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// Light/dark appearance toggle.
// In this stylesheet, body.dark means LIGHT appearance;
// no class means the original DARK design.
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    const updateThemeLabel = () => {
        const isLightMode = document.body.classList.contains("dark");
        themeToggle.textContent = isLightMode
            ? "Switch to dark mode"
            : "Switch to light mode";
        themeToggle.setAttribute("aria-pressed", String(isLightMode));
    };

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        updateThemeLabel();
    });

    updateThemeLabel();
}

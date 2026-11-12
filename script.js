// ============================================================
// PRN JARVIS OS
// SINGLE SCREEN DEVELOPER PORTFOLIO
// ============================================================

"use strict";


// ============================================================
// 1. CONFIGURATION
// ============================================================

const EMAILJS_PUBLIC_KEY = "VYb2DlRSoCSbvpeGo";
const EMAILJS_SERVICE_ID = "service_7lgtoct";
const EMAILJS_TEMPLATE_ID = "template_5nyaqox";

// Initialize EmailJS safely.
if (window.emailjs) {
    window.emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
} else {
    console.error("EmailJS SDK was not loaded. Check index.html.");
}

const CLICK_SOUND_PATH = "./assets/jarvis-click.wav";
const TOAST_DURATION = 2600;
const CLICK_SOUND_ENABLED = true;


// ============================================================
// 2. SELECT HTML ELEMENTS
// ============================================================

const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.getElementById("menuToggle");
const jarvisToggle = document.getElementById("jarvisToggle");
const panelBackdrop = document.getElementById("panelBackdrop");
const systemPanel = document.getElementById("systemPanel");
const panelContent = document.getElementById("panelContent");
const panelCode = document.getElementById("panelCode");
const closePanelButton = document.getElementById("closePanel");
const toast = document.getElementById("toast");
const hudTooltip = document.getElementById("hudTooltip");


// ============================================================
// 3. INFORMATION FOR EACH JARVIS WINDOW
// ============================================================

const panelTemplates = {

    about: `
        <div class="panel-kicker">01 // IDENTITY PROFILE</div>

        <h2 id="panelTitle">ABOUT <em>ME</em></h2>

        <p>
            I'm Pratik Ranjan Nayak, an aspiring Full Stack
            Developer interested in building practical,
            user-friendly applications.

            I have a foundation in Java, Python, web technologies
            and database management, and I enjoy learning by
            creating real projects.
        </p>

        <div class="data-grid">

            <article class="data-card">
                <small>EDUCATION</small>
                <h3>B.TECH · CSE (IoT)</h3>
                <p>GITA Autonomous College, Bhubaneswar</p>
            </article>

            <article class="data-card">
                <small>LOCATION</small>
                <h3>BBSR, ODISHA</h3>
                <p>India</p>
            </article>

            <article class="data-card">
                <small>DEVELOPMENT FOCUS</small>
                <h3>FULL STACK</h3>
                <p>
                    Backend development, databases
                    and responsive interfaces.
                </p>
            </article>

            <article class="data-card">
                <small>WORK STYLE</small>
                <h3>BUILD & LEARN</h3>
                <p>
                    Hands-on projects, debugging
                    and continuous improvement.
                </p>
            </article>

        </div>
    `,

    skills: `
        <div class="panel-kicker">02 // TECHNICAL CAPABILITIES</div>

        <h2>MY <em>SKILLS</em></h2>

        <div class="skill-grid">

            <div class="skill-box">
                <b>JAVA</b>
                <span>
                    Core Java, OOP, Collections,
                    JDBC, Servlets and JSP
                </span>
            </div>

            <div class="skill-box">
                <b>SPRING BOOT</b>
                <span>
                    Currently learning Spring Boot
                    and backend application development
                </span>
            </div>

            <div class="skill-box">
                <b>PYTHON</b>
                <span>
                    Python fundamentals
                    and programming concepts
                </span>
            </div>

            <div class="skill-box">
                <b>DJANGO</b>
                <span>
                    Learning Django for
                    Python-based web development
                </span>
            </div>

            <div class="skill-box">
                <b>WEB TECHNOLOGIES</b>
                <span>HTML, CSS and JavaScript</span>
            </div>

            <div class="skill-box">
                <b>DATABASES</b>
                <span>
                    MySQL, PostgreSQL
                    and Oracle SQL fundamentals
                </span>
            </div>

            <div class="skill-box">
                <b>TOOLS</b>
                <span>
                    Eclipse, Git, GitHub,
                    Apache Tomcat and Arduino IDE
                </span>
            </div>

            <div class="skill-box">
                <b>CORE CONCEPTS</b>
                <span>
                    Data Structures, Algorithms,
                    debugging and IoT basics
                </span>
            </div>

        </div>
    `,

    projects: `
        <div class="panel-kicker">03 // SELECTED BUILDS</div>

        <h2>MY <em>PROJECTS</em></h2>

        <div class="project-list">

            <article class="project-entry">
                <h3>LUDO FOOD DELIVERY</h3>

                <p>
                    A food delivery application concept with
                    restaurant listings, restaurant-specific
                    menus, cart and ordering flow.

                    Its standout feature is a Ludo mini-game
                    where a winning user receives a discount coupon.
                </p>

                <div class="tags">
                    <span>JAVA</span>
                    <span>SERVLETS/JSP</span>
                    <span>JDBC</span>
                    <span>MYSQL</span>
                    <span>HTML/CSS/JS</span>
                </div>
            </article>

            <article class="project-entry">
                <h3>REAL-TIME RAILWAY BOARDING DATA</h3>

                <p>
                    An IoT prototype that uses IR sensors
                    to count passenger entry and exit,
                    displays the count on an LCD and
                    shares data with a web dashboard.
                </p>

                <div class="tags">
                    <span>ARDUINO UNO</span>
                    <span>IR SENSORS</span>
                    <span>LCD</span>
                    <span>FLASK</span>
                </div>
            </article>

            <article class="project-entry">
                <h3>OBSTACLE AVOIDING ROBO CAR</h3>

                <p>
                    An Arduino-based robotics project
                    that detects nearby obstacles and
                    navigates around them using sensor
                    input and motor control.
                </p>

                <div class="tags">
                    <span>ARDUINO</span>
                    <span>SENSORS</span>
                    <span>ROBOTICS</span>
                </div>
            </article>

        </div>
    `,

    experience: `
        <div class="panel-kicker">04 // LEARNING JOURNEY</div>

        <h2>EXPERIENCE & <em>EDUCATION</em></h2>

        <div class="timeline-list">

            <article class="timeline-entry">
                <small>INTERNSHIP / TRAINING</small>
                <h3>FULL STACK JAVA — TAP ACADEMY</h3>
                <p>
                    Currently developing full stack Java
                    skills through structured learning
                    and practical exercises.
                </p>
            </article>

            <article class="timeline-entry">
                <small>COMPLETED INTERNSHIP</small>
                <h3>PYTHON DEVELOPMENT — SAHNAR TECHNOLOGIES</h3>
                <p>
                    Completed a Python development internship
                    focused on programming and development
                    fundamentals.
                </p>
            </article>

            <article class="timeline-entry">
                <small>2022 — 2026</small>
                <h3>B.TECH · COMPUTER SCIENCE & ENGINEERING (IoT)</h3>
                <p>
                    GITA Autonomous College,
                    Bhubaneswar.
                </p>
            </article>

        </div>
    `,

    contact: `
        <div class="panel-kicker">05 // ESTABLISH CONNECTION</div>

        <h2>LET'S <em>CONNECT</em></h2>

        <p>
            Have an idea, opportunity or project
            in mind? Send a message.
        </p>

        <div class="contact-layout">

            <div class="contact-details">

                <a
                    href="mailto:pratikranjan398@gmail.com"
                    data-hud-text="SEND EMAIL"
                >
                    ✉ &nbsp; pratikranjan398@gmail.com
                </a>

                <a
                    href="https://www.linkedin.com/in/pratik-ranjan-nayak-2518b4267"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hud-text="OPEN LINKEDIN"
                >
                    in &nbsp; LINKEDIN PROFILE ↗
                </a>

                <a
                    href="https://github.com/ludo8018"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hud-text="OPEN GITHUB"
                >
                    ⌘ &nbsp; GITHUB PROFILE ↗
                </a>

            </div>

            <form class="contact-form" id="contactForm">

                <label>
                    YOUR NAME
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Enter your name"
                    >
                </label>

                <label>
                    YOUR EMAIL
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                    >
                </label>

                <label>
                    MESSAGE
                    <textarea
                        name="message"
                        rows="3"
                        required
                        placeholder="Write your message"
                    ></textarea>
                </label>

                <button
                    class="send-button"
                    type="submit"
                    data-hud-text="PREPARE EMAIL"
                >
                    PREPARE MESSAGE ↗
                </button>

            </form>

        </div>
    `
};


// ============================================================
// 4. OPEN JARVIS INFORMATION WINDOW
// ============================================================

function openPanel(panelName) {

    if (panelName === "home") {
        closePanel();
        return;
    }

    const content = panelTemplates[panelName];

    if (!content) {
        console.warn(`JARVIS panel not found: ${panelName}`);
        return;
    }

    if (panelContent) {
        panelContent.innerHTML = content;
    }

    if (panelCode) {
        panelCode.textContent = panelName.toUpperCase();
    }

    if (panelBackdrop) {
        panelBackdrop.classList.add("open");
        panelBackdrop.setAttribute("aria-hidden", "false");
    }

    document.body.classList.add("panel-open");

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.panel === panelName
        );
    });

    closeMobileMenu();

    if (systemPanel) {
        systemPanel.focus();
    }

    if (panelName === "contact") {
        bindContactForm();
    }
}


// ============================================================
// 5. CLOSE JARVIS INFORMATION WINDOW
// ============================================================

function closePanel() {

    if (panelBackdrop) {
        panelBackdrop.classList.remove("open");
        panelBackdrop.setAttribute("aria-hidden", "true");
    }

    document.body.classList.remove("panel-open");

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.panel === "home"
        );
    });

    hideHudText();
}


// ============================================================
// 6. CLOSE MOBILE NAVIGATION
// ============================================================

function closeMobileMenu() {

    if (nav) {
        nav.classList.remove("open");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    }
}


// ============================================================
// 7. NAVIGATION CLICK EVENTS
// ============================================================

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const panelName = link.dataset.panel;

        if (!panelName) return;

        openPanel(panelName);

    });

});


// ============================================================
// 8. VIEW MY WORK / OPEN PANEL BUTTONS
// ============================================================

document.querySelectorAll("[data-open]").forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const panelName = button.dataset.open;

        if (!panelName) return;

        openPanel(panelName);

    });

});


// ============================================================
// 9. CLICK PRN LOGO TO RETURN HOME
// ============================================================

const homeBrand = document.getElementById("homeBrand");

if (homeBrand) {

    homeBrand.addEventListener("click", event => {

        event.preventDefault();

        closePanel();

        closeMobileMenu();

    });

}


// ============================================================
// 10. CLOSE PANEL BUTTON
// ============================================================

if (closePanelButton) {
    closePanelButton.addEventListener("click", closePanel);
}


// ============================================================
// 11. CLICK OUTSIDE THE PANEL TO CLOSE
// ============================================================

if (panelBackdrop) {

    panelBackdrop.addEventListener("click", event => {

        if (event.target === panelBackdrop) {
            closePanel();
        }

    });

}


// ============================================================
// 12. ESCAPE KEY
// ============================================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (
            panelBackdrop &&
            panelBackdrop.classList.contains("open")
        ) {
            closePanel();
        }

        closeMobileMenu();
        hideHudText();

    }

});


// ============================================================
// 13. MOBILE NAVIGATION TOGGLE
// ============================================================

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}


// ============================================================
// 14. JARVIS MODE ON / OFF
// ============================================================

if (jarvisToggle) {

    jarvisToggle.addEventListener("click", () => {

        const enabled =
            jarvisToggle.getAttribute("aria-pressed") !== "true";

        jarvisToggle.setAttribute(
            "aria-pressed",
            String(enabled)
        );

        document.body.classList.toggle(
            "calm-mode",
            !enabled
        );

        showToast(
            enabled
                ? "JARVIS visual systems online"
                : "Reduced visual effects enabled"
        );

    });

}

// ============================================================
// 15. EMAILJS CONTACT FORM
// ============================================================

function bindContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    // Prevent duplicate event listeners.
    if (form.dataset.bound === "true") return;

    form.dataset.bound = "true";

    form.addEventListener("submit", async function(event) {

        event.preventDefault();

        const submitButton = form.querySelector(".send-button");

        if (!submitButton) return;

        const originalText = submitButton.textContent;

        // Check EmailJS SDK.
        if (!window.emailjs) {

            showToast("EMAIL SERVICE NOT LOADED!");

            console.error("EmailJS SDK is missing.");

            return;
        }

        // Collect visitor details.
        const formData = new FormData(form);

        const templateParams = {
            from_name: formData.get("name"),
            from_email: formData.get("email"),
            message: formData.get("message")
        };

        try {

            // Show sending status.
            submitButton.disabled = true;
            submitButton.textContent = "TRANSMITTING...";

            // Send email through EmailJS.
            await window.emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            // Success notification.
            showToast("MESSAGE SENT SUCCESSFULLY!");

            // Clear the form.
            form.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            showToast("MESSAGE FAILED. PLEASE TRY AGAIN.");

        } finally {

            // Restore button.
            submitButton.disabled = false;
            submitButton.textContent = originalText;

        }

    });

}


// ============================================================
// 16. TOAST NOTIFICATION
// ============================================================

let toastTimer = null;

function showToast(message) {

    if (!toast) {

        console.log("JARVIS:", message);

        return;
    }

    // Set notification text.
    toast.textContent = message;

    // Show notification.
    toast.classList.add("show");

    // Clear previous timer.
    if (toastTimer !== null) {
        clearTimeout(toastTimer);
    }

    // Hide notification after configured duration.
    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

        toastTimer = null;

    }, TOAST_DURATION);

}


// ============================================================
// 17. JARVIS FLOATING HUD TEXT
// ============================================================

// Floating text for buttons and navigation.
// This uses delegated events so dynamically created panel
// buttons and contact links also receive HUD text.

const hudMessages = {

    homeBrand: "SYSTEM HOME",

    menuToggle: "OPEN NAVIGATION",

    jarvisToggle: "SYSTEM CONTROL",

    voiceToggle: "VOICE SYSTEM",

    closePanel: "CLOSE INTERFACE"

};


const navigationMessages = {

    home: "SYSTEM HOME",

    about: "ACCESSING PROFILE",

    skills: "TECHNICAL DATABASE",

    projects: "PROJECT DATABASE",

    experience: "EXPERIENCE RECORDS",

    contact: "ESTABLISH CONNECTION"

};


// ------------------------------------------------------------
// Get HUD text for an element.
// ------------------------------------------------------------

function getHudMessage(element) {

    if (!element) return "EXECUTE COMMAND";

    // Custom text has the highest priority.
    if (element.dataset.hudText) {
        return element.dataset.hudText;
    }

    // Known element IDs.
    if (hudMessages[element.id]) {
        return hudMessages[element.id];
    }

    // Navigation panel.
    const panelName = element.dataset.panel;

    if (navigationMessages[panelName]) {
        return navigationMessages[panelName];
    }

    // Open panel action.
    const openPanelName = element.dataset.open;

    if (navigationMessages[openPanelName]) {
        return navigationMessages[openPanelName];
    }

    // Fallback for navigation.
    if (element.classList.contains("nav-link")) {
        return "SYSTEM INTERFACE";
    }

    // Fallback for buttons and links.
    return "EXECUTE COMMAND";

}


// ------------------------------------------------------------
// Show floating HUD text.
// ------------------------------------------------------------

function showHudText(element, event) {

    if (!hudTooltip || !element || !event) return;

    const message = getHudMessage(element);

    hudTooltip.textContent = message;

    hudTooltip.classList.add("active");

    moveHudText(event);

}


// ------------------------------------------------------------
// Move floating text with cursor.
// ------------------------------------------------------------

function moveHudText(event) {

    if (!hudTooltip || !event) return;

    const offset = 18;

    const tooltipWidth = hudTooltip.offsetWidth;

    const tooltipHeight = hudTooltip.offsetHeight;

    let x = event.clientX + offset;

    let y = event.clientY + offset;

    // Keep tooltip inside horizontal viewport.
    if (x + tooltipWidth > window.innerWidth) {
        x = event.clientX - tooltipWidth - offset;
    }

    // Keep tooltip inside vertical viewport.
    if (y + tooltipHeight > window.innerHeight) {
        y = event.clientY - tooltipHeight - offset;
    }

    // Avoid negative position.
    x = Math.max(4, x);

    y = Math.max(4, y);

    hudTooltip.style.left = `${x}px`;

    hudTooltip.style.top = `${y}px`;

}


// ------------------------------------------------------------
// Hide floating HUD text.
// ------------------------------------------------------------

function hideHudText() {

    if (!hudTooltip) return;

    hudTooltip.classList.remove("active");

}


// ------------------------------------------------------------
// HUD hover events.
// ------------------------------------------------------------

// Use document delegation to include dynamically created elements.

document.addEventListener("mouseover", event => {

    const target = event.target;

    if (!(target instanceof Element)) return;

    const interactiveElement = target.closest(
        "button, a, [role='button']"
    );

    if (!interactiveElement) return;

    // Ignore movement between children of the same control.
    if (
        event.relatedTarget instanceof Node &&
        interactiveElement.contains(event.relatedTarget)
    ) {
        return;
    }

    showHudText(interactiveElement, event);

});


document.addEventListener("mousemove", event => {

    if (!hudTooltip) return;

    if (!hudTooltip.classList.contains("active")) return;

    moveHudText(event);

});


document.addEventListener("mouseout", event => {

    const target = event.target;

    if (!(target instanceof Element)) return;

    const interactiveElement = target.closest(
        "button, a, [role='button']"
    );

    if (!interactiveElement) return;

    // Keep HUD visible while moving inside the same control.
    if (
        event.relatedTarget instanceof Node &&
        interactiveElement.contains(event.relatedTarget)
    ) {
        return;
    }

    hideHudText();

});

// ============================================================
// 18. JARVIS BUTTON CLICK SOUND
// ============================================================

let jarvisClickAudio = null;


// ------------------------------------------------------------
// Initialize click sound.
// ------------------------------------------------------------

function initializeClickSound() {

    if (!CLICK_SOUND_ENABLED) {

        console.log("JARVIS click sound is disabled.");

        return;

    }

    try {

        const audioURL = new URL(
            CLICK_SOUND_PATH,
            document.baseURI
        );

        jarvisClickAudio = new Audio(audioURL.href);

        jarvisClickAudio.preload = "auto";

        jarvisClickAudio.addEventListener("canplaythrough", () => {

            console.log(
                "JARVIS click sound loaded successfully:",
                audioURL.href
            );

        });

        jarvisClickAudio.addEventListener("error", () => {

            console.error(
                "JARVIS click sound could not be loaded.",
                "Check the file path:",
                audioURL.href
            );

        });

        jarvisClickAudio.load();

    } catch (error) {

        console.error(
            "JARVIS audio initialization failed:",
            error
        );

    }

}


// ------------------------------------------------------------
// Play click sound.
// ------------------------------------------------------------

function playJarvisClick() {

    if (!CLICK_SOUND_ENABLED) return;

    if (!jarvisClickAudio) {

        console.warn("JARVIS audio is not initialized.");

        return;

    }

    try {

        const clickAudio = jarvisClickAudio.cloneNode(true);

        clickAudio.currentTime = 0;

        const playbackPromise = clickAudio.play();

        if (playbackPromise !== undefined) {

            playbackPromise.catch(error => {

                console.warn(
                    "JARVIS click sound playback failed:",
                    error
                );

            });

        }

    } catch (error) {

        console.error(
            "Unable to play JARVIS click sound:",
            error
        );

    }

}


// ------------------------------------------------------------
// Play sound on interactive controls.
// ------------------------------------------------------------

document.addEventListener(
    "click",
    event => {

        const target = event.target;

        if (!(target instanceof Element)) return;

        const clickedElement = target.closest(
            "button, a, [role='button']"
        );

        if (!clickedElement) return;

        playJarvisClick();

    },
    true
);


// ============================================================
// 19. INITIALIZE JARVIS SYSTEM
// ============================================================

function initializeJarvisPortfolio() {

    console.log("========================================");

    console.log("PRN JARVIS OS");

    console.log("Portfolio system initializing...");

    console.log("========================================");


    // Initialize click audio.
    initializeClickSound();


    // Ensure the panel starts hidden.
    if (panelBackdrop) {

        panelBackdrop.setAttribute(
            "aria-hidden",
            panelBackdrop.classList.contains("open")
                ? "false"
                : "true"
        );

    }


    // Ensure mobile navigation starts closed.
    closeMobileMenu();


    // Initialize JARVIS button accessibility state.
    if (jarvisToggle) {

        if (!jarvisToggle.hasAttribute("aria-pressed")) {

            jarvisToggle.setAttribute(
                "aria-pressed",
                "true"
            );

        }

    }


    // Set Home as active if no navigation item is active.
    const hasActiveNavigation = Array.from(navLinks).some(
        link => link.classList.contains("active")
    );

    if (!hasActiveNavigation) {

        navLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.panel === "home"
            );

        });

    }


    console.log("PRN JARVIS OS initialized successfully.");

    console.log("Welcome, Pratik. Systems online.");

}


// ============================================================
// 20. START PORTFOLIO
// ============================================================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeJarvisPortfolio
    );

} else {

    initializeJarvisPortfolio();

}


// ============================================================
// END OF SCRIPT.JS
// ============================================================
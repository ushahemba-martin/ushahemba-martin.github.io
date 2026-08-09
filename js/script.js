// ===========================
// ACTIVE NAVIGATION ON SCROLL
// ===========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// ===========================
// AUTOMATIC COPYRIGHT YEAR
// ===========================

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();

/* =========================================================
   MOBILE NAVIGATION MENU
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuOpen = document.querySelector(".menu-open");
    const menuClose = document.querySelector(".menu-close");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu .nav-links a");
    const btnContact = document.querySelector(".nav-menu .btn-contact");


    // Make sure the elements exist
    if (!menuOpen || !menuClose || !navMenu || !btnContact) {

        console.error("Mobile menu elements were not found.");

        return;
    }


    /* =====================================================
       OPEN MENU
    ===================================================== */

    menuOpen.addEventListener("click", () => {

        navMenu.classList.add("active");

        document.body.classList.add("menu-open");

        menuOpen.setAttribute("aria-expanded", "true");

    });


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    menuClose.addEventListener("click", () => {

        navMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuOpen.setAttribute("aria-expanded", "false");

    });


    /* =====================================================
       CLOSE WHEN NAVIGATION LINK IS CLICKED
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuOpen.setAttribute("aria-expanded", "false");

        });

    });


    /* =====================================================
       WORK WITH ME BUTTON
    ===================================================== */

    btnContact.addEventListener("click", () => {

        navMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuOpen.setAttribute("aria-expanded", "false");

    });

});

/* =========================================================
   MOBILE SCROLL REVEAL ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Only run this animation system on mobile
    if (window.innerWidth > 600) {
        return;
    }


    /* =====================================================
       ELEMENTS TO REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(`

        .about-left,
        .timeline-item,
        .about-card,

        .projects-header,
        .projects-group,
        .projects-roadmap,

        .service-card,
        .services-future,
        .services-cta,

        .contact-header,
        .contact-info,
        .contact-form-container,
        .contact-bottom,

        .footer-brand,
        .footer-links,
        .footer-contact

    `);


    /* =====================================================
       ADD REVEAL CLASS
    ===================================================== */

    revealElements.forEach(element => {

        element.classList.add("mobile-reveal");

    });


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "mobile-reveal-active"
                    );

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    /* =====================================================
       START OBSERVING
    ===================================================== */

    revealElements.forEach(element => {

        observer.observe(element);

    });

});

/* =========================================================
   MOBILE TOUCH INTERACTION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const mobileInteractiveElements = document.querySelectorAll(
        ".project-card, " +
        ".service-card, " +
        ".highlight-card, " +
        ".timeline-content, " +
        ".about-card, " +
        ".roadmap-item, " +
        ".services-future, " +
        ".services-cta, " +
        ".btn-primary, " +
        ".btn-secondary, " +
        ".btn-contact, " +
        ".footer-contact-link, " +
        ".contact-socials a, " +
        ".nav-menu .nav-links a, " +
        ".menu-open, " +
        ".menu-close"
    );


    /* -----------------------------------------------------
       REMOVE ACTIVE STATE FROM ALL ELEMENTS
       ----------------------------------------------------- */

    function removeMobileActive() {

        mobileInteractiveElements.forEach(element => {

            element.classList.remove("mobile-active");

        });

    }


    /* -----------------------------------------------------
       ADD TOUCH INTERACTION
       ----------------------------------------------------- */

    mobileInteractiveElements.forEach(element => {

        element.addEventListener("click", (event) => {

            /*
             * Only use this special interaction
             * on mobile screens.
             */

            if (window.innerWidth > 600) {
                return;
            }


            /*
             * If this element is already active,
             * remove the effect.
             */

            if (element.classList.contains("mobile-active")) {

                element.classList.remove("mobile-active");

                return;

            }


            /*
             * Remove active effect from other
             * cards/buttons.
             */

            removeMobileActive();


            /*
             * Activate the element that was tapped.
             */

            element.classList.add("mobile-active");

        });

    });


    /* -----------------------------------------------------
       TAP OUTSIDE
       ----------------------------------------------------- */

    document.addEventListener("click", (event) => {

        if (window.innerWidth > 600) {
            return;
        }


        /*
         * If the user taps somewhere that isn't
         * one of our interactive elements,
         * remove the active effect.
         */

        if (
            !event.target.closest(
                ".project-card, " +
                ".service-card, " +
                ".highlight-card, " +
                ".timeline-content, " +
                ".about-card, " +
                ".roadmap-item, " +
                ".services-future, " +
                ".services-cta, " +
                ".btn-primary, " +
                ".btn-secondary, " +
                ".btn-contact, " +
                ".footer-contact-link, " +
                ".contact-socials a, " +
                ".nav-menu .nav-links a, " +
                ".menu-open, " +
                ".menu-close"
            )
        ) {

            removeMobileActive();

        }

    });

});

/* =========================================================
   FORMSPREE CONTACT FORM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contact-form");
    const contactSubmit = document.getElementById("contact-submit");
    const formMessage = document.getElementById("form-message");


    /* =====================================================
       MESSAGE DISPLAY DURATION
       4000 milliseconds = 4 seconds
    ===================================================== */

    const MESSAGE_DURATION = 4000;


    /* =====================================================
       MAKE SURE THE ELEMENTS EXIST
    ===================================================== */

    if (!contactForm || !contactSubmit || !formMessage) {

        console.error("Contact form elements were not found.");

        return;

    }


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* =================================================
           BUTTON LOADING STATE
        ================================================= */

        contactSubmit.disabled = true;

        contactSubmit.textContent = "Sending...";


        /* =================================================
           CLEAR PREVIOUS MESSAGE
        ================================================= */

        formMessage.className = "form-message";

        formMessage.textContent = "";


        try {

            /* =============================================
               SEND FORM TO FORMSPREE
            ============================================= */

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            /* =============================================
               SUCCESS
            ============================================= */

            if (response.ok) {

                    /* =================================================
       GOOGLE ANALYTICS — SUCCESSFUL FORM SUBMISSION
    ================================================= */

    if (typeof gtag === "function") {

        gtag("event", "contact_form_submit", {

            event_category: "conversion",

            event_label: "Successful Contact Form Submission"

        });

    }


    formMessage.textContent =
        "✓ Message sent successfully! Thank you for reaching out. I'll get back to you soon.";

                formMessage.classList.add(
                    "success",
                    "show"
                );


                /* -----------------------------------------
                   CLEAR FORM
                ----------------------------------------- */

                contactForm.reset();


                /* -----------------------------------------
                   HIDE SUCCESS MESSAGE AFTER 4 SECONDS
                ----------------------------------------- */

                setTimeout(() => {

                    formMessage.classList.remove("show");

                }, MESSAGE_DURATION);

            }


            /* =============================================
               FORMSPREE ERROR
            ============================================= */

            else {

                formMessage.textContent =
                    "Something went wrong. Please try again or contact me directly by email.";

                formMessage.classList.add(
                    "error",
                    "show"
                );


                /* -----------------------------------------
                   HIDE ERROR MESSAGE AFTER 4 SECONDS
                ----------------------------------------- */

                setTimeout(() => {

                    formMessage.classList.remove("show");

                }, MESSAGE_DURATION);

            }

        }


        /* =================================================
           NETWORK ERROR
        ================================================= */

        catch (error) {

            console.error(
                "Form submission error:",
                error
            );


            formMessage.textContent =
                "Unable to send your message right now. Please check your internet connection and try again.";

            formMessage.classList.add(
                "error",
                "show"
            );


            /* ---------------------------------------------
               HIDE NETWORK ERROR AFTER 4 SECONDS
            --------------------------------------------- */

            setTimeout(() => {

                formMessage.classList.remove("show");

            }, MESSAGE_DURATION);

        }


        /* =================================================
           RESTORE BUTTON
        ================================================= */

        finally {

            contactSubmit.disabled = false;

            contactSubmit.textContent = "Send Message";

        }

    });

});

/* =========================================================
   GOOGLE ANALYTICS — CUSTOM EVENTS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       WORK WITH ME / CONTACT BUTTON
    ===================================================== */

    const contactButtons = document.querySelectorAll(
        ".btn-contact"
    );

    contactButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (typeof gtag === "function") {

                gtag("event", "contact_click", {

                    event_category: "engagement",

                    event_label: "Work With Me / Contact"

                });

            }

        });

    });


    /* =====================================================
       WHATSAPP
    ===================================================== */

    const whatsappLinks = document.querySelectorAll(
        'a[href*="wa.me"], a[href*="whatsapp"]'
    );

    whatsappLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (typeof gtag === "function") {

                gtag("event", "whatsapp_click", {

                    event_category: "engagement",

                    event_label: "WhatsApp"

                });

            }

        });

    });


    /* =====================================================
       GITHUB
    ===================================================== */

    const githubLinks = document.querySelectorAll(
        'a[href*="github.com"]'
    );

    githubLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (typeof gtag === "function") {

                gtag("event", "github_click", {

                    event_category: "engagement",

                    event_label: "GitHub"

                });

            }

        });

    });


    /* =====================================================
       EMAIL
    ===================================================== */

    const emailLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    emailLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (typeof gtag === "function") {

                gtag("event", "email_click", {

                    event_category: "engagement",

                    event_label: "Email"

                });

            }

        });

    });

});

// =========================================================
// BACK TO TOP BUTTON
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.getElementById("back-to-top");

    // Make sure the button exists
    if (!backToTop) {

        console.error("Back-to-top button was not found.");

        return;

    }


    // =====================================================
    // SHOW / HIDE BUTTON BASED ON SCROLL POSITION
    // =====================================================

    window.addEventListener("scroll", () => {

        /*
         * How close the visitor must be to the
         * bottom before the button appears.
         *
         * 500px means:
         * When the visitor is within 500px of
         * the bottom of the page, show the button.
         */

        const bottomOffset = 500;


        const distanceFromBottom =
            document.documentElement.scrollHeight -
            (window.scrollY + window.innerHeight);


        /*
         * Near the bottom
         */

        if (distanceFromBottom <= bottomOffset) {

            backToTop.classList.add("show");

        }


        /*
         * Visitor moved away from the bottom
         */

        else {

            backToTop.classList.remove("show");

        }

    });


    // =====================================================
    // SCROLL BACK TO TOP
    // =====================================================

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Calculator Logic
const complexitySlider = document.getElementById("complexity");
const complexityValue = document.getElementById("complexityValue");
const hoursSlider = document.getElementById("hours");
const hoursValue = document.getElementById("hoursValue");
const calculateBtn = document.getElementById("calculateBtn");
const resultsDiv = document.getElementById("results");
const costBreakdownDiv = document.getElementById("costBreakdown");
const totalCostElement = document.getElementById("totalCost");

const complexityLabels = ["Simple", "Medium", "Complex"];
const complexityMultipliers = [0.7, 1.0, 1.5];

const hourlyRates = {
  frontend: 50,
  backend: 75,
  uiux: 50,
  qa: 65,
  maintenance: 60,
  correction: 60,
};

const allocationPercentages = {
  frontend: 0.25,
  backend: 0.35,
  uiux: 0.1,
  qa: 0.15,
  maintenance: 0.1,
  correction: 0.05,
};

// Update slider displays
complexitySlider.addEventListener("input", function () {
  const value = parseInt(this.value) - 1;
  complexityValue.textContent = complexityLabels[value];
});

hoursSlider.addEventListener("input", function () {
  hoursValue.textContent = `${this.value} hours`;
});

// Calculate function
calculateBtn.addEventListener("click", function () {
  const complexityIndex = parseInt(complexitySlider.value) - 1;
  const complexityMultiplier = complexityMultipliers[complexityIndex];
  const totalHours = parseInt(hoursSlider.value);

  const selectedServices = {
    frontend: document.getElementById("frontend").checked,
    backend: document.getElementById("backend").checked,
    uiux: document.getElementById("uiux").checked,
    qa: document.getElementById("qa").checked,
    maintenance: document.getElementById("maintenance").checked,
    correction: document.getElementById("correction").checked,
  };

  let totalCost = 0;
  let breakdownHTML = "";

  const serviceCalculations = [
    {
      id: "frontend",
      label: "Frontend Development",
      isDevelopment: true,
    },
    {
      id: "backend",
      label: "Backend Development",
      isDevelopment: true,
    },
    {
      id: "uiux",
      label: "UI/UX Design",
      isDevelopment: true,
    },
    {
      id: "qa",
      label: "Quality Assurance",
      isDevelopment: true,
    },
    {
      id: "correction",
      label: "Code Correction",
      isDevelopment: false,
    },
    {
      id: "maintenance",
      label: "Yearly Maintenance",
      isDevelopment: false,
    },
  ];

  serviceCalculations.forEach((service) => {
    const selected = selectedServices[service.id];
    if (selected) {
      const hours = totalHours * allocationPercentages[service.id];
      const multiplier = service.isDevelopment ? complexityMultiplier : 1;
      const cost = Math.round(hours * hourlyRates[service.id] * multiplier);
      service.hours = Math.round(hours);
      service.cost = cost;
      service.multiplier = multiplier;
      totalCost += cost;
    } else {
      service.cost = 0;
      service.hours = 0;
      service.multiplier = 1;
    }
  });

  serviceCalculations.forEach((service) => {
    if (service.cost > 0) {
      breakdownHTML += `
                        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <div>
                                <div style="color: white; font-weight: 500;">${
                                  service.label
                                }</div>
                                <div style="color: rgba(255,255,255,0.7); font-size: 0.9rem;">${
                                  service.hours
                                } hours @ $${hourlyRates[service.id]}/hour${
                                  service.multiplier !== 1 ? ` × ${service.multiplier}` : ''
                                }</div>
                            </div>
                            <div style="color: #60a5fa; font-weight: 700; font-size: 1.1rem;">
                                $${service.cost.toLocaleString()}
                            </div>
                        </div>
                    `;
    }
  });

  costBreakdownDiv.innerHTML = breakdownHTML;
  totalCostElement.textContent = `$${Math.round(totalCost).toLocaleString()}`;
  resultsDiv.style.display = "block";

  // Smooth scroll to results
  resultsDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Initialize calculator
complexityValue.textContent =
  complexityLabels[parseInt(complexitySlider.value) - 1];
hoursValue.textContent = `${hoursSlider.value} hours`;

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Particle.js Configuration
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#1d4ed8",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#1d4ed8",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});

// Typing Animation
const typed = new Typed(".typing", {
  strings: [
    "Excellence",
    // "Web Applications",
    // "Mobile Apps",
  ],
  typeSpeed: 70,
  backSpeed: 50,
  loop: true,
});

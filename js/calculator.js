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
  uiux: 70,
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
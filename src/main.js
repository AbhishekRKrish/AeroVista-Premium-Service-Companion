const state = {
  meal: "Mid-flight",
  drink: "Sparkling wine",
  rest: "Do not disturb after meal",
};

const viewTabs = document.querySelectorAll(".view-tab");
const panes = document.querySelectorAll(".view-pane");
const restToggle = document.getElementById("restToggle");
const wakeToggle = document.getElementById("wakeToggle");

const fields = {
  mealStatus: document.getElementById("mealStatus"),
  drinkStatus: document.getElementById("drinkStatus"),
  restStatus: document.getElementById("restStatus"),
  seatbackMeal: document.getElementById("seatbackMeal"),
  seatbackDrink: document.getElementById("seatbackDrink"),
  seatbackRest: document.getElementById("seatbackRest"),
  seatbackHeadline: document.getElementById("seatbackHeadline"),
  crewMeal: document.getElementById("crewMeal"),
  crewDrink: document.getElementById("crewDrink"),
  crewRest: document.getElementById("crewRest"),
  crewSeatSummary: document.getElementById("crewSeatSummary"),
};

function setView(view) {
  viewTabs.forEach((tab) => {
    const isActive = tab.dataset.view === view;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  panes.forEach((pane) => {
    pane.classList.toggle("active", pane.dataset.pane === view);
  });
}

function updateRestPreference() {
  if (restToggle.checked) {
    state.rest = "Do not disturb after meal";
  } else if (wakeToggle.checked) {
    state.rest = "Wake before landing";
  } else {
    state.rest = "No preference";
  }
  renderState();
}

function headlineForState() {
  if (state.rest.includes("Do not disturb")) {
    return `${state.meal} dining, then quiet rest`;
  }
  if (state.rest.includes("Wake")) {
    return `${state.meal} dining with arrival wake-up`;
  }
  return `${state.meal} dining with standard service`;
}

function renderState() {
  fields.mealStatus.textContent = state.meal;
  fields.drinkStatus.textContent = state.drink;
  fields.restStatus.textContent = state.rest;
  fields.seatbackMeal.textContent = state.meal;
  fields.seatbackDrink.textContent = state.drink;
  fields.seatbackRest.textContent = state.rest;
  fields.seatbackHeadline.textContent = headlineForState();
  fields.crewMeal.textContent = state.meal;
  fields.crewDrink.textContent = state.drink;
  fields.crewRest.textContent = state.rest;
  fields.crewSeatSummary.textContent = `${state.meal} · ${state.drink}`;
}

function selectChoice(group, selectedButton) {
  group.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("selected", button === selectedButton);
  });
}

viewTabs.forEach((tab) => {
  tab.addEventListener("click", () => setView(tab.dataset.view));
});

document.querySelectorAll("[data-control]").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    selectChoice(group, button);
    state[group.dataset.control] = button.dataset.value;
    renderState();
  });
});

restToggle.addEventListener("change", () => {
  if (restToggle.checked) wakeToggle.checked = false;
  updateRestPreference();
});

wakeToggle.addEventListener("change", () => {
  if (wakeToggle.checked) restToggle.checked = false;
  updateRestPreference();
});

renderState();

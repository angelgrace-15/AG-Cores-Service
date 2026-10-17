
const WHATSAPP_NUMBER = "2349120258280";

let selectedNetwork = "MTN";

const planGrid = document.getElementById("planGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("planSearch");
const validityFilter = document.getElementById("validityFilter");
const sortSelect = document.getElementById("sortPlans");
const recipientNumberInput = document.getElementById("recipientNumber");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function formatPrice(price) {
  return `₦${Number(price).toLocaleString("en-NG")}`;
}

function getDataSize(dataDescription) {
  const match = dataDescription.match(/[\d.]+/);
  if (!match) return 0;

  const amount = Number(match[0]);
  if (dataDescription.toUpperCase().includes("GB")) return amount * 1000;
  return amount;
}

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getNetworkClass(network) {
  return network.toLowerCase();
}

function getFilteredPlans() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const chosenValidity = validityFilter.value;

  let matchingPlans = AG_CORE_PLANS.filter((plan) => {
    const matchesNetwork = plan.network === selectedNetwork;
    const searchableText = `${plan.data} ${plan.validity} ${plan.price} ${plan.network}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchTerm);
    const matchesValidity = chosenValidity === "all" || plan.validity === chosenValidity;

    return matchesNetwork && matchesSearch && matchesValidity;
  });

  if (sortSelect.value === "price-low") {
    matchingPlans.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "price-high") {
    matchingPlans.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === "data-high") {
    matchingPlans.sort((a, b) => getDataSize(b.data) - getDataSize(a.data));
  }

  return matchingPlans;
}

function createPlanCard(plan) {
  const card = document.createElement("article");
  card.className = `plan-card ${getNetworkClass(plan.network)}`;

  const planDetails = document.createElement("div");
  planDetails.className = "plan-details";

  const networkLabel = document.createElement("span");
  networkLabel.className = "network-label";
  networkLabel.textContent = plan.network;

  const dataName = document.createElement("h3");
  dataName.textContent = plan.data;

  const validity = document.createElement("p");
  validity.className = "plan-validity";
  validity.textContent = `Valid for ${plan.validity}`;

  planDetails.append(networkLabel, dataName, validity);

  const planFooter = document.createElement("div");
  planFooter.className = "plan-footer";

  const price = document.createElement("p");
  price.className = "plan-price";
  price.textContent = formatPrice(plan.price);

  const orderButton = document.createElement("button");
  orderButton.className = "button order-button";
  orderButton.type = "button";
  orderButton.textContent = "Order on WhatsApp →";
  orderButton.addEventListener("click", () => orderPlan(plan));

  planFooter.append(price, orderButton);
  card.append(planDetails, planFooter);

  return card;
}

function renderPlans() {
  const plans = getFilteredPlans();
  planGrid.replaceChildren();

  plans.forEach((plan) => {
    planGrid.appendChild(createPlanCard(plan));
  });

  emptyState.hidden = plans.length > 0;
}

function orderPlan(plan) {
  const rawNumber = recipientNumberInput.value.trim();
  const digitsOnly = rawNumber.replace(/\D/g, "");

  const isValidNigerianNumber = /^0[789][01]\d{8}$/.test(digitsOnly) || /^234[789][01]\d{8}$/.test(digitsOnly);

  if (!isValidNigerianNumber) {
    recipientNumberInput.focus();
    recipientNumberInput.setCustomValidity("Enter a valid Nigerian phone number, for example 08012345678.");
    recipientNumberInput.reportValidity();
    return;
  }

  recipientNumberInput.setCustomValidity("");

  const message = [
    "Hi AG CORE Services, I'd like to order this data plan:",
    "",
    `Network: ${plan.network}`,
    `Data plan: ${plan.data}`,
    `Validity: ${plan.validity}`,
    `Listed price: ${formatPrice(plan.price)}`,
    `Recipient phone number: ${digitsOnly}`,
    "",
    "Please confirm the current price and availability before I make payment."
  ].join("\n");

  window.open(createWhatsAppLink(message), "_blank", "noopener,noreferrer");
}

function selectNetwork(network) {
  selectedNetwork = network;

  document.querySelectorAll("[data-network]").forEach((tab) => {
    const isSelected = tab.dataset.network === network;
    tab.classList.toggle("active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
  });

  renderPlans();
}

document.querySelectorAll(".tab[data-network]").forEach((tab) => {
  tab.addEventListener("click", () => selectNetwork(tab.dataset.network));
});

searchInput.addEventListener("input", renderPlans);
validityFilter.addEventListener("change", renderPlans);
sortSelect.addEventListener("change", renderPlans);
recipientNumberInput.addEventListener("input", () => recipientNumberInput.setCustomValidity(""));

document.querySelectorAll("a[data-whatsapp]").forEach((link) => {
  const message = link.dataset.message || "Hi AG CORE Services, I'd like to make an enquiry.";
  link.href = createWhatsAppLink(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderPlans();

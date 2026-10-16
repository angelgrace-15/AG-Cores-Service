const WHATSAPP_NUMBER = "2349120258280"; // Replace with your preferred business WhatsApp number if needed.
const planImage = document.getElementById("planImage");
document.querySelectorAll("[data-plan]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-plan]").forEach(tab => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    const network = button.dataset.plan;
    planImage.src = network === "airtel" ? "assets/airtel-data-plans.jpg" : "assets/mtn-data-plans.jpg";
    planImage.alt = network.toUpperCase() + " data plan and price list";
  });
});
document.querySelectorAll("[data-whatsapp]").forEach(link => {
  const message = link.dataset.order || "Hi AG CORE Services, I’d like to order data. Please send me the current plans and prices.";
  link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

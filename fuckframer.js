window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Select all elements with the attribute data-framer-appear-id="12s7277"
    const elements = document.querySelectorAll('[data-framer-appear-id="12s7277"]');

    // Remove each element from the DOM
    elements.forEach(el => el.remove());
  }, 1000); // 1000ms = 1 second
});
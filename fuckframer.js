window.addEventListener("DOMContentLoaded", () => {

  function destroyFramerStuff() {
    // 1️⃣ Remove unwanted Framer appear elements
    const elements = document.querySelectorAll('[data-framer-appear-id="1hk5kn"]');
    elements.forEach(el => el.remove());

    // find id="__framer-badge-container"

    const framerBadgeContainer = document.getElementById("__framer-badge-container");
    if (framerBadgeContainer) {
      framerBadgeContainer.remove();
    }
  }

  // Run immediately
  destroyFramerStuff();


  // Run again after delay (Framer injects late sometimes)
  setTimeout(destroyFramerStuff, 800);
});
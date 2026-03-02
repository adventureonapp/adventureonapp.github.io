window.addEventListener("DOMContentLoaded", () => {
  const NEW_SRC = "https://customer-beu43e476cm3566o.cloudflarestream.com/942cc275166361e1389c8c0fd9106a5e/manifest/video.m3u8";
  const OLD_SRC_PART = "framerusercontent.com/assets/T1SjtdXWCkkelbrDerI6SSySDg.mp4";

  function destroyFramerStuff() {
    // 1️⃣ Remove unwanted Framer appear elements
    const elements = document.querySelectorAll('[data-framer-appear-id="1hk5kn"]');
    elements.forEach(el => el.remove());

    // 2️⃣ Replace video source
    const videos = document.querySelectorAll("video");

    videos.forEach(video => {
      if (video.src && video.src.includes(OLD_SRC_PART)) {
        video.src = NEW_SRC;
        video.load();
      }

      const sources = video.querySelectorAll("source");
      sources.forEach(source => {
        if (source.src && source.src.includes(OLD_SRC_PART)) {
          source.src = NEW_SRC;
          video.load();
        }
      });
    });
  }

  // Run immediately
  destroyFramerStuff();

  // Run again after delay (Framer injects late sometimes)
  setTimeout(destroyFramerStuff, 800);
});
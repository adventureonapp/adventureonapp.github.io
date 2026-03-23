window.addEventListener("DOMContentLoaded", () => {
  const NEW_SRC = "https://customer-beu43e476cm3566o.cloudflarestream.com/942cc275166361e1389c8c0fd9106a5e/manifest/video.m3u8";
  const OLD_SRC_PART = "framerusercontent.com/assets/T1SjtdXWCkkelbrDerI6SSySDg.mp4";

  // ✅ Allowed domains
  const ALLOWED_DOMAINS = [
    "instagram.com",
    "tiktok.com",
    "twitter.com",
    "x.com"
  ];

  function isAllowed(url) {
    try {
      const parsed = new URL(url, location.href);
      return ALLOWED_DOMAINS.some(domain => parsed.hostname.includes(domain));
    } catch {
      return false;
    }
  }

  function destroyFramerStuff() {
    document.querySelectorAll('[data-framer-appear-id="1hk5kn"]').forEach(el => el.remove());

    const badge = document.getElementById("__framer-badge-container");
    if (badge) badge.remove();

    document.querySelectorAll("video").forEach(video => {
      if (video.src && video.src.includes(OLD_SRC_PART)) {
        video.src = NEW_SRC;
        video.load();
      }

      video.querySelectorAll("source").forEach(source => {
        if (source.src && source.src.includes(OLD_SRC_PART)) {
          source.src = NEW_SRC;
          video.load();
        }
      });
    });
  }

  function blockAllDownloads() {
    // 1️⃣ Handle links
    document.querySelectorAll("a").forEach(link => {
      link.removeAttribute("download");

      if (link.href && !isAllowed(link.href)) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          console.warn("Blocked download:", link.href);
        });
      }
    });

    // 2️⃣ Block programmatic clicks
    const originalClick = HTMLElement.prototype.click;
    HTMLElement.prototype.click = function () {
      if (this.tagName === "A" && this.href && !isAllowed(this.href)) {
        console.warn("Blocked JS click:", this.href);
        return;
      }
      return originalClick.apply(this, arguments);
    };

    // 3️⃣ Block window.open
    const originalOpen = window.open;
    window.open = function (url, ...rest) {
      if (url && !isAllowed(url)) {
        console.warn("Blocked window.open:", url);
        return null;
      }
      return originalOpen.call(this, url, ...rest);
    };

    // 4️⃣ Block iframes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.tagName === "IFRAME" && node.src && !isAllowed(node.src)) {
            console.warn("Blocked iframe:", node.src);
            node.remove();
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    // 5️⃣ Block blob downloads
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = function (blob) {
      console.warn("Blocked blob download");
      return "";
    };
  }

  // Run
  // blockAllDownloads();
  destroyFramerStuff();
  setTimeout(destroyFramerStuff, 800);

  // Keep enforcing
  setInterval(blockAllDownloads, 2000);
});
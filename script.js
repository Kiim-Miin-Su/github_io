const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const progressBar = document.querySelector(".scroll-progress");
const cursorDot = document.querySelector(".cursor-dot");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateScrollProgress() {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${percent}%`;
}

function updateCurrentNav() {
  const activeSection = sections
    .slice()
    .reverse()
    .find((section) => section.getBoundingClientRect().top <= 120);

  navLinks.forEach((link) => {
    link.classList.toggle("is-current", activeSection && link.getAttribute("href") === `#${activeSection.id}`);
  });
}

function handleMouseMove(event) {
  if (!cursorDot || prefersReducedMotion) return;
  cursorDot.style.opacity = "1";
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
}

function handleTouchPulse(event) {
  if (prefersReducedMotion) return;
  const touch = event.changedTouches[0];
  const pulse = document.createElement("span");
  pulse.className = "touch-pulse";
  pulse.style.left = `${touch.clientX}px`;
  pulse.style.top = `${touch.clientY}px`;
  document.body.appendChild(pulse);
  window.setTimeout(() => pulse.remove(), 520);
}

function setupCursor() {
  if (!cursorDot) return;

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
  });

  document.querySelectorAll("a, button, summary").forEach((item) => {
    item.addEventListener("mouseenter", () => cursorDot.classList.add("is-active"));
    item.addEventListener("mouseleave", () => cursorDot.classList.remove("is-active"));
  });
}

function setupRevealAnimations() {
  const animatedItems = document.querySelectorAll("[data-animate], .skill-card, .project-card, .experience-card");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.14 }
  );

  animatedItems.forEach((item) => observer.observe(item));
}

function setupTiltCards() {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

async function loadGitHubProfile() {
  const avatar = document.querySelector("#github-avatar");
  const name = document.querySelector("#github-name");
  const bio = document.querySelector("#github-bio");
  const repos = document.querySelector("#github-repos");

  try {
    const response = await fetch("https://api.github.com/users/Kiim-Miin-Su", {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) throw new Error("GitHub profile request failed");

    const profile = await response.json();

    if (profile.avatar_url && avatar) {
      const image = document.createElement("img");
      image.src = profile.avatar_url;
      image.alt = "Kiim-Miin-Su GitHub avatar";
      avatar.replaceChildren(image);
    }

    if (name) name.textContent = profile.name || profile.login || "Kiim-Miin-Su";
    if (bio) bio.textContent = profile.bio || "AI + Backend Developer Portfolio";
    if (repos) repos.textContent = `${profile.public_repos ?? "Public"} public repos`;
  } catch (error) {
    if (repos) repos.textContent = "GitHub linked";
  }
}

function injectTouchPulseStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .touch-pulse {
      position: fixed;
      z-index: 70;
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: rgba(23, 92, 211, 0.2);
      pointer-events: none;
      transform: translate(-50%, -50%) scale(1);
      animation: touch-pulse 520ms ease-out forwards;
    }

    @keyframes touch-pulse {
      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(4.6);
      }
    }
  `;
  document.head.appendChild(style);
}

document.querySelector(".back-to-top")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
});

window.addEventListener(
  "scroll",
  () => {
    updateScrollProgress();
    updateCurrentNav();
  },
  { passive: true }
);

window.addEventListener("touchstart", handleTouchPulse, { passive: true });

setupCursor();
setupRevealAnimations();
setupTiltCards();
injectTouchPulseStyles();
loadGitHubProfile();
updateScrollProgress();
updateCurrentNav();

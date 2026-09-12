(function () {
  "use strict";

  // ---- Sticky header state ----
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav ----
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var mobileClose = document.getElementById("mobileClose");

  function openMobileNav() { mobileNav.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  function closeMobileNav() { mobileNav.classList.remove("is-open"); document.body.style.overflow = ""; }

  navToggle.addEventListener("click", openMobileNav);
  mobileClose.addEventListener("click", closeMobileNav);
  mobileNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMobileNav);
  });

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Gallery lightbox ----
  var figures = Array.prototype.slice.call(document.querySelectorAll(".gallery-grid figure"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var currentIndex = 0;

  function showImage(index) {
    if (!figures.length) return;
    currentIndex = (index + figures.length) % figures.length;
    var fig = figures[currentIndex];
    var img = fig.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = fig.getAttribute("data-caption") || img.alt || "";
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  figures.forEach(function (fig, index) {
    fig.addEventListener("click", function () { openLightbox(index); });
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", function () { showImage(currentIndex - 1); });
  document.getElementById("lightboxNext").addEventListener("click", function () { showImage(currentIndex + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
})();

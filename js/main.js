(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav-desktop");
  var toggle = document.querySelector(".nav-toggle");
  var floatCta = document.querySelector(".float-cta");
  var rotator = document.querySelector(".hero__rotator");
  var modal = document.querySelector(".modal-overlay");
  var modalTriggers = document.querySelectorAll("[data-open-contact]");
  var modalClose = document.querySelector(".modal__close");

  var words = [
    "beautiful, romantic",
    "passionate, intimate",
    "one of a kind",
    "precious & special",
    "joyful & timeless",
  ];
  var wordIndex = 0;

  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    if (floatCta) {
      floatCta.classList.toggle("is-visible", window.scrollY > 400);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  if (rotator) {
    rotator.textContent = words[0];
    setInterval(function () {
      wordIndex = (wordIndex + 1) % words.length;
      rotator.style.opacity = "0";
      setTimeout(function () {
        rotator.textContent = words[wordIndex];
        rotator.style.opacity = "1";
      }, 220);
    }, 3200);
  }

  if (rotator) {
    rotator.style.transition = "opacity 0.22s ease";
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  modalTriggers.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // Multi-step quote form
  var steps = document.querySelectorAll(".form-steps button");
  var panels = document.querySelectorAll(".form-panel");
  var btnBack = document.querySelector('[data-form-back]');
  var btnNext = document.querySelector('[data-form-next]');
  var stepIndex = 0;

  function showStep(i) {
    stepIndex = Math.max(0, Math.min(i, panels.length - 1));
    panels.forEach(function (p, j) {
      p.classList.toggle("is-active", j === stepIndex);
    });
    steps.forEach(function (s, j) {
      s.classList.toggle("is-active", j === stepIndex);
    });
    if (btnBack) btnBack.style.visibility = stepIndex === 0 ? "hidden" : "visible";
    if (btnNext) btnNext.textContent = stepIndex === panels.length - 1 ? "Submit" : "Next";
  }

  if (steps.length && panels.length) {
    steps.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        showStep(i);
      });
    });
    if (btnNext) {
      btnNext.addEventListener("click", function () {
        if (stepIndex < panels.length - 1) {
          showStep(stepIndex + 1);
        } else {
          alert("Thank you — this is a demo form. Connect it to your backend or form service.");
        }
      });
    }
    if (btnBack) {
      btnBack.addEventListener("click", function () {
        showStep(stepIndex - 1);
      });
    }
    showStep(0);
  }
})();

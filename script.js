document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      let valid = true;

      clearErrors();

      if (!email.value || !isValidEmail(email.value)) {
        showError(email, "Please enter a valid email address");
        valid = false;
      }

      if (!password.value || password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        valid = false;
      }

      if (valid) {
        const btn = form.querySelector(".btn--primary");
        btn.classList.add("btn--loading");
        btn.disabled = true;

        // Replace with real auth logic
        setTimeout(() => {
          btn.classList.remove("btn--loading");
          btn.disabled = false;
        }, 2000);
      }
    });
  }

  // Password visibility toggle
  const toggle = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("password");

  if (toggle && passwordInput) {
    toggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      toggle.querySelector(".eye-open").style.display = isPassword ? "none" : "block";
      toggle.querySelector(".eye-closed").style.display = isPassword ? "block" : "none";
    });
  }

  // Staggered card fade-in
  const cards = document.querySelectorAll(".feature-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(12px)";
    card.style.transition = `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`;
    observer.observe(card);
  });

  // Testimonials auto-slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".testimonials__dot");

  if (testimonials.length > 1) {
    let current = 0;
    let timer = null;

    function showSlide(index) {
      testimonials.forEach((t) => t.classList.remove("active"));
      dots.forEach((d) => {
        d.classList.remove("active");
        d.setAttribute("aria-selected", "false");
      });
      testimonials[index].classList.add("active");
      dots[index].classList.add("active");
      dots[index].setAttribute("aria-selected", "true");
      current = index;
    }

    function nextSlide() {
      showSlide((current + 1) % testimonials.length);
    }

    function startAutoplay() {
      timer = setInterval(nextSlide, 5000);
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        clearInterval(timer);
        showSlide(i);
        startAutoplay();
      });
    });

    startAutoplay();
  }
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
  input.classList.add("form-input--error");

  const error = document.createElement("p");
  error.className = "form-error";
  error.textContent = message;

  input.closest(".form-group").appendChild(error);
}

function clearErrors() {
  document.querySelectorAll(".form-error").forEach((el) => el.remove());
  document.querySelectorAll(".form-input").forEach((input) => {
    input.classList.remove("form-input--error");
  });
}

(() => {
  "use strict";

  const form = document.querySelector(".join-form");
  const idInput = document.getElementById("meetingId");
  const idError = document.getElementById("meetingIdError");
  const submitButton = document.querySelector(".join-submit");
  const submitLabel = submitButton?.querySelector(".submit-label");

  if (!form || !idInput || !idError) return;

  function sanitizeMeetingId() {
    const digits = idInput.value.replace(/\D/g, "").slice(0, 11);
    if (idInput.value !== digits) idInput.value = digits;
    return digits;
  }

  function clearError() {
    idInput.removeAttribute("aria-invalid");
    idError.hidden = true;
  }

  idInput.addEventListener("input", () => {
    sanitizeMeetingId();
    clearError();
  });

  idInput.addEventListener("blur", sanitizeMeetingId);

  idInput.addEventListener("invalid", (event) => {
    event.preventDefault();
    sanitizeMeetingId();
    idError.textContent = idInput.value
      ? "Enter a valid 9–11 digit meeting ID."
      : "Enter your meeting ID to continue.";
    idInput.setAttribute("aria-invalid", "true");
    idError.hidden = false;
  });

  form.addEventListener("submit", (event) => {
    const id = sanitizeMeetingId();

    if (!/^\d{9,11}$/.test(id)) {
      event.preventDefault();
      idError.textContent = id
        ? "Enter a valid 9–11 digit meeting ID."
        : "Enter your meeting ID to continue.";
      idInput.setAttribute("aria-invalid", "true");
      idError.hidden = false;
      idInput.focus();
      return;
    }

    clearError();
    if (submitButton) submitButton.setAttribute("aria-busy", "true");
    if (submitLabel) submitLabel.textContent = "Opening…";
  });
})();

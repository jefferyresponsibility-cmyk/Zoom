(() => {
  "use strict";

  const DESTINATION = "join.html";
  const REDIRECT_DELAY = 10000;

  const dialog = document.getElementById("redirectDialog");
  const progress = document.getElementById("redirectProgress");
  const countdown = document.getElementById("redirectCountdown");
  const openNow = document.getElementById("openNow");

  let redirectTimer = null;
  let countdownTimer = null;

  function stopTimers() {
    window.clearTimeout(redirectTimer);
    window.clearInterval(countdownTimer);
    redirectTimer = null;
    countdownTimer = null;
  }

  function setCountdown(value) {
    if (countdown) countdown.textContent = String(Math.max(0, value));
  }

  function resetProgress() {
    if (!progress) return;
    progress.value = 0;
    progress.textContent = "0%";
  }

  function updateCountdown(startedAt) {
    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(0, REDIRECT_DELAY - elapsed);
    setCountdown(Math.ceil(remaining / 1000));

    const percent = Math.min(100, Math.round((elapsed / REDIRECT_DELAY) * 100));
    if (progress) {
      progress.value = percent;
      progress.textContent = `${percent}%`;
    }
  }

  function goToDestination() {
    stopTimers();
    window.location.assign(DESTINATION);
  }

  function startRedirect() {
    if (!dialog || typeof dialog.showModal !== "function") return;

    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");

    setCountdown(Math.ceil(REDIRECT_DELAY / 1000));
    resetProgress();

    const startedAt = performance.now();
    countdownTimer = window.setInterval(() => updateCountdown(startedAt), 100);
    redirectTimer = window.setTimeout(goToDestination, REDIRECT_DELAY);

    window.setTimeout(() => openNow?.focus(), 60);
  }

  // The page behind the dialog is empty, so it cannot be dismissed.
  dialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
  });

  openNow?.addEventListener("click", stopTimers);

  startRedirect();
})();

(() => {
  "use strict";

  const JOIN_DELAY = 4200;

  const params = new URLSearchParams(window.location.search);
  const rawId = params.get("id") || "";
  const meetingId = rawId.replace(/\D/g, "").slice(0, 11);
  const rawName = (params.get("name") || "").replace(/\s+/g, " ").trim().slice(0, 60);
  const displayName = rawName || "Guest";

  const joiningState = document.getElementById("joiningState");
  const updateState = document.getElementById("updateState");
  const errorState = document.getElementById("errorState");
  const joiningCard = document.getElementById("joiningCard");
  const errorTitle = document.getElementById("errorTitle");
  const updateTitle = document.getElementById("updateTitle");

  if (!joiningState || !updateState || !errorState) return;

  function formatMeetingId(value) {
    if (value.length === 11) return `${value.slice(0, 3)} ${value.slice(3, 7)} ${value.slice(7)}`;
    if (value.length === 10) return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
    return `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
  }

  if (!/^\d{9,11}$/.test(meetingId)) {
    joiningState.hidden = true;
    errorState.hidden = false;
    joiningCard?.setAttribute("aria-labelledby", "errorTitle");
    document.title = "Meeting ID required — Meeting Access";
    errorTitle?.focus({ preventScroll: true });
    return;
  }

  const formattedId = formatMeetingId(meetingId);

  const meetingIdOut = document.getElementById("meetingIdOut");
  const updateMeetingId = document.getElementById("updateMeetingId");
  const displayNameOut = document.getElementById("displayNameOut");

  if (meetingIdOut) meetingIdOut.textContent = formattedId;
  if (updateMeetingId) updateMeetingId.textContent = formattedId;
  if (displayNameOut) displayNameOut.textContent = displayName;

  const timer = window.setTimeout(() => {
    joiningState.hidden = true;
    updateState.hidden = false;
    joiningCard?.setAttribute("aria-labelledby", "updateTitle");
    document.title = "Update required — Meeting Access";
    updateTitle?.focus({ preventScroll: true });
  }, JOIN_DELAY);

  window.addEventListener(
    "pagehide",
    () => {
      window.clearTimeout(timer);
    },
    { once: true }
  );
})();

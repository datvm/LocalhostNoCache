const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

function applyState(enabled) {
  toggle.checked = enabled;
  status.textContent = enabled ? "Status: Active" : "Status: Disabled";
}

// Read current state from storage
chrome.storage.local.get({ enabled: true }, ({ enabled }) => {
  applyState(enabled);
});

// Propagate changes to background
toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  applyState(enabled);
  chrome.runtime.sendMessage({ type: "SET_ENABLED", enabled });
});

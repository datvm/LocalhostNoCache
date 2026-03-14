// Rule IDs for declarativeNetRequest dynamic rules
const RULE_LOCALHOST = 1;
const RULE_LOOPBACK  = 2;

const ALL_RESOURCE_TYPES = [
  "main_frame", "sub_frame", "stylesheet", "script", "image",
  "font", "object", "xmlhttprequest", "ping", "media", "websocket", "other"
];

function enableRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_LOCALHOST, RULE_LOOPBACK],
    addRules: [
      {
        id: RULE_LOCALHOST,
        priority: 1,
        action: {
          type: "modifyHeaders",
          requestHeaders: [
            { header: "Cache-Control", operation: "set", value: "no-cache" },
            { header: "Pragma",        operation: "set", value: "no-cache" }
          ]
        },
        condition: {
          urlFilter: "||localhost",
          resourceTypes: ALL_RESOURCE_TYPES
        }
      },
      {
        id: RULE_LOOPBACK,
        priority: 1,
        action: {
          type: "modifyHeaders",
          requestHeaders: [
            { header: "Cache-Control", operation: "set", value: "no-cache" },
            { header: "Pragma",        operation: "set", value: "no-cache" }
          ]
        },
        condition: {
          urlFilter: "||127.0.0.1",
          resourceTypes: ALL_RESOURCE_TYPES
        }
      }
    ]
  });
}

function disableRules() {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_LOCALHOST, RULE_LOOPBACK],
    addRules: []
  });
}

// On install, default to enabled
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ enabled: true }, ({ enabled }) => {
    if (enabled) enableRules(); else disableRules();
  });
});

// Listen for toggle messages from the popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SET_ENABLED") {
    chrome.storage.local.set({ enabled: msg.enabled });
    if (msg.enabled) enableRules(); else disableRules();
  }
});

# Localhost No Cache

A lightweight Chrome/Edge extension that forces cache bypass for all requests to `localhost` and `127.0.0.1`, so local development always loads fresh files instead of stale disk cache content.

---

## Install

**Chrome Web Store**: https://chromewebstore.google.com/detail/localhost-no-cache/gehgkdbfaihohppngkpohhhkoddfekip

**Microsoft Edge Add-ons**: https://microsoftedge.microsoft.com/addons/detail/localhost-no-cache/afnngkhoimgbanhgnandmnmfhbgljoin

Or load unpacked manually (see [Development](#development) below).

---

## Why

Chrome aggressively caches local development server responses. Even with correct server-side cache headers, you may still see "200 OK (from disk cache)" in DevTools — meaning Chrome never hit the network at all. This extension fixes that by injecting `Cache-Control: no-cache` and `Pragma: no-cache` on every outgoing request to `localhost` and `127.0.0.1`, forcing a network revalidation every time.

---

## Features

- Forces fresh requests on `localhost` and `127.0.0.1` across **all ports**
- Covers all resource types: HTML, JS, CSS, images, XHR/fetch, WebSocket, fonts, media, and more
- Simple **on/off toggle** in the popup — state is saved across browser restarts
- Manifest V3, no background page, no remote code
- Collects **no data** whatsoever

---

## How It Works

The extension uses Chrome's `declarativeNetRequest` API to add two request headers to every matching request:

| Header | Value |
|---|---|
| `Cache-Control` | `no-cache` |
| `Pragma` | `no-cache` |

This instructs Chrome to always go to the network and revalidate, rather than serving cached content directly.

---

## Development

To load the extension locally:

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the repository folder.

### Files

| File | Purpose |
|---|---|
| `manifest.json` | MV3 manifest — permissions, icons, service worker |
| `background.js` | Registers/removes `declarativeNetRequest` rules, handles toggle messages |
| `popup.html` | Extension popup UI |
| `popup.js` | Reads/writes toggle state via `chrome.storage.local` |
| `icon.png` | Extension icon |

---

## Permissions

| Permission | Reason |
|---|---|
| `declarativeNetRequest` | Add no-cache request headers to localhost traffic |
| `storage` | Persist the enabled/disabled toggle preference |
| Host: `localhost`, `127.0.0.1` | Required for header rules to apply to local origins |

---

## Privacy

This extension collects no data. See [PrivacyPolicy.MD](PrivacyPolicy.MD) for full details.

---

## License

[MIT](./LICENSE)

<div align="center">

  <img src="assets/icon.png" alt="Edge Light Logo" width="80" height="80">

  # Edge Light — Web & Landing Page

  **Official product website, interactive simulator, and distribution portal**

  [![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-E34F26?style=flat-square&logo=html5)](https://developer.mozilla.org)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
  [![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Netlify%20%7C%20Firebase-black?style=flat-square)](https://vercel.com)

  [Live Demo](#interactive-preview) • [Pricing](#pricing-tiers) • [Downloads](#downloads)

</div>

---

## Overview

This repository contains the marketing website and client-facing download portal for **Edge Light**. It provides an interactive browser simulator, licensing options with Razorpay and UPI checkout, and direct downloads for Windows binaries.

---

## Features

- **In-Browser Simulator**: Interactive canvas demonstrating color temperature (3000K to 6500K) and ring thickness controls directly in the browser.
- **Direct Downloads**: Hosts the standalone portable executable and standard Windows installer.
- **Payment Integration**: Embedded checkout via Razorpay links and dynamic UPI QR code generator.
- **Responsive Layout**: Dark-mode glassmorphic interface built with vanilla HTML5, CSS3, and JavaScript with zero external frameworks.
- **SEO & Performance**: Optimized meta tags, semantic markup, and sub-second load times.

---

## Pricing Tiers

| Plan | Price | Period | Details |
| :--- | :--- | :--- | :--- |
| **Monthly Pass** | ₹29 | 30 Days | Full access, auto camera detection |
| **Quarterly Pass** | ₹49 | 90 Days | Cost-effective option for regular meetings |
| **Lifetime Pro** | ₹99 | One-time | Permanent device license |

---

## Project Structure

```
landing-page/
├── assets/                          # Branding assets and icons
│   ├── icon.ico
│   ├── icon.png
│   └── tray-icon.png
├── index.html                       # Landing page markup
├── landing.css                      # Styling and responsive design
├── landing.js                       # Simulator logic and interaction handlers
├── Edge.Light.Setup.1.0.12.exe       # Windows installer binary
├── package.json                     # Local development scripts
└── README.md
```

---

## Local Development

```bash
# Start local development server
npm start
```

---

## Deployment

The static assets can be deployed to any modern CDN or static hosting platform:

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod

# Firebase Hosting
firebase deploy --only hosting
```

---

## Author

- **Maintainer**: Chauhan Rudra ([@CHAUHANRUDRA24](https://github.com/CHAUHANRUDRA24))
- **Contact**: rudrachauhan2475@gmail.com

---

## License

This project is licensed under the [MIT License](LICENSE).

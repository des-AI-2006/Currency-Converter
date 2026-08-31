# Premium Currency Converter

A modern, visually stunning, dark glassmorphic Currency Converter web application. It features a custom search-enabled select component, instant calculations, a quick-reference popular conversions panel, and a fully fluid mobile-responsive layout.

Built entirely with lightweight Vanilla JavaScript and modern CSS, this tool delivers instant, accurate financial exchange rates across 150+ global currencies without requiring any heavy build steps or external frameworks.

🌐 **Live Demo**: [currency-converter-rust-rho.vercel.app](https://currency-converter-rust-rho.vercel.app/)

## Features

- 💎 **Premium Glassmorphic Design**: Curated dark color scheme, glowing gradients, subtle micro-animations, and Outfit typography.
- 🔍 **Custom Searchable Select Dropdowns**: Fully searchable custom-styled select overlays to easily filter and select from a list of global currencies.
- 🔄 **Interactive Swap Feature**: Tap the swap button to swap the target and source currencies with a smooth rotation transition.
- 📊 **Popular Conversions Grid**: Instantly displays a quick-reference list of common converted values (5, 10, 50, 100, and 500 units) for the selected currency pair.
- 📱 **100% Mobile Responsive Layout**: Stacks fields vertically and adapts sizing on narrow viewports, with a fallback scrolling guard for landscape/short screens.
- ⚡ **Instant Rate Updates**: Automatically fetches and populates live rates on page load and dynamically refreshes results on currency change.
- 🛡️ **Robust Validation & State Handling**: Features input sanitization, disabled state indicators during fetch requests, and network error handling.
- 🔒 **Selection Controls**: Restricts text-selection highlighting on decorative elements, titles, and buttons, keeping it active only on input boxes and output conversion messages.

## Tech Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid)
- **APIs & Assets**:
  - [Currency API](https://github.com/fawazahmed0/exchange-api) (Real-time Exchange Rates)
  - [FlagsAPI](https://flagsapi.com/) (Country Flags)
  - [Font Awesome](https://fontawesome.com/) (Icons)

## Project Structure

```text
├── index.html            # Main semantic markup and structure
├── CurrenCon.css         # Glassmorphic styling, responsive layout & animations
├── CurrencyConverter.js  # Exchange rate API fetching, search & DOM interaction logic
└── codes.js              # Comprehensive currency codes to country flag mappings
```

## Quick Start

### Running Locally

To run the application locally, you just need a simple HTTP server.

1. Clone the repository:
   ```bash
   git clone https://github.com/des-AI-2006/Currency-Converter.git
   cd Currency-Converter
   ```

2. Start a local server:
   ```bash
   npx http-server -p 3000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## License

This project is licensed under the [MIT License](LICENSE).


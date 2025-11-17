## Payslip App

### Requirements

- **Node**: 22.21.0
- **npm**: 10.9.4
- **Expo Go** app installed on your physical device (iOS or Android)

### Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the Expo dev server (Metro bundler)**

   ```bash
   npx expo start
   ```

   This will open the Expo Dev Tools in your terminal or browser and display a QR code.

3. **Run the app on your device with Expo Go**

   - Make sure your phone and your computer are on the **same network** (Wi‑Fi).
   - Open the **Expo Go** app on your device.
   - Scan the QR code shown in your terminal.
   - Wait for the bundle to load; the Payslip App will launch automatically.

### Architecture & folder structure

The app is organized in three **layers**, each with clear responsibilities and one‑directional imports:

- **App level (`source/app`) – top layer**

  - Contains:
    - `App.tsx`: Root component wiring navigation, and providers.
    - `navigation/`: React Navigation stack and navigation setup.
    - `screens/`: Screen components (e.g., payslips list, payslip details, settings).
  - Import rules:
    - Can import from **features** and **core**.
    - Must **not** be imported by `features` or `core`.

- **Feature level (`source/features`) – domain layer**

  - Contains:
    - Feature‑specific logic and UI (e.g. `payslip/` with store, types, hooks, components, mock assets).
  - Import rules:
    - Can import from **core**.
    - Must **not** import from `source/app` (no coupling to navigation/shell).

- **Core level (`source/core`) – shared foundation**

  - Contains:
    - `components/`: Reusable UI components (`Button`, `Text`, `Icon`, `AppHeader`, `AppToast`, etc.).
    - `hooks/`: Global hooks (`useTheme`, `useStyles`, app init hooks).
    - `services/`: Cross‑cutting services (haptics, file handling, toast).
    - `store/`: Global state (e.g., theme/settings stores).
    - `themes/`: Light/dark theme definitions.
    - `styles/`: Typography and shared style utilities.
    - `types/`: Core TypeScript types (theme, navigation, toast types, etc.).
  - Import rules:
    - **Bottom layer** – must not import from `source/app` or `source/features`.

This structure enforces a clean dependency flow:

`core → features → app` (never the other way around), which keeps the codebase:

- **Modular** – features can evolve or be replaced without touching the app shell or core.
- **Maintainable** – avoids circular imports and keeps responsibilities clear.
- **Testable** – core logic and domain code are decoupled from navigation and top‑level UI.

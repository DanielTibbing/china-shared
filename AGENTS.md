# 🟢 Shared Module (china-shared) - `AGENTS.md`

This directory houses the shared library package of the **China Suite** ecosystem. It provides unified UI components (like the multi-application switcher panel) and core context controllers (like tab-synchronized theme hooks) to keep design systems homogeneous across all sub-applications.

---

## 🎯 Purpose & Capabilities
- **Workspace Name (`china-common`)**: Though the directory name is `china-shared`, the published/linked library package is named `china-common` in `package.json`. It is declared by sub-applications as a dependency.
- **Suite Switcher UI**: Exports the `<SuiteSwitcher />` layout widget which provides seamless visual header-footer routing and consistent cross-linking between all suite portals.
- **Theme Sync Engine**: Exports the global `useTheme` hook mapping standard shared `localStorage` storage listeners to sync dark/light mode toggles across active tabs.

---

## 🛠️ Technology Stack
- **Framework:** React + TypeScript (supports React >= 18.0.0 and React Router Dom >= 6.0.0)
- **Compilers:** Standard `tsc` compiler compiling to JavaScript and type declaration models.

---

## 📂 Key Directory Structures
```text
china-shared/
├── src/
│   ├── components/
│   │   └── SuiteSwitcher.tsx # Multi-portal visual navigation headers and links
│   ├── hooks/
│   │   └── useTheme.ts       # Shared theme context syncing dark/light modes
│   └── index.ts              # Entry points exporting hooks and layouts
├── tsconfig.json             # Core strict TypeScript compiler parameters
└── package.json              # Exports declarations, metadata & compile workflows
```

---

## 🔑 Shared Design & Implementation Patterns

### 1. Unified Theme Sync Hook (`src/hooks/useTheme.ts`)
- Listens to storage changes to ensure real-time adjustments:
  ```ts
  import { useState, useEffect } from 'react';

  export function useTheme() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }, [isDarkMode]);

    useEffect(() => {
      const handleStorage = (e: StorageEvent) => {
        if (e.key === 'theme') {
          setIsDarkMode(e.newValue === 'dark');
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return { isDarkMode, setIsDarkMode };
  }
  ```
- **Agent Warning**: When modifying theme controls in any sub-app, ensure they bind directly to this shared sync structure to prevent FOUC and state desynchronization.

### 2. Multi-App Switcher (`src/components/SuiteSwitcher.tsx`)
- Maps names and active URLs for Career, Study, Podcast, News, and Reader.
- Uses dynamic glassmorphism and Lucide icons to draw gorgeous, high-fidelity navigational grids.

---

## 💻 Operations Reference
- **Watch Changes Locally:**
  ```bash
  npm run watch
  ```
- **Compile Production Package:**
  ```bash
  npm install
  npm run build
  ```
  *(Triggers `tsc` which generates build outputs inside `dist/` directory including index declarations `.d.ts`)*

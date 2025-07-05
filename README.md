# GameStore Frontend – Technical Overview

## Node Version

- **Recommended:** Node.js v18.x or v20.x

## Main Libraries

- **Framework:** next (v15.3.5), react (v19.x), react-dom (v19.x), typescript (v5.8.3)
- **Styling/UI:** tailwindcss, sass, next-themes, react-icons
- **State/Data:** @tanstack/react-query, @tanstack/react-query-devtools
- **HTTP/Auth:** axios, js-cookie
- **Other:** moment
- **Dev:** prettier, autoprefixer, postcss, @types/\*

## Build & Run

```bash
npm install           # Install dependencies
npm run build         # Build for production (SSR)
npm start             # Start production server (SSR)
# or for development:
npm run dev
```

## Folder Structure (src/)

- **api/**: API request functions (products, users, transactions, countries)
- **app/**: Next.js app directory (routes, pages, layouts)
  - `login/`, `logout/`, `products/`, `transactions/`, `transaction/`, `receipt/`: Route folders for each page
- **components/**: Reusable React components
  - `base/`: Core UI (buttons, skeletons, error boundaries, auth guard)
  - `default/`: Providers, layout wrappers
  - `navbar/`, `products-list/`, `dialog/`: UI for navigation, product display, dialogs
- **context/**: React Contexts for Auth and Toast notifications
- **hooks/**: Custom React hooks (e.g., useAuth)
- **lib/**: Utility libraries (axios instance, auth helpers, currency formatting)
- **styles/**: Tailwind CSS config and global styles
- **types/**: TypeScript type definitions (Product, User, Receipt, etc.)

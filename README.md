## Overview

The **LendSqr Frontend Test** This project replicates core screens from the LendSqr Admin Console: Login, Dashboard, Users List, and User Details. Built with React, TypeScript, and SCSS modules, the app demonstrates pixel‑perfect visual fidelity to the provided Figma designs, responsive layouts, client‑side pagination & filtering of a 500‑record mock API, and unit testing with Jest & React Testing Library.

**Live Demo:** https://peace-oghenevwefe-lendsqr-fe-test.vercel.app/login  
**Project Workthrough:** https://www.loom.com/share/ed75e408dd924a4c93140838e675c5f5

### Key Features:
- Pixel‑perfect Login, Dashboard, Users List & User Details pages  
- Client‑side pagination of a 500‑record user dataset  
- Multi‑field filtering with “Apply” confirmation  
- LocalStorage persistence for edits on the User Details page  
- Fully responsive design via SCSS modules & desktop‑first mixins  
- Unit tests (Jest + React Testing Library) with ~85% coverage 

## Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Peazzycole/lendsqr-fe-test.git
   ```
2.  - cd lendsqr-fe-test
3. ```bash
      #run
      npm install
      #or run
      yarn install
   ```
4. After installation, run
   ```bash
      npm run dev
      #or
      yarn dev
   ```
   The app should now be running at http://localhost:5173
   
5. To run tests
   ```bash
      npm run test
      #or
      npx jest
   ```

## Tools Used
1. **React & Vite** - React is a JavaScript library for building component‑based user interfaces. Vite is a fast build tool and development server that leverages native ES modules for rapid hot‑module replacement and optimized production builds.
2. **TypeScript** -  A statically typed superset of JavaScript that adds optional type annotations, interfaces, and compile‑time error checking to improve code safety and maintainability.
3. **Sass** - A CSS preprocessor that introduces variables, nesting, mixins, and other features to write more powerful and maintainable stylesheets.
4. ***React Router v6*** - A declarative routing library for React applications, providing nested routes, route parameters, and navigation control.
5. **json‑generator.com & mocky.io** - Tools for generating mock JSON datasets and hosting them as static REST API endpoints, enabling frontend development without a real backend.
6. **Jest & React Testing Library** - Jest is a JavaScript testing framework for writing and running unit tests, while React Testing Library offers utilities for testing React components through user‑centric interactions.


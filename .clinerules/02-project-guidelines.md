# Project Guidelines

## Project Overview

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Component Structure:** Components are organized by feature in the `src/components` directory.
- **API Routes:** API routes are located in `src/app/api`.
- **Linting:** ESLint is used for linting. Cline will adhere to the existing linting rules.

## Development Guidelines

- **File Naming:** Use kebab-case for file and directory names (e.g., `my-component.tsx`).
- **Commit Messages:** Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- **Code Style:** Adhere to the existing code style and formatting conventions found in the project. When in doubt, match the style of the surrounding code.
- **New Components:** New components should be placed in the appropriate subdirectory within `src/components`. If a suitable directory does not exist, a new one should be created.
- **State Management:** Use React Context for global state management, as seen in the `src/context` directory. For local component state, use React Hooks (`useState`, `useReducer`).
- **Icons:** SVG icons are stored in `src/icons` and exported from `src/icons/index.tsx`. When adding a new icon, follow this pattern.
- **Component Definition:** All new React components should be defined as arrow functions and exported as a default export.
- **Props Typing:** All new React components should have their props typed using a `type` alias. For example: `type MyComponentProps = { ... }`.
- **Function Return Types:** All new functions should have their return types explicitly defined.
- **Variable Declarations:** Use `const` for variables that will not be reassigned and `let` for variables that will be reassigned. Avoid using `var`.
- **Language:** All code, comments, and documentation should be written in English.

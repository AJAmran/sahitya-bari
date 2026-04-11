# Implementation Plan - Next.js 16 Modular Architecture Refactor

This plan outlines the steps to refactor the Sahitya Bari application to follow professional standards for Next.js 16, moving from a root-level structure to a `src/` modular architecture.

## 1. Directory Structure Setup
- Create `src/` directory.
- Initialize subdirectories:
  - `src/app/`: Routing and layouts.
  - `src/features/`: Domain logic (the core of the refactor).
  - `src/components/`: Shared/Generic UI components (including `ui/` from Shadcn).
  - `src/lib/`: Shared utilities and singletons (Prisma/Mongoose, utils).
  - `src/hooks/`: Shared client-side hooks.
  - `src/types/`: Global TypeScript definitions.

## 2. Shared Utilities & Base Components
- Move `lib/` to `src/lib/`.
- Move `hooks/` to `src/hooks/`.
- Move `types/` to `src/types/`.
- Move `components/ui/` to `src/components/ui/`.
- Move generic components (e.g., `ThemeToggle.tsx`, `Motion.tsx`, `Footer.tsx`, `Navbar.tsx`) to `src/components/`.

## 3. Feature-Based Refactoring
Identify and implement the following features in `src/features/`:

### A. Auth Feature (`src/features/auth`)
- **api.ts**: Auth-related fetching/caching logic.
- **actions.ts**: Login, signup, logout actions.
- **components/**: Auth forms.

### B. Blog Feature (`src/features/blog`)
- **api.ts**: Fetching posts, categories (with `'use cache'`).
- **actions.ts**: Blog mutations.
- **components/**: `BlogCard`, post views.

### C. Video Feature (`src/features/videos`)
- **api.ts**: Video/Audio fetching.
- **actions.ts**: Video mutations.
- **components/**: `VideoCard`, `YouTubeEmbed`, `AudioSection`.

### D. Comments Feature (`src/features/comments`)
- **api.ts**: Fetching comments.
- **actions.ts**: Posting/Deleting comments.
- **components/**: `CommentsSection`.

### E. Products Feature (`src/features/products`)
- **api.ts**: Product fetching.
- **actions.ts**: Product mutations.

### F. Feedback/Contact Feature (`src/features/feedback`)
- **actions.ts**: Contact form submission.

### G. Admin Feature (`src/features/admin`)
- **api.ts**: Dashboard stats.
- **actions.ts**: Admin operations.
- **components/**: Admin-specific UI.

## 4. Routing & Data Fetching (src/app)
- Move `app/` content to `src/app/`.
- Refactor Page components to use the new `api.ts` services from features.
- Implement `'use cache'` and named profiles in `api.ts` files.
- Ensure proper use of `<Suspense>` boundaries for PPR.

## 5. Configuration & Build
- Update `tsconfig.json` paths if necessary (though `@/*` usually points to `./*` or `./src/*`).
- Verify `next.config.ts` for PPR enablement.
- Run `npm run build` to ensure no regressions.

## 6. Cleanup
- Remove the old root directories after verification.

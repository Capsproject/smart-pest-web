# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:4200 (hot reload)
npm run build      # production build → dist/
npm run watch      # development build with watch mode
npm test           # run unit tests with Vitest
```

Run a single test file:
```bash
npx ng test --include='**/path/to/file.spec.ts'
```

## Architecture

Angular 21 standalone application (no NgModules). Entry point is `src/main.ts` bootstrapping `App` via `appConfig`.

- `src/app/app.config.ts` — application-level providers (`provideRouter`, `provideBrowserGlobalErrorListeners`)
- `src/app/app.routes.ts` — root route definitions (currently empty; use lazy-loaded feature routes)
- `src/app/app.ts` — root shell component with `<router-outlet>`
- `src/styles.css` — global styles; imports Tailwind CSS v4 via `@import "tailwindcss"`

Styling uses **Tailwind CSS v4** (PostCSS plugin via `.postcssrc.json`). No separate `tailwind.config` file — v4 uses CSS-first configuration.

## Angular Conventions

- **Standalone components only** — do not set `standalone: true` (it is the default in Angular 21)
- **Signals** for all component state (`signal()`, `computed()`); use `update()`/`set()`, never `mutate()`
- **`input()` / `output()` functions** instead of `@Input` / `@Output` decorators
- **`inject()`** instead of constructor injection
- **`ChangeDetectionStrategy.OnPush`** on every component
- Native control flow: `@if`, `@for`, `@switch` — not `*ngIf`, `*ngFor`, `*ngSwitch`
- **`NgOptimizedImage`** for all static images (not inline base64)
- No `ngClass` / `ngStyle` — use `[class]` / `[style]` bindings
- No `@HostBinding` / `@HostListener` — put host bindings in the `host` object of `@Component`/`@Directive`
- Reactive Forms over Template-driven forms
- Lazy-load feature routes; keep `app.routes.ts` as the shell

## TypeScript

Strict mode is enabled (`strict`, `strictTemplates`, `strictInjectionParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`). Avoid `any`; use `unknown` when type is uncertain.

## Accessibility

All components must pass AXE checks and meet WCAG AA minimums (focus management, color contrast ≥ 4.5:1 for text, correct ARIA attributes).

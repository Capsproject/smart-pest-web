# SmartPest Design System

This is the single source of truth for SmartPest's visual identity across **web** (`smart-pest-web`, Angular + Tailwind v4) and the **mobile app** (React Native — no login, capture → identify → bilingual recommendation). Everything below was extracted from the actual shipped web code (`login.html`, `dashboard.html`, `landing.html`, `styles.css`) — not invented — plus new guidance for things mobile needs that web doesn't (touch targets, safe areas, screen anatomy).

**Keep this in sync**: if you change a color, radius, or component recipe on web, update this file in the same PR. If you build a new mobile component that isn't here yet, add its recipe before shipping it.

---

## 1. Brand foundation

SmartPest is intelligent pest detection for two municipalities in Quezon — Tanauan and Candelaria. The product has two halves with one identity: a **free, no-login mobile app** anyone can point at a sick plant, and a **technician web dashboard** for monitoring and dataset management.

**Tone of voice**: plain and practical, written for farmers and households, not a corporate SaaS. Short sentences. Agricultural, not clinical. "Nature is not a place to visit. It is home."

**Bilingual by design**: every user-facing string that reaches an end user (not a technician) must exist in English and Tagalog. See §10.

**Visual identity in one sentence**: a calm forest-green palette, soft rounded cards, and hand-drawn botanical SVG illustrations — no photography, no stock icons, no custom font.

---

## 2. Color

### 2.1 The ramp

This exact ramp is already live in `src/styles.css` as a Tailwind v4 `@theme` block (`--color-brand-50` … `--color-brand-900`, usable as `bg-brand-800` etc. on new web work). Mobile should mirror the token names 1:1.

| token | hex | role today |
|---|---|---|
| `brand-50` | `#f0f7f0` | page background |
| `brand-100` | `#fafff8` | card / surface, and text-on-dark |
| `brand-200` | `#d8f3dc` | card borders, pill/badge backgrounds |
| `brand-300` | `#b7e4c7` | input borders, decorative fills, badge accents |
| `brand-400` | `#95d5b2` | footer captions on dark surfaces, decorative strokes |
| `brand-500` | `#74c69d` | uppercase eyebrow/caption labels |
| `brand-600` | `#52b788` | links, icon strokes, logo accents |
| `brand-700` | `#40916c` | heatmap gradient step only |
| `brand-800` | `#2d6a4f` | **primary brand green** — headings, buttons, dark panels |
| `brand-900` | `#1b4332` | **darkest green** — primary body text, big numbers |

Status colors (used sparingly, error states only):

| role | hex |
|---|---|
| error text | `#c1121f` (see §2.3 — not the web's current `#e63946`) |
| error banner background | `#fff0f0` |
| error banner border | `#ffb3b3` |

### 2.2 Semantic aliases

Use these names in code (both platforms) instead of raw hex or raw token names — it's what actually maps to a role:

```
background      brand-50    #f0f7f0   page/screen background
surface         brand-100   #fafff8   cards, inputs, headers
surfaceAlt      brand-200   #d8f3dc   pills, subtle fills, alt rows
border          brand-300   #b7e4c7   card & input borders
textPrimary     brand-900   #1b4332   body copy, headings on light bg
textBrand       brand-800   #2d6a4f   headings, links-as-buttons
textOnDark      brand-100   #fafff8   text/icons on brand-800 surfaces
accentStroke    brand-600   #52b788   icon strokes, decorative — NOT text
caption         brand-500   #74c69d   uppercase eyebrows — large/bold only
danger          —           #c1121f   error text
dangerBg        —           #fff0f0   error banner background
dangerBorder    —           #ffb3b3   error banner border
```

### 2.3 Contrast rules (hard requirement — CLAUDE.md mandates WCAG AA)

Real ratios, computed against the surfaces they're actually used on:

| color | on `#fafff8` (surface) | on `#2d6a4f` (dark panel) | verdict |
|---|---|---|---|
| `brand-400` `#95d5b2` | 1.67 | 6.56 | **fails as text on light** — light-on-dark only |
| `brand-500` `#74c69d` | 2.01 | 5.44 | **fails as text on light** — light-on-dark only, or large+bold decorative caption |
| `brand-600` `#52b788` | 2.44 | fails | **fails everywhere as text** — icon strokes / borders only |
| `brand-700` `#40916c` | 3.78 | fails | large text only (≥18.66px bold or ≥24px) |
| `brand-800` `#2d6a4f` | **6.31 ✅ AA** | fails | body text, headings, buttons — on light surfaces |
| `brand-900` `#1b4332` | **10.93 ✅ AAA** | fails | primary body text on light surfaces |
| `#fafff8` | fails | **6.31 ✅ AA** | text/icons on brand-800 panels |
| `#d8f3dc` | fails | **5.41 ✅ AA** | text/icons on brand-800 panels |
| `#b7e4c7` | fails | **4.55 ✅ AA** | text/icons on brand-800 panels |
| `#e63946` (old error) | 4.11 | — | **just under AA** |
| `#c1121f` (use this) | on `#fff0f0`: 5.62 ✅ | — | correct error red |

**Rule, stated plainly**: on a light surface (`background`/`surface`/`surfaceAlt`), text is only ever `textPrimary` (`#1b4332`) or `textBrand` (`#2d6a4f`). `brand-400`/`500`/`600` are for icon strokes, borders, and decorative fills — never for text someone has to read. On a dark `brand-800` panel, text/icons use `textOnDark`, `brand-200`, or `brand-300`.

> **Known deviation, not part of this doc's scope to fix**: the current web app violates this in a few places — `login.html`'s footer text and subtitle use `#95d5b2`/`#52b788`, and `dashboard.html`'s captions use `#74c69d`. The new `landing.html` mostly follows the corrected rule already. Don't port those specific violations into mobile; fix them on web separately.

---

## 3. Typography

No custom font, on either platform — a deliberate choice, not an oversight. Web runs on Tailwind's default sans stack; mobile uses the OS system font (`System` on iOS → SF Pro, `System`/Roboto on Android). Don't add a webfont or a bundled font family without a reason.

| role | web class | size | line-height | weight |
|---|---|---|---|---|
| Display | `text-5xl` | 48 | 52 | 700 (bold) |
| H1 | `text-3xl` | 30 | 36 | 700 |
| H2 | `text-2xl` | 24 | 30 | 600–700 |
| H3 | `text-xl` / `text-lg` | 20 / 18 | 28 / 26 | 600 |
| Body | `text-base` | 16 | 24 | 400 |
| Body small | `text-sm` | 14 | 20 | 400–500 |
| Caption / label | `text-xs` | 12 | 16 | 500 (medium) |
| Overline | `text-xs uppercase tracking-wide` | 12 | 16 | 600, letter-spacing 0.02em |
| Button label | `text-sm font-semibold` | 14 | 20 | 600 |

`tracking-tight` on the wordmark/logo lockup; `tracking-wide` on overline captions. No italics except the one decorative quote on the login screen.

---

## 4. Spacing & layout

Base unit is 4px, used as a fairly small closed set — don't invent new values:

`6px(1.5) · 8px(2) · 12px(3) · 16px(4) · 20px(5) · 24px(6) · 32px(8) · 40px(10) · 48px(12) · 64px(16)`

- Card padding: 20px (`p-5`) for compact cards, 40px (`p-10`) for hero/branding panels.
- Section vertical rhythm on web: 64px top/bottom (`py-16`) between major landing sections.
- Gaps: 6px/8px/16px (`gap-1.5/2/4`) between related inline elements.
- Container max-widths: `max-w-4xl` (896px, auth/forms), `max-w-6xl` (1152px, dashboard/landing content).

Mobile: use the same 4px scale for internal component spacing; screen-level horizontal padding is 16–20px (not the desktop 24px `px-6`).

---

## 5. Shape & elevation

| radius | px | used for |
|---|---|---|
| `rounded-lg` | 8 | small chips |
| `rounded-xl` | 12 | buttons, inputs, alert banners, nav pills |
| `rounded-2xl` | 16 | standard cards (dashboard stat cards, feature cards) |
| `rounded-3xl` | 24 | hero/outer cards, the login card, the bilingual sample card |
| `rounded-full` | ∞ | avatars, badges, step-number circles, segmented-toggle pill |

Shadows are subtle — never a heavy drop shadow:

- `shadow-sm` — cards: `0 1px 2px rgba(0,0,0,0.05)`
- `shadow-2xl` — the login page's outer card only: `0 25px 50px -12px rgba(0,0,0,0.25)`

RN equivalent (iOS shadow props + Android `elevation`):

```ts
shadowSm: {
  shadowColor: '#1b4332', shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06, shadowRadius: 2, elevation: 1,
},
shadowCard: {
  shadowColor: '#1b4332', shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
},
```

---

## 6. Component recipes

Each recipe: the web source (quoted, for reference), then the RN version. Colors reference the semantic aliases in §2.2.

### 6.1 Primary button

Web (`login.html`):
```html
<button class="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
        style="background-color: #2d6a4f; color: #fafff8;"
        [style.opacity]="isLoading() ? '0.75' : '1'">
  Sign in
</button>
```

RN:
```tsx
const buttonPrimary = StyleSheet.create({
  base: {
    backgroundColor: colors.textBrand, // #2d6a4f
    paddingVertical: 12,
    borderRadius: radius.xl, // 12
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48, // meets Android touch-target min
  },
  disabled: { opacity: 0.75 },
  label: { color: colors.textOnDark, fontSize: 14, fontWeight: '600' },
});
```
Loading state: swap label for a spinner + "Signing in..." — keep the same footprint so the button doesn't resize.

### 6.2 Secondary / outline button

Web (`landing.html` hero secondary CTA):
```html
<a style="border: 1px solid #b7e4c7; color: #2d6a4f; background-color: #fafff8;" class="px-6 py-3 rounded-xl text-sm font-semibold">
```
RN: `backgroundColor: surface, borderWidth: 1, borderColor: border, borderRadius: radius.xl`, label `color: textBrand, fontWeight: 600`.

### 6.3 Card

Web (`dashboard.html` stat card):
```html
<div class="rounded-2xl p-5 shadow-sm" style="background-color: #fafff8; border: 1px solid #d8f3dc;">
```
RN:
```tsx
card: {
  backgroundColor: colors.surface,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: radius['2xl'], // 16
  padding: 20,
  ...shadows.shadowSm,
},
```

### 6.4 Text input + label + inline error

Web (`login.html`):
```html
<label style="color: #2d6a4f;" class="text-sm font-medium mb-1.5 block">Email address</label>
<input class="w-full px-4 py-3 rounded-xl border text-sm outline-none"
       style="border-color: #b7e4c7; background-color: #f0f7f0; color: #1b4332;"
       [style.border-color]="invalid && touched ? '#e63946' : '#b7e4c7'" />
<div style="color: #e63946;" class="mt-1.5 text-xs">Email is required.</div>
```
RN — use `#c1121f` for the error border/text instead of the web's `#e63946` (see §2.3):
```tsx
input: {
  backgroundColor: colors.background, // #f0f7f0
  borderWidth: 1,
  borderColor: colors.border,          // #b7e4c7
  borderRadius: radius.xl,
  paddingHorizontal: 16,
  paddingVertical: 12,
  fontSize: 14,
  color: colors.textPrimary,
  minHeight: 48,
},
inputError: { borderColor: colors.danger }, // #c1121f
errorText: { marginTop: 6, fontSize: 12, color: colors.danger, minHeight: 16 },
```

### 6.5 Alert / error banner

Web:
```html
<div role="alert" style="background-color: #fff0f0; color: #c1121f; border: 1px solid #ffb3b3;" class="px-4 py-3 rounded-xl text-sm flex items-center gap-2">
```
RN: `backgroundColor: dangerBg, borderColor: dangerBorder, borderWidth: 1, borderRadius: radius.xl, padding: 12` + `accessibilityRole="alert"`, `AccessibilityInfo.announceForAccessibility(message)` on mount.

### 6.6 Pill / badge

Web (`dashboard.html` "Dashboard" pill, `landing.html` coverage pill):
```html
<span style="background-color: #b7e4c7; color: #1b4332;" class="text-xs px-2 py-0.5 rounded-full font-medium">
```
RN: `backgroundColor: border /* or surfaceAlt */, borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 2`, text `fontSize: 12, fontWeight: '500', color: textPrimary`.

### 6.7 Numbered step marker

Web (`landing.html` "How it works"):
```html
<div style="background-color: #2d6a4f; color: #fafff8;" class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold">1</div>
```
RN: 36×36 `borderRadius: 18`, `backgroundColor: textBrand`, centered bold `textOnDark` label.

### 6.8 Language segmented toggle (EN | TL)

Web (`landing.html`):
```html
<div role="group" aria-label="Language selector" style="border: 1px solid #b7e4c7;" class="flex rounded-xl p-0.5">
  <button [attr.aria-pressed]="lang() === 'en'"
          [style.background-color]="lang() === 'en' ? '#2d6a4f' : 'transparent'"
          [style.color]="lang() === 'en' ? '#fafff8' : '#52b788'"
          class="px-2.5 py-1 rounded-lg text-xs font-semibold">EN</button>
  <!-- TL button mirrors this -->
</div>
```
RN — same structure, `accessibilityRole="button"` + `accessibilityState={{ selected: lang === 'en' }}` on each segment (RN has no `aria-pressed`; `accessibilityState.selected` is the equivalent screen readers announce):
```tsx
segmentGroup: { flexDirection: 'row', borderWidth: 1, borderColor: colors.border, borderRadius: radius.xl, padding: 2 },
segment: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.lg, minWidth: 44, minHeight: 32, alignItems: 'center' },
segmentActive: { backgroundColor: colors.textBrand },
segmentLabel: { fontSize: 12, fontWeight: '600' },
segmentLabelActive: { color: colors.textOnDark },
segmentLabelInactive: { color: colors.textBrand }, // NOT #52b788 — that fails contrast as text
```
Note the deliberate fix vs. web: the inactive label uses `textBrand` (`#2d6a4f`, 6.31:1), not the web's `#52b788` (2.44:1, fails).

### 6.9 Header / nav bar

Web:
```html
<nav style="background-color: #fafff8; border-bottom: 1px solid #b7e4c7;" class="sticky top-0 px-6 py-4 flex items-center justify-between shadow-sm">
```
RN: this is your screen header — `backgroundColor: surface`, `borderBottomWidth: 1`, `borderBottomColor: border`, height ~56pt, respecting the safe-area top inset (§11.2).

---

## 7. Iconography & illustration

**Zero raster images anywhere in the product.** Every icon and illustration is hand-written inline SVG. Keep it that way on mobile — pull in `react-native-svg` and port the `<svg>` markup to `<Svg>`/`<Path>` rather than exporting PNGs.

**Icon convention**: 24×24 viewBox, `stroke="currentColor"` (or an explicit brand hex when not tintable), `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`. Decorative icons get `aria-hidden="true"` on web → `accessible={false}` + no `accessibilityRole` on RN's `<Svg>`.

**The SmartPest logo mark** (36×36, used verbatim in login/dashboard/landing — copy exactly):
```html
<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M18 3 C24 3 32 9 32 18 C32 27 25 33 18 33 C11 33 4 27 4 18 C4 9 12 3 18 3Z" fill="#b7e4c7"/>
  <path d="M18 3 C18 3 18 33 18 33" stroke="#fafff8" stroke-width="1.5"/>
  <path d="M18 18 C18 18 8 12 4 18" stroke="#fafff8" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18 18 C18 18 28 12 32 18" stroke="#fafff8" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```
On a light background (as in the nav), the fill flips to `#52b788` and strokes stay `#fafff8` — see `dashboard.html`'s nav logo for that variant.

**Botanical illustration style**: organic leaf-blob shapes built from smooth cubic Béziers (not straight lines), 2–3 nested layers per illustration going light→dark or the reverse, low opacity (10–20%) when used as background decoration. See the potted-plant illustration in `login.html` and the floating leaf shapes in `login.html`/`landing.html` for the reference shapes to reuse or riff on.

---

## 8. Motion

One animation exists: leaves float gently.

```css
@keyframes leafFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
}
/* .leaf-float: 6s ease-in-out infinite */
/* .leaf-float-delay: 6s ease-in-out infinite, 2s delay */
```
RN: `Animated.loop` driving `translateY` -10↔0 and `rotate` 0↔3deg over 6000ms with `Easing.inOut(Easing.ease)`, offset the second instance's start by 2000ms.

Interaction transitions elsewhere are simply `transition-all duration-200` (200ms) on web — mirror with RN `LayoutAnimation`/`Animated.timing(..., { duration: 200 })` for state changes (button press, input focus, toggle switch).

**Reduced motion is a hard requirement, not optional.** `landing.html`'s CSS guards the float animation with `@media (prefers-reduced-motion: reduce)`; `login.css` currently does **not** (a gap to fix on web, don't repeat it on mobile). On RN, check `AccessibilityInfo.isReduceMotionEnabled()` (and subscribe to `reduceMotionChanged`) before starting any looping animation, and skip straight to the end state if it's enabled.

---

## 9. Iconography sizing & states

Standard icon sizes: 15/16px (inline with `text-sm` labels), 18px (headings), 28–36px (logo/lockup). Interactive icon-only buttons must still meet the touch-target minimum (§11.1) even when the icon itself is 15–18px — pad the hit area, don't enlarge the icon.

---

## 10. Bilingual (EN/TL) rules

The mechanism already built for web is the model to port, from `src/app/core/services/language.service.ts`:

```ts
export type Lang = 'en' | 'tl';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<Lang>(/* read from storage, default 'en' */);
  set(lang: Lang): void { this.lang.set(lang); }
  toggle(): void { this.lang.update(l => (l === 'en' ? 'tl' : 'en')); }
  // effect(): persists to storage + updates the OS-facing lang attribute
}
```
RN equivalent: same shape, `AsyncStorage` instead of `localStorage`, and call `I18nManager`/set the app's accessibility language so VoiceOver/TalkBack switch voice when `lang` changes (the web version sets `document.documentElement.lang = 'fil'`/`'en'` — RN has no exact equivalent per-string, but at minimum tag `accessibilityLanguage="fil-PH"` / `"en-PH"` on bilingual text blocks).

Copy is a single typed dictionary keyed by `Lang`, following `src/app/features/landing/landing.copy.ts`:
```ts
export interface Copy { /* one key per string used on this screen */ }
export const COPY: Record<Lang, Copy> = { en: {...}, tl: {...} };
// usage: const t = computed(() => COPY[lang()]);  t().hero.title
```

**Content rules**:
- Keep technical/product nouns in English: *dashboard*, *API*, *dataset*, *technician*. Don't force-translate them — that's how real Taglish reads.
- Write natural Taglish, not literal machine-style translation (e.g. "Kuhanan ng litrato ang dahon", not a word-for-word gloss).
- **Tagalog runs longer than English** — budget ~30% extra width/height for it. Never hardcode a fixed width on a button or label that holds translated text; let it size to content with a sensible min-width instead.
- Always update the accessibility language tag alongside the visible string switch, so screen readers announce in the right voice.
- On the result screen specifically (§11.3), **show both languages stacked, always** — don't make EN/TL a toggle that hides one. In the field, a technician and a farmer standing together may read different languages at the same time.

---

## 11. Mobile-specific guidance

Nothing below exists on web today — this is new material for the app.

### 11.1 Touch targets

Minimum hit area: **44×44pt on iOS, 48×48dp on Android**. Web's icon-only buttons (e.g. the password show/hide toggle, `p-1` around an 18px icon) are too small to port directly — pad them out to the platform minimum even though the visible icon stays the same size.

### 11.2 Safe areas & status bar

- Wrap screens in `SafeAreaView` / use `react-native-safe-area-context`; never let the header bar sit under the notch/status bar.
- Any screen with a `brand-800` (`#2d6a4f`) header should set the status bar to light content (`StatusBar barStyle="light-content"`) — the mobile equivalent of the web `<meta name="theme-color" content="#2d6a4f">`.
- Screens on the `background`/`surface` (light) base use `barStyle="dark-content"`.

### 11.3 Core screen flow

The landing page (`landing.html`) promises this exact flow — build it as four screens:

1. **Capture** — camera viewfinder or "choose from gallery," primary button `Take Photo` / `Choose Photo`. No account gate, no onboarding wall. Show the coverage note ("Tanauan & Candelaria, Quezon") small and out of the way, not blocking.
2. **Analyzing (wait state)** — the four-step mental model from the landing page's "How it works" section, condensed to a single friendly spinner/progress state with the captured photo thumbnail visible. Timeout/offline handling: if identification takes too long or the network drops, show a retry state, not a silent hang.
3. **Result** — the identified pest name (EN + local/common name if applicable), confidence framed simply ("Likely: Aphids"), and the captured photo.
4. **Bilingual Recommendation** — stacked EN/TL cards (recipe in §6.3, styled like the landing page's dark `brand-800` sample-recommendation card — see `landing.html`'s "sample recommendation" block for the exact layout to reuse), plus a note that this result was automatically sent to the dashboard (the "automatic push" feature) — no user action required.

Error/empty states to design for at each step: no camera permission, no network, low-confidence/unrecognized pest, submission failed to sync (should retry silently in the background, not block the user).

### 11.4 No-login constraint

The mobile app has **no account system**. Do not add sign-up/sign-in screens, profile screens, or anything gated. The only login in the product is the technician **web** dashboard — if the mobile app ever needs to link to it, treat that as an outbound link/handoff, not an in-app auth flow.

---

## 12. Accessibility checklist

- [ ] Text on light surfaces uses only `textPrimary` (`#1b4332`) or `textBrand` (`#2d6a4f`) — never `brand-400/500/600` (§2.3).
- [ ] Every interactive control has an `accessibilityLabel` (RN) — the equivalent of `aria-label`/visible label on web.
- [ ] Every icon-only button meets the 44×44pt/48×48dp touch target (§11.1).
- [ ] Decorative SVGs are `accessible={false}` (RN) / `aria-hidden="true"` (web) — never announced.
- [ ] Toggles/segments expose `accessibilityState={{ selected }}` and change label/voice, not just color, when active.
- [ ] Any looping animation checks `AccessibilityInfo.isReduceMotionEnabled()` first (§8).
- [ ] Text scales with the OS font-size setting (Dynamic Type / Android font scale) — avoid fixed-height text containers.
- [ ] Error banners use `accessibilityRole="alert"` and are announced on appearance.
- [ ] Bilingual text blocks tag the correct `accessibilityLanguage` per language (§10).
- [ ] Color is never the only signal for state (error borders pair with error text, not just a red outline).

---

## 13. React Native theme tokens — `theme.ts`

Ready to paste into the mobile app as a starting point.

```ts
// theme.ts — SmartPest design tokens (React Native)
// Source of truth: DESIGN.md in smart-pest-web. Keep in sync with src/styles.css's @theme block.

export const colors = {
  brand50: '#f0f7f0',
  brand100: '#fafff8',
  brand200: '#d8f3dc',
  brand300: '#b7e4c7',
  brand400: '#95d5b2',
  brand500: '#74c69d',
  brand600: '#52b788',
  brand700: '#40916c',
  brand800: '#2d6a4f',
  brand900: '#1b4332',

  // semantic aliases — prefer these in component code
  background: '#f0f7f0',
  surface: '#fafff8',
  surfaceAlt: '#d8f3dc',
  border: '#b7e4c7',
  textPrimary: '#1b4332',
  textBrand: '#2d6a4f',
  textOnDark: '#fafff8',
  accentStroke: '#52b788',
  caption: '#74c69d',

  danger: '#c1121f',
  dangerBg: '#fff0f0',
  dangerBorder: '#ffb3b3',
} as const;

export const spacing = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const radius = {
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

export const typography = {
  display: { fontSize: 48, lineHeight: 52, fontWeight: '700' as const },
  h1: { fontSize: 30, lineHeight: 36, fontWeight: '700' as const },
  h2: { fontSize: 24, lineHeight: 30, fontWeight: '600' as const },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.3,
  },
  button: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
};

export const shadows = {
  sm: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

export const motion = {
  leafFloatDurationMs: 6000,
  leafFloatDelayMs: 2000,
  interactionDurationMs: 200,
} as const;

export const touchTarget = {
  minWidth: 44,
  minHeight: 44,
} as const;

export type Lang = 'en' | 'tl';
```

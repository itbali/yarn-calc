# CLAUDE.md - AI Assistant Guide for Yarn Calculator

This document provides comprehensive information about the Yarn Calculator codebase for AI assistants working on this project.

## Project Overview

**Yarn Calculator** is a web application that calculates the total meterage (length per 100g) when combining multiple yarn strands together. This is useful for knitters who work with multiple threads of yarn.

- **Primary Language**: Russian (UI and documentation)
- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Type System**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (static export)

### Core Formula

When combining multiple yarn strands, the resulting meterage is calculated using:

```
1/result = 1/meterage₁ + 1/meterage₂ + ... + 1/meterageₙ
```

Where each meterage is normalized to 100 grams and accounts for the number of strands.

## Tech Stack

### Dependencies
- **next**: ^15.0.4 - React framework with App Router
- **react**: ^19.0.0 - UI library
- **react-dom**: ^19.0.0 - React DOM rendering
- **lucide-react**: ^0.554.0 - Icon library (used extensively throughout UI)

### Dev Dependencies
- **typescript**: ^5 - Type checking
- **tailwindcss**: ^3.4.17 - Utility-first CSS framework
- **autoprefixer**: ^10.4.20 - PostCSS plugin
- **eslint**: ^9 - Code linting
- **eslint-config-next**: ^15.0.4 - Next.js ESLint configuration

## Project Structure

```
yarn-calc/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── app/
│   ├── globals.css            # Global styles and Tailwind directives
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Home page (renders YarnCalculator)
├── components/
│   └── YarnCalculator.tsx     # Main calculator component
├── public/
│   └── .nojekyll              # Prevents Jekyll processing on GitHub Pages
├── next.config.ts             # Next.js configuration (static export)
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS configuration
├── package.json               # Dependencies and scripts
└── README.md                  # User-facing documentation (Russian)
```

## Key Files and Their Purpose

### app/layout.tsx
- **Purpose**: Root layout for the application
- **Key Features**:
  - SEO metadata (title, description, keywords, Open Graph, Twitter cards)
  - Viewport configuration with theme color for light/dark modes
  - Apple Web App configuration
  - Russian language (`lang="ru"`)
  - Base URL: `https://itbali.github.io/yarn-calc`

### app/page.tsx
- **Purpose**: Entry point that renders the calculator
- **Implementation**: Simple component that imports and renders `YarnCalculator`

### components/YarnCalculator.tsx
- **Purpose**: Main calculator component (300 lines)
- **State Management**: React hooks (useState, useEffect)
- **Key Features**:
  - Dynamic yarn input management
  - Real-time validation
  - Automatic calculation on data change
  - Responsive design (mobile-first)
  - Dark mode support
  - Icon-rich UI using lucide-react

**Interfaces**:
```typescript
interface YarnInput {
  id: number;
  weight: string;      // in grams
  length: string;      // in meters
  strands: string;     // number of threads
}

interface ValidationErrors {
  [key: number]: {
    weight?: string;
    length?: string;
    strands?: string;
  };
}
```

**Key Functions**:
- `addYarn()` - Adds new yarn input (line 29)
- `removeYarn(id)` - Removes yarn input (line 34)
- `updateYarn(id, field, value)` - Updates yarn field (line 40)
- `validateYarn(yarn)` - Validates single yarn input (line 46)
- `validateAll()` - Validates all yarns (line 68)
- `calculateTotalMeterage()` - Core calculation logic (line 84)
- `getTotalStrands()` - Counts total number of strands (line 107)

### next.config.ts
- **Purpose**: Next.js configuration for static export
- **Key Settings**:
  - `output: 'export'` - Static site generation
  - `basePath: '/yarn-calc'` in production
  - `images.unoptimized: true` - Required for static export

### .github/workflows/deploy.yml
- **Purpose**: Automated deployment to GitHub Pages
- **Triggers**: Push to main/master, or manual workflow dispatch
- **Steps**: Checkout → Setup Node.js 20 → Install deps → Build → Upload → Deploy
- **Artifacts**: Contents of `./out` directory

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Lint code
npm run lint
```

### Branch Strategy
- **Main branch**: `main` or `master`
- **Feature branches**: Use descriptive names, prefixed with `claude/` for AI-generated changes
- **Current branch**: `claude/claude-md-mialos6qkagpy5tt-01Y429UbxJttDsezHbxgeiKZ`

## Code Conventions

### TypeScript
- **Strict mode**: Enabled
- **Type annotations**: Use explicit types for component props and state
- **Interfaces**: Prefer interfaces over types for object shapes
- **Naming**: PascalCase for components and interfaces, camelCase for functions and variables

### React Patterns
- **Components**: Functional components with hooks
- **State**: useState for local state, useEffect for side effects
- **Client Components**: Use `'use client'` directive when needed (e.g., YarnCalculator.tsx:1)
- **Server Components**: Default in App Router (e.g., page.tsx, layout.tsx)
- **Props**: Use TypeScript interfaces for type safety

### Styling Conventions
- **Framework**: Tailwind CSS utility classes
- **Responsive Design**: Mobile-first approach
  - Base styles for mobile
  - `sm:` prefix for small screens (640px+)
  - `md:` prefix for medium screens (768px+)
- **Dark Mode**: Using `dark:` prefix for dark mode variants
- **Color Scheme**: Purple/Pink gradient theme
  - Primary: purple-600, purple-700, purple-800
  - Accent: pink-50
  - Success: green-600, emerald-50
  - Error: red-500, red-600
  - Info: blue-600, blue-50
- **Spacing**: Responsive spacing (e.g., `p-2 sm:p-4 md:p-8`)
- **Border Radius**: Responsive (e.g., `rounded-xl md:rounded-2xl`)

### Icons
- **Library**: lucide-react
- **Common Icons**:
  - `Scissors` - Main logo
  - `Weight` - Weight input
  - `Ruler` - Length input
  - `Layers` - Strands input
  - `Trash2` - Delete action
  - `Plus` - Add action
  - `CheckCircle2` - Success/result
  - `Info` - Information
  - `AlertCircle` - Validation errors

### Component Structure Pattern
```tsx
'use client'; // If using hooks/interactivity

import { useState, useEffect } from 'react';
import { Icon } from 'lucide-react';

interface Props {
  // Define props
}

export default function ComponentName({ props }: Props) {
  // State
  const [state, setState] = useState<Type>(initialValue);

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Logic
  };

  // Render
  return (
    <div className="responsive-classes">
      {/* JSX */}
    </div>
  );
}
```

## State Management

### Current Approach
- **Local State**: React useState hooks
- **No Global State**: Application is simple enough to not require Redux/Context

### YarnCalculator State
1. **yarns**: Array of YarnInput objects
   - Default: 2 pre-filled examples
   - Managed by addYarn, removeYarn, updateYarn
2. **result**: Calculated meterage (number | null)
   - Updates automatically on valid input changes
3. **errors**: ValidationErrors object
   - Per-yarn, per-field error messages

### Auto-calculation Pattern
```typescript
useEffect(() => {
  if (validateAll()) {
    calculateTotalMeterage();
  } else {
    setResult(null);
  }
}, [yarns]);
```
This effect runs whenever yarns change, providing real-time calculation.

## Validation Rules

1. **Weight**:
   - Must be a positive number (> 0)
   - Error: "Вес должен быть больше 0"

2. **Length**:
   - Must be non-negative (>= 0)
   - Error: "Длина не может быть отрицательной"

3. **Strands**:
   - Must be integer >= 1
   - Error: "Должна быть минимум 1 нить"

4. **Visual Feedback**:
   - Invalid fields: Red border, red error icon, error message
   - Valid fields: Purple border
   - Result only shows when all inputs are valid

## Deployment

### GitHub Pages Setup
- **URL**: https://itbali.github.io/yarn-calc/
- **Deployment Method**: GitHub Actions (automatic)
- **Trigger**: Push to main/master or manual dispatch
- **Build Output**: Static HTML/CSS/JS in `out/` directory
- **Base Path**: `/yarn-calc` in production

### Static Export Requirements
1. `output: 'export'` in next.config.ts
2. `images.unoptimized: true` (no Image Optimization API)
3. `.nojekyll` file in public/ (prevents Jekyll processing)
4. GitHub Pages must use "GitHub Actions" as source

### Environment-Specific Config
- **Development**: No basePath, runs on localhost:3000
- **Production**: basePath '/yarn-calc', deployed to subdirectory

## Common Tasks for AI Assistants

### Adding a New Feature
1. Read existing code to understand patterns
2. Follow TypeScript/React conventions
3. Use existing Tailwind classes and responsive patterns
4. Maintain Russian language in UI
5. Update validation if adding new inputs
6. Test responsive behavior (mobile/desktop)
7. Ensure dark mode support

### Modifying Calculations
- Main logic is in `calculateTotalMeterage()` (YarnCalculator.tsx:84)
- Follow the reciprocal sum formula
- Ensure per-strand calculation is correct
- Update formula documentation if needed

### Styling Changes
- Use Tailwind utility classes (avoid custom CSS)
- Follow responsive pattern: base → sm: → md:
- Maintain purple/pink color scheme
- Include dark mode variants with `dark:` prefix
- Test on mobile viewport

### Adding Validation
1. Update validation logic in `validateYarn()` (line 46)
2. Add error message in Russian
3. Update ValidationErrors interface if needed
4. Apply error styling to input fields
5. Display error with AlertCircle icon

### Git Workflow
1. **Always** develop on the designated branch (starts with `claude/`)
2. **Never** push to main/master directly
3. Use clear, descriptive commit messages (can be in Russian or English)
4. Test builds before committing: `npm run build`
5. Push with: `git push -u origin <branch-name>`
6. If network errors occur, retry up to 4 times with exponential backoff

### Testing Checklist
- [ ] `npm run build` succeeds without errors
- [ ] `npm run lint` passes
- [ ] TypeScript compiles without errors
- [ ] UI works in mobile viewport (responsive)
- [ ] Dark mode displays correctly
- [ ] Validation shows appropriate errors
- [ ] Calculations produce correct results
- [ ] All text is in Russian

## SEO and Metadata

### Current Metadata (app/layout.tsx)
- **Title**: "Калькулятор пряжи"
- **Description**: "Расчет метража при сложении нескольких нитей пряжи. Простой и удобный онлайн калькулятор для вязания."
- **Keywords**: калькулятор пряжи, вязание, расчет метража, пряжа, калькулятор для вязания
- **Language**: Russian (ru_RU)
- **Canonical URL**: https://itbali.github.io/yarn-calc
- **Open Graph**: Configured for social media sharing
- **Twitter Card**: Summary card type
- **Apple Web App**: Enabled with purple theme color

### Updating Metadata
- Metadata is exported from layout.tsx
- Use Next.js Metadata API (type-safe)
- Test Open Graph preview with social media debuggers

## Accessibility Considerations

### Current Implementation
- Semantic HTML elements
- `aria-label` on icon buttons (e.g., delete button)
- Proper form input labels with icons
- Color contrast meets WCAG standards
- Focus states on interactive elements
- Responsive font sizes

### Improvements to Consider
- Add ARIA labels to form inputs
- Keyboard navigation testing
- Screen reader testing
- Focus management on add/remove yarn

## Performance Notes

- **Bundle Size**: Minimal dependencies
- **Rendering**: Auto-calculation uses controlled useEffect
- **Icons**: Tree-shaken from lucide-react (only used icons bundled)
- **Images**: Currently no images (unoptimized setting is for future use)
- **CSS**: Tailwind purges unused classes in production

## Common Pitfalls to Avoid

1. **Don't** add external state management (Redux, Zustand) - not needed
2. **Don't** use custom CSS - stick to Tailwind utilities
3. **Don't** break static export (e.g., using Next.js Image without unoptimized)
4. **Don't** forget dark mode variants when adding new UI
5. **Don't** ignore mobile responsive design
6. **Don't** change language to English - maintain Russian UI
7. **Don't** remove the basePath config - required for GitHub Pages
8. **Don't** forget to test build before committing

## Recent Changes (Git History Context)

Based on recent commits:
1. Auto-calculation and validation features added
2. Compact horizontal layout improvements
3. Better UX for input handling
4. Favicon and meta tags optimization
5. Mobile device optimizations

## Questions to Ask Before Making Changes

1. Does this change require client-side interactivity? (Use `'use client'` directive)
2. Should this work in dark mode? (Add `dark:` variants)
3. Is this responsive for mobile? (Add `sm:` and `md:` breakpoints)
4. Does the text need to be in Russian?
5. Will this break the static export?
6. Have I tested the build locally?

## Resources

- **Next.js 15 Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/icons
- **React 19**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs

---

**Last Updated**: 2025-11-22
**Maintained by**: AI assistants working on this project
**For questions**: Refer to README.md or project documentation

# Branch Management Guide

This project maintains two distinct codebases on separate branches:

## Branches Overview

### `main` Branch
- **Technology**: React 19 + JavaScript (JSX)
- **Features**: 
  - Dither background animation (WebGL shaders)
  - Simple portfolio layout
  - Framer Motion animations
- **Key Files**:
  - `src/App.jsx` - Main application
  - `src/main.jsx` - Entry point
  - `vite.config.js` - Vite config (JS)
  - `tailwind.config.js` - Tailwind config (JS)
  - `postcss.config.js` - PostCSS config (JS)

### `site` Branch
- **Technology**: React 18 + TypeScript
- **Features**:
  - 3D particles background (Three.js)
  - MDX content system
  - Multi-page routing
  - Project and writing pages
- **Key Files**:
  - `src/app/App.tsx` - Main application
  - `src/main.tsx` - Entry point
  - `vite.config.ts` - Vite config (TS)
  - `tailwind.config.ts` - Tailwind config (TS)
  - `postcss.config.cjs` - PostCSS config (CJS)

## Switching Between Branches

### Using Git Commands

```bash
# Switch to main branch
git checkout main
npm install  # Reinstall dependencies for main branch

# Switch to site branch
git checkout site
npm install  # Reinstall dependencies for site branch
```

### Using Helper Script

```bash
# Switch to main and install dependencies
./switch-branch.sh main

# Switch to site and install dependencies
./switch-branch.sh site
```

## File Conflicts

The following files exist in different formats on each branch:

| File | main branch | site branch |
|------|-------------|-------------|
| Vite config | `vite.config.js` | `vite.config.ts` |
| Tailwind config | `tailwind.config.js` | `tailwind.config.ts` |
| PostCSS config | `postcss.config.js` | `postcss.config.cjs` |
| Main entry | `src/main.jsx` | `src/main.tsx` |
| App component | `src/App.jsx` | `src/app/App.tsx` |

**Important**: When switching branches, these files will be replaced. Make sure to commit or stash your changes before switching.

## Development Workflow

1. **Before switching branches**:
   ```bash
   git status  # Check for uncommitted changes
   git stash   # Save changes if needed
   ```

2. **Switch branch**:
   ```bash
   git checkout <branch-name>
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

## IDE Configuration

The workspace is configured to handle both JavaScript and TypeScript:

- **VS Code Workspace**: `portfolio.code-workspace`
- **Settings**: `.vscode/settings.json`
- **Recommended Extensions**: `.vscode/extensions.json`

Open the workspace file in VS Code for optimal experience:
```bash
code portfolio.code-workspace
```

## Deployment

- **main branch**: Deploys to `https://theom.fr` (via gh-pages)
- **site branch**: Has GitHub Actions workflow for deployment

## Best Practices

1. **Always commit before switching branches**
2. **Run `npm install` after switching** (dependencies differ)
3. **Use the workspace file** for better IDE support
4. **Keep branches separate** - don't merge unless intentional
5. **Document changes** in commit messages

## Troubleshooting

### TypeScript errors on main branch
- This is normal - main branch uses JavaScript
- TypeScript files are from site branch

### Missing dependencies
- Run `npm install` after switching branches
- Each branch has different dependencies

### IDE not recognizing types
- Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
- Reload VS Code window


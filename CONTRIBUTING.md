# Contributing

Thanks for your interest in contributing to this bookmarklet collection.

## Quick start

1. Run the scaffolding script:
   ```bash
   npm run new -- --name "My Tool" --author "Your Name" --description "What it does" --tags "accessibility"
   ```

2. Edit the generated JS file in `bookmarklets/`

3. Add test content to the generated HTML file (if applicable)

4. Run `npm start` to test locally

5. Submit a PR

## Manual setup

If you prefer to create files manually:

1. Create a JS file in `bookmarklets/` with a JSDoc metadata block
2. Optionally create a matching HTML test page (no frontmatter needed)
3. Run `npm start` to lint, build, and preview

## Metadata fields

Every bookmarklet needs a JSDoc comment block at the top of the file:

```javascript
/**
 * @bookmarklet My Bookmarklet Name
 * @description What the bookmarklet does
 * @author Your Name
 * @authorUrl https://example.com
 * @tags accessibility, wcag:1.4.3
 * @pageTest true
 */
(function() {
  // Your bookmarklet code here
})();
```

| Field | Required | Description |
|-------|----------|-------------|
| `@bookmarklet` | Yes | Display name of the bookmarklet |
| `@description` | Yes | Brief description of what it does |
| `@author` | No | Original author's name |
| `@authorUrl` | No | Link to author or source |
| `@tags` | Yes | Comma-separated list of tags (see taxonomy below) |
| `@auditing` | No | Set to `true` for auditing favorites |
| `@pageTest` | No | `true`, `false`, or `self` (see test pages below) |

## Tag taxonomy

Tags are validated at build time. Each bookmarklet needs at least one category tag.

### Category tags (required, pick one)

| Tag | Description |
|-----|-------------|
| `accessibility` | Accessibility testing and visualization tools |
| `diagnostic` | Page information and debugging tools |
| `utility` | Convenience and productivity tools |

### Modifier tags (optional)

| Tag | Description |
|-----|-------------|
| `external` | Loads external scripts or redirects to external services |

### WCAG tags (optional)

Format: `wcag:X.X.X` where X.X.X is the success criterion number.

Examples:
- `wcag:1.4.3` (Contrast)
- `wcag:2.4.7` (Focus Visible)
- `wcag:4.1.2` (Name, Role, Value)

### Tag examples

```javascript
// Accessibility tool for checking headings
@tags accessibility, wcag:1.3.1, wcag:2.4.6

// External accessibility tool
@tags accessibility, external

// Simple utility
@tags utility
```

## Test pages

Test pages let users try a bookmarklet on sample content.

### `@pageTest` values

| Value | Meaning | HTML file needed? |
|-------|---------|-------------------|
| `true` | Dedicated test page with specific content | Yes |
| `self` | Works on any page, use the bookmarklet listing page | No |
| `false` | No test needed (e.g., redirects to external service) | No |

### Creating a test page

If `@pageTest` is `true`, create an HTML file with the same base name:
- `bookmarklets/my-tool.js` needs `bookmarklets/my-tool.html`

The HTML file contains only the test content (no frontmatter needed):

```html
<h1>Test page for My Tool</h1>
<p>Content that exercises the bookmarklet's functionality.</p>
```

## Build process

The build process:
1. Lints all JS files with ESLint and Prettier
2. Extracts metadata from JS files
3. Generates `data/bookmarklets.json` and `data/auditing.json`
4. Minifies and encodes each bookmarklet
5. Generates Netscape bookmark HTML files
6. Validates metadata completeness and tag taxonomy
7. Builds the static site with Eleventy

### Commands

| Command | Description |
|---------|-------------|
| `npm start` | Lint, build, and start dev server |
| `npm test` | Lint and build (CI) |
| `npm run build` | Build data files only |
| `npm run new -- --name "Name"` | Scaffold a new bookmarklet |

## Submitting a PR

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm test` to verify linting and build pass
5. Submit a pull request

### PR checklist

- [ ] Bookmarklet has all required metadata fields
- [ ] Tags follow the taxonomy (category + optional WCAG)
- [ ] Test page exists if `@pageTest` is `true`
- [ ] `npm test` passes

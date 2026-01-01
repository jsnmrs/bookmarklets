# Bookmarklet Codebase Improvement Plan

## Implementation Status

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Metadata in JS | ✅ Complete | All 62 bookmarklets have @bookmarklet metadata; build.js extracts and generates JSON |
| Phase 2: Simpler test pages | ✅ Complete | Uses Option B: `bookmarklets.11tydata.cjs` computes `file`, `permalink`, `title`, and `layout` from filename; all frontmatter removed from HTML test pages |
| Phase 3: Scaffolding | ✅ Complete | `npm run new -- --name "Name"` creates JS and HTML files |
| Phase 4: Validation | ✅ Complete | Build-time validation with orphan detection, test page checks, and metadata completeness; supports `@helper true` for non-bookmarklet JS files |
| Phase 5: Documentation | ❌ Not started | No CONTRIBUTING.md |

---

## Current State Analysis

### What Works Well
- **Clean build pipeline**: `build.js` handles minification, encoding, and Netscape HTML generation effectively
- **Modern tooling**: ESBuild for bundling, Eleventy for static site generation, ESLint/Prettier for quality
- **Good CI/CD**: Automated testing on PR, deployment to GitHub Pages on merge
- **Test pages**: 59 of 63 bookmarklets have test/demo HTML pages

### Current Pain Points

1. **Dual-File Maintenance**: Adding a new bookmarklet requires editing TWO files:
   - Create `bookmarklets/my-bookmarklet.js`
   - Manually add entry to `data/bookmarklets.json`

2. **Disconnected Metadata**: Bookmarklet metadata lives in JSON, separate from the source file. Easy to get out of sync.

3. **Test Page Boilerplate**: Each test page requires YAML frontmatter that partially duplicates JSON data:
   ```yaml
   permalink: "are-ya-hidden/"
   file: "are-ya-hidden.js"  # Must match JSON
   layout: test
   title: are ya hidden       # Duplicates bookmarklet name
   ```

4. **No Auto-Discovery**: New JS files aren't detected; must manually add to JSON.

5. **No Validation**: No build-time checks that:
   - Every JS file has a corresponding JSON entry
   - Every JSON entry points to an existing JS file
   - Test pages match their expected bookmarklets

6. **No Scaffolding**: No easy way to create a new bookmarklet with all required files.

---

## Proposed Improvements

### Phase 1: Single Source of Truth (Metadata in JS Files)

**Goal**: Move bookmarklet metadata into the JS source files as structured comments, eliminating the need to edit two files.

#### Implementation

Add JSDoc-style metadata block to each bookmarklet:

```javascript
/**
 * @bookmarklet Are ya hidden?
 * @description Display hidden content
 * @author Ian Lloyd
 * @authorUrl https://a11y-tools.com/bookmarklets/
 * @tags accessibility
 * @auditing false
 * @pageTest true
 */
(function() {
  // bookmarklet code...
})();
```

**Build process changes** (`build.js`):
1. Scan `bookmarklets/*.js` for files (auto-discovery)
2. Parse metadata from JSDoc comment block in each file
3. Generate `data/bookmarklets.json` from extracted metadata
4. Continue with existing minification/encoding pipeline

**Benefits**:
- Single file to edit when adding/updating a bookmarklet
- Metadata stays with code - harder to get out of sync
- Self-documenting source files
- Easier code review (all context in one place)

---

### Phase 2: Auto-Generated Test Page Stubs ✅

**Goal**: Reduce boilerplate for test pages by auto-generating the frontmatter.

**Implemented**: Option B (Convention-Based)

Created `bookmarklets/bookmarklets.11tydata.cjs` that uses Eleventy's computed data to auto-match HTML files to their JS counterparts by filename convention:
- `bookmarklets/foo.js` → auto-matched by `bookmarklets/foo.html`

The directory data file computes:
- `layout`: Always `test`
- `file`: Derived from HTML filename (e.g., `foo.html` → `foo.js`)
- `permalink`: Derived from HTML filename (e.g., `foo.html` → `foo/`)
- `title`: Looked up from bookmarklets data by file

Test pages now contain only their test content with no frontmatter required.

---

### Phase 3: Scaffolding Script ✅

**Goal**: Make adding new bookmarklets trivially easy.

**Implemented**: `scripts/new-bookmarklet.js`

```bash
npm run new -- --name "My Bookmarklet" --author "Your Name" --description "What it does" --tags "accessibility"
```

This generates:
1. `bookmarklets/my-bookmarklet.js` with metadata template
2. `bookmarklets/my-bookmarklet.html` test page stub

Features:
- Converts name to kebab-case slug
- Validates required name argument
- Prevents overwriting existing files
- Shows helpful next steps after creation

---

### Phase 4: Build-Time Validation ✅

**Goal**: Catch errors early in CI.

**Implemented**: Validation integrated into `build.js`:

1. **Orphan detection**:
   - JS files without `@bookmarklet` metadata → error (fails build)
   - Helper files marked with `@helper true` are excluded from validation

2. **Test page validation**:
   - If `@pageTest true`, verify corresponding HTML file exists → error
   - Missing `@pageTest` tag → warning

3. **Metadata completeness**:
   - Missing `@description` → warning
   - Missing `@author`, `@authorUrl`, `@tags` → warning

The build exits with code 1 if any errors are found, ensuring CI catches issues early.

---

### Phase 5: Documentation

**Goal**: Clear onboarding for contributors.

Create/update `CONTRIBUTING.md`:

```markdown
# Adding a New Bookmarklet

1. Run the scaffolding script:
   ```bash
   npm run new -- --name "My Tool" --author "Your Name"
   ```

2. Edit the generated JS file in `bookmarklets/`

3. Add test content to the generated HTML file

4. Run `npm start` to test locally

5. Submit a PR
```

---

## Proposed File Structure (After Improvements)

```
bookmarklets/
├── bookmarklets/
│   ├── my-bookmarklet.js      # Source + metadata in comments
│   └── my-bookmarklet.html    # Test page (minimal frontmatter)
├── scripts/
│   └── new-bookmarklet.js     # Scaffolding tool
├── data/
│   ├── bookmarklets.json      # Auto-generated from JS metadata
│   ├── auditing.json          # Auto-generated (filtered)
│   ├── bookmarks.html         # Netscape format (all)
│   └── auditing.html          # Netscape format (favorites)
├── build.js                   # Enhanced with metadata extraction
├── CONTRIBUTING.md            # Clear process documentation
└── ...
```

---

## Implementation Priority

| Phase | Effort | Impact | Recommendation |
|-------|--------|--------|----------------|
| Phase 1: Metadata in JS | Medium | High | **Do first** - biggest maintenance win |
| Phase 2: Simpler test pages | Low | Medium | Quick follow-up |
| Phase 3: Scaffolding | Low | Medium | Nice to have |
| Phase 4: Validation | Medium | High | Important for CI |
| Phase 5: Documentation | Low | High | Essential |

---

## Backward Compatibility

- The JSON structure and Netscape HTML output remain identical
- External consumers of `bookmarklets.json` are unaffected
- Test page URLs stay the same

---

## Tag Taxonomy

Tags follow a standardized taxonomy with build-time validation.

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

### Example

```javascript
/**
 * @bookmarklet Headings
 * @tags accessibility, wcag:1.3.1, wcag:2.4.6
 */
```

---

## Resolved Questions

1. **Metadata format**: Keep JSDoc-style (`@tag`) - familiar, easy to parse, good IDE support.
2. **Test page generation**: Keep manual - each test page needs specific HTML content.
3. **Categories/tags**: Defined taxonomy above with build-time validation.
4. **`pageTest: "self"`**: Keep - semantically useful for bookmarklets that work on any page.

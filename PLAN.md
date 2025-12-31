# Bookmarklet Codebase Improvement Plan

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

### Phase 2: Auto-Generated Test Page Stubs

**Goal**: Reduce boilerplate for test pages by auto-generating the frontmatter.

#### Option A: Simplified Frontmatter (Recommended)
Test pages only need to specify the file reference:

```yaml
---
file: are-ya-hidden.js
---
<section>
  <!-- Test content only -->
</section>
```

The layout template derives all other data (`permalink`, `title`, `description`) from the bookmarklets data.

**Layout change** (`_includes/layouts/test.html`):
```liquid
---
layout: page
permalink: "{{ file | replace: '.js', '/' }}"
---
{% assign bm = bookmarklets | where: "file", file | first %}
<h1>{{ bm.bookmarklet }}</h1>
...
```

#### Option B: Convention-Based (No Frontmatter Needed)
Use Eleventy's computed data to auto-match HTML files to their JS counterparts by filename convention:
- `bookmarklets/foo.js` → auto-matched by `bookmarklets/foo.html`

---

### Phase 3: Scaffolding Script

**Goal**: Make adding new bookmarklets trivially easy.

Create `scripts/new-bookmarklet.js`:

```bash
npm run new -- --name "My Bookmarklet" --author "Your Name"
```

This generates:
1. `bookmarklets/my-bookmarklet.js` with metadata template
2. `bookmarklets/my-bookmarklet.html` test page stub

**package.json addition**:
```json
"scripts": {
  "new": "node scripts/new-bookmarklet.js"
}
```

---

### Phase 4: Build-Time Validation

**Goal**: Catch errors early in CI.

Add validation step to `build.js`:

1. **Orphan detection**:
   - JS files without metadata → error
   - JSON entries pointing to missing JS files → error

2. **Test page validation**:
   - If `pageTest: true`, verify HTML file exists
   - Warn about bookmarklets without test pages

3. **Metadata completeness**:
   - Required fields: `bookmarklet`, `description`, `file`
   - Warn on missing optional fields: `author`, `authorUrl`, `tags`

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

## Questions for Consideration

1. **Metadata format**: JSDoc-style (`@tag`) vs JSON5 block vs YAML frontmatter in JS comments?
2. **Test page generation**: Should test pages be fully auto-generated for simple cases (just showing the button)?
3. **Categories/tags**: Current tags are inconsistent. Should there be a defined taxonomy?
4. **`pageTest: "self"`**: Keep this convention or handle differently?

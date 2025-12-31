# bookmarklets

Tools for the browser.

- [Table of bookmarklets](https://jsnmrs.github.io/bookmarklets)
- [HTML bookmark file for importing into browsers](https://jsnmrs.github.io/bookmarklets/data/bookmarklets.html) (in [Netscape bookmark format](https://web.archive.org/web/20230318225552/https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582%28v%3Dvs.85%29) to import in any browser)

## Install and run locally

1. `git clone https://github.com/jsnmrs/bookmarklets.git && cd bookmarklets`
2. `npm ci`
3. `npm start`

## Adding a bookmarklet

1. Create a new JS file in `bookmarklets/` with a JSDoc metadata block at the top:
   ```javascript
   /**
    * @bookmarklet My Bookmarklet Name
    * @description What the bookmarklet does
    * @author Your Name
    * @authorUrl https://example.com
    * @tags accessibility, utility
    * @pageTest true
    */
   (function() {
     // Your bookmarklet code here
   })();
   ```
2. Optionally create a test HTML page in `bookmarklets/` with the same base name
3. Run `npm start` to lint JS, build data files, and generate the static site
4. The new entry will be added to the table of bookmarklets in `index.html`

### Metadata fields

| Field | Required | Description |
|-------|----------|-------------|
| `@bookmarklet` | Yes | Display name of the bookmarklet |
| `@description` | Yes | Brief description of what it does |
| `@author` | No | Original author's name |
| `@authorUrl` | No | Link to author or source |
| `@tags` | No | Comma-separated list of tags |
| `@auditing` | No | Set to `true` for auditing favorites |
| `@pageTest` | No | `true`, `false`, or `self` for test page behavior |

## Related web tools

- [Eric Meyer's URL encoder and decoder](https://meyerweb.com/eric/tools/dencoder/)
- [Bookmarklet builder](https://subsimple.com/bookmarklets/jsbuilder.htm) — long-standing, reliable JS to bookmarklet converter
- [Bookmarkleter](https://chriszarate.github.io/bookmarkleter/) — another JS to bookmarklet converter

## Content Security Policy (CSP) issues

via [ANDI - Accessibility Testing Tool - Install](https://www.ssa.gov/accessibility/andi/help/install.html)

> If after pressing the ANDI favelet button, ANDI does not launch after a few seconds, it could be due to the page telling the browser to enforce a Content Security Policy directive. To determine if this is the issue, open the browser's Developer Tools (F12) and attempt to launch ANDI. If the Dev Tools console shows an error message that says _"Refused to load the script…because it violates the following Content Security Policy directive"_ then this is the issue.
>
> If the user desires to use ANDI immediately, Content Security Policy (CSP) can be disabled. Note: **It is the user's decision to disable CSP and the user's responsibility to re-enable CSP when testing with ANDI has concluded.** If users decide not to disable CSP, and ANDI cannot be launched, it is recommended to use other accessibility testing procedures.

### Chrome

1. Install the [Disable Content-Security-Policy extension](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden) from the Chrome Web Store
2. Select the Disable Content-Security-Policy extension button in the Chrome browser toolbar to disable CSP
3. Navigate to the test page, launch ANDI
4. When done testing with ANDI, re-enable CSP

### Firefox

1. In the address bar, enter `about:config`
2. Under Preference Name, select `security.csp.enable` to disable it
3. Navigate to the test page, launch ANDI
4. When done testing with ANDI, re-enable the `security.csp.enable`

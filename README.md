# bookmarklets

Tools for the browser.

- [Table of bookmarklets](https://jsnmrs.github.io/bookmarklets)
- [HTML bookmark file for importing into browsers](https://jsnmrs.github.io/bookmarklets/data/bookmarklets.html) (in [Netscape bookmark format](https://web.archive.org/web/20230318225552/https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582%28v%3Dvs.85%29) to import in any browser)

## Install and run locally

1. `git clone https://github.com/jsnmrs/bookmarklets.git && cd bookmarklets`
2. `npm ci`
3. `npm start`

## Adding a bookmarklet

1. Edit [`data/references.json`](/data/references.json) and add a new entry, following the schema used on the rest of the file
2. Create a new JS file (and optionally a test HTML page) for the new entry
3. Add code
4. Run `npm start` to lint JS, build data file, and generate static site
5. New entry will be added to the table of bookmarklets in `index.html`

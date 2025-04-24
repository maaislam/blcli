For the purpose of Google Optimize
==================================

1. Don't import references to large objects or string content
2. Split large content objects or strings up
3. Handle as follows:

- Replace references to large objects with a reference on the window, e.g.

```
donationPagesContent
// with:
window.donationPagesContent
```

- Move the object into separate files and join them together (see content_split.js and content_split2.js)
- These files aren't part of the build process, but we'll use them as follows:

1. https://babeljs.io/en/repl
2. Set minify on
3. Convert content_split.js to es5 minified
4. Convert content_split2.js to es5 minified
5. Add them to the platform now that they don't exceed character limits


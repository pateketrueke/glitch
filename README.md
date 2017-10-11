# Grown & Tarima on Glitch

This source is the same as running on https://grown-up.glitch.me/ &mdash; it showcases basic support for dynamic assets and pages.

## How it works?

Files within `public/` are served as-is, while sources on `lib/` are imported and executed on-the-fly.

Regular modules MUST be exported as ES6, e.g. `lib/content/example.js`

```js
export default state => `<p>
  ${state.content}
</p>`;
```

Template objects are supported too, e.g. `lib/content/example.js`

```js
export default {
  title: 'My page',
  render: state => state.body,
};
```

You can use JSX on your render functions, e.g. `lib/content/example.jsx`

```js
export default (state, h) => <div>
  {state.body}
</div>;
```

Pug is also supported, e.g. `lib/content/example.pug`

```pug
h1 It works!
```

Markdown pages, e.g. `lib/content/example.md`

```markdown
---
title: My page
layout: custom
---

## It works?
```

Assets also works the same way, e.g. `lib/assets/styles.css`

```less
@color: red;

* {
  color: @color;
}
```

Now you can import that stylesheet on your pages, e.g. `lib/templates/default.pug`

```pug
doctype html
html
  head
    link(rel='stylesheet' href='/styles.css')
```

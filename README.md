# Grown & Tarima on Glitch

This source is the same as running on [grown-at.glitch.me](https://grown-at.glitch.me/) &mdash; it showcases basic support for dynamic assets and pages.

## How it works?

- Files within `public/` are served as-is, they are just static files, nothing special here
- Files from `src/` are imported and executed on-the-fly, see below

## Content

> Note: content files are intended to be pages only, regardless its extension

Exported modules MUST use ES6 syntax, e.g. `src/content/example.js`

```js
export default state => `<p>
  ${state.content}
</p>`;
```

Template _objects_ are supported too, e.g. `src/content/example.js`

```js
export default {
  title: 'My page',
  render: state => state.body,
};
```

You can use JSX on your `render` functions, e.g. `src/content/example.jsx`

```js
// the second argument `h` is required
export default (state, h) => <div>
  {state.body}
</div>;
```

Pug is also supported, e.g. `src/content/example.pug`

```pug
h1 It works!
```

Markdown pages, e.g. `src/content/example.md`

```markdown
---
title: My page
layout: custom
---

## It works!
```

Also, you can use templates for your content, e.g. `src/templates/custom.pug`

```pug
doctype html
html
  head
    title= title || 'Untitled'
    link(rel='stylesheet' href='/stylesheets/styles.css')
  body
    != locals.yield
```

## Assets

> Note: asset files are just javascript (bundled or not) and css

Stylesheets works (by default using `LESS`), e.g. `src/assets/stylesheets/styles.css`

```less
@color: red;

* {
  color: @color;
}
```

Javascript sources are always bundled, e.g. `src/assets/javascripts/application.js`

> Note: files and folders starting with `_` are ignored for serving, so they are not accesible publicly

You MUST use the `import` syntax for splitting your code and properly organize your application, scripts, etc.

```js
// here we're using Vue.js for our front-end
import App from './_components/App.vue';

// mount the application on the DOM
const vm = new Vue({
  el: '#app',
  render: h => h(App),
});
```

## Usage

You can refer to generated files as follows:

- `public/robots.txt` &rarr; `/robots.txt`
- `src/content/example.md` &rarr; `/example`
- `src/content/sub/page.jsx` &rarr; `/sub/page`
- `src/assets/stylesheets/styles.css` &rarr; `/stylesheets/styles.css`
- `src/assets/javascripts/application.js` &rarr; `/javascripts/application.js`

> From this point, you're free to change everything you need to fit your needs.

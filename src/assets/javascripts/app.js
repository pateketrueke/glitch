import App from './App.vue';

/* global version, environment */

const message = `Grown v${version} / ENV: ${environment}`;

/* global Vue */

const vm = new Vue({
  el: document.getElementById('app'),
  render: h => h(App, {
    props: {
      value: message,
    },
  }),
});

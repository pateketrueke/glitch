import App from './App.vue.pug';

/* global Vue */

const vm = new Vue({
  el: document.getElementById('app'),
  props: ['value'],
  render: h => h(App),
});

/* global version, environment */

const message = `Grown v${version} / ENV: ${environment}`;

console.log(message);

vm.value = message
import App from './App.vue.pug';

const vm = new Vue({
  el: document.getElementById('app'),
  render: h => h(App),
});

console.log(vm);

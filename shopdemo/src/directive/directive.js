import Vue from 'vue';

Vue.directive('heightfull', {
    bind: function (el, binding, vnode) {
      el.style.height = (window.innerHeight||window.screen.height)+'px';
    }
})
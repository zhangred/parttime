import Vue from 'vue';

Vue.directive('heightfull', {
    bind: function (el, binding, vnode) {
      el.style.height = (window.innerHeight||window.screen.height)+'px';
    }
})

Vue.directive('sliderbox',{
    update(el, binding){
        if (binding.value.show) {
            el.classList.add('show')
            el.classList.remove('hide')
            var h = el.scrollHeight;
            el.style.height = h+'px';
            if(binding.value.auto){
                setTimeout(()=>{
                    el.style.height = 'auto'
                },300)
            }
        } else {
            el.classList.add('hide')
            el.classList.remove('show')
            if(binding.value.auto){
                var h = el.scrollHeight;
                el.style.height = h+'px';
                setTimeout(()=>{
                    el.style.height = 0;
                },0)
            }else{
                el.style.height = 0;
            }
        }
    },
    bind: function (el, binding, vnode) {
        if (binding.value.show) {
            el.classList.add('show')
            el.classList.remove('hide')
            el.style.height = 'auto'
        } else {
            el.classList.add('hide')
            el.classList.remove('show')
            el.style.height = 0;
        }
        
    },
})
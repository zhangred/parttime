const CUES = {
    throttle:function(fn,wait){
        var timeout;
        var later = function(){
            fn();
            timeout = null;
        }
        return function(){
            if(!timeout){
                timeout = setTimeout(later,wait)
            }
        }
    },
    throttle_o:function(wait){
        var timeout = null,
            args = null;
        // var timestamp = 0;
        // timestamp = timestamp||0;

        let that = this;

        let later = function(){
            that.callback&&that.callback(args);
            timeout = null;
        }
        this.trigger = function(opts){
            args = opts;
            // timestamp = new Date().getTime();
            if(!timeout){
                timeout = setTimeout(later,wait)
            }
        }
    },
    event_once:function(type,selector,callback){
        selector = selector||document.getElementById('app');
        selector.addEventListener(type, function fn(e) {
            selector.removeEventListener(type, fn);
            callback(e);
        }, false);
    },
    delay:function(time){
        return new Promise((resolve)=>{
            setTimeout(function(){
                resolve()
            },time||200)
        })
    },
    getScrollTop(){

    },
    setScrollTop(top){
        setTimeout(()=>{
            if (top) {
                document.body.scrollTop = top
                document.documentElement.scrollTop = top
                window.pageYOffset = top
            }
        },30)
    }
}
export default CUES
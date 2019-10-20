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
        var timeout,args,timestamp;
        let that = this;

        let later = function(){
            that.callback&&that.callback(args);
            timeout = null;
        }
        this.trigger = function(opts){
            args = opts;
            timestamp = new Date().getTime();
            if(!timeout){
                timeout = setTimeout(later,wait)
            }
        }
    },
    event_once:function(type,selector,callback){
        selector = selector||document;
        selector.addEventListener(type, function fn(e) {
            selector.removeEventListener(type, fn);
            return callback(e);
        }, false);
    }
}
export default CUES
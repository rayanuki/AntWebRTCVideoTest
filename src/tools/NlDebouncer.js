let instance;

class NlDebouncer{
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }

    throttle(fn, delay){
        let lastcall = 0;
        let dl = delay ? delay : 100;
        let timerId = null;
        return function(args){
            if(dl > 0){
                let now = (new Date).getTime();
                if(timerId) clearTimeout(timerId)
                timerId = setTimeout(function(){
                    timerId = null;
                    if(lastcall == now) return;
                    return fn(args);
                }, dl)
                if(now-lastcall < dl)return;
                lastcall = now;
                return fn(args);
            }else{
                return fn(args);
            }
        }
    }

    debounce(fn, delay){
        let timerId = null;
        let dl = delay ? delay : 100;
        return function(args){
            if(timerId) clearTimeout(timerId);
            if(delay > 0){
                timerId = setTimeout(function(){
                    timerId = null;
                    fn(args);
                }, dl);
            }else{
                timerId = null;
                fn(args);
            }
        }
    }
}

export default new NlDebouncer();
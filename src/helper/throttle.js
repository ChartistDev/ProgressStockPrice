const throttle = function(fn, delay){
    let flag = true;
    return function() {
        let obj = this,
            args = arguments
        if(flag) {
            fn.apply(obj, args);
            flag = false;
            setTimeout(()=> {
                flag = true;
            }, delay);
        }
    }
}
export default throttle;
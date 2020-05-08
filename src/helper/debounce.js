const debounce = function(fn, delay){
    let timeout;
    return function() {
        let obj = this,
            args = arguments
        if(timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            fn.apply(obj, args);
        },delay)
    }
}
export default debounce;
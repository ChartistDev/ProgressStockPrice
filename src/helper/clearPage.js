const clearPage = function(list) {
    let firstChild = list.firstElementChild;
        while(firstChild) {
            firstChild.remove();
            firstChild = list.firstElementChild;
        }
}
export default clearPage;
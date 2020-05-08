const state  = {
    data: {},
    clipData: function(fromDate, toDate) {
         let dates = Object.keys(this.data),
         clippedDates = dates.filter(function(d) {
             return(new Date(d)>=fromDate && new Date(d)<=toDate);
         });
         console.log(clippedDates);
         this.data = clippedDates.reduce((obj, value) => {
             obj[value] = this.data[value]
             return obj;
         }, {})
    },
    setData: function(data) {
        this.data = data;
    },
    getData : function() {
        return this.data;
    }
}
export {state};
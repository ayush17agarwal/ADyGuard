
//gets the search value for any google search when extension is enabled
var search_value = document.getElementsByClassName("gLFyf").q.value 


var Search = {
    value : search_value
};

//currently throws an alert with the search value
window.alert(search_value);
module.exports = {Search};
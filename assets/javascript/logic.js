// Declare Global Variables Here
var formData = {
    searchTerm: "",
    recordLimit: 0,
    yearStart: 0,
    yearEnd: 0,
};

// Declare and Define Function Here
function pullFormData (object){
    object.searchTerm = $("#search").val();
    object.recordLimit = $("#records").val();
    object.yearStart = $("#startDate").val();
    ojbect.yearEnd = $("#endDate").val();
}
// Main Program Starts Here
$(document).ready(function(){

    $("#btnSearch").on("click", function(event){
        pullFormData(formData);

    });
    $("#btnClear").on("click", function(event){

    });
});
// Declare Global Variables Here
var formData = {
    searchTerm: "",
    recordLimit: 0,
    yearStart: 0,
    yearEnd: 0,
};

// Declare and Define Function Here
// Updates our FormData object with the data entered in by the end user
function pullFormData (object){
    object.searchTerm = $("#search").val();
    object.recordLimit = $("#records").val();
    object.yearStart = $("#startDate").val();
    ojbect.yearEnd = $("#endDate").val();
}
// Returns the URL that will be used with our API call
function buildUrl(object){
    // Built by LucyBot. www.lucybot.com
    var urlRoot = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    var keyWord = "?q=" + object.searchTerm + "&";
    var dates = "?begin_date=" + object.yearStart + "&?end_date=" + object.yearEnd + "&";
    var url = urlRoot + keyWord + dates + $.param({
    'api-key': "c93408eb36ce492eb8eb7d53bce88c51"
    });
    return url;
}
// Uses the AJAX method to get the search results from the API and add them to the display
function updateDisplay(queryUrl){
    $.ajax({
        url: queryUrl,
        method: 'GET',
    }).done(function(result) {
        console.log(result);
    }).fail(function(err) {
        throw err;
    }).then(function(response){
        results = response.response;
        for(var i=0; i<formData.recordLimit; i++){
            var title = results.docs[i].headline.main;
            var snip = results.docs[i].snippet;
            var linkUrl = results.docs[i].web_url;

            var titleDiv = $("<heading>");
            var short = $("<p>");
            var webLink = $("<a>");
            var newDiv = $("<div>");

            titleDiv.text(i + " " + title);
            short.text(snip);
            webLink.text(linkUrl);

            newDiv.append(titleDiv);
            newDiv.append(short);
            newDiv.append(webLink);

            $("#articles").append(newDiv);
        }
    });
    }
        
// Main Program Starts Here
$(document).ready(function(){

    $("#btnSearch").on("click", function(event){
        event.preventDefault();
        pullFormData(formData);
        buildUrl(formData);
        updateDisplay(url);
    });    
    $("#btnClear").on("click", function(event){

        
    });
});
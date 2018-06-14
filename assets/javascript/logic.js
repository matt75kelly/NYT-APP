// Declare Global Variables Here
console.log("hello");

var formData = {
    searchTerm: "",
    recordLimit: 0,
    yearStart: 0,
    yearEnd: 0,
};

// Declare and Define Function Here
// clears the FormData and the input fields on the DOM
function clearFormData(object){
    object.searchTerm= "";
    object.recordLimit= 0;
    object.yearStart= 0;
    object.yearEnd= 0;

    // Uses the ID of our Default Option in our Select Element This Select Element should have it's first Option Element be empty text
    $("input").empty();
    $("#default").attr("selected", "selected");
}
// Updates our FormData object with the data entered in by the end user
function pullFormData (object){

    // utilizes the IDs on each of the Input elements in the Form
    object.searchTerm = $("#search").val();
    object.recordLimit = $("#sel1").val();
    object.yearStart = $("#startDate").val();
    object.yearEnd = $("#endDate").val();
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
    console.log(url);
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

            // Adds classes to the dynamically created elements so they can be styled later
            titleDiv.addClass("articleTitle");
            short.addClass("articleSummary");
            weblink.addClass("articleLink");
            newDiv.addClass("articleWrapper");

            titleDiv.text(i + " " + title);
            short.text(snip);
            webLink.text(linkUrl);

            newDiv.append(titleDiv);
            newDiv.append(short);
            newDiv.append(webLink);

            // Utilizes the ID of the div at the very bottom that will be holding our articles
            $(".container").append(newDiv);
        }
    });
    }
        
// Main Program Starts Here
$(document).ready(function(){
    // Uses the ID of the Search Button
    $("#btnSearch").on("click", function(event){
        event.preventDefault();
        pullFormData(formData);
        buildUrl(formData);
        updateDisplay(url);
    });   
    // Uses the ID of the Clear Button 
    $("#btnClear").on("click", function(event){
        clearFormData(formData);
    });
});
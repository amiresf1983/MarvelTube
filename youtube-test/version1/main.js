$("document").ready(function () {
  var API_KEY = "AIzaSyBYuxS3gWRGJhvRH2pxLRJXODm9MPu8j_g";

  $("#form").submit(function (event) {
    event.preventDefault();
    alert("form");

    var search = $("#search").val();
    videoSearch(API_KEY, search, 5);
  });
  function videoSearch(key, search, maxResults) {
    $.get(
      "https:/www.googleapis.com/youtube/vs/search?key=" +
        key +
        "&type=video&part=snippet&maxResults=" +
        maxResults +
        "&q=" +
        search,
      function (data) {
        console.log(data);
      }
    );
  }
});

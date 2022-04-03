$("document").ready(init);

var video = "";

var videos = $();

function init() {
  var API_KEY = "AIzaSyBYuxS3gWRGJhvRH2pxLRJXODm9MPu8j_g";

  $("#search-form").submit(function (event) {
    event.preventDefault();
    console.log("form-group");

    var search = $("#search").val();
    videoSearch(API_KEY, search, 5);
  });
}
//hoisting
function videoSearch(key, search, maxResults) {
  var url =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    key +
    "&type=video&part=snippet&maxResults=" +
    maxResults +
    "&q=" +
    search;

  $.get(url, function (data) {
    // console.log(data);
    displayVideos(data);
  });
}

function displayVideos(data) {
  $("#search").val("");

  var videoData = "";
  data.items.forEach((item) => {
    videoData = `
                  
                  <tr>
                  <td>
                  <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
                  ${item.snippet.title}</td>
                  <td>
                  <img width="200" height="200" src="${item.snippet.thumbnails.high.url}"/>
                  </td>
                  <td>
                  
                  
                  </tr>

                  `;

    $("#videos").append(videoData);
  });
  console.log(videoData);
}

$("document").ready(init);

var video = "";
var videos = $();
var API_KEY = "AIzaSyB9Os5jr2rvfR85lNBk06y4o7wCamOMrgM";
function init() {
  try {
    searchTerm = JSON.parse(localStorage.getItem("search_key")) || "";
    $("#search-form").trigger("submit");
  } catch (error) {
    console.log(error);
  }
}
$("#search-form").submit(function (event) {
  event.preventDefault();
  console.log("form-group");
  var search = $("#search").val() || searchTerm;
  videoSearch(API_KEY, search, 5);
});
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
    // videoData = `
    //               <tr>
    //               <td>
    //               <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
    //               ${item.snippet.title}
    //               <br></td>
    //               <td>

    //               <iframe width="640" height="360" src="${item.snippet.thumbnails.high.url}" frameborder="0" allowfullscreen></iframe>

    //               </td>
    //               <td>
    //               </tr>
    //               `;
    videoData = `
    <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}">
    ${item.snippet.title}
    <br>
    <iframe width="640" height="360" src="${item.snippet.thumbnails.high.url}" frameborder="0" allowfullscreen></iframe> 
    <br>`;
    $("#videos").append(videoData);
  });
  console.log(videoData);
}

$("document").ready(init);

var video = "";
var videos = $();
var API_KEY = "AIzaSyB9Os5jr2rvfR85lNBk06y4o7wCamOMrgM ";
var searchTerm;

// AIzaSyCsZSrt3l_PmnuJaVxt_FRuhBZULQhKN8Q

//once html request marvel api character (renderSearchCharacter) it will trigger a get response to details.html an display videos
function init() {
  try {
    searchTerm = JSON.parse(localStorage.getItem("render_search_key")) || "";
    $("#search-form").trigger("submit");
  } catch (error) {
    console.log(error);
  }
}
//html page input will submited to form group to display youtube videos giving a list of 5 youtube search
$("#search-form").submit(function (event) {
  event.preventDefault();
  console.log("form-group");
  var search = $("#search").val() || searchTerm;
  videoSearch(API_KEY, search, 5);
});

//Searching using Youtube API and filtering what search we want in the function
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

// Displaying Youtube Video
function displayVideos(data) {
  $("#search").val("");
  var videoData = "";
  data.items.forEach((item) => {
    videoData = `
    <a target="_blank" href="https://www.youtube.com/watch?v=${item.id.videoId}"/>
    ${item.snippet.title}
    <br>
    <img src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}" width="640" height="360"/>
    
    <br>`;
    $("#videos").append(videoData);
  });
  console.log(videoData);
}

// i frame issue no play button click only on link changed to img src
// <iframe width="640" height="360" src="${item.snippet.thumbnails.high.url}" frameborder="0" allowfullscreen></iframe>

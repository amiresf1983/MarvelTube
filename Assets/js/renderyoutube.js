$("document").ready(init);

var searchKey = {};
var videos = $();
var videoContainer = $('#videos');
var API_KEY = "AIzaSyB9Os5jr2rvfR85lNBk06y4o7wCamOMrgM";
// var API_KEY = "AIzaSyAkrMmNdavnKlZvW1vfVertGaylV7ucj2c";
// for testing
// var data = {
//   "kind": "youtube#searchListResponse",
//   "etag": "J-s9sGIy5X8bniAIJSRfC4gRKQg",
//   "nextPageToken": "CAIQAA",
//   "regionCode": "AU",
//   "pageInfo": {
//     "totalResults": 1000000,
//     "resultsPerPage": 2
//   },
//   "items": [
//     {
//       "kind": "youtube#searchResult",
//       "etag": "wbc6JE6HhAKC3PWaGEpGpO3zX6c",
//       "id": {
//         "kind": "youtube#video",
//         "videoId": "udKE1ksKWDE"
//       },
//       "snippet": {
//         "publishedAt": "2017-02-18T16:06:43Z",
//         "channelId": "UClVbhSLxwws-KSsPKz135bw",
//         "title": "The Avengers - &quot;I&#39;m Always Angry&quot; - Hulk SMASH Scene - Movie CLIP HD",
//         "description": "The Avengers (2012) - \"I'm Always Angry\" - Hulk SMASH Scene - Movie CLIP HD [1080p 60 FPS HD ] One of the best scene in ...",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/udKE1ksKWDE/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/udKE1ksKWDE/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/udKE1ksKWDE/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           }
//         },
//         "channelTitle": "TopMovieClips",
//         "liveBroadcastContent": "none",
//         "publishTime": "2017-02-18T16:06:43Z"
//       }
//     },
//     {
//       "kind": "youtube#searchResult",
//       "etag": "tbagOUoBV4Xy5lcrfYu8aHb4dKo",
//       "id": {
//         "kind": "youtube#video",
//         "videoId": "SLD9xzJ4oeU"
//       },
//       "snippet": {
//         "publishedAt": "2017-01-22T21:08:03Z",
//         "channelId": "UClVbhSLxwws-KSsPKz135bw",
//         "title": "Thor vs Hulk - Fight Scene - The Avengers (2012) Movie Clip HD",
//         "description": "Thor vs Hulk - Fight Scene - The Avengers (2012) Movie Clip 1080p HD All material belongs to Disney and Marvel. Fair use.",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/SLD9xzJ4oeU/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/SLD9xzJ4oeU/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/SLD9xzJ4oeU/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           }
//         },
//         "channelTitle": "TopMovieClips",
//         "liveBroadcastContent": "none",
//         "publishTime": "2017-01-22T21:08:03Z"
//       }
//     }
//   ]
// };


function init() {
  try {
    searchKey = JSON.parse(localStorage.getItem("search_key"));
    searchTerm = searchKey.name + " Marvel";
    // displayVideos(data);
    // Search for videos and create divs for each ifram
    videoSearch(API_KEY, searchTerm, 2);

    hideSearch();
  } catch (error) {
    console.log(error);
  }
}

function hideSearch() {
  var container = $(".five.wide.column");
  container.empty();

  var column = $("<div>");
  $(column).addClass("column img");

  var card = $("<div>");
  $(card).addClass("ui raised link card centered");

  var aLink = $("<a>");
  $(aLink).addClass("image");

  var characterImage = $("<img>");
  $(characterImage).attr("src", searchKey.img);
  $(characterImage).attr("alt", searchKey.name);

  $(aLink).append(characterImage);

  var characterName = $("<p>");
  $(characterName).addClass("ui center aligned");
  $(characterName).css("padding", "10px");
  $(characterName).html(searchKey.name + "<br><br>" + searchKey.bio);
  $(card).append(aLink);
  $(card).append(characterName);
  $(column).append(card);
  $(container).append(column);
}

function videoSearch(key, search, maxResults) {
  var url =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    key +
    "&type=video&part=snippet&maxResults=" +
    maxResults +
    "&q=" +
    search;

  $.get(url, function (data) {
    console.log(data);
    displayVideos(data);

  //removed this as the videos are not responsive
    // var tag = document.createElement("script");
    // // 2. This code loads the IFrameertBefo Player API code asynchronously.
    // $(tag).attr("src", "https://www.youtube.com/iframe_api");
    // var firstScriptTag = $("script")[6];
    // $("#videos").append(tag);
    // //  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // // from https://stackoverflow.com/questions/38906568/youtube-api-multiple-videos-with-events
    // var playerDivs = $(".player"); // get .player nodes
    // var playerDivsArr = [].slice.call(playerDivs); // nodelist to array to use forEach();
    // var players = new Array(playerDivsArr.length);
    // var waypoints = new Array(playerDivsArr.length);

    // // 3. This function creates an <iframe> (and YouTube player)
    // //    after the API code downloads.
    // // from https://chromatichq.com/insights/working-youtube-player-api-iframe-embeds
    // window.onYouTubeIframeAPIReady = function () {
    //   playerDivsArr.forEach(function (e, i) {
    //     // forEach ...
    //     players[i] = new YT.Player(e.id, {
    //       videoId: e.dataset.videoId,
    //       events: {
    //         /* no events set */
    //       },
    //     });
    //   });
    // };
  });
}

function displayVideos(data) {
  $("#search").val("");
  var i = 1;

  data.items.forEach((item) => {
    // 1. Create div for every iframe
    var player = $("<div>");
    $(player).attr("id", "player" + i);
    $(player).addClass("ui embed video player");
    $(player).attr("data-video-id", `${item.id.videoId}`);
    $(player).attr("data-id", `${item.id.videoId}`);
    $(player).attr("data-url", `https://www.youtube.com/embed/${item.id.videoId}`);
    $(player).attr("data-source", 'youtube');
    $(player).attr("data-image", `${item.snippet.thumbnails.high.url}`);
    $(player).attr("data-placeholder", `${item.snippet.thumbnails.high.url}`);

    var divider = $("<div>");
    $(divider).addClass("ui hidden divider");
    
    i++;
    $("#videos").append(player);
    $("#videos").append(divider);
    $('.ui.embed').embed();
  });
}
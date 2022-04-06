$("document").ready(init);

var searchKey = {};
var videos = $();
// var API_KEY = "AIzaSyB9Os5jr2rvfR85lNBk06y4o7wCamOMrgM";
var API_KEY = "AIzaSyAkrMmNdavnKlZvW1vfVertGaylV7ucj2c";
// var data = {
//   "kind": "youtube#searchListResponse",
//   "etag": "VPVv_bvzUtU0Aah2rgvdLIpyrqU",
//   "nextPageToken": "CAIQAA",
//   "regionCode": "AU",
//   "pageInfo": {
//     "totalResults": 1000000,
//     "resultsPerPage": 2
//   },
//   "items": [
//     {
//       "kind": "youtube#searchResult",
//       "etag": "pMcUcwPN6hFMHbW1ocdxdDHbqLk",
//       "id": {
//         "kind": "youtube#video",
//         "videoId": "xjDjIWPwcPU"
//       },
//       "snippet": {
//         "publishedAt": "2017-10-16T13:00:07Z",
//         "channelId": "UCvC4D8onUfXzvjTOM-dBfEA",
//         "title": "Marvel Studios&#39; Black Panther - Official Trailer",
//         "description": "Long live the king. Watch the new trailer for Marvel Studios #BlackPanther. In theaters February 16! ▻ Subscribe to Marvel: ...",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/xjDjIWPwcPU/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/xjDjIWPwcPU/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/xjDjIWPwcPU/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           }
//         },
//         "channelTitle": "Marvel Entertainment",
//         "liveBroadcastContent": "none",
//         "publishTime": "2017-10-16T13:00:07Z"
//       }
//     },
//     {
//       "kind": "youtube#searchResult",
//       "etag": "5V9n_gIgmSUN5cwURT9DAVLDXcY",
//       "id": {
//         "kind": "youtube#video",
//         "videoId": "ry8e5ldzLDQ"
//       },
//       "snippet": {
//         "publishedAt": "2018-03-16T17:09:35Z",
//         "channelId": "UCvC4D8onUfXzvjTOM-dBfEA",
//         "title": "Marvel Knights Animation - Black Panther - Episode 1",
//         "description": "At a White House briefing, a history of the African nation of Wakanda is given. Highlighted are an early story of an attack by ...",
//         "thumbnails": {
//           "default": {
//             "url": "https://i.ytimg.com/vi/ry8e5ldzLDQ/default.jpg",
//             "width": 120,
//             "height": 90
//           },
//           "medium": {
//             "url": "https://i.ytimg.com/vi/ry8e5ldzLDQ/mqdefault.jpg",
//             "width": 320,
//             "height": 180
//           },
//           "high": {
//             "url": "https://i.ytimg.com/vi/ry8e5ldzLDQ/hqdefault.jpg",
//             "width": 480,
//             "height": 360
//           }
//         },
//         "channelTitle": "Marvel Entertainment",
//         "liveBroadcastContent": "none",
//         "publishTime": "2018-03-16T17:09:35Z"
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
    // console.log(data);
    displayVideos(data);

    var tag = document.createElement("script");
    // 2. This code loads the IFrameertBefo Player API code asynchronously.
    $(tag).attr("src", "https://www.youtube.com/iframe_api");
    var firstScriptTag = $("script")[6];
    $("#videos").append(tag);
    //  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // from https://stackoverflow.com/questions/38906568/youtube-api-multiple-videos-with-events
    var playerDivs = $(".player"); // get .player nodes
    var playerDivsArr = [].slice.call(playerDivs); // nodelist to array to use forEach();
    var players = new Array(playerDivsArr.length);
    var waypoints = new Array(playerDivsArr.length);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    // from https://chromatichq.com/insights/working-youtube-player-api-iframe-embeds
    window.onYouTubeIframeAPIReady = function () {
      playerDivsArr.forEach(function (e, i) {
        // forEach ...
        players[i] = new YT.Player(e.id, {
          height: "360",
          width: "640",
          videoId: e.dataset.videoId,
          events: {
            /* no events set */
          },
        });
      });
    };
  });
}

function displayVideos(data) {
  $("#search").val("");
  var i = 1;

  data.items.forEach((item) => {
    // 1. Create div for every iframe
    var player = $("<div>");
    $(player).attr("id", "player" + i);
    $(player).addClass("player");
    $(player).attr("data-video-id", `${item.id.videoId}`);
    i++;
    $("#videos").append(player);
  });
}

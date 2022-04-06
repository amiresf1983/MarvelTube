var md5 = "bbdca2a1904002b1309adc542b9a47c0";
var authParam =
  "&ts=15&apikey=3da8b4beae1642dbdddd14a53749bc9f&hash=4ac0722f457be34b7bca71f7789eeff7";
var baseFetchURL = "http://gateway.marvel.com/v1/public/characters?";
var bodyContentEl = $("body");
var inputEl = document.querySelector("#marvel_character_search button");
var character = document.getElementById("character");
var characterSearch = document.getElementById("character-search");
var characterFormEl = document.getElementById("character-form");
var characternameInputEl = document.getElementById("charactername");
var charactercontainerE1 = document.getElementById("character-container");
var featureCharacters = document.getElementById("feature-characters");
var imgSize = "portrait_xlarge";
var mostPopularCharacters = ["Thor", "Hulk", "Wolverine", "Iron Man"];
var imgContainerEl = $(".ui.four.column.grid");

function searchForCharacter(searchInput) {
  //search for character whose name starts with searchInput
  var apiUrl =
    baseFetchURL + "limit=100&nameStartsWith=" + searchInput + authParam;

  fetch(apiUrl, { cache: "force-cache" }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (charCards) {
        console.log({ charCards });
        if (charCards.data.total > 0) {
          // only clear images below the search bar if there's a valid result
          while (charactercontainerE1.firstChild) {
            charactercontainerE1.removeChild(charactercontainerE1.firstChild);
          }

          // returns the array of results
          for (var i = 0; i < charCards.data.count; i++) {
            //function to render the image found for the character searched in the form
            renderAllCharacterImage(
              charCards.data.results[i],
              charactercontainerE1
            );
          }
        } else {
          showModalAlert("Character " + searchInput + " is not found");
          return;
        }
      });
    } else {
      showModalAlert("API Request Failed");
    }
  });
}

function getAllCharacterImage(marvelCharacter, container) {
  // fetch request gets a list of all the repos for the node.js organization
  //var requestUrl = 'http://gateway.marvel.com/v1/public/characters?name=' + marvelCharacters[i] + '&ts=1&apikey=22ae83f378d9dd859ac72de3da5d77de&hash='+ md5;

  var requestUrl = baseFetchURL + "name=" + marvelCharacter + authParam;

  fetch(requestUrl, { cache: "force-cache" }).then(function (response) {
    if (response.status === 200) {
      return response.json().then(function (charCards) {
        if (charCards) {
          // returns the array of results
          // console.log(charCards.data.results[0]);
          renderAllCharacterImage(charCards.data.results[0], container);
        } else {
          showModalAlert("Nothing to show");
          return;
        }
      });
    } else {
      showModalAlert("API Request Failed");
    }
  });
}

//building the image url to obtain the id
function renderAllCharacterImage(searchResult, container) {
  console.log({ searchResult });
  if (searchResult) {
    var imgUrl =
      searchResult.thumbnail.path +
      "/" +
      imgSize +
      "." +
      searchResult.thumbnail.extension;
    var name = searchResult.name;
    var id = searchResult.id;
    // console.log(imgUrl)
    // console.log(name)
    var imgPath = searchResult.thumbnail.path;
    var myImgStatus = imgPath.split("/");
    var imgNotAvailable = myImgStatus[10];
    // console.log(imgNotAvailable)
    // console.log(myImgStatus)
    if (imgNotAvailable != "image_not_available") {
      var column = document.createElement("div");
      column.classList = "column";
      var card = document.createElement("div");
      card.classList = "ui raised link card";
      var aLink = document.createElement("a");
      aLink.classList = "image";
      aLink.setAttribute("alt", name);
      aLink.setAttribute("href", "details.html?characterId=" + id); //create HTML removing all spaces in the name
      aLink.setAttribute("data-img", imgUrl);
      aLink.setAttribute("data-bio", searchResult.description);
      var characterImage = document.createElement("img");
      characterImage.setAttribute("src", imgUrl);
      aLink.appendChild(characterImage);
      var characterName = document.createElement("p");
      characterName.classList = "ui center aligned";
      characterName.textContent = name;
      card.appendChild(aLink);
      card.appendChild(characterName);
      column.appendChild(card);
      container.appendChild(column);
    } else {
      //image not available
    }
  }
}

// character.addEventListener('click', buttonClickHandler);
function showModalAlert(message) {
  // create modal for error message
  var modalEl = $("<div>");
  modalEl.addClass("ui mini modal");

  var modalHeader = $("<div>");
  modalHeader.addClass("header");
  modalHeader.text("Invalid Query");

  var modalContent = $("<div>");
  modalContent.addClass("content");

  var modalContentp = $("<p>");
  modalContentp.text(message);
  modalContent.append(modalContentp);
  modalEl.append(modalHeader, modalContent);

  var modalActions = $("<div>");
  modalActions.addClass("actions");

  var modalOKButton = $("<div>");
  modalOKButton.addClass("ui positive button");
  modalOKButton.text(" Okay ");

  modalActions.append(modalOKButton);
  modalEl.append(modalActions);
  bodyContentEl.append(modalEl);

  // call modal to be shown.
  $(".ui.mini.modal").modal("show");
}

function allFormSubmitHandler(event) {
  // event handler when enter is pressed for submitting the form
  event.preventDefault();
  var charName = $("#search_character").val();
  if (charName) {
    searchForCharacter(charName);
  }
}

for (var i = 0; i < mostPopularCharacters.length; i++) {
  // for (var i = 0; i < 1; i++) {
  //function to render the image found for the character searched in the form
  getAllCharacterImage(mostPopularCharacters[i], featureCharacters);
}

for (var i = 0; i < marvelCharacters.length; i++) {
  //function to render the image found for the character searched in the form
  getAllCharacterImage(marvelCharacters[i], charactercontainerE1);
}
console.log({ inputEl });
//inputEl.on("submit", allFormSubmitHandler);
inputEl.addEventListener("click", allFormSubmitHandler);

imgContainerEl.on("click", function (event) {
  var target = $(event.target); //img
  var attr = $(target).parent();
  clickedChar = {
    name: $(attr).attr("alt"),
    img: $(attr).attr("data-img"),
    bio: $(attr).attr("data-bio"),
  };
  localStorage.setItem("render_search_key",JSON.stringify($(attr).attr("alt")))
  localStorage.setItem("search_key", JSON.stringify(clickedChar));
});


var md5 = "dbeab4e38fe46f41509e6c03584fabda"
var character = document.getElementById("character");
var characterSearch = document.getElementById("character-search")
var characterFormEl = document.getElementById("character-form");
var characternameInputEl = document.getElementById("charactername");
var charactercontainerE1 = document.getElementById("character-container")
var imgSize = "portrait_xlarge"

var formSubmitHandler = function (event) {
  event.preventDefault();

  var characterName = characternameInputEl.value.trim();
  console.log(characterName)
  if (characterName) {
    getSearchCharacterImage(characterName);
    charactercontainerE1.textContent = '';
    characternameInputEl.value = '';
  } else {
    alert('Please enter a Character name');
  }
}
//function to render the image found for the character searched in the form  
function getSearchCharacterImage(characterName) {
  // fetch request gets a list of all the repos for the node.js organization
  //var requestUrl = 'http://gateway.marvel.com/v1/public/characters?name=' + characterName + '&ts=1&apikey=22ae83f378d9dd859ac72de3da5d77de&hash='+ md5;
  var requestUrl = 'http://gateway.marvel.com/v1/public/characters?name=' + characterName + '&ts=15&apikey=3da8b4beae1642dbdddd14a53749bc9f&hash=4ac0722f457be34b7bca71f7789eeff7';

  console.log(requestUrl)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response)
      if (response.data.results.length === 0) {
        characterSearch.textContent = 'No character found.';
        // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
        return;
      }
      console.log(response.data);
      renderSearchCharacterImage(response.data.results, characterName)
    })

}

function renderSearchCharacterImage(searchResult, characterName) {
  console.log(searchResult)
  var imgUrl = searchResult[0].thumbnail.path + "/" + imgSize + "." + searchResult[0].thumbnail.extension
  console.log(imgUrl)
  var characterImage = document.createElement("img")
  var name = searchResult[0].name
  console.log(name)
  charactercontainerE1.appendChild(characterImage)
  characterSearch.textContent = characterName
  characterImage.setAttribute("src", imgUrl)
  console.log(characterImage)
}

characterFormEl.addEventListener('submit', formSubmitHandler);
window.onload = function () {
  var comicsListItems = document.querySelector(".comics-list");

  const urlParameter = new URLSearchParams(location.search);
  if (location.search && urlParameter) {
    var characterId = urlParameter.get("characterId");
    var requestUrl = `http://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=04e446d1e7466ef21854997335760863&hash=bbdca2a1904002b1309adc542b9a47c0`;

    fetch(requestUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log({ resultData: result });
        var selectedComic = result.data.results[0];
        var selectedComicEl = document.querySelector("#selected_comic");
        var selectedComicImage = document.querySelector("#comic_image");
        selectedComicEl.innerHTML = selectedComic.name;
        selectedComicImage.innerHTML = `<img  src="${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}" />`;
      });
  }

  var getAllComics = function (event) {
    console.log("getting all comics");
    var requestUrl =
      "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=04e446d1e7466ef21854997335760863&hash=bbdca2a1904002b1309adc542b9a47c0";
    fetch(requestUrl)
      .then((res) => res.json())
      .then((result) => {
        var comicsList = result.data.results;
        console.log({ comicsList });
        var list = comicsList.map(function (comic) {
          return {
            title: comic.title,
            resourceURI: comic.urls[0].url,
            image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
          };
        });
        console.log({ list });
        var output = "";

        list.forEach((comic) => {
          output += `<li>
            <a target="_blank" href='${comic.resourceURI}'>
              <h3>${comic.title}</h3>
              <img src=${comic.image} alt=${comic.title}/>
            </a>
          </li>`;
        });
        comicsListItems.innerHTML = output;
      });
  };

  if (comicsListItems) {
    getAllComics();
  }
};

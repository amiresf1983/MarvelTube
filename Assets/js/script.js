// var bodyContentEl = $('body');
// var inputEl = $('.right.item');
// // API parameters
// var authParam = 'ts=15&apikey=3da8b4beae1642dbdddd14a53749bc9f&hash=4ac0722f457be34b7bca71f7789eeff7';
// var baseFetchURL = 'http://gateway.marvel.com/v1/public/';

// function getCharacters() {
//     // Gets first 5 characters alphabetically
//     var apiUrl = baseFetchURL + 'characters?limit=5&' + authParam;
    
//     fetch(apiUrl).then(function (response) {
//         if (response.ok) {
//             return response.json().then(function (charCards) {
//                 if (charCards) {
//                     // returns the array of results
//                     // change this with function for rendering featured characters
//                     console.log(charCards.data.results);
//                 } else {
//                     showModalAlert('Nothing to show');
//                     return;
//                 }
//             });
//         } else {
//             showModalAlert("Error in URL");
//         }
//     });
// }

// getCharacters();

// function searchForCharacter(searchInput) {
//     //search for character whose name starts with searchInput
//     var apiUrl = baseFetchURL + 'characters?limit=100&nameStartsWith=' + searchInput +'&'+ authParam;

//     fetch(apiUrl).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (charCards) {
//                 if (charCards.data.total > 0) {
//                     // returns the array of results
//                     // change this with funtion for rendering search result
//                     console.log(charCards.data);
//                 } else {
//                     showModalAlert('Character ' + searchInput + ' is not found');
//                     return;
//                 }
//             });   
//         } else {
//             showModalAlert("Character " + searchInput + " was not found.");
//         }
//     })
//     //display name,bio&img 
//     //repoEl.setAttribute('href', './search.html?character=' + repoName);
//     //on search page
//     //var queryString = document.location.search;
//     //var repoName = queryString.split('=')[1];
// }

// function showModalAlert(message) {
//     // create modal for error message
//     var modalEl = $('<div>');
//     modalEl.addClass('ui mini modal');
    
//     var modalHeader = $('<div>');
//     modalHeader.addClass('header');
//     modalHeader.text('Invalid Query');

//     var modalContent = $('<div>');
//     modalContent.addClass('content');

//     var modalContentp = $('<p>');
//     modalContentp.text(message);
//     modalContent.append(modalContentp);
//     modalEl.append(modalHeader, modalContent);
    
//     var modalActions = $('<div>');
//     modalActions.addClass('actions');

//     var modalOKButton = $('<div>');
//     modalOKButton.addClass('ui positive button');
//     modalOKButton.text(' Okay ');

//     modalActions.append(modalOKButton);
//     modalEl.append(modalActions);
//     bodyContentEl.append(modalEl);

//     // call modal to be shown.
//     $('.ui.mini.modal').modal('show');
// }

// function formSubmitHandler(event) {
//     // event handler when enter is pressed for submitting the form
//     event.preventDefault();
//     var charName = $('input').val();
//     if (charName) {
//         searchForCharacter(charName);
//     }
// }

// inputEl.on('click', formSubmitHandler);
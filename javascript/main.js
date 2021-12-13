
var UI = {}
//GET THE INPUT
UI.onclick = function() {
  var button = document.querySelector('.search');
  button.addEventListener('click', function() {
    console.log('button clicked')
  var input = document.querySelector('.js-search').value;
  SoundCloudAPI.getTrack(input);
})
}

UI.onPress = function(){
var x = document.querySelector(".js-search");
x.addEventListener("keyup", function(e) {

var input = document.querySelector("input").value;
if(e.which === 13) {
SoundCloudAPI.getTrack(input);
}
});
}



UI.clear = function(){
  var searchResults = document.querySelector('.js-search-results');
  searchResults.innerHTML = "";

}

UI.clearQueue = function(){
  var clear = document.querySelector('.container-button');
  var player = document.querySelector('.js-playlist');
  clear.addEventListener('click', function() {
    
  localStorage.removeItem("key");
  player.innerHTML = "";

})
}

UI.clearQueue()
//GET SONGS FROM SOUNDCLOUD
var SoundCloudAPI = {};

SoundCloudAPI.init = function() {
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d',
    
  });

};
SoundCloudAPI.init();

UI.onclick();
UI.onPress();
SoundCloudAPI.getTrack = function(inputValue) {
  
  SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    UI.clear()
    SoundCloudAPI.renderTracks(tracks);
    
  });
}
//SHOW SOUNDCLOUD DATA ON CARDS




SoundCloudAPI.renderTracks = function(tracks) {
tracks.forEach(function(track) {
  
  


//making the card
var card = document.createElement('div');
card.classList.add('card');
var searchResults = document.querySelector('.js-search-results');
searchResults.appendChild(card);

//adding the image
var image = document.createElement('div');
image.classList.add('image');
var image_img = document.createElement('img');
image_img.classList.add('image_img')
card.appendChild(image);
image.appendChild(image_img);
image_img.src = track.artwork_url || "http://lorempixel.com/100/100/abstract/";


//adding the content
var content = document.createElement('div');
content.classList.add('content');
card.appendChild(content);

var header = document.createElement('div');
header.classList.add('header');
content.appendChild(header);
header.innerHTML = "<a href=\"" + track.permalink_url + "\" target=\"_blank\">" + track.title + "</a>";


//adding the button
var button = document.createElement('div');
button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
card.appendChild(button);

button.addEventListener('click', function() {
  SoundCloudAPI.playSong(track.permalink_url);
});

var icon = document.createElement('i');
var span = document.createElement('span');
icon.classList.add('add', 'icon');
button.appendChild(icon);
button.appendChild(span);
span.innerHTML = "Add To Playlist";

    });
};


//PLAY THE SONGS ON PLAYLIST
SoundCloudAPI.playSong = function(track) {
SC.oEmbed(track , {
  auto_play: true
}).then(function(embed){
  

  var player = document.querySelector('.js-playlist');

  var box = document.createElement('div')
  box.innerHTML = embed.html;

  player.insertBefore(box, player.firstChild);
  localStorage.setItem("key", player.innerHTML);
});
}
var sideBar = document.querySelector('.js-playlist'); 
sideBar.innerHTML = localStorage.getItem("key");
var pageNum = 1;
getArtists(pageNum)

$('#btnMoreArtists').click(function() {
  clickMoreArtist()
})

function clickMoreArtist() {
  getArtists(++pageNum);
}

function getArtists(inner_pageNum) {
  axios({
      url: 'http://localhost:8000/api/artist/',
      method: 'get',
      params: {
        page: inner_pageNum
      }
    })
    .then(function(response) {
      var artists = response.data.results;
      var artistListElement = $('.artist-list');
      for (var i = 0; i < artists.length; i++) {
        var currentArtist = artists[i];

        var curArtistElement = $('#artist-item-template').clone();

        curArtistElement.find('.artist-name').text(currentArtist.name);
        curArtistElement.find('.artist-img-profile').attr('src', currentArtist.img_profile)

        artistListElement.append(curArtistElement)
      }
      if (!response.data.next) {
        $('#btnMoreArtists').css("display", "none")
      }
    })
    .catch(function(error) {
      console.log(error.response);
    });
}

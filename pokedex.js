// Creating the function to fetch data vía jQuery AJAX
function ftch(string) {
  $.ajax(string, {
    success: function(response) {
      var data = response.next
      var button = $('#load')[0]
      button.dataset.more = data
      response.results.forEach(function(result){
        createPokeCards(result)
      })
    }
  })
}
// Creating the function to generate the Bootstrap Cards
function createPokeCards(result){
  var mainDiv = $('#main-container')[0]
  var cardDiv = $('<div>', {'class': 'card m-1', 'style': 'width: 18rem;'})
  var pokeDiv = $('<div>', {'class': 'card-body'})
  var h5Name = $('<h5>', {'class': 'card-title text-center'})
  var cardButton = $('<button>')
  $(cardButton).attr({'class': 'btn btn-primary btn-sm','data-toggle':'modal','data-target':'#thisModal'})

  $(h5Name).text(capitalizeFirstLetter(result.name))
  $(cardButton).text('¡Quiero saber más de este pokémon!')
  $(pokeDiv).append(h5Name)
  $(pokeDiv).append(cardButton)
  $(cardDiv).append(pokeDiv)
  $(mainDiv).append(cardDiv)

  $(cardButton).on('click', function(event){
    $.ajax(result.url, {
      success: function(response){
        createModal(response, result)
      }
    })
  })
}
// Creating the function to populate the Modal
function createModal(answer, result) {
  var modal = $('#exampleModal')[0]
  var modalTitle = $('#exampleModalLabel')[0]
  var regularPic = $('#regular-sprite')[0]
  var shinyPic = $('#shiny-sprite')[0]
  var modalBtn = $('#close-modal')[0]
  var ulType = $('#types')[0]
  var ulAbility = $('#abilities')[0]
  var ulGens= $('#generations')[0]
  var olMoves = $('#moves')[0]

  $(ulType).empty()
  $(ulAbility).empty()
  $(ulGens).empty()
  $(olMoves).empty()
  $(modalTitle).empty()

  answer.types.forEach(function(iterable){
    var li = $('<li>')
    $(li).text(capitalizeFirstLetter(iterable.type.name))
    $(ulType).append(li)
  })

  answer.abilities.forEach(function(iterable){
    var li = $('<li>')
    $(li).text(capitalizeFirstLetter(iterable.ability.name))
    $(ulAbility).append(li)
  })

  answer.game_indices.forEach(function(iterable){
    var li = $('<li>')
    $(li).text(capitalizeFirstLetter(iterable.version.name))
    $(ulGens).append(li)
  })

  answer.moves.forEach(function(iterable, index){
    if(index < 5){
    var li = $('<li>')
    $(li).text(capitalizeFirstLetter(iterable.move.name))
    $(olMoves).append(li)
    }
  })

  $(modal).attr('style', 'display: block;')
  $(modalTitle).text(capitalizeFirstLetter(result.name))
  $(regularPic).attr('src', answer.sprites.front_default)
  $(shinyPic).attr('src', answer.sprites.front_shiny)

  $(modalBtn).on('click', function(event){
    $(modal).attr('style', 'display: none;')
  })
}
// Regular function to capitalize the first letter of a Word
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generating the Main HTML
$(document).ready(function() {
  ftch('https://pokeapi.co/api/v2/pokemon/')

  var loadButton = $('#load')[0]
  $(loadButton).on('click',function(event){
    ftch(loadButton.dataset.more)
  })
});

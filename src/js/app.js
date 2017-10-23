var app = (function () { // eslint-disable-line no-unused-vars
  'use strict'

  var url = 'https://restcountries.eu/rest/v1/name/'
  var countriesList = {}

  var searchCountries = function (e) {
    e.preventDefault()
    var countryName = document.getElementById('country-name').value
    if (!countryName.length) countryName = 'Poland'

    fetch(url + countryName).then(handleErrors).then(function (response) {
      return (response.json())
    }).then(function (response) {
      showCountriesList(response)
    }).catch(function () {
      updateUIFailure()
    })
  }
  var handleErrors = function (response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }
  var updateUIFailure = function () {
    var elError = document.createElement('li')
    elError.textContent = 'Information unavailable'
    countriesList.appendChild(elError)
  }
  var showCountriesList = function (response) {
    countriesList.innerHTML = ''
    var dataArray = response
    for (var i = 0; i < dataArray.length; i++) {
      var name = document.createElement('li')
      name.setAttribute('class', 'countries-list__list-item')
      name.innerHTML = dataArray[i].name

      var capital = document.createElement('li')
      capital.innerHTML = 'Capital: ' + dataArray[i].capital

      var area = document.createElement('li')
      area.innerHTML = 'Area: ' + dataArray[i].area.toLocaleString('pl-PL') + ' km&#178;'

      var population = document.createElement('li')
      population.innerHTML = 'Population: ' + dataArray[i].population.toLocaleString('pl-PL')

      var flag = document.createElement('li')
      var flagImg = document.createElement('img')
      flagImg.setAttribute('class', 'country__img')
      flagImg.setAttribute('src', 'https://restcountries.eu/data/' + dataArray[i].alpha3Code.toLowerCase() + '.svg')
      flag.appendChild(flagImg)

      var countryData = document.createElement('ul')
      countryData.appendChild(capital)
      countryData.appendChild(area)
      countryData.appendChild(population)
      countryData.appendChild(flag)

      countriesList.appendChild(name).appendChild(countryData)
    }
  }
  var initModule = function (container) {
    container.innerHTML =
      '<div class="app">' +
      '<h1 class="app__title">Explore Countries</h1>' +
      '<form id="search" class="search">' +
      '<input id="country-name" class="search__input" type="text" />' +
      '<button class="search__button" type="submit">Search</button>' +
      '</form>' +
      '<div class="countries-list">' +
      '<h2 class="countries-list__title">Countries list</h2>' +
      '<ul id="countries" class="countries-list__list">' +
      '</ul>' +
      '</div>' +
      '</div>'
    countriesList = document.getElementById('countries')
    document.getElementById('search').addEventListener('submit', searchCountries)
  }

  return {
    initModule: initModule
  }
}())
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
      updateUIError()
    })
  }

  var handleErrors = function (response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }

  var updateUIError = function () {
    var elError = document.createElement('li')
    elError.textContent = 'Information unavailable'
    countriesList.innerHTML = ''
    countriesList.appendChild(elError)
  }

  var showCountriesList = function (response) {
    countriesList.innerHTML = ''
    var dataArray = response
    for (var i = 0; i < dataArray.length; i++) {
      var countryEl = document.createElement('li')
      countryEl.setAttribute('class', 'country')

      var countryMainInfo = document.createElement('div')
      countryMainInfo.setAttribute('class', 'country__main-info')

      var flag = document.createElement('img')
      flag.setAttribute('class', 'country__img')
      flag.setAttribute('src', 'https://restcountries.eu/data/' + dataArray[i].alpha3Code.toLowerCase() + '.svg')
      flag.setAttribute('alt', '')

      var name = document.createElement('h2')
      name.setAttribute('class', 'country__name')
      name.textContent = dataArray[i].name

      var countryData = document.createElement('ul')

      var capital = document.createElement('li')
      capital.textContent = 'Capital: ' + dataArray[i].capital

      var area = document.createElement('li')
      area.textContent = 'Area: ' + dataArray[i].area.toLocaleString('pl-PL') + ' km\u00B2'

      var population = document.createElement('li')
      population.textContent = 'Population: ' + dataArray[i].population.toLocaleString('pl-PL')

      countryEl.appendChild(countryMainInfo)
      countryMainInfo.appendChild(flag)
      countryMainInfo.appendChild(name)

      countryEl.appendChild(countryData)
      countryData.appendChild(capital)
      countryData.appendChild(area)
      countryData.appendChild(population)

      countriesList.appendChild(countryEl)
    }
  }

  var initModule = function (container) {
    container.innerHTML =
      '<h1>Explore Countries</h1>' +
      '<form id="search" class="search">' +
      '<input id="country-name" class="search__input" type="text" />' +
      '<button class="search__button" type="submit">Search</button>' +
      '</form>' +
      '<ul id="countries" class="countries">' +
      '</ul>'
    countriesList = document.getElementById('countries')
    document.getElementById('search').addEventListener('submit', searchCountries)
  }

  return {
    initModule: initModule
  }
}())

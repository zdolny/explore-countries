const app = (() => { // eslint-disable-line no-unused-vars
  'use strict'

  const url = 'https://restcountries.eu/rest/v1/name/'
  let countriesList = {}

  const searchCountries = function (e) {
    e.preventDefault()
    let countryName = document.getElementById('country-name').value
    if (!countryName.length) countryName = 'Poland'

    fetch(url + countryName).then(handleErrors).then(function (response) {
      return (response.json())
    }).then(function (response) {
      showCountriesList(response)
    }).catch(function () {
      updateUIError()
    })
  }

  const handleErrors = function (response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }

  const updateUIError = function () {
    const elError = document.createElement('li')
    elError.textContent = 'Information unavailable'
    countriesList.innerHTML = ''
    countriesList.appendChild(elError)
  }

  const showCountriesList = function (dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      dataArray[i].lower = function () {
        return function (text, render) {
          return render(text).toLowerCase()
        }
      }
    }
    const template = document.getElementById('template').innerHTML
    Mustache.parse(template)
    const rendered = Mustache.render(template, { countries: dataArray })
    document.getElementById('countries').innerHTML = rendered
  }

  const initModule = function (container) {
    container.innerHTML = `
      <h1>Explore Countries</h1>
      <form id="search" class="search">
        <div class="input-group">
          <input id="country-name" class="search__input form-input" type="text" />
          <button class="search__button btn btn-primary input-group-btn" type="submit">Search</button>
        </div>
      </form>
      <ul id="countries" class="countries">
      </ul>
    `
    countriesList = document.getElementById('countries')
    document.getElementById('search').addEventListener('submit', searchCountries)
  }

  return {
    initModule
  }
})()

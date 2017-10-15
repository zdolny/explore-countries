var app = (function() {
    
    var url = 'https://restcountries.eu/rest/v1/name/';
    var countriesList = {};
    
    var searchCountries = function(e) {
        e.preventDefault();
        var countryName = $('#country-name').val();
        if(!countryName.length) countryName = 'Poland';
        $.ajax({
            url: url + countryName,
            method: 'GET',
            success: showCountriesList
        });
    }
    var showCountriesList = function(resp) {
        countriesList.empty();
        resp.forEach(function(item) {
            $('<li class="countries-list__list-item">').text(item.name)
            .append($('<ul>')
            .append($('<li>').text('Capital: ' + item.capital))
            .append($('<li>').text('Area: ' + item.area + 'km2'))
            .append($('<li>').text('Population: ' + item.population))
            .append($('<li>').append($('<img class="country__img">').attr('src', 'https://restcountries.eu/data/' + item.alpha3Code.toLowerCase() + '.svg'))))
            .appendTo(countriesList);
        });
    }
    var initModule = function ( $container ) {
        $container.html(
            '<div class="app">'
            + '<h1 class="app__title">Explore Countries</h1>'
            + '<form id="search" class="search">'
            + '<input id="country-name" class="search__input" type="text" />'
            + '<button class="search__button" type="submit">Search</button>' 
            + '</form>'
            + '<div class="countries-list">'
            + '<h2 class="countries-list__title">Countries list</h2>' 
            + '<ul id="countries" class="countries-list__list">' 
            + '<li class="countries-list__list-item countries-list__list-item--is-empty">No data</li>' 
            + '</ul>'
            + '</div>'
            + '</div>'
        );
        countriesList = $('#countries');
        $('#search').on('submit', searchCountries);
    };
    
    return {
        initModule: initModule 
    };
}());

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
            $('<li>').text(item.name).appendTo(countriesList);
            $('<li>').text(item.capital).appendTo(countriesList);
            $('<img>').attr('src', 'https://flagpedia.net/data/flags/normal/' + item.alpha2Code.toLowerCase() + '.png').appendTo(countriesList);
        });
    }
    var initModule = function ( $container ) {
        $container.html(
            '<h1>Explore Countries</h1>'
            + '<form id="search">'
            + '<input id="country-name" type="text" />'
            + '<button type="submit">Search</button>' 
            + '</form>'
            + '<h2>Countries list</h2>' 
            + '<ul id="countries">' 
            + '<li>No data</li>' 
            + '</ul>'
        );
        countriesList = $('#countries');
        $('#search').on('submit', searchCountries);
    };
    
    return {
        initModule: initModule 
    };
}());

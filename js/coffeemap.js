var bounds;
var lastInfoWindow = null;
var infoWindow;
var map;
var markers = [];
var options;
var service;


function initMap() {
    let pos = {lat: 47.608013, lng:  -122.335167}
    bounds = new google.maps.LatLngBounds();

    options = {
        zoom: 11,
        center: pos
    }

    map = new
    google.maps.Map(document.getElementById('map'), options);
    bounds.extend(pos);

    map.addListener("click", function(mapsMouseEvent) {
        let request = {
            location: mapsMouseEvent.latLng,
            radius: 8047,
            keyword: 'coffee'
        }

        getCoffeeShops(request);
    });

    infoWindow = new google.maps.InfoWindow(
        {content: 'Click anywhere on the map for Coffee Shops!', position: pos});
    infoWindow.open(map);

    map.addListener('click', function(mapsMouseEvent) {
        infoWindow.close();
    });
}

function getCoffeeShops(request) {
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        deleteMarkers();
        createMarkers(results);
    }
}

function createMarkers(places) {
    places.forEach(place => {
        var vici = place.vicinity;
        var marker = new google.maps.Marker({
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
            map: map,
            icon: "https://i.imgur.com/jGy6L2j.png",
            title: place.name
        });
        marker.addListener('click', function() {
            if (lastInfoWindow != null) {
                lastInfoWindow.close();
            }
            infoWindow = new google.maps.InfoWindow(
                {content: "<p style=\'margin-bottom: 1px; font-weight: bold;\'>" + marker.title + "</p>" +
                        "<p style=\'margin-bottom: 0px;\'>" + vici + "</p>", position: marker.position});
            infoWindow.open(map, marker);
            lastInfoWindow = infoWindow;
        })
        markers.push(marker);
    });
}

function setMapOnAll(map) {
    for(let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

getCoffeePic();

function getCoffeePic() {
    $('#coffee-pic').hide();

    $('.animLoading').show();

    let url = "https://cors-anywhere.herokuapp.com/https://coffee.alexflipnote.dev/random.json";

    $.get(url)
        .done(function (data) {
            $('#coffee-pic').attr('src', data.file);
        })
        .always(function () {
            $('.animLoading').fadeOut("slow");
        });

    $('#coffee-pic').show();
}
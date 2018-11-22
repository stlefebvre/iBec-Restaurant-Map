//Initialize map function
function initAutocomplete() {

    //setting variable for location of Portland, ME by latitude and longitude coordinates
    var portland = {
        lat: 43.6591,
        lng: -70.2568
    };
    
    //Centering map in portland
    map = new google.maps.Map(document.getElementById('map'), {
        center: portland,
        zoom: 15,
        mapTypeId: 'roadmap'
    });
    
    //Links searchbox in UI to javascript functionality
    var input = document.getElementById("mapSearch");
    var searchBox = new google.maps.places.SearchBox(input); map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)
    
    //Biases searchBox results towards map's viewport (centered at portland)
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    //Listener for when user selects a predicted text to get more details
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        //Clears out old markers
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        //For each result, get the name of each location
        var bounds = portland;
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("No results available at this time");
                return;
            }
            
            //Creates Marker for each place
            markers.push(new google.maps.Marker({
                map: map,
                label: place.name,
                position: place.geometry.location
            }));
        });
        //fits map within bias bounds
        map.fitBounds(bounds)
    })
}

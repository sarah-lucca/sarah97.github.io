 var currentPosition_lat;
    var currentPosition_lng;
      function initMap() {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));
        $("#right-panel").append("<div id ='placeholder'><p>Instructions will appear here once a mode of travel has been chosen</p></div");


        var infoWindow = new google.maps.InfoWindow({map: map});
      var control = document.getElementById('floating-panel');
        control.style.display = 'block';
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = { // This would be the start
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            currentPosition_lat = pos.lat;
            currentPosition_lng = pos.lng;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoiWndow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        }
        
      
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {

        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: {lat: currentPosition_lat, lng: currentPosition_lng},  // current location
          destination: {lat: 33.8121, lng: -117.9190},  // Disney Land 
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
            $("#placeholder").remove();
            $("#right-panel").css("text-align", "left");
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

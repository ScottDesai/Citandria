//Function which displays map information, weather information and yelp api information for a given city
function displayCityData(position) {
  //Storing the city name in the variable called location
  var location = document.getElementById("CityName").value;

  //Resetting the contents of the containers for the OpenWeatherMap and Yelp API data upon a new search
  document.getElementById("weatherData").innerHTML = "";
  document.getElementById("YelpResults").innerHTML = "";

  //Making the invisible headers for each section visible
  var mapHeader = document.getElementById("MapHeader");
  if (mapHeader.style.display === "none") {
    mapHeader.style.display = "block";
  }

  var weatherHeader = document.getElementById("WeatherHeader");
  if (weatherHeader.style.display === "none") {
    weatherHeader.style.display = "block";
  }

  var restaurantHeader = document.getElementById("RestaurantHeader");
  if (restaurantHeader.style.display === "none") {
    restaurantHeader.style.display = "block";
  }

  var weatherContainer = document.getElementById("weatherContainer");
  if (weatherContainer.style.display === "none") {
    weatherContainer.style.display = "flex";
  }

  //Making the call to the Yelp API and displaying the results to the user
  var myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurant&location=${location}`;
  $.ajax({
    url: myurl,
    headers: {
      'Authorization':'Bearer isTZ7HxRoJ69NRMaPgYQc2dMVZpg4lgdCGQzdzLuZ4KLf-0Nes8owwYxdSlgns9MNhm9rHKWHb4-Iu9Dpx1Yhd4aPYHo1GNoZuIDuvv_NJ0Uivailr5Y8wWMTB43X3Yx',
  },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      // Storing the results from the API return
      var totalResults = data.total;
      // If there are more then 0 results then display the results
      if (totalResults > 0){
        // Message informing the user of the total number of results
        $('#YelpResults').append('<h5>We discovered ' + totalResults + ' results for ' + location + '!</h5>');
        // Traversing through the taken JSON array of businesses
        $.each(data.businesses, function(i, item) {
          // Store each business's object in a variable
          var phoneNumber = item.display_phone;
          var image = item.image_url;
          var name = item.name;
          var rating = item.rating;
          var reviewNumber = item.review_count;
          var address = item.location.address1;
          var city = item.location.city;
          var state = item.location.state;
          var zipcode = item.location.zip_code;
          
          // Displaying the results
          $('#YelpResults').append(`<div style = "font-size:20px;Margin-top:50px;Margin-bottom:50px"> <image style="width:400px;height:300px;" src = ${image}><br> 
          ${name} <br> Phone Number: ${phoneNumber} <br>Address: ${address} <br>City: ${city} <br>State: ${state} <br>
           Zipcode: ${zipcode}<br>Rating: ${rating}/5 with ${reviewNumber} reviews </div>`);
        });
      } else {
        // If there were no results then return to the user that there were no results found
        $('#YelpResults').append('<h5>No results found!</h5>');
      }
    }
  });      

  /*Making a call to the geocoding API to find the latitude and longitude of the city 
  which are the used with the google maps API in order to create a google maps of the city */
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:location,
      key:'AIzaSyBmXSvLJ3S4Xv0eHxcDA8eDCOU5MV4YlPY'
    }
  })
  .then(function(response){
    // Logging the user response
    console.log(response);

    //Storing the latitude and longitude found
    lat = response.data.results[0].geometry.location.lat;
    lon = response.data.results[0].geometry.location.lng;

    //Creating a google maps using the google maps API and the given latitude and longitude
    var latlon = new google.maps.LatLng(lat, lon)
    var mapholder = document.getElementById('mapholder')
    mapholder.style.height = '750px';
    mapholder.style.width = '1500px';
    var myOptions = {
      center:latlon,zoom:8,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"This is your destination"});
  })
  .catch(function(error){
    console.log(error); 
  });
  

  //Open Weather Map Section
  const apiKey = "4d8fb5b93d4af21d66a2948710284366";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  fetch(url).
  then(response => response.json()).
  then(data => {
    console.log(data);
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
    data.weather[0]["icon"]
  }.svg`;
  $(`#weatherData`).append(`
      <h2 id="city" data-name="${data.name},${data.sys.country}">
        <span>${data.name}</span>
        <sup>${data.sys.country}</sup>
      </h2>
      <div>${Math.round(data.main.temp)}<sup>°C</sup></div>
      <figure>
        <img src="${icon}" alt="${
  data.weather[0]["description"]
  }">
        <figcaption>${data.weather[0]["description"]}</figcaption>
      </figure>
    `);
  }).
  catch(() => {
  });
}
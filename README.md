Citandria was created by Scott Desai and functions as a website which displays a map, real time weather information and restaurant data for any city the user searches.
The map data is obtained by inputting the city name in the Geocoding API which then turns the given city name into latitude and longitude coordinates.
These coordinates are then put into the google maps API in order to generate a map of the given city.
The OpenWeatherMap API is used in order to find real time weather information for the given city searched by the user.
The Yelp API is used to display the highest rated restaurants in the given city to the user.
All of the information from the APIs is retrieved in the JSON file format using Javascript methods, which is then presented with the HTML components, styled with CSS.

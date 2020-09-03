Made by Scott Desai 
Project Name: Citandria
Function: Website which displays a map, real time weather information and restaurant data for any city the user searches
Obtains the map data using the Geocoding API to turn the given city name into latitude and longitude coordinates.
These coordinates are then put into the google maps API in order to generate a map of the given city.
Uses the OpenWeatherMap API in order to find real time weather information for the given city searched by the user.
Finds the highest rated restaurants in the city using the Yelp API and diplays it to the user.
All of the information from the APIs is taken in the JSON file format using Javascript methods which is then presented with the HTML components, which are styled with CSS.

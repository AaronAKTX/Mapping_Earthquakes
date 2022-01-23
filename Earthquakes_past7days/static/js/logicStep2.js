// Add console.log to check to see if our code is working.
console.log("working");


// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data @copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        accessToken: API_KEY
});

// We create the satelliteStreets view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the earthquake info GeoJSON URL.
let earthquakesLastSevenDays = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing our GeoJSON data.
// d3.json(torontoData).then(function(data) {
//   console.log(data)
// // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data, {
//   // We turn each feature into a marker on the map.
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup("<h2>Airport Code: " + feature.properties.faa  + "</h2><hr><h2>Airport Name: " + feature.properties.name+ "<br />" + "</h2>");
//     }

//   }).addTo(map);
// });
// Create a style for the lines.

let myStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow"
}
// Grabbing our GeoJSON data.
d3.json(earthquakesLastSevenDays).then(function(data) {
 // console.log(data);
// We turn each feature into a circleMarker on the map.

// pointToLayer: function(feature, latlng) {
    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature) {
        return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
        };
    }
    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
        return 1;
        }
        return magnitude * 4;
    }

// Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo
    }).addTo(map);
});
  
  
  
  
  
  
  
  // L.geoJSON(data, {
  //   // We turn each feature into a marker on the map.
  //     style: myStyle,
  //     onEachFeature: function(feature, layer) {
  //       console.log(layer);
  //      layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
        
  //     }
  
  //   }).addTo(map);


// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2><b><ul>" + feature.properties.name + "</b></ul></h2><br /><h2>" + feature.properties.city + ", " + feature.properties.country + "</h2>");
//   }

// }).addTo(map);

// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2><ul>Airport Code: " + feature.properties.faa  + "<ul/></h2> <br />"
//     + "<h2>Airport Name: " + feature.properties.name+ "<br />" + "</h2>");
//   }

// }).addTo(map);


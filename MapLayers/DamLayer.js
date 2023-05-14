// icon for mainstem dams
const mainstemDamIcon = L.icon({
    iconUrl: "../Icons/DamIcon.png",
    iconSize: [20, 20]
    })

// Add mainstem dam layer
const mainstemDamURL = "https://services2.arcgis.com/Kuf0uTOqI2C0lE9a/ArcGIS/rest/services/mainstem%20dams/FeatureServer/0";

const mainstemDams = L.esri
.featureLayer({
    url: mainstemDamURL,
    pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
        icon: mainstemDamIcon
    });
    }
});

// Popup with mainstem dam information
mainstemDams.bindPopup(function (layer) {
return L.Util.template(
    ` <h3> {DAMNAME} </h3>
        <ul>
        <li> <strong> Owner: </strong> {OWNTYPE3} </li>
        <li> <strong> Hazard Level: </strong> {HAZCODE}</li>
        <li> <strong> Condition: </strong> {Condition}</li>
        <li> <strong> Fish Passage: </strong> {Fish_Passage}</li>
        </ul>`,
    layer.feature.properties
);
});
mainstemDams.addTo(map);

// add mainstem dams to search
const mainstemDamSearch = L.esri.Geocoding.featureLayerProvider({
url: mainstemDamURL,
searchFields: ["DAMNAME"],
label: "mainstem dams",
bufferRadius: 100,
formatSuggestion: function (feature) {
    return feature.properties.DAMNAME;
}
});

// icon for tributary dams
const tributaryDamIcon = L.icon({
iconUrl: "../Icons/DamIcon.png",
iconSize: [12, 12]
})

// Add tributary dam layer
const tributaryDamURL = "https://services2.arcgis.com/Kuf0uTOqI2C0lE9a/ArcGIS/rest/services/tributary%20dams/FeatureServer/0";

const tributaryDams = L.esri
.featureLayer({
    url: tributaryDamURL,
    minZoom: 11, // only show tributary dams when zoomed in
    pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
        icon: tributaryDamIcon
    });
    }
});

// Popup with tributary dam information
tributaryDams.bindPopup(function (layer) {
return L.Util.template(
    ` <h3> {DAMNAME} </h3>
        <ul>
        <li> <strong> Owner: </strong> {OWNTYPE3} </li>
        <li> <strong> Hazard Level: </strong> {HAZCODE}</li>
        </ul>`,
    layer.feature.properties
);
});
tributaryDams.addTo(map);

// add tributary dams to search
const tributaryDamSearch = L.esri.Geocoding.featureLayerProvider({
url: tributaryDamURL,
maxResults: 15,
searchFields: ["DAMNAME"],
label: "tributary dams",
bufferRadius: 100,
formatSuggestion: function (feature) {
    return feature.properties.DAMNAME;
}
});
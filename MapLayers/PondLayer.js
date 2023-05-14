// pond style
const pondStyle = {
    "weight": 1,
  };

// add ponds
const ponds = L.esri
.featureLayer({
    url: "https://services2.arcgis.com/Kuf0uTOqI2C0lE9a/arcgis/rest/services/ponds in CRW/FeatureServer/0",
    style: () => {return pondStyle}
});

ponds.addTo(map);
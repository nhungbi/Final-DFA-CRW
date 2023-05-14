// stream style
const streamStyle = {
    "weight": 1,
  };

// add streams
const streams = L.esri
.featureLayer({
    url: "https://services2.arcgis.com/Kuf0uTOqI2C0lE9a/arcgis/rest/services/streams in CRW/FeatureServer/0",
    style: () => {return streamStyle}
});

streams.addTo(map);
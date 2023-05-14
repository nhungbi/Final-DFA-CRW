//ICONS FOR CULVERTS 1. find a url for the icon that you want and save the image into CulvertIcons, 
      //  and adjust the icon's size to whatever size you desire
      // 1: 'no score-missing data'
      const noDataIcon = L.icon({
        iconUrl: "../CulvertIcons/culvert_open_circle.png",
        iconSize: [7, 7]
      })
      // 2: 'Severe barrier'
      const severeIcon = L.icon({
        iconUrl: "../CulvertIcons/severeIcon.png",
        iconSize: [12, 12]
      })
      // 3: 'Significant barrier'
      const significantIcon = L.icon({
        iconUrl: "../CulvertIcons/significantIcon.png",
        iconSize: [12, 12]
      })
      // 4: 'Moderate barrier'
      const moderateIcon = L.icon({
        iconUrl: "../CulvertIcons/moderateIcon.png",
        iconSize: [20, 20]
      })
      // 5: 'Minor barrier'
      const minorIcon = L.icon({
        iconUrl: "../CulvertIcons/minorIcon.png",
        iconSize: [12, 12]
      })
      // 6: 'Insignicant barrier'
      const insignicantIcon = L.icon({
        iconUrl: "../CulvertIcons/insignicantIcon.png",
        iconSize: [12, 12]
      })
      // 7: 'No barrier'
      const noBarrierIcon = L.icon({
        iconUrl: "../CulvertIcons/noBarrierIcon.png",
        iconSize: [12, 12]
      })

  
      //map with all of the icons for organization purpose
      const culvertIcons = {
        "no score - missing data": noDataIcon,
        "Severe barrier": severeIcon,
        "Significant barrier": significantIcon,
        "Moderate barrier": moderateIcon,
        "Minor barrier": minorIcon,
        "Insignificant barrier": insignicantIcon,
        "No barrier": noBarrierIcon,
      }
  
  
      //culvert layer from shapefile
      const culvertURL = "https://services2.arcgis.com/Kuf0uTOqI2C0lE9a/arcgis/rest/services/culverts%20final/FeatureServer/0";
  
      const culverts = L.esri
        .featureLayer({
          url: culvertURL,
          minZoom: 12, // only show culverts when zoomed in 
          pointToLayer: function (geojson, latlng) {
  
            if (geojson.properties.gWshed === 'Charles') { //filter for charles watershed only
              if (geojson.properties.Assessed === "0") { //unassessed culverts
                return L.marker(latlng, {icon: noDataIcon});
              }
              //using the map created above, simply grab the icon by the name, eg. culvertIcons["Severe barrier"]
              return L.marker(latlng, {
                icon: culvertIcons[geojson.properties.Eval]
              });
            }
          }
        });
  
  
      // Popup with culverts information
      culverts.bindPopup(function (layer) {
  
        if (layer.feature.properties.Assessed === "0") { //if not assessed
          return L.Util.template(
            `<p>No data available. This culvert has not been assessed!</p>`, layer.feature.properties
          );
        }
  
        return L.Util.template(
          ` <h4>Culvert: {StrmName} at {Road} </h4> 
          <ul>
            <li> <strong> Date Observed: </strong> {DateObsd} </li>
            <li> <strong> Aquatic Passage: </strong> {Eval} </li>
            </ul>`,
          layer.feature.properties
        );
  
      });
  
      culverts.addTo(map);
  
      // add culverts to search 
      const culvertSearch = L.esri.Geocoding.featureLayerProvider({
        url: culvertURL,
        maxResults: 15,
        searchFields: ["StrmName", "Road"],
        label: "culverts",
        bufferRadius: 60,
        formatSuggestion: function (feature) {
          return feature.properties.StrmName + " at " + feature.properties.Road;
        }
      });
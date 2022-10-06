                                                       
function getCoords(){
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

const apiKey = 'fsq30ZfG1N/uXraKjWqVC7o1j3P4FHhN5cQQiuJVgjngxGY='

async function main () {
  //let {coords} =await getCoords()
  //console.log(coords);
    let { latitude, longitude } = [51.505, -0.09];

    let map = L.map('map')
        .setView([latitude, longitude], 13);

   let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let categories = {
        coffee: 13035,  
        market: 14089
    };

    let searchUrl = `https://api.foursquare.com/v3/places/search?categories=${Object.values(categories).join(',')}&11=${latitude},${longitude}`;
    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            Authorization: apiKey
        }
        
    }

   //let res = await fetch(searchUrl, options);
let ( results ) = await res.json();
//console.log(results);

let groups = {
    //category
};

results.forEach(({categories, geoCodes, name}) =>{
    let {latitude, longitude} = geocodes.main
    let marker = L.marker([latitude, longitude])
    .addTo(map)
    .bindPopup(name).openPopup();
categories.forEach(cat => {
    console.log(cat)
        if (groups[cat.name] == undefined) {
            groups[cat.name] = [];
        } 
        groups[cat.name].push(marker)
       })
}); 

let baseMaps = {
    "OpenStreetMap": osm,
};

let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
Object.entries(groups).forEach(([catName, markers]) => {
     let layerGroup = L.layerGroup(markers);
     layerControl. addOverlay(layerGroup, catName);
})
L.layerGroup([crownHill, rubyHill]);

}

main();
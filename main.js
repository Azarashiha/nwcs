//https://docs.mapbox.com/mapbox-gl-js/example/add-image/
mapboxgl.accessToken = 'pk.eyJ1IjoiYXphcmFzaGkiLCJhIjoiY2t0YmdibXczMXZwbzJubzBnZHI4Ym4zMCJ9.1C3RNiQqSioL1NkDSFE5Xg';
    
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/azarashi/cktbgkxip5jml17n06wvzmgj9',
    center: [139.7670516, 35.6811673],//仮数値
    zoom: 5,//仮数値
    //bounds:addpoint(),
    customAttribution: ['<a href="https://www.jma.go.jp/jma/index.html">震度情報:©︎気象庁</a>', '<a href="https://nlftp.mlit.go.jp/index.html">国土数値情報:©︎国土交通省</a>','<a href="https://twitter.com/nyaonearthquake?s=21">編集:©︎nyaonearthquake</a>']
});


// コントロール関係表示
map.addControl(new mapboxgl.NavigationControl());

function loadJSON(url) {
    //return fetch(url).then(response => response.json());
    fetch(url)
    .then(function(response){
        response=response.json();
        return response;
    })
    .then(function(response){
        //console.log(response)
        return response;
    })
}


let targettime1=loadJSON('https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json')
let targettime2=loadJSON('https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N2.json')
var url = 'jma_city.json'//'jma_area_e.json'//'https://example.com/x.json';
$.getJSON(url, function(data){
    citydata=data
});

map.on('load', function () {
    map.addSource('vt', {
        promoteId: "N03_007",
        'type': 'vector',
        'tiles': ['https://azarashiha.github.io/vt/{z}/{x}/{y}.pbf']//['https://weatherbox.github.io/warning-area-vt/v2/{z}/{x}/{y}.pbf']
        //"https://weatherbox.github.io/warning-area-vt/v2/{z}/{x}/{y}.pbf"
    });
    map.addLayer({
        "id": "pref-line",
        "type": "fill",
        "source": "vt",
        "source-layer": "city",
        'paint': {
            //https://www.w3schools.com/css/css_colors_rgb.asp
            'fill-color': 'rgba(130,130,130, 0.7)',
            'fill-outline-color': 'rgba(171,171,171, 0.4)'//'rgba(200, 100, 240, 1)'
            }
    
        });





    let id="1";
    let resterurl='https://www.jma.go.jp/bosai/himawari/data/nowc/'
    const HIMAWARI_URL = 'https://www.jma.go.jp/bosai/himawari/data/satimg';
    let basetime=20220319054500
    
    map.addSource(id, {
        'type': 'raster',
        'tiles': [
            `https://www.jma.go.jp/bosai/jmatile/data/nowc/${basetime}/none/${basetime}/surf/hrpns/{z}/{x}/{y}.png`
        ],
        'tileSize': 256,
        'minzoom': 2,
        'maxzoom': 10,
    });
    map.addLayer({
        'id': id,
        'type': 'raster',
        'source': id,
        
    });
    
})


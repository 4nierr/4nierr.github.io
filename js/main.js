mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    zoom: 3, // starting zoom
    center: [-100, 40] // starting center
});

async function geojsonFetch() {
    // other operations
    let response = await fetch('assets/us-covid-2020-counts.json');
    let stateData = await response.json();
}

geojsonFetch();

map.on('load', function loadingData() {
    // add layer
    // add legend
});

map.addSource('stateData', {
    type: 'geojson',
    data: stateData
});

map.addLayer({
    'id': 'stateData-layer',
    'type': 'fill',
    'source': 'stateData',
    'paint': {
        'fill-color': [
            'step',
            ['get', 'cases'],
            '#FFEDA0',   // stop_output_0
            371,          // stop_input_0
            '#FED976',   // stop_output_1
            682,          // stop_input_1
            '#FEB24C',   // stop_output_2
            1097,          // stop_input_2
            '#FD8D3C',   // stop_output_3
            1632,         // stop_input_3
            '#FC4E2A',   // stop_output_4
            2535,         // stop_input_4
            '#E31A1C',   // stop_output_5
            4201,         // stop_input_5
            '#BD0026',   // stop_output_6
            9943,        // stop_input_6
            "#800026"    // stop_output_7
        ],
        'fill-outline-color': '#BBBBBB',
        'fill-opacity': 0.7,
    }
});

const layers = [
    '1-371',
    '372-682',
    '683-1097',
    '1098-1632',
    '1633-2535',
    '2536-4201',
    '4202-9943',
    '9944 and more'
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70',
    '#BD002670',
    '#80002670'
];

const legend = document.getElementById('legend');
legend.innerHTML = "<b>Case Count<br>(per thousand residents)</b><br><br>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});

map.on('mousemove', ({point}) => {
    const state = map.queryRenderedFeatures(point, {
        layers: ['us-covid-2020-rates']
    });
    document.getElementById('text-description').innerHTML = state.length ?
        `<h3>${state[0].properties.name}</h3><p><strong><em>${state[0].properties.density}</strong> people per square mile</em></p>` :
        `<p>Hover over a state!</p>`;
});

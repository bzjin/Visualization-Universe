var map = L.map('example').setView([41.8507, -87.6340], 16);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'bzjin.2mbeh67p',
    accessToken: 'pk.eyJ1IjoiYnpqaW4iLCJhIjoiY2lyZ2Y2YzQwMDBhZGdlbm5jeWd4bW5xdiJ9.6focl_u481ea4df6CJg41w'
}).addTo(map);
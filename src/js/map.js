(function() {
    const lat = 20.67444163271174;
    const lng = -103.38739216304566;
    const mapa = L.map('map').setView([lat, lng ], 13);

    let marker;
    
    // Provider and Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Pin 
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(mapa);

    // pin coordinates
    marker.on('moveend', function (event) {
        marker = event.target;
        const position = marker.getLatLng();

        mapa.panTo(new L.LatLng(position.lat, position.lng));

        // street info
        geocodeService.reverse().latlng(position, 13).run(function (error, result) {
            marker.bindPopup(result.address.LongLabel);

            // view create.ejs
            document.querySelector('.calle').textContent = result?.address?.Address ?? '';
            document.querySelector('#calle').value = result?.address?.Address ?? '';
            document.querySelector('#lat').value = result?.latlng?.lat ?? '';
            document.querySelector('#lng').value = result?.latlng?.lng ?? '';
        });
    });
})()
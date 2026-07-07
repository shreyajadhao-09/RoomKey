if (typeof mapToken !== 'undefined' && typeof coordinates !== 'undefined') {
    maptilersdk.config.apiKey = mapToken;

    const map = new maptilersdk.Map({
        container: "map",
        style: maptilersdk.MapStyle.STREETS,
        center: coordinates,
        zoom: 9,
    });

    new maptilersdk.Marker({color: "red"})
        .setLngLat(coordinates)
         .setPopup(
            new maptilersdk.Popup({ offset: 25 })
                .setHTML(`<h6>${listingLocation}</h6><p>Exact location provided after booking</p>`)
        )
        .addTo(map);
}
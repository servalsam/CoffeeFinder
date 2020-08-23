function loadScript() {
    const mykey = config.MY_KEY;
    console.log(mykey);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + mykey + '&libraries=places&callback=initMap'
    document.body.appendChild(script);
}

window.onload = loadScript();
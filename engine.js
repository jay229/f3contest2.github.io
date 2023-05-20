
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=e0860780db8642659ae9e223e136fcea`)
        .then(response => response.json())
        .then(data => {
            let name = data.results[0].timezone.name;
            let std = data.results[0].timezone.offset_STD;
            let stdsec = data.results[0].timezone.offset_STD_seconds;
            let dst = data.results[0].timezone.offset_DST;
            let dstsec = data.results[0].timezone.offset_DST_seconds;
            let country = data.results[0].country;
            let postcode = data.results[0].postcode;
            let city = data.results[0].city;

            const child = document.getElementById("p1-child2");
            // console.log(child);
            child.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                <div class="lat-ltd">
                                <p>Lat : ${position.coords.latitude}</p>
                                <p>Long : ${position.coords.longitude}</p>
                                </div>
                                <div>Offset STD : ${std}</div>
                                <div>Offset STD Seconds : ${stdsec}</div>
                                <div>Offset DST : ${dst}</div
                                <div>Offset DST Seconds : ${dstsec}</div>
                                <div>Country : ${country}</div>
                                <div>Postcode : ${postcode}</div>
                                <div>City : ${city}</div>`;


        })
        .catch(error => alert("No location found"));

}
getLocation();


function getByAddress() {
    let input = document.getElementById("input");
    let result = document.getElementById("p2-ch2");
    let error = document.getElementById("error");

    if (input.value) {
        if (error.style.display === "block") {
            error.style.display = "none";
        }
    }

    let address = input.value;
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=e0860780db8642659ae9e223e136fcea`)
        .then(response => response.json())
        .then(data => {
            if (data.features.length !== 0) {
               // result.innerHTML = "";
                result.style.display = "block"
                let name = data.features[0].properties.timezone.name;
                let lat = data.features[0].properties.lat;
                let long = data.features[0].properties.lon;
                let std = data.features[0].properties.timezone.offset_STD;
                let stdsec = data.features[0].properties.timezone.offset_STD_seconds;
                let dst = data.features[0].properties.timezone.offset_DST;
                let dstsec = data.features[0].properties.timezone.offset_DST_seconds;
                let country = data.features[0].properties.country;
                let postcode = data.features[0].properties.postcode;
                let city = data.features[0].properties.city;
                console.log(data.features[0].properties.city);

                result.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                <div class="lat-ltd">
                <p>Lat : ${lat}</p>
                <p>Long : ${long}</p>
                </div>
                <div>Offset STD : ${std}</div>
                <div>Offset STD Seconds : ${stdsec}</div>
                <div>Offset DST : ${dst}</div
                <div>Offset DST Seconds : ${dstsec}</div>
                <div>Country : ${country}</div>
                <div>Postcode : ${postcode}</div>
                <div>City : ${city}</div>`;
            }
            else{
                error.style.display = "block";
                result.style.display="none";
              }
        })

}
const submit = document.getElementById("submit-btn");
submit.addEventListener("click", getByAddress);
let ubicacion = 0;
let datos = [];

window.onload = function lanzarOverview() {
    let xhr = new XMLHttpRequest();
    let url = 'https://api.spacexdata.com/v4/launches';
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let response = JSON.parse(this.responseText);
                datos = response; // Actualiza los datos globales
                carga(response);
                video(response);
            } else {
                console.log('Error: ', this.statusText);
            }
        }
    };
    xhr.send();
};

function carga(data) {
    let intento = data[ubicacion].payloads[0];
    let xhrov = new XMLHttpRequest();
    let url = `https://api.spacexdata.com/v4/payloads/${intento}`;
    xhrov.open('GET', url, true);
    xhrov.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let response = JSON.parse(this.responseText);
                payload(response);
            } else {
                console.log('Error: ', this.statusText);
            }
        }
    };
    xhrov.send();
}

function payload(dataOV) {
    var payloads = document.getElementById('payload');
    if (dataOV.error) {
        payloads.innerHTML = `<p>Error:${dataOV.error}</p>`;
    } else {
        payloads.innerHTML = `
        <h2>Payloads</h2>
        <table class="table">
            <tr>
                <td><h3>Name</h3></td>
                <td><p>${dataOV.name}</p></td>
            </tr>
            <tr>
                <td><h3>Type</h3></td>
                <td><p>${dataOV.type}</p></td>
            </tr>
            <tr>
                <td><h3>Nationalities</h3></td>
                <td><p>${dataOV.nationalities[0]}</p></td>
            </tr>
            <tr>
                <td><h3>Manufacturers</h3></td>
                <td><p>${dataOV.manufacturers[0]}</p></td>
            </tr>
            <tr>
                <td><h3>Mass</h3></td>
                <td><p>${dataOV.mass_kg}kg / ${dataOV.mass_lbs}lbs </p></td>
            </tr>
            <tr>
                <td><h3>Orbit</h3></td>
                <td><p>${dataOV.orbit}</p></td>
            </tr>            
            <tr>
                <td><h3>Reference System</h3></td>
                <td><p>${dataOV.reference_system}</p></td>
            </tr>            
            <tr>
                <td><h3>Regime</h3></td>
                <td><p>${dataOV.regime}</p></td>
            </tr>            
        </table>
        `;
    }
}

function video(dataOV) {
    var videoContainer = document.getElementById('video');
    if (dataOV[ubicacion].links && dataOV[ubicacion].links.webcast) {
        var videoUrl = dataOV[ubicacion].links.webcast;

        if (videoUrl.includes('youtube.com')) {
            var videoId = obtenerVideoId(videoUrl);
            if (videoId) {
                // Construir el código de inserción del video de YouTube
                var embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>`;
                // Mostrar el código de inserción
                videoContainer.innerHTML = embedCode;
            } else {
                videoContainer.innerHTML = `<p>Error: No se pudo obtener el ID del video</p>`;
            }
        } else {
            videoContainer.innerHTML = `<p>Error: El enlace no es de YouTube</p>`;
        }
    } else {
        videoContainer.innerHTML = `<p>Error: No se encontró el enlace del video</p>`;
    }
}
// Función para extraer el ID de un video de YouTube desde su URL
function obtenerVideoId(url) {
    var videoId = null;
    var regex = /[?&]([^=#]+)=([^&#]*)/g;
    var match;
    while ((match = regex.exec(url)) !== null) {
        if (match[1] === 'v') {
            videoId = match[2];
            break;
        }
    }
    return videoId;
}


document.getElementById('antes').addEventListener('click', siguiente);
document.getElementById('despu').addEventListener('click', prevElement);

function siguiente() {
    ubicacion = (ubicacion + 1) % datos.length;
    carga(datos);
    video(datos);
}

function prevElement() {
    ubicacion = (ubicacion - 1 + datos.length) % datos.length;
    carga(datos);
    video(datos);
}

window.addEventListener("load", function() {
    var loaders = document.querySelectorAll(".loader");
    loaders.forEach(function(loader) {
        loader.classList.add("load");
    });
    setTimeout(function() {
        loaders.forEach(function(loader) {
            loader.classList.remove("load");
        });
    }, 2000); 
});

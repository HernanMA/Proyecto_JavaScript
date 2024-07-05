let ubicacion = 0;
let data = [];

window.onload = function lazar() {
    xhr = new XMLHttpRequest();
    let url = `https://api.spacexdata.com/v4/capsules`;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText); // Actualiza la variable global
            console.log(data);
            aterrizaje(data);
            estado(data);
            type(data);
        } else if (this.readyState === 4) {
            console.log('Error: ', this.statusText);
        }
    };
    xhr.send();
}

function aterrizaje(data) {
    var landing = document.getElementById('landings');
    if (data.response === "error") {
        landing.innerHTML = `<p>Error:${data.error}</p>`;
    } else {
        landing.innerHTML = `
        <h2>Landings</h2>
        <h3>Water landings</h3>
        <p>${data[ubicacion].water_landings} </p>
        <h3>Land landings</h3>
        <p>${data[ubicacion].land_landings} </p>
        `;
    }
}

function estado(data) {
    var update = document.getElementById('status');
    if (data.response === "error") {
        update.innerHTML = `<p>Error:${data.error}</p>`;
    } else {
        update.innerHTML = `
        <h2>Status</h2>
        <h3>Last Update</h3>
        <p>${data[ubicacion].last_update} </p>
        <h3>Status</h3>
        <p>${data[ubicacion].status} </p>
        <h3>Reuse Count:</h3>
        <p>${data[ubicacion].reuse_count}</p>
        `;
    }
}

function type(data) {
    var type = document.getElementById('id');
    if (data.response === "error") {
        type.innerHTML = `<p>Error:${data.error}</p>`;
    } else {
        type.innerHTML = `
        <h2>Capsule</h2>
        <h3>Type</h3>
        <p>${data[ubicacion].type} </p>
        <h3>Serial</h3>
        <p>${data[ubicacion].serial} </p>
        `;
    }
}

document.getElementById('antes').addEventListener('click', siguiente);
document.getElementById('despu').addEventListener('click', prevElement);

function siguiente() {
    ubicacion = (ubicacion + 1) % data.length;
    aterrizaje(data);
    estado(data);
    type(data);
}

function prevElement() {
    ubicacion = (ubicacion - 1 + data.length) % data.length;
    aterrizaje(data);
    estado(data);
    type(data);
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

let currentIndex = 0;
let data = [];

function displayElement() {
    let titleElement = document.getElementById('title');
    let idElement = document.getElementById('id');
    let detailsElement = document.getElementById('details');
    let dateElement = document.getElementById('fecha');
    let linkElement = document.getElementById('link');

    titleElement.textContent = data[currentIndex].title;
    idElement.textContent = data[currentIndex].id;
    detailsElement.textContent = data[currentIndex].details;
    dateElement.textContent = data[currentIndex].event_date_utc;
    linkElement.textContent = data[currentIndex].links.article;
}

function fetchSpace() {
    if (data.length === 0) {
        let xhr = new XMLHttpRequest();
        let url = 'https://api.spacexdata.com/v4/history';
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                data = JSON.parse(this.responseText);
                displayElement();
            } else {
                console.log('Error: ');
            }
        }
        xhr.send();
    } else {
        displayElement();
    }
}

function nextElement() {
    currentIndex = (currentIndex + 1) % data.length;
    displayElement();
}

function prevElement() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    displayElement();
}

document.getElementById('next').addEventListener('click', nextElement);
document.getElementById('prev').addEventListener('click', prevElement);

window.onload = fetchSpace; 
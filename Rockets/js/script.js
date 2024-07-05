let currentIndex = 0;
let data = [];

function displayElement() {
    let item1Element = document.getElementById('country')
    let item2Element = document.getElementById('description')
    let item3Element = document.getElementById('feet')
    let item4Element = document.getElementById('meters')
    let item5Element = document.getElementById('type')
    let item6Element = document.getElementById('version')
    let item7Element = document.getElementById('first')
    let item8Element = document.getElementById('id')
    let item9Element = document.getElementById('kg')
    let item10Element = document.getElementById('lb')
    let item11Element = document.getElementById('name') 
    let item12Element = document.getElementById('landing_legs')
    let item13Element = document.getElementById('imgs')
    let item14Element = document.getElementById('feet1')
    let item15Element = document.getElementById('meters1')
    let item16Element = document.getElementById('sea_level')
    let item17Element = document.getElementById('vacuum')
    let item18Element = document.getElementById('kN')
    let item19Element = document.getElementById('lbf')
    let item20Element = document.getElementById('number')
    let item21Element = document.getElementById('layout')
    let item22Element = document.getElementById('engine_loss_max')
    let item23Element = document.getElementById('propellant_1')
    let item24Element = document.getElementById('propellant_2')
    let item25Element = document.getElementById('burn1')
    let item26Element = document.getElementById('fuel1')
    let item28Element = document.getElementById('KN1')
    let item29Element = document.getElementById('LBF1')
    let item30Element = document.getElementById('KN2')
    let item31Element = document.getElementById('LBF2')
    let item32Element = document.getElementById('TH1')
    let item33Element = document.getElementById('TH2')
    let item34Element = document.getElementById('metro1')
    let item35Element = document.getElementById('pies1')
    let item36Element = document.getElementById('option')
    let item37Element = document.getElementById('reusable')
    let item38Element = document.getElementById('engi')
    let item39Element = document.getElementById('fue')


    item1Element.textContent = data[currentIndex].country;
    item2Element.textContent = data[currentIndex].description;
    item3Element.textContent = data[currentIndex].height.feet;
    item4Element.textContent = data[currentIndex].height.meters;
    item5Element.textContent = data[currentIndex].type;
    item6Element.textContent = data[currentIndex].engines.version;
    item7Element.textContent = data[currentIndex].first_flight;
    item8Element.textContent = data[currentIndex].id;
    item9Element.textContent = data[currentIndex].mass.kg;
    item10Element.textContent = data[currentIndex].mass.lb;
    item11Element.textContent = data[currentIndex].name;
    item12Element.textContent = data[currentIndex].landing_legs.material;
    item13Element.innerHTML = '';
    item14Element.textContent = data[currentIndex].diameter.feet;
    item15Element.textContent = data[currentIndex].diameter.meters;
    item16Element.textContent = data[currentIndex].engines.isp.sea_level;
    item17Element.textContent = data[currentIndex].engines.isp.vacuum;
    item18Element.textContent = data[currentIndex].engines.thrust_vacuum.kN;
    item19Element.textContent = data[currentIndex].engines.thrust_vacuum.lbf;
    item20Element.textContent = data[currentIndex].engines.number;
    item21Element.textContent = data[currentIndex].engines.layout;
    item22Element.textContent = data[currentIndex].engines.engine_loss_max;
    item23Element.textContent = data[currentIndex].engines.propellant_1;
    item24Element.textContent = data[currentIndex].engines.propellant_2;
    item25Element.textContent = data[currentIndex].first_stage.burn_time_sec;
    item26Element.textContent = data[currentIndex].first_stage.fuel_amount_tons;
    item28Element.textContent = data[currentIndex].first_stage.thrust_vacuum.kN;
    item29Element.textContent = data[currentIndex].first_stage.thrust_vacuum.lbf;
    item30Element.textContent = data[currentIndex].first_stage.thrust_sea_level.kN;
    item31Element.textContent = data[currentIndex].first_stage.thrust_sea_level.lbf;
    item32Element.textContent = data[currentIndex].second_stage.thrust.kN;
    item33Element.textContent = data[currentIndex].second_stage.thrust.lbf;
    item34Element.textContent = data[currentIndex].second_stage.payloads.composite_fairing.height.meters;
    item35Element.textContent = data[currentIndex].second_stage.payloads.composite_fairing.height.feet;
    item36Element.textContent = data[currentIndex].second_stage.option_1;
    item37Element.textContent = data[currentIndex].second_stage.reusable;
    item38Element.textContent = data[currentIndex].second_stage.engines;
    item39Element.textContent = data[currentIndex].second_stage.fuel_amount_tons;



    data[currentIndex].flickr_images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.setAttribute("referrerpolicy", "no-referrer"); // Establece el atributo referrerpolicy
        item13Element.appendChild(img);
    });
    
    console.log(data[currentIndex].flickr_images)
}

function fetchSpace() {
    if (data.length === 0) {
        let xhr = new XMLHttpRequest();
        let url = 'https://api.spacexdata.com/v4/rockets';
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                data = JSON.parse(this.responseText);
                displayElement();
                console.log(data)
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
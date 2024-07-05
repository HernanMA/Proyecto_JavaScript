function fetchSpace() {
    let xhr = new XMLHttpRequest();
    let url = 'https://api.spacexdata.com/v4/company';
    
    xhr.open('GET', url, true);
    
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            
            document.getElementById('address').textContent = response.headquarters.address;
            document.getElementById('city').textContent = response.headquarters.city;
            document.getElementById('state').textContent = response.headquarters.state;
            document.getElementById('name').textContent = response.name;
            document.getElementById('founder').textContent = response.founder;
            document.getElementById('employees').textContent = response.employees;
            document.getElementById('founded').textContent = response.founded;
            document.getElementById('ceo').textContent = response.ceo;
            document.getElementById('cto').textContent = response.cto;
            document.getElementById('coo').textContent = response.coo;
            document.getElementById('ctoPro').textContent = response.cto_propulsion;
            document.getElementById('summary').textContent = response.summary;
            document.getElementById('id').textContent = response.id;
            document.getElementById('valuation').textContent = response.valuation;
            
            console.log('Respuesta recibida:', response);
        } else if (this.readyState === 4) {
            console.error('Error al realizar la solicitud:', this.status);
        }
    };
    
    xhr.onerror = function() {
        console.error('Error de red al realizar la solicitud.');
    };
    
    xhr.send();
}

fetchSpace();

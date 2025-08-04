document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const flightsNumberInput = document.getElementById('flights-number');
    const flightsDetailsDiv = document.getElementById('flights-details');
    const modal = document.getElementById('info-modal');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close-btn');

    const co2Factors = {
        fuel: {
            gasoline: 2.35, // kg CO2 per L
            diesel: 2.68,   // kg CO2 per L
        },
        gas: 0.275, // kg CO2 per kg
        breathing: 1, // kg CO2 per day
        electricity: {
            fuel: 0.93, // kg CO2 per kWh for fossil fuels
            solar: 0.05, // kg CO2 per kWh for solar
            wind: 0.02, // kg CO2 per kWh for wind
        },
        flights: {
            short: 250,  // kg CO2 per flight (e.g., < 3 hours)
            medium: 1100, // kg CO2 per flight (e.g., 3-6 hours)
            long: 2750,   // kg CO2 per flight (e.g., > 6 hours)
        },
        treeAbsorption: 25, // kg CO2 per year
        carbonTaxRate: 30, // $ per tonne of CO2
    };

    const infoContent = {
        'fuel-type': `Gasoline: ${co2Factors.fuel.gasoline} kg CO2/L<br>Diesel: ${co2Factors.fuel.diesel} kg CO2/L.`,
        power: `Based on the selected source.`,
        'power-type': `Fossil Fuel/Grid: ${co2Factors.electricity.fuel} kg/kWh<br>Solar: ${co2Factors.electricity.solar} kg/kWh<br>Wind: ${co2Factors.electricity.wind} kg/kWh.`,
        gas: `1 kg of natural gas produces ${co2Factors.gas} kg of CO2.`,
        flights: `Short-haul: ${co2Factors.flights.short} kg<br>Medium-haul: ${co2Factors.flights.medium} kg<br>Long-haul: ${co2Factors.flights.long} kg.`,
    };

    document.querySelectorAll('.info-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const infoKey = icon.getAttribute('data-info');
            modalText.innerHTML = infoContent[infoKey];
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    function createFlightInputs(flightIndex) {
        const flightDiv = document.createElement('div');
        flightDiv.className = 'flight-input-group';
        flightDiv.innerHTML = `
            <h4>Flight ${flightIndex}</h4>
            <div class="input-group">
                <label for="trip-type-${flightIndex}">Trip Type:</label>
                <select id="trip-type-${flightIndex}" class="trip-type">
                    <option value="medium">Medium-Haul (3-6 hours)</option>
                    <option value="short">Short-Haul (<3 hours)</option>
                    <option value="long">Long-Haul (>6 hours)</option>
                </select>
            </div>
        `;
        return flightDiv;
    }

    flightsNumberInput.addEventListener('input', () => {
        const numberOfFlights = parseInt(flightsNumberInput.value) || 0;
        flightsDetailsDiv.innerHTML = '';
        for (let i = 1; i <= numberOfFlights; i++) {
            flightsDetailsDiv.appendChild(createFlightInputs(i));
        }
    });

    calculateBtn.addEventListener('click', () => {
        const fuelConsumption = parseFloat(document.getElementById('fuel').value) || 0;
        const fuelType = document.getElementById('fuel-type').value;
        const powerConsumption = parseFloat(document.getElementById('power').value) || 0;
        const powerType = document.getElementById('power-type').value;
        const gasConsumption = parseFloat(document.getElementById('gas').value) || 0;

        const annualFuelCO2 = fuelConsumption * 12 * co2Factors.fuel[fuelType];
        const annualPowerCO2 = powerConsumption * 12 * co2Factors.electricity[powerType];
        const annualGasCO2 = gasConsumption * 12 * co2Factors.gas;
        const annualBreathingCO2 = co2Factors.breathing * 365;

        let annualFlightCO2 = 0;
        const numberOfFlights = parseInt(flightsNumberInput.value) || 0;
        for (let i = 1; i <= numberOfFlights; i++) {
            const tripType = document.getElementById(`trip-type-${i}`).value;
            annualFlightCO2 += co2Factors.flights[tripType] || 0;
        }

        const totalCO2 = annualFuelCO2 + annualPowerCO2 + annualGasCO2 + annualFlightCO2 + annualBreathingCO2;
        const totalCO2InTonnes = totalCO2 / 1000;

        const treesNeeded = Math.ceil(totalCO2 / co2Factors.treeAbsorption);
        const carbonTax = (totalCO2InTonnes * co2Factors.carbonTaxRate).toFixed(2);

        document.getElementById('total-co2').innerHTML = `<b style="font-size: 1.5em;">${totalCO2.toFixed(2)} kg/year </b> <br> <span style="font-weight: normal;"> (${totalCO2InTonnes.toFixed(2)} tonnes/year)</span>`;
        document.getElementById('trees-needed').innerHTML = `<b style="font-size: 1.5em;">${treesNeeded} trees </b><br> 1 tree absorbs 25 kg CO2/year`;
        document.getElementById('carbon-tax').innerHTML = `<b style="font-size: 1.5em;">$${carbonTax}</b> <br> based on $${co2Factors.carbonTaxRate}/tonne`;

        document.getElementById('fuel-report').textContent = `Car Fuel: ${annualFuelCO2.toFixed(2)} kg`;
        document.getElementById('power-report').textContent = `Electricity: ${annualPowerCO2.toFixed(2)} kg`;
        document.getElementById('gas-report').textContent = `Natural Gas: ${annualGasCO2.toFixed(2)} kg`;
        document.getElementById('flights-report').textContent = `Flights: ${annualFlightCO2.toFixed(2)} kg`;
        document.getElementById('breathing-report').textContent = `Breathing: ${annualBreathingCO2.toFixed(2)} kg`;

        resultDiv.classList.add('visible');
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});

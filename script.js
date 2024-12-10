let inputField = document.getElementById('inputField');
let historyList = document.getElementById('historyList');
let history = JSON.parse(localStorage.getItem('history')) || [];

// Funkcija, lai pievienotu ciparus un operācijas
function appendToInput(value) {
    inputField.value += value;
}

// Funkcija, lai notīrītu ievadi
function clearInput() {
    inputField.value = '';
}

// Funkcija, lai aprēķinātu rezultātu
function calculate() {
    try {
        // Iegūst izteiksmi no ievades
        let expression = inputField.value;

        // Pārbaudām, vai izteiksme nav tukša vai nederīga
        if (!expression || /[^0-9+\-*/(). ]/.test(expression)) {
            inputField.value = 'Kļūda';
            return;
        }

        // Aprēķina rezultātu izmantojot eval() (drošākai lietošanai šeit var izmantot drošu eval bibliotēku)
        let result = eval(expression);

        // Parāda rezultātu ievades laukā
        inputField.value = result;

        // Saglabā izteiksmi un rezultātu vēsturē
        let historyItem = {
            expression: expression,
            result: result
        };
        
        // Pievieno jaunu ierakstu vēsturei
        history.push(historyItem);
        updateHistory();

        // Saglabā vēsturi vietējā krātuvē (localStorage)
        localStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
        // Ja notiek kļūda, parāda kļūdas paziņojumu
        inputField.value = 'Kļūda';
    }
}

// Funkcija, lai atjauninātu vēsturi
function updateHistory() {
    historyList.innerHTML = ''; // Iztīra esošo vēsturi
    history.forEach((item, index) => {
        // Izveido jaunu saraksta vienumu
        let li = document.createElement('li');
        li.innerHTML = `${item.expression} = ${item.result} <button onclick="deleteHistoryItem(${index})">Dzēst</button>`;
        historyList.appendChild(li); // Pievieno sarakstam
    });
}

// Funkcija, lai dzēstu vēstures ierakstu
function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

// Funkcija, lai dzēstu visu vēsturi
function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

function appendToInput(value) {
    // Pārbaude, vai ievades laukā jau nav komats
    if (value === '.' && inputField.value.includes('.')) {
        return; // Ja jau ir komats, nepieļaujam jaunu
    }

    inputField.value += value;
}

// Inicializēt vēsturi, kad lapa tiek ielādēta
updateHistory();

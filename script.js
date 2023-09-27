document.addEventListener('DOMContentLoaded', function () {
    const dataForm = document.getElementById('data-form');
    const nameInput = document.getElementById('name');
    const weightInput = document.getElementById('weight');
    const amountInput = document.getElementById('amount');
    const searchInput = document.getElementById('search-bar');
    const resultsList = document.getElementById('results');

    //Load dataen fra databasen
    let database = [];
    function updateResults(query) {
        resultsList.innerHTML = '';

        const filteredData = database.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.weight.toLowerCase().includes(query.toLowerCase()) ||
            item.amount.toLowerCase().includes(query.toLowerCase())
        );

        filteredData.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Name: ${item.name}, Weight: ${item.weight}, Amount: ${item.amount}`;
            resultsList.appendChild(listItem);
        });
    }
    // Load dataen fra db.json
    fetch('db.json')
    .then(response => response.json())
    .then(data => {
        database = data;
        updateResults('');
    });

    dataForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const weight = weightInput.value;
        const amount = amountInput.value;

        if (name && weight && amount) {
            const newItem = { name, weight, amount };
            database.push(newItem);

            // Update db med ny data
            fetch('db.json', {
                method: 'PUT',
                body: JSON.stringify(database),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Ryd formen og updater resultatet
            nameInput.value = '';
            weightInput.value = '';
            amountInput.value = '';
            updateResults('');
        }
    });

    // Søgebar
    searchInput.addEventListener('input', function () {
        const query = searchInput.value;
        updateResults(query);
    });
});

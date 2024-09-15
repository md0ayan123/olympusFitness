document.addEventListener('DOMContentLoaded', function() {
    const trainers = [
        // Example trainer data, this should be fetched from the database in a real application
        { name: 'Trainer 1', phone: '9876543210', email: 'trainer1@example.com', salary: 5000 },
        { name: 'Trainer 2', phone: '9123456780', email: 'trainer2@example.com', salary: 3000 }
    ];

    const trainersTableBody = document.querySelector('.trainer-table tbody');
    const totalSalaryElement = document.getElementById('totalSalary');

    function populateTable() {
        let totalSalary = 0;

        trainers.forEach(trainer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${trainer.name}</td>
                <td>${trainer.phone}</td>
                <td>${trainer.email}</td>
                <td>${trainer.salary.toLocaleString('en-IN')}</td>
            `;
            trainersTableBody.appendChild(row);
            totalSalary += trainer.salary;
        });

        totalSalaryElement.textContent = totalSalary.toLocaleString('en-IN');
    }

    populateTable();
});

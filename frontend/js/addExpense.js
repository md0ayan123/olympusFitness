import { APIURL } from "./config";

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const trainerSalaryInput = document.getElementById('trainerSalary');
    const electricityBillInput = document.getElementById('electricityBill');
    const miscellaneousInput = document.getElementById('miscellaneous');
    const otherExpensesInput = document.getElementById('otherExpenses');
    const totalExpenseInput = document.getElementById('totalExpense');
    const addExpenseForm = document.getElementById('addExpenseForm');

    // Populate year and month dropdowns
    function populateYears() {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 2000; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }

    function populateMonths() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
            monthSelect.appendChild(option);
        });
    }

    populateYears();
    populateMonths();

    // Function to validate input
    function validateInput(input) {
        const value = input.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        input.value = value;
    }

    // Function to update total expense
    function updateTotalExpense() {
        const trainerSalary = parseInt(trainerSalaryInput.value) || 0;
        const electricityBill = parseInt(electricityBillInput.value) || 0;
        const miscellaneous = parseInt(miscellaneousInput.value) || 0;
        const otherExpenses = parseInt(otherExpensesInput.value) || 0;
        const totalExpense = trainerSalary + electricityBill + miscellaneous + otherExpenses;
        totalExpenseInput.value = `₹ ${totalExpense.toLocaleString('en-IN')}`;
    }

    // Event listeners for inputs
    [trainerSalaryInput, electricityBillInput, miscellaneousInput, otherExpensesInput].forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
            updateTotalExpense();
        });
    });

    // Form submit handler
    addExpenseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Check required fields
        const year = yearSelect.value;
        const month = monthSelect.value;
        const trainerSalary = trainerSalaryInput.value;
        const electricityBill = electricityBillInput.value;
        const miscellaneous = miscellaneousInput.value;
        const otherExpenses = otherExpensesInput.value;

        let isValid = true;

        if (!year) {
            yearSelect.classList.add('error');
            isValid = false;
        }
        if (!month) {
            monthSelect.classList.add('error');
            isValid = false;
        }
        if (!trainerSalary) {
            trainerSalaryInput.classList.add('error');
            isValid = false;
        }
        if (!electricityBill) {
            electricityBillInput.classList.add('error');
            isValid = false;
        }
        if (!miscellaneous) {
            miscellaneousInput.classList.add('error');
            isValid = false;
        }
        if (!otherExpenses) {
            otherExpensesInput.classList.add('error');
            isValid = false;
        }

        if (!isValid) {
            alert('Please fill all the required fields.');
            return;
        }

        // Submit the form data
        const data = {
            year: year,
            month: month,
            trainerSalary: trainerSalary,
            electricityBill: electricityBill,
            miscellaneous: miscellaneous,
            otherExpenses: otherExpenses,
            totalExpense: totalExpenseInput.value
        };

        console.log('Form submitted with data:', data);

        // Example API endpoint (replace with your actual API endpoint)
        const apiEndpoint = `${APIURL}/expenses`;

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            alert('Expense added successfully!');
            addExpenseForm.reset();
            totalExpenseInput.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding expense. Please try again.');
        });
    });
});

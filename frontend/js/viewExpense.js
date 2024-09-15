document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const selectedMonthBtn = document.getElementById('selectedMonth');
    const selectedYearBtn = document.getElementById('selectedYear');
    const monthDropdown = document.getElementById('monthDropdown');
    const yearDropdown = document.getElementById('yearDropdown');
    const expenseTableBody = document.getElementById('expenseTableBody');

    let expenses = []; // Initialize the expenses array

    // Define the API endpoint
    const apiEndpoint = 'http://localhost:3000/api/expense';

    // Function to fetch expenses from the API
    function fetchExpenses() {
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            expenses = result.result;
            result.result.forEach(expense => {
                const row = document.createElement('tr');
    
                row.innerHTML = `
                    <td>${expense.month}</td>
                    <td>${expense.year}</td>
                    <td>₹ ${expense.trainerSalary}</td>
                    <td>₹ ${expense.ElectricityBill}</td>
                    <td>₹ ${expense.MiscellaneousExpense}</td>
                    <td>₹ ${expense.OtherExpenses}</td>
                    <td>₹ ${expense.TotalExpense}</td>
                `;
    
                expenseTableBody.appendChild(row);
            });
            filterExpenses(); // Filter and render expenses after fetching data
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Call fetchExpenses to populate the expenses array
    fetchExpenses();
    console.log(expenses)

    // Function to select month
    function selectMonth(month) {
        selectedMonthBtn.textContent = month;
        selectedMonthBtn.classList.remove('error'); // Remove error highlight if present
        filterExpenses();
    }

    // Function to select year
    function selectYear(year) {
        selectedYearBtn.textContent = year;
        selectedYearBtn.classList.remove('error'); // Remove error highlight if present
        filterExpenses();
    }

    // Function to filter expenses
    function filterExpenses() {
        const month = selectedMonthBtn.textContent;
        const year = selectedYearBtn.textContent;

        if (month === 'Select Month' || year === 'Select Year') {
            return;
        }

        expenseTableBody.innerHTML = ''; // Clear previous table data

        let filteredExpenses;
        if (month === 'All') {
            filteredExpenses = expenses.filter(expense => expense.year === year);
        } else {
            filteredExpenses = expenses.filter(expense => expense.month === month && expense.year === year);
        }

        // Add filtered expenses to the table
        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${expense.month}</td>
                <td>${expense.year}</td>
                <td>₹ ${expense.trainerSalary.toLocaleString('en-IN')}</td>
                <td>₹ ${expense.electricityBill.toLocaleString('en-IN')}</td>
                <td>₹ ${expense.miscellaneous.toLocaleString('en-IN')}</td>
                <td>₹ ${expense.otherExpenses.toLocaleString('en-IN')}</td>
                <td>₹ ${(expense.trainerSalary + expense.electricityBill + expense.miscellaneous + expense.otherExpenses).toLocaleString('en-IN')}</td>
            `;

            expenseTableBody.appendChild(row);
        });

        // Show message if no expenses found
        if (filteredExpenses.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 7;
            cell.textContent = 'No expenses found for the selected month and year.';
            row.appendChild(cell);
            expenseTableBody.appendChild(row);
        }
    }

    // Function to download expenses as XLS
    function downloadExpenses() {
        const month = selectedMonthBtn.textContent;
        const year = selectedYearBtn.textContent;

        if (month === 'Select Month' || year === 'Select Year') {
            alert('Please select a month and year first.');
            return;
        }

        let filteredExpenses;
        if (month === 'All') {
            filteredExpenses = expenses.filter(expense => expense.year === year);
        } else {
            filteredExpenses = expenses.filter(expense => expense.month === month && expense.year === year);
        }

        if (filteredExpenses.length === 0) {
            alert('No expenses found to download.');
            return;
        }

        let xlsContent = 'Month\tYear\tTrainer Salary\tElectricity Bill\tMiscellaneous\tOther Expenses\tTotal Expense\n';

        filteredExpenses.forEach(expense => {
            xlsContent += `${expense.month}\t${expense.year}\t₹ ${expense.trainerSalary.toLocaleString('en-IN')}\t₹ ${expense.electricityBill.toLocaleString('en-IN')}\t₹ ${expense.miscellaneous.toLocaleString('en-IN')}\t₹ ${expense.otherExpenses.toLocaleString('en-IN')}\t₹ ${(expense.trainerSalary + expense.electricityBill + expense.miscellaneous + expense.otherExpenses).toLocaleString('en-IN')}\n`;
        });

        const blob = new Blob([xlsContent], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `expenses_${month}_${year}.xls`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Event listeners for dropdowns
    monthDropdown.querySelectorAll('a').forEach(a => a.addEventListener('click', function(event) {
        event.preventDefault();
        selectMonth(this.textContent);
    }));

    yearDropdown.querySelectorAll('a').forEach(a => a.addEventListener('click', function(event) {
        event.preventDefault();
        selectYear(this.textContent);
    }));

    // Expose select functions to global scope for HTML onclick
    window.selectMonth = selectMonth;
    window.selectYear = selectYear;
    window.downloadExpenses = downloadExpenses;
});

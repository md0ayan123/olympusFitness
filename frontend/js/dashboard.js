document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            const totalMembers = data.length;
            document.getElementById('total-members').innerText = totalMembers;

            const membershipTypes = data.reduce((acc, user) => {
                acc[user.membershipType] = (acc[user.membershipType] || 0) + 1;
                return acc;
            }, {});

            const activeInactiveCounts = data.reduce((acc, user) => {
                acc[user.isActive ? 'Active' : 'Inactive']++;
                return acc;
            }, { Active: 0, Inactive: 0 });

            renderMembershipTypeChart(membershipTypes);
            renderActiveInactiveChart(activeInactiveCounts);
        })
        .catch(error => console.error('Error:', error));

    fetch('http://localhost:3000/api/trainers')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-trainers').innerText = data.length;
        })
        .catch(error => console.error('Error:', error));

    fetch('http://localhost:3000/api/expenses')
        .then(response => response.json())
        .then(data => {
            const totalExpenses = data.reduce((sum, expense) => sum + expense.amount, 0);
            document.getElementById('total-expenses').innerText = `₹${totalExpenses.toFixed(2)}`;
        })
        .catch(error => console.error('Error:', error));
});

function renderMembershipTypeChart(data) {
    const ctx = document.getElementById('membershipTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Membership Types',
                data: Object.values(data),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        }
    });
}

function renderActiveInactiveChart(data) {
    const ctx = document.getElementById('activeInactiveChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Active', 'Inactive'],
            datasets: [{
                label: 'Membership Status',
                data: [data.Active, data.Inactive],
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: ['#36A2EB', '#FF6384'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function logout() {
    window.location.href = 'login.html';
}

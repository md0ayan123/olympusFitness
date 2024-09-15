document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('yearSelect');
    const membersTableBody = document.querySelector('#membersTable tbody');
    const downloadButton = document.getElementById('downloadButton');

    const members = [
        // Example member data, this should be fetched from the database in a real application
        { memberId: '12345', name: 'John Doe', phone: '1234567890', address: '123 Main St', membershipType: 'Monthly', amount: 1500, startDate: '2023-01-01', endDate: '2023-01-31' },
        { memberId: '67890', name: 'Jane Smith', phone: '0987654321', address: '456 Oak St', membershipType: 'Quarterly', amount: 3700, startDate: '2023-03-01', endDate: '2023-05-31' }
    ];

    function populateYears() {
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 2000; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    }

    function populateTable(filteredMembers) {
        membersTableBody.innerHTML = '';
        filteredMembers.forEach(member => {
            const row = document.createElement('tr');
            const status = getStatus(new Date(member.endDate));
            row.innerHTML = `
                <td>${member.memberId}</td>
                <td>${member.name}</td>
                <td>${member.phone}</td>
                <td>${member.address}</td>
                <td>${member.membershipType}</td>
                <td>${member.amount}</td>
                <td>${member.startDate}</td>
                <td>${member.endDate}</td>
                <td class="${status === 'Active' ? 'status-active' : 'status-inactive'}">${status}</td>
            `;
            membersTableBody.appendChild(row);
        });
    }

    function getStatus(endDate) {
        const today = new Date();
        return endDate >= today ? 'Active' : 'Inactive';
    }

    function filterMembersByYear(year) {
        if (year) {
            return members.filter(member => new Date(member.startDate).getFullYear() === parseInt(year));
        }
        return members;
    }

    yearSelect.addEventListener('change', function() {
        const selectedYear = yearSelect.value;
        const filteredMembers = filterMembersByYear(selectedYear);
        populateTable(filteredMembers);
    });

    downloadButton.addEventListener('click', function() {
        const selectedYear = yearSelect.value;
        const filteredMembers = filterMembersByYear(selectedYear);
        downloadXLS(filteredMembers);
    });

    function downloadXLS(data) {
        let xlsContent = 'Member ID\tName\tPhone Number\tAddress\tMembership Type\tAmount\tStart Date\tEnd Date\tStatus\n';
        data.forEach(member => {
            const status = getStatus(new Date(member.endDate));
            xlsContent += `${member.memberId}\t${member.name}\t${member.phone}\t${member.address}\t${member.membershipType}\t${member.amount}\t${member.startDate}\t${member.endDate}\t${status}\n`;
        });

        const blob = new Blob([xlsContent], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `members_${selectedYear || 'all'}.xls`;
        link.click();
    }

    populateYears();
    populateTable(members);
});

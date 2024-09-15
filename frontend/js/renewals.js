document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const filterMembers = document.getElementById('membershipType');
    const renewalsTableBody = document.querySelector('#renewalsTable tbody');
    const rowCount = document.getElementById('rowCount');

    let members = [];

    // Define the API endpoint
    const apiEndpoint = 'http://localhost:3000/api/member';

    // Function to fetch expenses from the API
    function fetchMembers() {
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            members = result.result;
            populateTable(members)
            // filterExpenses(); // Filter and render expenses after fetching data
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    fetchMembers()

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

    function populateMemberType() {
        const type = ['monthly','quarterly','halfYearly','yearly'];
        type.forEach((type, index) => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type.toUpperCase();
            filterMembers.appendChild(option);
        });
    }

    function displayDateFormat(date){
        return new Date(date).toLocaleDateString("en-in").replaceAll("/","-")
    }

    function populateTable(filteredMembers) {
        renewalsTableBody.innerHTML = '';
        filteredMembers.forEach(member => {            
           const row = document.createElement('tr');
            // Set up the basic row structure using innerHTML (excluding the conditional part)
            row.innerHTML = `
                <td>${member.memberId}</td>
                <td>${member.name}</td>
                <td>${member.phone}</td>
                <td>${member.address}</td>
                <td>${member.membershipType}</td>
                <td>${member.packageValue}</td>
                <td>${member.paymentRecivedAt[0].amount}</td>
                <td>${member.packageValue - member.paymentRecivedAt[0].amount}</td>
                <td>${displayDateFormat(member.startDate)}</td>
                <td>${displayDateFormat(member.endDate)}</td>
                 ${(getStatus(new Date(member.endDate)) === 'Inactive') ? `<td><button class="renew-button" data-id="${member.memberId}" data-name="${member.name}" data-phone="${member.phone}" data-mongoid=${member._id} data-address="${member.address}">Renew</button></td>`:`<td><button class="active-button" data-id="${member.memberId}" data-name="${member.name}"disabled  data-phone="${member.phone}" data-address="${member.address}">Active</button></td>`}
            `;

            // // Append the row to the table body
            renewalsTableBody.appendChild(row);


        });
        rowCount.textContent = `Rows: ${filteredMembers.length}`;
    }

    function getStatus(endDate) {
        const today = new Date();
        return endDate >= today ? 'Active' : 'Inactive';
    }

    function filterMembersByYearAndMonth(year, month) {
        return members.filter(member => {
            const memberDate = new Date(member.startDate);
            return memberDate.getFullYear() === parseInt(year) && (month === '' || memberDate.getMonth() + 1 === parseInt(month));
        });
    }

    function filterMembersByType(type) {
        return members.filter(member => {
            if(member.membershipType == type){
                return member
            }
        });
    }

    yearSelect.addEventListener('change', function() {
        const selectedYear = yearSelect.value;
        const selectedMonth = monthSelect.value;
        const filteredMembers = filterMembersByYearAndMonth(selectedYear, selectedMonth);
        populateTable(filteredMembers);
    });

    monthSelect.addEventListener('change', function() {
        const selectedYear = yearSelect.value;
        const selectedMonth = monthSelect.value;
        const filteredMembers = filterMembersByYearAndMonth(selectedYear, selectedMonth);
        populateTable(filteredMembers);
    });

    filterMembers.addEventListener('change', function() {
        const membershipType = filterMembers.value;
        const filteredMembers = filterMembersByType(membershipType);
        populateTable(filteredMembers);
    });

    renewalsTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('renew-button')) {
            const memberId = event.target.dataset.id;
            const mongoid = event.target.dataset.mongoid;
            const name = event.target.dataset.name;
            const phone = event.target.dataset.phone;
            const address = event.target.dataset.address;
            window.location.href = `add_member.html?memberId=${memberId}&name=${encodeURIComponent(name)}&phone=${phone}&address=${encodeURIComponent(address)}&type=renew&id=${encodeURIComponent(mongoid)}`;
        }
    });

    populateYears();
    populateMonths();
    populateMemberType()
    populateTable(members);
});

document.addEventListener('DOMContentLoaded', function() {
    const memberHeading = document.getElementById('member-head');
    const memberIdInput = document.getElementById('memberId');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const membershipTypeSelect = document.getElementById('membershipType');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const amountInput = document.getElementById('amount');
    const paymentModeInput = document.getElementById('paymentMode');
    const packageValueInput = document.getElementById('packageValue');
    const clearButton = document.getElementById('clearButton');
    

    // Fetch URL parameters to prefill the form
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('memberId');
    const name = urlParams.get('name');
    const phone = urlParams.get('phone');
    const address = urlParams.get('address');
    const type = urlParams.get('type');
    const id = urlParams.get('id');

    if(type == "renew"){
        memberHeading.innerText="Renew Member"
    }else{
        memberHeading.innerText="Add Member"
    }

    if (memberId) {
        memberIdInput.value = memberId;
         if (name && phone && address) {
            nameInput.value = decodeURIComponent(name);
            phoneInput.value = decodeURIComponent(phone);
            addressInput.value = decodeURIComponent(address);
        }
    }

    memberIdInput.addEventListener('change', function() {
        const memberId = memberIdInput.value.trim();
        if (memberId && members[memberId]) {
            const member = member[memberId];
            nameInput.value = member.name;
            phoneInput.value = member.phone;
            addressInput.value = member.address;
        } else {
            nameInput.value = '';
            phoneInput.value = '';
            addressInput.value = '';
            
        }
    });

    membershipTypeSelect.addEventListener('change', function() {
        updateEndDateAndAmount();
    });

    startDateInput.addEventListener('change', function() {
        updateEndDateAndAmount();
    });

    function updateEndDateAndAmount() {
        const membershipType = membershipTypeSelect.value;
        const startDate = new Date(startDateInput.value);
        if (membershipType && startDate) {
            let endDate = new Date(startDate);
            switch (membershipType) {
                case 'monthly':
                    endDate.setMonth(endDate.getMonth() + 1);
                    break;
                case 'quarterly':
                    endDate.setMonth(endDate.getMonth() + 3);
                    break;
                case 'halfYearly':
                    endDate.setMonth(endDate.getMonth() + 6);
                    break;
                case 'yearly':
                    endDate.setFullYear(endDate.getFullYear() + 1);
                    break;
            }
            endDate.setDate(endDate.getDate() - 1); // Set the end date to the day before
            endDateInput.value = endDate.toISOString().split('T')[0];
            // amountInput.value = membershipPrices[membershipType];
            // updateStatus(endDate);
        }
    }

    function updateStatus(endDate) {
        const today = new Date();
        if (endDate >= today) {
            statusInput.value = 'Active';
            statusInput.classList.add('active');
            statusInput.classList.remove('inactive');
        } else {
            statusInput.value = 'Inactive';
            statusInput.classList.add('inactive');
            statusInput.classList.remove('active');
        }
    }

    phoneInput.addEventListener('input', function() {
        phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    });

    clearButton.addEventListener('click', function() {
        memberIdInput.value = '';
        nameInput.value = '';
        phoneInput.value = '';
        addressInput.value = '';
        membershipTypeSelect.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
        amountInput.value = '';
        packageValueInput.value = '';
        paymentModeInput.value = '';
        statusInput.classList.remove('active', 'inactive');
    });

    document.getElementById('addMemberForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let data={
            _id:id,
            memberId:memberIdInput.value,
            name: nameInput.value,
            phone: phoneInput.value,
            address: addressInput.value,
            membershipType: membershipTypeSelect.value,
            startDate: new Date(startDateInput.value),
            endDate: new Date(endDateInput.value),
            packageValue: packageValueInput.value,
            paymentMode:paymentModeInput.value,
            paymentRecivedAt: {
                date:new Date().toLocaleDateString("en-IN").replaceAll("/","-"),
                amount:amountInput.value
            },
        }


        if (!memberIdInput.value) {
            memberIdInput.value = generateUniqueId();
        }

        const apiEndpoint = `http://localhost:3000/api/member`;

        let method ='POST';
        if(type == "renew"){
            method="PUT"
        }
        fetch(apiEndpoint, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            alert('Member Renew successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding expense. Please try again.');
        });
          console.log("running");
          
        // Add or update member in the database
        // location.reload(); // Refresh the page after showing the alert
    });
});

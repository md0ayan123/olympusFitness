document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const filterMembers = document.getElementById('membershipType');
    const renewalsTableBody = document.querySelector('#renewalsTable tbody');
    const myModel = document.querySelector('#myModel');
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
    
    function handlemodel(e){
        console.log("hel",e)
    }
        
    function populateTable(filteredMembers) {
        renewalsTableBody.innerHTML = '';
        filteredMembers.forEach(member => { 
            let memberValue=JSON.stringify(member)  
            // console.log(memberValue);
            
            // console.log(filteredMembers);
            const row = document.createElement('tr');
            // Set up the basic row structure using innerHTML (excluding the conditional part)
            row.innerHTML = `
            <td>${member.memberId}</td>
            <td>${member.name}</td>
            <td>${member.phone}</td>
            <td>${member.address}</td>
            <td>${member.membershipType}</td>
            <td>${member.packageValue}</td>
            <td>${member.paymentRecivedAt[0]?.amount}</td>
            <td>${member.packageValue - member.paymentRecivedAt[0]?.amount}</td>
            
            ${(getStatus(new Date(member.endDate)) === 'Inactive') ? `<td><button class="renew-button" data-id="${member.memberId}" data-name="${member.name}" data-phone="${member.phone}" data-mongoid=${member._id} data-address="${member.address}">Renew</button></td>`:`<td><button class="active-button" data-id="${member.memberId}" data-name="${member.name}"disabled  data-phone="${member.phone}" data-address="${member.address}">Active  </button></td>
                    `}
                    <td class="myBtni" id=${`myBtn-${member._id}`}><input  data-member=${memberValue} id=${`member-${member._id}`}  value=${memberValue} type="hidden"><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg></td>
            `;
    // <td>${displayDateFormat(member.startDate)}</td>
                // <td>${displayDateFormat(member.endDate)}</td>
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

    var  modal = document.getElementById("myModal");
    renewalsTableBody.addEventListener('click', function(event) {
        // console.log(event.target.id.split())
        // console.log(event.target)
        const member_id=event.target.id.slice(6)
        // console.log(members);
     let selectedMember=null
     console.log();
     
        members.forEach(member=>{
            console.log(member._id === member_id );
            if(member._id === member_id ){ 
                  selectedMember=member
                  return
            }
        })
          console.log(selectedMember);
          
    
   
        

        if (event.target.classList.contains('myBtni')){
            const Modalbtn = event.target.id;
            let memberValue=document.getElementById(`member-${member_id}`)
            console.log(memberValue.dataset);
            document.getElementById("memberIdValue").innerText=selectedMember.memberId
            document.getElementById("memberNameValue").innerText=selectedMember.name
            document.getElementById("memberPhoneValue").innerText=selectedMember.phone
            document.getElementById("memberAddressValue").innerText=selectedMember.address
            document.getElementById("memberTypeValue").innerText=selectedMember.membershipType
            document.getElementById("memberPackageValue").innerText=selectedMember.packageValue
            document.getElementById("memberAmountPaidValue").innerText=selectedMember.paymentRecivedAt[0]?.amount
            document.getElementById("memberOutstandingValue").innerText=selectedMember.packageValue - selectedMember.paymentRecivedAt[0]?.amount
           
            console.log(modal,"modeeeeeeee")
            modal.style.display = "block";
    
        }
        if (event.target.classList.contains('renew-button')) {
            const memberId = event.target.dataset.id;
            const mongoid = event.target.dataset.mongoid;
            const name = event.target.dataset.name;
            const phone = event.target.dataset.phone;
            const address = event.target.dataset.address;
            window.location.href = `add_member.html?memberId=${memberId}&name=${encodeURIComponent(name)}&phone=${phone}&address=${encodeURIComponent(address)}&type=renew&id=${encodeURIComponent(mongoid)}`;
        }
    });
   
  

var span = document.getElementsByClassName("close")[0];


span.onclick = function() {
    
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

    populateYears();
    populateMonths();
    populateMemberType()
    populateTable(members);
});

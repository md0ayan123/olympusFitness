import { APIURL } from "./config";
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect input data
    const phoneNo = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Define the data to be sent
    const data = {
        phoneNo: phoneNo,
        password: password
    };

    // Define the API endpoint
    const apiEndpoint = `${APIURL}/user/login`;

    // Make the API call using fetch
    fetch(apiEndpoint, {
        method: 'POST', // Specify the request method
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify(data) // Convert the data to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response
    .then(result => {
        console.log('Success:', result); // Handle the result
        // You can add additional handling here, like redirecting the user or showing a message
        // window.location.pathname = "frontend/views/dashboard.html"
        if (result.success)
            {
                localStorage.setItem("user",JSON.stringify(result.result))
                localStorage.setItem("token",result.token)
                window.location.pathname = "frontend/views/dashboard.html"  
            }
        else{
            alert(result.msg)
        }
    })
    .catch(error => {
        console.error('Error:', error); // Handle the error
        // You can add additional error handling here, like showing an error message to the user
    });
});
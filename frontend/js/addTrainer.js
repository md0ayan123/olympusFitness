document.addEventListener('DOMContentLoaded', function() {
    const addTrainerForm = document.getElementById('addTrainerForm');
    const clearButton = document.getElementById('clearButton');
    
    addTrainerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const trainerData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        };

        // Display a success message
        alert('Trainer details have been successfully saved!');
        
        // Clear the form after submission
        addTrainerForm.reset();
    });

    clearButton.addEventListener('click', function() {
        addTrainerForm.reset();
    });
});

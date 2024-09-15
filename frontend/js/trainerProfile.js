document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const trainerId = urlParams.get('trainerId');

    // Sample data
    const trainers = [
        { id: 1, name: 'John Doe', phone: '1234567890', email: 'john@example.com', classes: ['Yoga', 'Pilates'], ptSessions: ['2024-01-10', '2024-01-15'] },
        { id: 2, name: 'Jane Smith', phone: '0987654321', email: 'jane@example.com', classes: ['HIIT', 'Zumba'], ptSessions: ['2024-01-12', '2024-01-20'] }
    ];

    const trainer = trainers.find(t => t.id == trainerId);

    if (trainer) {
        document.getElementById('trainerId').textContent = trainer.id;
        document.getElementById('trainerName').textContent = trainer.name;
        document.getElementById('trainerPhone').textContent = trainer.phone;
        document.getElementById('trainerEmail').textContent = trainer.email;

        const assignedClassesList = document.getElementById('assignedClassesList');
        trainer.classes.forEach(cls => {
            const li = document.createElement('li');
            li.textContent = cls;
            assignedClassesList.appendChild(li);
        });

        const ptSessionsList = document.getElementById('ptSessionsList');
        trainer.ptSessions.forEach(session => {
            const li = document.createElement('li');
            li.textContent = session;
            ptSessionsList.appendChild(li);
        });
    } else {
        alert('Trainer not found!');
    }
});

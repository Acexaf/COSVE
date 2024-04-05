// Function to start vulnerability scan with the provided URL
function startScan() {
    var urlInput = document.getElementById('urlInput').value;
    fetch('/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlInput }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to start scan');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('vulnerabilities').innerText = data.message;
    })
    .catch(error => {
        console.error('Error starting scan:', error);
        document.getElementById('vulnerabilities').innerText = 'Error starting scan. Please try again.';
    });
}

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.style.display = "block";
    result.style.color = "#007bff";
    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.style.color = "green";
            result.innerHTML = "Form submitted successfully!";
        } else {
            result.style.color = "red";
            result.innerHTML = json.message || "Submission failed!";
        }
    })
    .catch(error => {
        result.style.color = "red";
        result.innerHTML = "Something went wrong!";
    })
    .finally(function() {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 4000);
    });
});


function whatsappText(){
    const phoneNumber = "96171096971";
    const message = "Hello, I'm contacting you from Chedix.LB website.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
const handleSubmit = (event)  => {
    event.preventDefault();
    const url = document.getElementById('url').value;  
    const results = document.getElementById('results');
    console.log(url);
    if(Client.checkForUrl(url)) {
        const data = { url };
        const results = document.getElementById('results');
        results.classList.add('show');
        document.getElementById('header').innerHTML = '<p>Processing url...</p>';        
        fetch('/processLanguage', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => updateUI(response))    
        .catch(error => console.log('error', error));
    } else {
        alert ("Please enter a valid url");
    }
}

export { handleSubmit };

const updateUI = (data) => {  
    document.getElementById('header').innerHTML = "Analysis results";
    document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
    document.getElementById('agreement').innerHTML = `Agreement: ${data.agreement}`;
    document.getElementById('confidence').innerHTML = `Confidence: ${data.confidence}`;
    document.getElementById('irony').innerHTML = `Irony: ${data.irony}`;
}
  
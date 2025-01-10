/* Prevent page reload */
document.getElementById('url_form').addEventListener('submit', function(event) {
    event.preventDefault();
});

/* Copy URL to clipboard */
document.getElementById("copy_btn").addEventListener("click", () => {
    const inputElement = document.getElementById('newurl');
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(inputElement.value).then(function() {
        alert("Copied to clipboard!");
    }).catch(function(err) {
        alert("Error copying text: " + err);
    });
});

/* Send URL to server */
document.getElementById('fetch_btn').addEventListener('click', async (event) => {
    const url = document.getElementById('baseurl').value;
    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (!regex.test(url)) {
        window.alert("Invalid URL!");
        return;
    }

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ baseurl: url.replace(/^https?:\/\//, '') }),
        });

        const result = await response.json();
        if (result.status === "OK") {
            console.log("URL submitted successfully!");
            document.getElementById('newurl').value = result.newurl;

        } else {
            console.log("URL failed to submit.");
        }

    } catch (error) {
      console.error("Error submitting URL:", error);
    }
});
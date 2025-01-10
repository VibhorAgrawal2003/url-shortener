document.getElementById("copy_btn").addEventListener("click", () => {
    console.log("Copy clicked!");
});

document.getElementById('fetch_btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const url = document.getElementById('baseurl').value;

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ baseurl: url }),
        });

        const result = await response.json();
        console.log(result.status === "OK" 
            ? "URL submitted successfully!" 
            : "Failed to submit URL."
        )
    } catch (error) {
      console.error("Error submitting URL:", error);
    }
});
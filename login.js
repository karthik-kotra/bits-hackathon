document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageBox = document.getElementById("message"); // Message display box
    const loader = document.getElementById("loader"); // Loader animation

    // Show loader
    loader.style.display = "block";
    messageBox.style.display = "none";

    try {
        // Fetch student credentials from JSON
        const response = await fetch("students.json");
        const students = await response.json();

        // Simulate delay for buffer effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Check credentials
        const validUser = students.find(student => student.Email === email && student.Password === password);

        if (validUser) {
            messageBox.textContent = "✅ Login successful! Redirecting...";
            messageBox.style.color = "green";
            messageBox.style.display = "block";

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);
        } else {
            messageBox.textContent = "❌ Invalid credentials. Please try again.";
            messageBox.style.color = "red";
            messageBox.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching student data:", error);
        messageBox.textContent = "⚠ An error occurred. Please try again later.";
        messageBox.style.color = "orange";
        messageBox.style.display = "block";
    } finally {
        // Hide loader after login attempt
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }
});
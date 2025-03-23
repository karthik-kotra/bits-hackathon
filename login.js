document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageBox = document.getElementById("message");
    const loader = document.getElementById("loader");

    loader.style.display = "block";
    messageBox.style.display = "none";

    try {
        // Fetch CSV file
        const response = await fetch("orion_university_students.csv");
        const csvText = await response.text();

        // Parse CSV
        const students = csvToJSON(csvText);

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
        console.error("Error reading CSV:", error);
        messageBox.textContent = "⚠ An error occurred. Please try again later.";
        messageBox.style.color = "orange";
        messageBox.style.display = "block";
    } finally {
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }
});

// Function to convert CSV to JSON
function csvToJSON(csvText) {
    const rows = csvText.trim().split("\n"); // Split rows
    const headers = rows[0].split("\t"); // Split header columns by tabs
    const data = rows.slice(1).map(row => {
        const values = row.split("\t"); // Split row data by tabs
        let obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim() || ""; // Trim values and handle empty fields
        });
        return obj;
    });
    return data;
}

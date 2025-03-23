<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSV Login</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>
</head>
<body>

    <h2>Login</h2>
    <form id="loginForm">
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" required>
        <br><br>

        <button type="submit">Login</button>
    </form>

    <p id="message" style="display: none;"></p>
    <div id="loader" style="display: none;">Loading...</div>

    <script>
        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const messageBox = document.getElementById("message");
            const loader = document.getElementById("loader");

            // Show loader and hide message
            loader.style.display = "block";
            messageBox.style.display = "none";

            // Fetch and read CSV file
            fetch("orion_university_students.csv")
                .then(response => response.text())
                .then(csvText => {
                    // Parse CSV using PapaParse
                    Papa.parse(csvText, {
                        header: true,
                        skipEmptyLines: true,
                        complete: function (results) {
                            const students = results.data; // Array of student objects
                            checkCredentials(students, email, password);
                        }
                    });
                })
                .catch(error => {
                    console.error("Error reading CSV:", error);
                    messageBox.textContent = "⚠ Error loading data.";
                    messageBox.style.color = "orange";
                    messageBox.style.display = "block";
                })
                .finally(() => {
                    setTimeout(() => {
                        loader.style.display = "none";
                    }, 1000);
                });
        });

        // Function to check credentials
        function checkCredentials(students, email, password) {
            const messageBox = document.getElementById("message");

            const validUser = students.find(student => student.Email === email && student.Password === password);

            if (validUser) {
                messageBox.textContent = "✅ Login successful! Redirecting...";
                messageBox.style.color = "green";
                messageBox.style.display = "block";

                setTimeout(() => {
                    window.location.href = "home.html"; // Redirect on success
                }, 2000);
            } else {
                messageBox.textContent = "❌ Invalid credentials.";
                messageBox.style.color = "red";
                messageBox.style.display = "block";
            }
        }
    </script>

</body>
</html>

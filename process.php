<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get submitted information
    $name = trim($_POST["name"] ?? "");
    $department = trim($_POST["department"] ?? "");
    $phone = trim($_POST["userPhone"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $reason = trim($_POST["reason"] ?? "");

    // PHP validation
    $errors = [];

    // Check name
    if ($name == "") {
        $errors[] = "Full name is required.";
    }

    // Check department
    if ($department == "") {
        $errors[] = "Department is required.";
    }

    // Check phone
    if ($phone == "") {
        $errors[] = "Phone number is required.";
    }

    // Check email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please provide a valid email address.";
    }

    // Check reason
    if ($reason == "") {
        $errors[] = "Reason for joining is required.";
    }

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Registration Result</title>

    <link rel="stylesheet" href="styles.css">
</head>

<body>

<div class="result-container">

<?php

// If there are validation errors
if (count($errors) > 0) {

?>

    <div class="error-icon">✕</div>

    <h2>There Were Errors</h2>

    <p class="message">
        Please correct the following errors:
    </p>

    <ul class="error-list">

        <?php foreach ($errors as $error) { ?>

            <li>
                <?php echo htmlspecialchars($error); ?>
            </li>

        <?php } ?>

    </ul>

    <a href="index.html" class="button">
        Go Back
    </a>

<?php

} else {

    // ------------------------------------------------
    // SAVE DATA INTO DATABASE
    // ------------------------------------------------

    /*
     * IMPORTANT:
     * Your database column is "full_name",
     * NOT "name".
     */

    $stmt = $conn->prepare(
        "INSERT INTO members
        (full_name, department, phone, email, reason)
        VALUES (?, ?, ?, ?, ?)"
    );

    // Check if prepare() was successful
    if ($stmt === false) {

?>

        <div class="error-icon">✕</div>

        <h2>Database Error</h2>

        <p class="message">
            The registration could not be prepared.
        </p>

        <p>
            <?php echo htmlspecialchars($conn->error); ?>
        </p>

        <a href="index.html" class="button">
            Go Back
        </a>

<?php

    } else {

        // Bind the form values
        $stmt->bind_param(
            "sssss",
            $name,
            $department,
            $phone,
            $email,
            $reason
        );

        // Execute INSERT
        if ($stmt->execute()) {

?>

            <div class="success-icon">✓</div>

            <h1>Registration Successful!</h1>

            <p class="success-message">
                Thank you, <?php echo htmlspecialchars($name); ?>.
            </p>

            <p>
                Your registration has been received successfully.
            </p>

            <div class="details">

                <p>
                    <strong>Department:</strong>
                    <?php echo htmlspecialchars($department); ?>
                </p>

                <p>
                    <strong>Phone:</strong>
                    <?php echo htmlspecialchars($phone); ?>
                </p>

                <p>
                    <strong>Email:</strong>
                    <?php echo htmlspecialchars($email); ?>
                </p>

                <p>
                    <strong>Reason:</strong>
                    <?php echo htmlspecialchars($reason); ?>
                </p>

            </div>

            <a href="index.html" class="button">
                Return to Home Page
            </a>

<?php

        } else {

?>

            <div class="error-icon">✕</div>

            <h2>Database Error</h2>

            <p class="message">
                Your registration could not be saved.
            </p>

            <p>
                <?php echo htmlspecialchars($stmt->error); ?>
            </p>

            <a href="index.html" class="buttonn">
                Go Back
            </a>

<?php

        }

        // Close statement
        $stmt->close();
    }

    // Close database connection
    $conn->close();
}

?>

</div>

</body>
</html>

<?php

} else {

    echo "Invalid request.";

}

?>
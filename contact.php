<?php
if (isset($_POST["submit"])) {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    $from = 'Parax Contact Form <noreply@yourdomain.com>'; // Use a valid email
    $to = 'lehanpeddineni1@gmail.com'; 
    
    $body = "From: $name\nE-Mail: $email\nSubject: $subject\nMessage:\n$message";

    // Check if email is valid
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (mail($to, $subject, $body, "From: $from")) {
            header("Location: thank-you.html");
            exit();
        } else {
            die("Error sending email!");
        }
    } else {
        die("Invalid email address!");
    }
}
?>

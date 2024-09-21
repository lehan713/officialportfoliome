$(document).ready(function() {
    $('form#contact-form').submit(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Remove previous error messages
        $('form#contact-form .error').remove();
        var hasError = false;

        // Validate required fields
        $('.requiredField').each(function() {
            if ($.trim($(this).val()) == '') {
                var labelText = $(this).prev('label').text();
                $(this).parent().append('<span class="error">You forgot to enter your ' + labelText + '</span>');
                $(this).addClass('inputError');
                hasError = true;
            } else if ($(this).hasClass('email')) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var labelText = $(this).prev('label').text();
                    $(this).parent().append('<span class="error">You entered an invalid ' + labelText + '</span>');
                    $(this).addClass('inputError');
                    hasError = true;
                }
            }
        });

        // If no errors, proceed with AJAX submission
        if (!hasError) {
            $("#loader").show(); // Show loader
            $.ajax({
                url: "contact.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    // Show success message without hiding the form
                    $('form#contact-form').before('<div class="success">Thank you. Your email was sent successfully.</div>');
                    $("#loader").hide();
                    $('form#contact-form')[0].reset(); // Optionally reset the form fields
                },
                error: function() {
                    $('form#contact-form').before('<div class="error">An error occurred. Please try again.</div>');
                    $("#loader").hide();
                }
            });
        }
    });
});

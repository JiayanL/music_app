/* preparation before document loads */
$(document).ready(function () {
    var cookies_store = [];

    /* Prevent default behavior on form submission */
    $("form").on("submit", function (ev) {
        console.log("form clicked")
        ev.preventDefault();
        ev.stopPropagation();
    })

    /* Submission Workflow - cookies and validation */
    $(".signupbtn").click(function () {
        /* collect user info */
        const user_info = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#psw").val(),
            name: $("#name").val(),
            surname: $("#surname").val()
        };

        /* check if email exists in the cookie store */
        for (const cookie of cookies_store) {
            debugger;
            if (cookie.email == user_info.email) {
                alert("Unable to create an account. An Account with this email exists.");
                return;
            }
        }

        /* cookie is valid and prepare to submit all cookies */
        cookies_store.push(user_info);

        const new_cookies = JSON.stringify(cookies_store);

        const cookie = "cookie=" + new_cookies + ";";

        /* Submit all cookies */
        document.cookie = cookie;
        alert("Account created.");
    });

    /* Clear submission */
    $(".cancelbtn").click(function () {
        $("#username").val("");
        $("#email").val("");
        $("#psw").val("");
        $("#name").val("");
        $("#surname").val("");
    });
});
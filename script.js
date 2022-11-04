/* -------------------------------------------------------------------------- */
/*                              Cookie Functions                              */
/* -------------------------------------------------------------------------- */
/* Set cookie */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* Get cookie */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* -------------------------------------------------------------------------- */
/*                               Form Functions                               */
/* -------------------------------------------------------------------------- */

function validateSignUp() {
    let x = document.forms["signup"]["fname"];
    if (x == "") {
        // alert("Name must be filled out");
        return false;
    }
    return true;
}

/* -------------------------------------------------------------------------- */
/*                             Log in and log out                             */
/* -------------------------------------------------------------------------- */
// TODO: Still in progress
function logIn() {
    /* replace signup with profile picture */
    /* replace login with account */
    $("#right-header").text("Account");

}
/* -------------------------------------------------------------------------- */
/*                             Document Functions                             */
/* -------------------------------------------------------------------------- */

/* preparation before document loads */
$(document).ready(function () {
    /* Global variables for easier access */
    var cookies_store = [];

    /* Prevent default behavior on form submission */
    $("form").on("submit", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
    })

    /* -------------------------------------------------------------------------- */
    /*                              Sign up Functions                             */
    /* -------------------------------------------------------------------------- */

    /* Submission Workflow - cookies and validation */
    $(".signupbtn").click(function () {
        console.log("running through signup")
        /* collect user info */
        const user_info = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#psw").val(),
            name: $("#name").val(),
            surname: $("#surname").val()
        };

        /* validate form */
        if (!validateSignUp()) {
            alert("Form is incomplete")
            return false;
        };

        console.log("reached cookies")

        /* check if email exists in the cookie store */
        for (const cookie of cookies_store) {
            if (cookie.email == user_info.email) {
                alert("Unable to create an account. An Account with this email exists.");
                return false;
            }
        }


        /* cookie is valid and prepare to submit all cookies */
        cookies_store.push(user_info);

        cookie = JSON.stringify(user_info);

        /* Submit all cookies */
        // document.cookie = cookie;
        setCookie(user_info.email, cookie, 10);
        alert("Account created.");

        // /* send user to home */
        window.location.href = "/index.html";

    });

    /* Clear submission */
    $(".cancelbtn").click(function () {
        $("#username").val("");
        $("#email").val("");
        $("#psw").val("");
        $("#name").val("");
        $("#surname").val("");
    });

    /* -------------------------------------------------------------------------- */
    /*                              Login Functions                             */
    /* -------------------------------------------------------------------------- */

    /* Submit login form */
    $(".loginbtn").click(function () {
        /* assign info */
        let user = $("#lusername").val();
        let password = $("#lpsw").val();
        ind = false;
        /* check if email & matching psw exists in the cookie store */
        console.log(cookies_store);
        cookie = getCookie(user);

        if (cookie == "") {
            alert("User does not exist.");
            return false;
        }

        if (password !== JSON.parse(cookie).password) {
            alert("Incorrect password for selected user.");
            return false;
        }

        ind = true;
        setCookie("user", cookie, 10);

        alert(JSON.parse(cookie).username + " logged in successfully. Redirecting to homepage");
        window.location.href = "/index.html";
    });
});
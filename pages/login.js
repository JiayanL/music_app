const loginform = document.getElementById("loginform");


function verifylogin() {
    const user = loginform.username;
    const pw = loginform.password;
    let key = "Username=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let splitCookie = decodedCookie.split(';');
    for(let i = 0; i <splitCookie.length; i=i+2) {
        let currCookie = splitCookie[i];
        while (currCookie.charAt(0) == ' ') {
            currCookie = currCookie.substring(1);
        }
        if (currCookie.substring(key.length, currCookie.length) == user) {
            let nextCookie = ca[i+1];
            while (nextCookie.charAt(0) == ' ') {
                nextCookie = nextCookie.substring(1);
            }
            let password = nextCookie.substring(9,nextCookie.length);
            if (password == pw) {
                return true; // return to home page
            }
            else {
                alert("Invalid Username or Password")
                return false;
            }
        }
    }
}


function createaccount(user, pw) {
    validatesignup()    
    document.cookie = "Username=" + user + "; Password=" + pw;
}

function profileexists(user) {
    let key = "Username=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let splitCookie = decodedCookie.split(';');
    for(let i = 0; i <splitCookie.length; i=i+2) {
      let currCookie = splitCookie[i];
      while (currCookie.charAt(0) == ' ') {
        currCookie = currCookie.substring(1);
      }
      if (currCookie.substring(key.length, currCookie.length) == user) {
        return true;
        }
      }
      return false;
    }

function validatesignup() {
    let form = document.forms["Sign Up"];
    let x1 = form["Username"].value;
    if (x1 == "") {
        alert("Username must be filled out");
        return false;
    }
    let x2 = form["Password"].value;
    if (x2 == "") {
        alert("Password must be filled out");
        return false;
    }
    if (len(x2) > 8) {
        alert("Password may contain up to 8 characters");
        return false;
    }
    for (let k = 0; k < len(x2); k++) {
        let char = x2[k];
        let code = char.charCodeAt(0);
        if ((code < 58 && code > 47) || (code < 91 && code > 64) || (code < 123 && code > 96)) {
            alert("Password may contain only letters and numbers");
            return false;
        } 
    }
    let x3 = form["Name"].value;
    if (x3 == "") {
        alert("Name must be filled out");
        return false;
    }
    let x4 = form["Surname"].value;
    if (x4 == "") {
        alert("Surname must be filled out");
        return false;
    }
    let x5 = form["Email"].value;
    if (x5 == "") {
        alert("Email must be filled out");
        return false;
    }
    let indicator1 = 0
    let ind = 0
    for (let i = 0; i < len(x5); i++) {
        if (x5[i] == '@') {
            indicator1 = 1
            ind = i
        }
    }
    let indicator2 = 0
    if (indicator1 == 0) {
        alert("Email must contain @");
        return false;
    }
    for (let j = 0; j < len(x5); j++) {
        if (x5[j] == '.') {
            if (j > i) {
                indicator2 = 1
            }
        }
    }
    if (indicator2 == 0) {
        alert("Emma must contain domain and extension");
        return false;
    }
    let x6 = form["Date of Birth"].value;
    if (x6 == "") {
        alert("Date of Birth must be filled out");
        return false;
    }
}

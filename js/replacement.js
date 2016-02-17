document.addEventListener('DOMContentLoaded', replace);


function replace() {
    var u = "sfrieson";
        host = "gmail.com",
        email = document.querySelector('#email');

    email.attributes.href.nodeValue = (email.attributes.href.nodeValue)
            .replace(/__user__/, u).replace(/__host__/, host);

}

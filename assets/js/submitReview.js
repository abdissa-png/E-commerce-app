/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable @typescript-eslint/no-empty-function */
window.addEventListener("load", () => {
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
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
    const authCookie = getCookie('auth-cookie');
    const refreshCookie = getCookie('refresh-cookie');
    document.getElementById("form").addEventListener("submit", async function(e) {
        e.preventDefault();
        const data = getData(e.target);
        console.log(data);
        const response = await fetch("http://localhost:3000/api/v1/user/review", {
            method: "POST",
            body: JSON.stringify({
                name: data.name,
                number: data.number,
                message: data.message
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCookie}`
            }
        });

        if (response.status == 201) {
            window.location.href = "http://localhost:3000/user/review.html"
        } else {
            const error = await response.json();
            document.getElementById("errMsg").innerHTML = "";
            if (typeof error.message === "string") {
                text = document.createElement("p");
                text.className = "text-center";
                text.innerHTML = error.message;
                document.getElementById("errMsg").appendChild(text);
            } else {
                for (item in error.message) {
                    text = document.createElement("p");
                    text.className = "text-center";
                    text.innerHTML = error.message[item];
                    document.getElementById("errMsg").appendChild(text);
                }
            }
        }

        function getData(form) {
            var formData = new FormData(form);
            const data = Object.fromEntries(formData);
            return data;
        }

    })
})
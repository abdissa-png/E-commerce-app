/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable @typescript-eslint/no-empty-function */
window.addEventListener("load", () => {
    document.getElementById("form").addEventListener("submit", async function(e) {
        e.preventDefault();
        const data = getData(e.target);
        const response = await fetch("http://localhost:3000/api/v1/auth/signin", {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status == 200) {
            window.location.href = "http://localhost:3000/user/product.html"
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
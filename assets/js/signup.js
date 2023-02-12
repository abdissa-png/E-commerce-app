/* eslint-disable prettier/prettier */
window.addEventListener("load", () => {
    document.getElementById("form").addEventListener("submit", async function(e) {
        e.preventDefault();
        const data = getData(e.target);
        if (data.password == data.confirmPassword) {
            const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status == 201) {
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
        } else {
            document.getElementById("errMsg").innerHTML = "";
            error = document.createElement("p");
            error.className = "text-center";
            error.innerHTML = "Passwords donot match";
            document.getElementById("errMsg").appendChild(error);
        }

        function getData(form) {
            var formData = new FormData(form);
            const data = Object.fromEntries(formData);
            return data;
        }
    })
})
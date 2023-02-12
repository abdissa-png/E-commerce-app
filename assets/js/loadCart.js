/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
window.addEventListener('load', async() => {
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
    const response = await fetch("http://localhost:3000/api/v1/user/cart", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authCookie}`
        }
    });
    if (response.status == 200) {
        const data = await response.json();
        data.forEach(element => {
            row = document.createElement("tr");
            row.className = "table-row";
            imageData = document.createElement("td");
            image = document.createElement("img");
            image.className = "img-fluid rounded"
            image.width = 50;
            image.src = "../assets/img/" + element.image;
            image.alt = element.name;
            imageData.appendChild(image)
            productName = document.createElement("td");
            productName.innerHTML = element.name;
            productPrice = document.createElement("td");
            productPrice.innerHTML = element.discountedPrice ? element.discountedPrice + "$" : element.price + "$";
            productQuantity = document.createElement("td");
            productQuantity.innerHTML = element.quantity;
            row.appendChild(imageData);
            row.appendChild(productName);
            row.appendChild(productPrice);
            row.appendChild(productQuantity);
            document.getElementById("table").appendChild(row);
        })
    } else {
        window.location.href = "http://localhost:3000/login.html"
    }
});
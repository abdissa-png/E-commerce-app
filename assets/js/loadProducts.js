/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
window.addEventListener("load", async() => {

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
    const response = await fetch("http://localhost:3000/api/v1/products", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authCookie}`
        }
    });
    if (response.status == 200) {
        const data = await response.json();
        data.forEach(element => {
            var realPrice = element.price;
            var discountedPrice = element.discountedPrice;
            realPrice = parseFloat(realPrice);
            discountedPrice = parseFloat(discountedPrice);
            const discount = Math.round(((realPrice - discountedPrice) * 100) / realPrice);
            const outerDiv = document.createElement("div");
            outerDiv.className = "col-sm-6 col-md-4";
            const span = document.createElement("span");
            span.className = "m-2 text-info";
            span.innerHTML = `-${discount}%`;
            const imageDiv = document.createElement("div");
            imageDiv.className = "view overlay zoom";
            const img = document.createElement("img");
            img.className = "img-fluid rounded m-2";
            img.src = "../assets/img/" + element.image;
            img.width = 250;
            img.alt = element.name;
            const maskDiv = document.createElement("div");
            maskDiv.className = "mask";
            const cartButton = document.createElement("button");
            cartButton.className = "btn btn-warning m-2";
            cartButton.innerHTML = "Add To Cart";
            cartButton.onclick = async() => {
                const response = await fetch(`http://localhost:3000/api/v1/user/purchase/${element.id}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authCookie}`
                    }

                });
                if (response.status == 201) {
                    window.location.href = "http://localhost:3000/user/cart.html"
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            }
            const textDiv = document.createElement("div");
            textDiv.className = "text-secondary";
            const header = document.createElement("h3");
            header.className = "m-2";
            header.innerHTML = element.name;
            const infoDiv = document.createElement("div");
            infoDiv.className = "text-info";
            infoDiv.innerHTML = "$" + element.discountedPrice;
            const del = document.createElement("del");
            del.className = "text-secondary";
            del.innerHTML = "$" + element.price;
            infoDiv.appendChild(del);
            textDiv.appendChild(header);
            textDiv.appendChild(infoDiv);
            maskDiv.appendChild(cartButton);
            imageDiv.appendChild(img);
            imageDiv.appendChild(maskDiv);
            outerDiv.appendChild(span);
            outerDiv.appendChild(imageDiv);
            outerDiv.appendChild(textDiv);
            document.getElementById("container").appendChild(outerDiv);
        })
    } else {
        window.location.href = "http://localhost:3000/login.html"
    }
});
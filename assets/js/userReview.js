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
    const response = await fetch("http://localhost:3000/api/v1/user/reviews", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authCookie}`
        }
    });
    if (response.status == 200) {
        const data = await response.json();
        data.forEach((element) => {
            firstDiv = document.createElement("div");
            firstDiv.className = "col-md-4 col-sm-6 mb-2";
            secondDiv = document.createElement("div");
            secondDiv.className = "card text-center bg-dark"
            secondDiv.style.boxShadow = "0 .5rem .5rem rgba(0,0,0,1)";
            thirdDiv = document.createElement("div");
            thirdDiv.className = "main-text";
            header = document.createElement("h2");
            paragraph = document.createElement("p");
            header.innerHTML = element.name;
            paragraph.innerHTML = element.message;
            thirdDiv.appendChild(header);
            thirdDiv.appendChild(paragraph);
            fourthDiv = document.createElement("div");
            editButton = document.createElement("button");
            editButton.className = "btn btn-info m-5 px-3";
            editButton.innerHTML = "Edit";
            editButton.onclick = async() => {
                window.location.href = `http://localhost:3000/user/updateReview.html?id=${element.id}`;
            }
            deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-info m-5 px-3";
            deleteButton.onclick = async() => {
                const response = confirm("Are you sure you want to delete this review ?");
                if (response) {
                    const response = await fetch(`http://localhost:3000/api/v1/user/review/${element.id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authCookie}`
                        }
                    });
                    if (response.status == 200) {
                        window.location.href = `http://localhost:3000/user/review.html`;
                    } else {
                        alert("An error has occurred");
                    }
                }
            }
            deleteIcon = document.createElement("i");
            deleteIcon.className = "fa fa-solid fa-trash";
            deleteIcon.innerHTML = "Delete";
            deleteButton.appendChild(deleteIcon);
            fourthDiv.appendChild(editButton);
            fourthDiv.appendChild(deleteButton);
            secondDiv.appendChild(thirdDiv);
            secondDiv.appendChild(fourthDiv);
            firstDiv.appendChild(secondDiv);
            document.getElementById("container").appendChild(firstDiv);
        });
    } else {
        window.location.href = "http://localhost:3000/login.html"
    }

})
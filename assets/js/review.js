/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
window.addEventListener("load", async() => {
    const response = await fetch("http://localhost:3000/api/v1/reviews", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
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
        secondDiv.appendChild(thirdDiv);
        firstDiv.appendChild(secondDiv);
        document.getElementById("container").appendChild(firstDiv);
    });
});
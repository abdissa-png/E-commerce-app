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
    document.getElementById("logout").onclick = async() => {
        const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authCookie}`
            }
        });
        if (response.status == 200) {
            document.cookie = "auth-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "refresh-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "http://localhost:3000/"
        } else {
            alert("A problem ocurred during logging out");
        }
    }
})
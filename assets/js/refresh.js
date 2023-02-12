/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
window.addEventListener('unload', async() => {
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
    const response = await fetch("localhost:3000/api/v1/auth/refresh", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshCookie}`
        }
    })
});
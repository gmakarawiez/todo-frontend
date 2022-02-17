export const tokenCookies = ['access_token', 'refresh_token'];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export class Cookies {

    static #path = "/";

    static async create(key, value, expires_in = 4*60*1000){
        const expiration_date = new Date(Date.now()+expires_in).toUTCString();
        document.cookie = key + "=" + value + ";expires=" + expiration_date +";path=" + Cookies.#path;
        await sleep(100);
    }

    static get(key){
        let name = key + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static async set(key, value, expires_in = 4*60*1000) {
        const expiration_date = new Date(Date.now()+expires_in).toUTCString();
        document.cookie = key + "=" + value + ";expires=" + expiration_date +";path=" + Cookies.#path;
        await sleep(100);
    }

    static async remove(key){
        const expiration_date = new Date(Date.now()-(5*60*1000)).toUTCString(); // has expired since 5 min
        document.cookie = key + "=;expires=" + expiration_date +";path=" + Cookies.#path;
        await sleep(100);
    }

}


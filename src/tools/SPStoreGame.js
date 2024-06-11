let instance,
    cookies,
    config,
    currencyCode,
    gameinfo;

const USERCOOKIE = '__SPGP-USER-SESSION'

const getLocale = (code)=>{
    switch (code) {
        case 'PHP':
            return 'en-PH'
        case 'USD':
            return 'en-US'
        default:
            return 'en-PH'
    }
}

class SPStoreGame{
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }

    getUserCookie(){
        return USERCOOKIE;
    }

    setConfig(d){
        config = d;
    }

    getConfig(){
        return config;
    }

    setVC(c){
        cookies = c;
    }

    setCurrency(c){
        currencyCode = c;
    }

    getCurrencyCode(){
        return currencyCode
    }

    getVC(){
        return cookies;
    }

    setGameInfo(d){
        gameinfo = d;
    }

    getGameInfo(){
        return gameinfo;
    }

    setCookie(s, d){
        if(!cookies) return;
        cookies.set(s, d)
    }

    getCookie(s){        
        if(!cookies) return;
        return (cookies.get(s));
    }

    removeCookie(s){
        if(!cookies) return;
        cookies.remove(s);
    }

    isKey(s){
        if(!cookies) return false;
        return (cookies.isKey(s));
    }

    getLocalAmount(amt){
        const mony = parseFloat(amt),
            ccode = currencyCode ? currencyCode : 'PHP',
            locale = getLocale(ccode);
        return mony.toLocaleString(locale, {
            style: 'currency',
            currency: ccode,
            minimumFractionDigits: Math.ceil(mony % 1) * 2
        })
    }

}

export default new SPStoreGame();
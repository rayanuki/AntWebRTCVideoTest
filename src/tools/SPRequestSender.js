import NlHttpSender from "./NlHttpSender";

let instance,
    sourceUrl = '',
    creds = null;

// TODO: Place on config file
const MAIN_URL = "https://t9-devserv.gnstg.net/SpinPlusAPI";

const getHeader = (hasAuth = false, notJson = false)=>{
    let h = {
        'Content-type' : notJson == true ? 'application/x-www-form-urlencoded': 'application/json',
        'Licensee'     :  creds ? creds.licenseID : '',
    };
    if(hasAuth == true){
        h['Authorization'] = creds ? 'Bearer ' + creds.token : '';
    }
    return h;
}

const credError = (fn)=>{
    const data = {
        'code': 403001,
        'message' : 'Invalid token'
    }
    if(fn) fn(data); 
}

class SPRequestSender{
    constructor(){
        if(!instance){
            instance = this;
        }
        sourceUrl = MAIN_URL;
        return instance;
    }

    setUrlSource(s){
        sourceUrl = s;
    }

    setCredentials(d){
        creds = d;
    }

    decodeJWT(token){
        const [headerEncoded, payloadEncoded] = token.split('.');
    
        try {
            const header = JSON.parse(atob(headerEncoded));
            const payload = JSON.parse(atob(payloadEncoded));
    
            return { header, payload };
        } catch (error) {
            console.error('Error decoding JWT:', error);
            cookies.remove(USERCOOKIE);
            router.push({name:'error'});
            return null;
        }
    }

    async postPlaceBet(d, fn){
        if(creds == null) {credError(fn); return;} ///player/{playerID}/spin-bet
        // let params = '?betType=' + d.betType + '&betAmount=' + d.betAmount + '&pickNo=' +d.pickNo;
        NlHttpSender.sendHttpPost(sourceUrl + '/player/' + creds.playerID + '/spin-bet', null, getHeader(true), d, (dat)=>{
            if(fn) fn(dat);
        });
    }

    async postPlayerTip(d, fn){
        if(creds == null) {credError(fn); return;} ///player/{playerID}/spin-bet
        NlHttpSender.sendHttpPost(sourceUrl + '/player/' + creds.playerID + '/tip', null, getHeader(true), d, (dat)=>{
            if(fn) fn(dat);
        });
    }

    // 

    async getPlayerProfile(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/player/' + creds.playerID, null, getHeader(true), null, (d)=>{
            if(fn) fn(d);
        });
    }

    async getBalance(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/player/' + creds.playerID + '/balance', null, getHeader(true), null, (d)=>{
            if(fn) fn(d);
        });
    }

    async getPlayerAvatar(fn){
        if(creds == null) {credError(fn); return;}
        
    }

    async getNotice(params, fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/player/' + creds.playerID + '/notices', params, getHeader(true), null, (d)=>{
            if(fn) fn(d);
        });
    }

    async getCreditTransactions(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/player/' + creds.playerID + '/credit-transactions', null, getHeader(true), null, (d)=>{
            if(fn) fn(d);
        });
        
    }

    async getBetHistory(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/player/' + creds.playerID + '/bet-history', null, getHeader(true), null, (d)=>{
            if(fn) fn(d);
        });
    }

    async getConfig(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/site/config', null, getHeader(false), null, (d)=>{
            if(fn) fn(d);
        });

    }

    async getPendingWithdraw(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/player/' + creds.playerID + '/pending-withdrawals', null, getHeader(true), null, (d)=>{
            if(fn) fn(d);
        });

    }

    async getStreamToken(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/site/stream-token', null, getHeader(false), null, (d)=>{
            if(fn) fn(d);
        });

    }

    async getStatistics(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/site/wheel-stats', null, getHeader(false), null, (d)=>{
            if(fn) fn(d);
        });
    }

    async getLeaderBoards(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/site/leaderboard', null, getHeader(false), null, (d)=>{
            if(fn) fn(d);
        });

    }

    async getWheelStats(fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/site/wheel-stats', null, getHeader(false), null, (d)=>{
            if(fn) fn(d);
        });


    }

    async getGameInfo(params, fn){
        if(creds == null) {credError(fn); return;}
        NlHttpSender.sendHttpGet(sourceUrl + '/player/' + creds.playerID + '/game-info', params, getHeader(true), null, (d)=>{
            if(fn) fn(d);
        });

    }

    checkDevice() {
        let isAndroid = function () {
                return navigator.userAgent.match(/Android/i);
            },
            isBlackBerry = function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            isIOS = function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            isOpera = function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            isWindows = function () {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
            },
            isIPadOS = function(){
                let isIpad = /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
                return isIpad == true ? 'iPad' : null;
            };
        return (isAndroid() || isBlackBerry() || isIOS() || isOpera() || isWindows() || isIPadOS());
    }

    checkBrowser() {
        let ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) return 'Opera ' + tem[1];
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }
}

export default new SPRequestSender;
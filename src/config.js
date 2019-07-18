(function() {
    const ACCOUNT_ID = 'sushi'; /* TODO: fill this in! */
    const DEFAULT_ENV = 'local';
    const APP_NAME = "Crypto Corgis";

    function getConfig(env) {
        switch (env) {
            case 'production':
            case 'development':
                return {
                    nodeUrl: 'https://rpc.nearprotocol.com',
                    helperUrl: 'https://near-contract-helper.onrender.com',
                    contractName: ACCOUNT_ID,
                    appName: APP_NAME
                };
            case 'local':
            case 'test':
                return {
                    nodeUrl: 'http://localhost:3030',
                    contractName: ACCOUNT_ID,
                    appName: APP_NAME
                };
            default:
                throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
        }
    }

    const cookieConfig = typeof Cookies != 'undefined' && Cookies.getJSON('fiddleConfig');
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = getConfig;
    } else {
        window.nearConfig =  cookieConfig && cookieConfig.nearPages ? cookieConfig : getConfig(DEFAULT_ENV);
    }
})();

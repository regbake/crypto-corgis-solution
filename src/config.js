(function() {
    const CONTRACT_NAME = 'crypto-corgis'; /* TODO: fill this in! */
    const DEFAULT_ENV = 'development'; /* TODO: fill this */

    function getConfig(env) {
        switch (env) {
            case 'production':
            case 'development':
                return {
                    networkId: 'default',
                    nodeUrl: 'https://rpc.nearprotocol.com',
                    contractName: CONTRACT_NAME,
                    walletUrl: 'https://wallet.nearprotocol.com',
                    initialBalance: 100000000,
                };
            case 'local':
                return {
                    networkId: 'local',
                    nodeUrl: 'http://localhost:3030',
                    walletUrl: 'http://localhost:3000',
                    contractName: CONTRACT_NAME,
                    initialBalance: 100000000,
                };
            case 'test':
                return {
                    networkId: 'local',
                    nodeUrl: 'http://localhost:3030',
                    contractName: CONTRACT_NAME,
                    masterAccount: 'test.near',
                    initialBalance: 100000000,
                };
            case 'test-remote':
            case 'ci':
                return {
                    networkId: 'shared-test',
                    nodeUrl: 'http://shared-test.nearprotocol.com:3030',
                    contractName: CONTRACT_NAME,
                    masterAccount: 'test.near',
                    initialBalance: 100000000,
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

// Local environment:
// nearcore + cmake + protobuf + rustup + openssl
// python ./scripts/start_localnet.py --local
// NODE_ENV=local npm run start
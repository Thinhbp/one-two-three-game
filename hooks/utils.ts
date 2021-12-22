import CryptoJS from 'crypto-js';

const showAddress = (address: string) => `${address.slice(0, 6)}... ${address.slice(address.length - 4, address.length)}`

const sha256 = (str: string) => {
    const hash = CryptoJS.SHA256(str);
    const result = '0x' + hash.toString();
    return result
}

export {
    showAddress,
    sha256,
}
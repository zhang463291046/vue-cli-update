import GibberishAES from '../plugins/gibberish-aes';
import { AESKEY } from './config';

const encrypt = (message) => GibberishAES.aesEncrypt(message, AESKEY).trim();

const decrypt = (message) => GibberishAES.aesDecrypt(message, AESKEY).trim();

export {
  encrypt,
  decrypt
};

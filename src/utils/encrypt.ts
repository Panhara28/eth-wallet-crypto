import CryptoJs from 'crypto-js';

export const encryptData = (data: any, password: any) => {
  return CryptoJs.AES.encrypt(JSON.stringify(data), password).toString();
}

export const decryptData = (encryptedSeedPhrase: any, password: any) => {
  try {
    const bytes = CryptoJs.AES.decrypt(encryptedSeedPhrase, password);
    const originalText = bytes.toString(CryptoJs.enc.Utf8);

    if (originalText) {
      return originalText;
    } else {
      throw new Error('Decryption failed');
    }
  } catch (error) {
    console.error('Error decrypting seed phrase:', error);
    throw new Error('Invalid password or corrupted seed phrase');
  }
};
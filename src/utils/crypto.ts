import { ethers } from 'ethers';

export const getAddressFromSeedPhrase = (seedPhrase: string) => {
  try {
    // Create a wallet instance from the seed phrase
    const wallet = ethers.Wallet.fromPhrase(seedPhrase);
    
    // Return the address
    return wallet.address;
  } catch (error) {
    console.error('Error deriving address from seed phrase:', error);
    throw new Error('Invalid seed phrase');
  }
};
import bs58 from 'bs58';

function toED25519(key) {
  return `${bs58.encode(Buffer.from(key))}`;
}

export const getSignature = async (keyPair, token) => {
  const msg = Buffer.from(token);
  const { signature } = keyPair.sign(msg);
  return toED25519(signature);
};

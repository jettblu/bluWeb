import crypto from "crypto";

const algo: string = "aes-256-gcm";

export function encryptTextIv(text: string): {
  ciphertext: string;
  ivString: string;
} {
  const pword: string | undefined = process.env.EVENT_KEY;
  if (!pword) {
    throw new Error("Encryption secret not available.");
  }
  const key = Buffer.from(pword, "hex");
  // create iv and cipher object
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algo, key, iv);
  // encrypt text and save as hex string
  const ciphertextBuffer = cipher.update(text);
  const ciphertext: string = ciphertextBuffer.toString("hex");
  const ivText: string = iv.toString("hex");
  return { ciphertext: ciphertext, ivString: ivText };
}

export function decryptTextIv(
  ciphertext: string,
  ivString: string
): { plaintext: string } {
  const pword: string | undefined = process.env.EVENT_KEY;
  if (!pword) {
    throw new Error("Encryption secret not available.");
  }
  // transform text, pword, and iv into buffers
  const iv = Buffer.from(ivString, "hex");
  const encryptedBuffer = Buffer.from(ciphertext, "hex");
  const key = Buffer.from(pword, "hex");
  const decipher = crypto.createDecipheriv(algo, key, iv);
  // decipher message
  const plaintextBuffer: Buffer = decipher.update(encryptedBuffer);
  // save as readable string
  const plaintext: string = plaintextBuffer.toString();
  return { plaintext: plaintext };
}

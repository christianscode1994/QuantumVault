// Mock KEM for demo purposes only.
// Provides deterministic-like encapsulation primitives for UI flow.

export type KemResult = {
  ciphertext: string; // hex
  sharedSecret: string; // hex
};

function toHex(buffer: Uint8Array): string {
  return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
}

function randomHex(len = 32): string {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return toHex(arr);
}

// encapsulate: returns a mock ciphertext and sharedSecret
export async function encapsulate(): Promise<KemResult> {
  // In a real KEM, ciphertext and sharedSecret are derived deterministically.
  // For the demo we generate ephemeral values to exercise the UI flow.
  const ciphertext = randomHex(48);
  const sharedSecret = randomHex(32);
  return { ciphertext, sharedSecret };
}

// decapsulate: given ciphertext, returns the same sharedSecret for demo
// In this mock, we can't recover the original secret without state, so we simulate by deriving a pseudo-secret from ciphertext.
export async function decapsulate(ciphertext: string): Promise<string> {
  // Derive a pseudo shared secret from ciphertext for deterministic demo verification.
  // This is NOT secure and only for UI demo purposes.
  // Simple hash-like operation using subtle crypto:
  const encoder = new TextEncoder();
  const data = encoder.encode(ciphertext);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return toHex(new Uint8Array(digest)).slice(0, 64);
}

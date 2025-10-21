// Shamir secret sharing wrapper using secrets.js-grempe
import secrets from "secrets.js-grempe";

export function splitSecret(hexSecret: string, shares: number, threshold: number): string[] {
  // secrets.js expects hex strings without 0x and prefers even length
  const clean = hexSecret.replace(/^0x/, "");
  // pad if needed
  const padded = clean.length % 2 ? "0" + clean : clean;
  // share creation
  return secrets.share(padded, shares, threshold);
}

export function combineShares(shares: string[]): string {
  const recovered = secrets.combine(shares);
  return recovered;
}

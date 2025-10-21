import React, { useState } from "react";
import { encapsulate, decapsulate, splitSecret, combineShares } from "quantumvault-sdk";

function hexShort(h: string) {
  return h.slice(0, 8) + "..." + h.slice(-8);
}

export default function App(): JSX.Element {
  const [ciphertext, setCiphertext] = useState<string>("");
  const [sharedSecret, setSharedSecret] = useState<string>("");
  const [shares, setShares] = useState<string[]>([]);
  const [recovered, setRecovered] = useState<string>("");
  const [threshold, setThreshold] = useState<number>(2);
  const [shareCount, setShareCount] = useState<number>(3);
  const [message, setMessage] = useState<string>("");

  async function onGenerate() {
    setMessage("Generating encapsulation...");
    const res = await encapsulate();
    setCiphertext(res.ciphertext);
    setSharedSecret(res.sharedSecret);
    setShares([]);
    setRecovered("");
    setMessage("Encapsulation generated.");
  }

  function onSplit() {
    if (!sharedSecret) {
      setMessage("No shared secret to split. Generate first.");
      return;
    }
    try {
      const s = splitSecret(sharedSecret, shareCount, threshold);
      setShares(s);
      setRecovered("");
      setMessage(`Split into ${s.length} shares with threshold ${threshold}.`);
    } catch (e: any) {
      setMessage("Failed to split secret: " + e?.message);
    }
  }

  function onCombine(selected: number[]) {
    try {
      const selShares = selected.map(i => shares[i]);
      const combined = combineShares(selShares);
      setRecovered(combined);
      setMessage("Recombined shares.");
    } catch (e: any) {
      setMessage("Failed to combine shares: " + e?.message);
    }
  }

  async function onVerify() {
    if (!ciphertext) {
      setMessage("No ciphertext to decapsulate; generate first.");
      return;
    }
    const decap = await decapsulate(ciphertext);
    const ok = decap.slice(0, recovered.length) === recovered || decap === recovered;
    setMessage(ok ? "Verification SUCCESS: recovered secret matches derived secret." : "Verification FAILED: mismatch.");
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>QuantumVault — Demo</h1>
        <div style={{ color: "#b71c1c", fontWeight: 700 }}>Hackathon demo — unaudited — do not use with real funds</div>
      </header>

      <section style={{ marginTop: 20 }}>
        <button onClick={onGenerate}>Generate KEM encapsulation</button>
        <div style={{ marginTop: 10 }}>
          <strong>Ciphertext:</strong> {ciphertext ? hexShort(ciphertext) : "—"}
        </div>
        <div>
          <strong>Shared secret:</strong> {sharedSecret ? hexShort(sharedSecret) : "—"}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Shamir split</h3>
        <div>
          <label>Share count: </label>
          <input type="number" min={2} max={10} value={shareCount} onChange={e => setShareCount(Math.max(2, Math.min(10, Number(e.target.value))))} />
          <label style={{ marginLeft: 10 }}>Threshold: </label>
          <input type="number" min={2} max={10} value={threshold} onChange={e => setThreshold(Math.max(2, Math.min(shareCount, Number(e.target.value))))} />
          <button onClick={onSplit} style={{ marginLeft: 10 }}>Split</button>
        </div>
        <div style={{ marginTop: 10 }}>
          <strong>Shares:</strong>
          <ul>
            {shares.map((s, i) => (
              <li key={i}><code>{s.slice(0, 16)}…</code></li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Recombine</h3>
        <RecombineControl shares={shares} onCombine={onCombine} />
        <div style={{ marginTop: 10 }}>
          <strong>Recovered:</strong> {recovered ? recovered.slice(0, 24) + "…" : "—"}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <button onClick={onVerify}>Verify Recovered vs Decapsulated</button>
      </section>

      <footer style={{ marginTop: 24, color: "#555" }}>
        <div>{message}</div>
      </footer>
    </div>
  );
}

function RecombineControl({ shares, onCombine }: { shares: string[]; onCombine: (selected: number[]) => void }) {
  const [selected, setSelected] = useState<Record<number, boolean>>({});

  function toggle(i: number) {
    setSelected(prev => ({ ...prev, [i]: !prev[i] }));
  }

  function doCombine() {
    const indices = Object.entries(selected).filter(([_, v]) => v).map(([k]) => Number(k));
    onCombine(indices);
  }

  return (
    <div>
      <div>
        {shares.length === 0 && <div>No shares yet</div>}
        {shares.map((s, i) => (
          <div key={i}>
            <label>
              <input type="checkbox" checked={!!selected[i]} onChange={() => toggle(i)} />
              <code style={{ marginLeft: 8 }}>{s.slice(0, 24)}…</code>
            </label>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={doCombine}>Combine selected</button>
      </div>
    </div>
  );
}

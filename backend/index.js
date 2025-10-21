// Minimal stateless demo API to accept ephemeral share POSTs. Not persisted.
// Do NOT store real secrets. This is for demo-only.

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("QuantumVault demo backend"));

app.post("/api/collect", (req, res) => {
  const { share } = req.body;
  if (!share) return res.status(400).json({ error: "share missing" });
  // For demo, echo back and pretend we stored it.
  return res.json({ status: "ok", echo: share });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Demo backend listening on ${port}`));

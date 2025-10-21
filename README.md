# QuantumVault

**Quantum-safe social wallet recovery** — lattice KEM, M-of-N threshold MPC social recovery, and Cellframe conditional transactions.

## Summary
QuantumVault is a quantum-safe wallet recovery prototype. It lets users encapsulate secrets using lattice-based KEM, split them among trusted contacts via threshold MPC, and automate recovery using Cellframe smart contracts. Designed for resilience, modularity, and post-quantum security — all wrapped in a frictionless demo UI.

This repository was created with assistance from Copilot and developed as an experimental project for the Taikai Quantum Safe Hackathon.

## Key Features
- **Quantum-Safe Cryptography**: Lattice-based KEM to resist classical and quantum attacks.  
- **Social Recovery M-of-N MPC**: Distribute key shares among trusted contacts; any M of N reconstruct the private key via threshold MPC.  
- **Conditional Transactions**: Cellframe contracts automate key-share aggregation and recovery flows.  
- **Frictionless UX**: Crypto complexity hidden behind simple recovery flows for demo purposes.

## Intended Use
- Prototype and research only.  
- Demonstrates concepts and proof-of-technology for hackathon / demo scenarios.  
- Not intended to hold, manage, or transfer real funds.

## Security and Legal Notice
- **Experimental and Unaudited**: This project is a hackathon prototype and has not been security audited. Do not use for production, real assets, or critical keys.  
- **No Warranty**: Provided as-is under the MIT License. The authors disclaim all warranties and liability.  
- **Patent and Export Risk**: Some cryptographic techniques may be covered by patents or export regulations. Do not assume freedom to operate; consult legal counsel before production use.  
- **Do Not Use With Real Funds**: All demos should run against testnets or simulated environments only.

## AI Assistance and Provenance
- Portions of this repository were generated or assisted by Copilot. All Copilot-generated outputs were reviewed, edited, and curated by the project maintainers. See AI_USAGE.md for a tracked list of generated files and human reviewers.

## Quick Start
1. Clone this repo.  
2. Install SDK dependencies: `cd sdk && npm ci`.  
3. Run unit tests: `npm test`.  
4. Build SDK: `npm run build`.  
5. Run contract tests in `contracts/` on a local testnet or emulator.  
6. Start demo UI in `apps/web-ui` using the included dev script.

## Contributing
- This repo uses conventional commits.  
- Open PRs for features and fixes. Include unit tests for crypto logic and document security implications.  
- See CONTRIBUTING.md for the full contribution and disclosure policy.

## Security Disclosure
If you discover a security vulnerability, see SECURITY.md for a private disclosure process. High-severity reports will be triaged and addressed before merging related changes.

## License
MIT License. See LICENSE file.

## Attribution
Created as an experimental hackathon project for the Taikai Quantum Safe Hackathon with assistance from Copilot and maintained by the project authors.

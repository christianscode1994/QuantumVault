# Threat Model (summary)

Scope
- Threat model covers demo misuse, disclosure of secrets, and dependency compromise.

Threats
- User uploads real secret data -> risk of leakage. Mitigation: UI disclaimer and client-only ephemeral handling.
- Dependency compromise (npm packages) -> mitigation: pin versions and audit.
- Misinterpretation as production-ready crypto -> mitigation: disclaimers, SECURITY.md, and AI_USAGE.md.

Assumptions
- Demo runs in browser with ephemeral memory. No server-side persistence unless user deploys backend intentionally.

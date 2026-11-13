# FN Squad privacy review — 13 November 2026

## Result
Public notice improved; operational compliance is not established. This is a source-based applicability screening, not legal advice, regulator approval, ISO certification, or a complete statutory audit.

## Evidence inspected
Homepage, Community, FN SMP, FreakyNews, Privacy, shared CSS, app.js, feed.js and site-config.js at commit 90a0b7c4b082df5328e354c54a8c9b54452d3ba7. Private moderator accounts, server configuration, hosting contracts and incident records were not accessible.

Observed browser storage: fn-theme localStorage. Search/filter code operates locally. No analytics, advertising SDK, social embed, upload form or registration flow was found in the inspected site code. GitHub Pages independently logs IP addresses for security. These findings do not establish platform-side practices or prove absence of processing in staff tools.

## Implemented
- Replaced letter placeholders with recognizable SVG platform marks; embedded locally without icon-CDN requests.
- Updated English and Malay notice, source-review date and readable responsive navigation.
- Explained groups versus channels, possible phone-number visibility, providers, overseas processing, requests and complaints.
- Distinguished JPDP personal-data jurisdiction from MCMC communications/multimedia complaints.
- Removed outdated statements excluding the US, Canada and China from review.
- Replaced implied standards assessment with clearly limited ISO reference language.
- Preserved source links and anchors /privacy/#reports, /privacy/#standards and /privacy/#bm.
- No fabricated email, named DPO, retention period, consent history, encryption claim, audit or certification.

## Required owner decisions and operational checks
| Priority | Open item | Action / evidence needed |
| --- | --- | --- |
| High | Responsible operator and contact | Identify the actual person/entity deciding processing purposes. Publish a monitored privacy email or equivalent accessible route, responsible role and legally required contact details. Do not publish personal home details casually. Existing Discord route requires a platform account and is not an adequate substitute in every jurisdiction. |
| High | Data inventory and purposes | Inventory reports, WhatsApp membership, Discord moderation/bots, Minecraft logs, whitelists, backups, news submissions and social DMs; record sources, purposes, recipients, storage and lawful grounds. |
| High | Retention | Approve periods for each category and documented exceptions for appeals/legal holds; implement deletion and backup expiry. Do not publish a 30/90-day promise until staff can meet it. |
| High | Staff access/security | Check permissions, MFA, device security, export practices, staff removal, incident handling and who can view evidence. Publish only verified safeguards. |
| High | Rights requests | Establish identity checks, request log, jurisdiction-specific response deadlines, exceptions and escalation. Do not demand identity cards by default. |
| High | Malaysia scope | Assess commercial activities including monetisation, donations/perks and services against Act 709. If in scope, complete bilingual notice requirements, legal grounds, disclosure, retention, security and access requirements. |
| High | Breach response | Assign incident ownership and assess JPDP reporting criteria and timeframes under current guidance; do not assume every incident has the same worldwide notification rule. |
| High | Transfers | Identify actual recipients/countries and the applicable transfer condition or safeguard. Provider privacy links alone do not validate FN Squad transfers. |
| Medium | DPO | Assess JPDP appointment criteria: over 20,000 data subjects; over 10,000 with sensitive/financial information; or regular and systematic monitoring. Do not name a moderator as a statutory DPO without assessing the role. |
| Medium | Children | Check actual audience, platform age requirements, safeguarding and collection about minors. COPPA is not automatically satisfied by an age statement; China treats under-14 information as sensitive if its law applies. |
| Medium | International scope | Record actual establishments, audiences targeted, monitoring, commercial activity, thresholds and relevant local connections. Reassess before expansion. |
| Medium | ISO | Consider ISO/IEC 27701:2025 and 27001:2022 as management-system references. Full conformity requires controls and evidence beyond this notice. |
| Medium | Future tracking | Reassess notice and consent before analytics, embeds or ads. Do not introduce a decorative consent banner disconnected from actual storage behaviour. |

## Jurisdiction screening
- **Malaysia:** The PDPA regulates personal-data processing connected with commercial transactions. Whether particular FN Squad activities fall within it requires an assessment of those activities. The amended Act, notice requirements, security, retention, transfer, breach-notification and DPO rules must be considered where applicable.
- **MCMC / SKMM:** MCMC is the communications and multimedia regulator. Its complaints route is separate from the Personal Data Protection Commissioner’s route for PDPA matters. Linking to MCMC is not registration, approval or certification.
- **ASEAN:** Regional personal-data and governance frameworks provide guidance; they are not a single ASEAN privacy law or certification. National laws must still be assessed.
- **EU:** GDPR can apply through an EU establishment or relevant offering of goods or services to people in the EU, or monitoring their behaviour there. Overseas website accessibility alone does not establish coverage.
- **France:** GDPR and French data-protection rules may apply. CNIL guidance distinguishes necessary storage from trackers that require prior consent. A link to a social profile is different from embedding a tracking widget.
- **United Kingdom:** UK GDPR has its own territorial scope. UK rules on device storage and access also need assessment when relevant. EU compliance cannot be assumed to establish UK compliance.
- **United States:** Coverage depends on the law, activity and state. COPPA addresses covered services collecting personal information from children under 13. California’s CCPA has business and threshold tests. This is a screening review, not an audit of every US state.
- **Canada:** PIPEDA generally concerns commercial activity. Community or nonprofit status alone does not resolve coverage; provincial laws and the connection to Canada also matter.
- **Australia:** Privacy Act coverage depends on the entity, activity and Australian link. Small-business exemptions have exceptions, including certain health and personal-information trading activities.
- **China:** PIPL can reach overseas processing connected with providing products or services to people in mainland China or analysing their behaviour there. If applicable, notice, rights, representative and cross-border requirements need specific review.
- **ISO:** ISO/IEC 27701:2025 addresses privacy information management; ISO/IEC 27001:2022 addresses information security management. FN Squad does not claim certification or demonstrated conformity. Accessibility and software-quality standards do not certify privacy compliance.

## Sources and limitations
- [Malaysia — PDPA / JPDP](https://www.pdp.gov.my/en/akta/pdp-act-2010-en/)
- [JPDP privacy notice guidance](https://www.pdp.gov.my/en/akta/guidance-on-the-preparation-of-personal-data-protection-notices/)
- [MCMC complaints portal](https://aduan.mcmc.gov.my/)
- [Malaysian government: MCMC complaint channels](https://mdcameron.gov.my/en/node/1882)
- [ASEAN digital-sector frameworks](https://asean.org/our-communities/economic-community/asean-digital-sector/key-documents/)
- [EDPB: GDPR territorial scope](https://www.edpb.europa.eu/documents/guideline/guidelines-32018-on-the-territorial-scope-of-the-gdpr-article-3-version-adopted_en)
- [CNIL: cookies and trackers](https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi)
- [ICO: UK GDPR scope](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/who-does-the-uk-gdpr-apply-to/)
- [FTC: COPPA guidance](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)
- [California privacy thresholds](https://privacy.ca.gov/laws-and-regulations/monetary-thresholds-in-the-ccpa/)
- [OPC: PIPEDA and community organisations](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/r_o_p/02_05_d_19/)
- [OAIC: small-business coverage](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business)
- [OAIC: Australian link](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-b-key-concepts)
- [China: Personal Information Protection Law](https://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm)
- [ISO/IEC 27701:2025](https://www.iso.org/standard/27701)
- [ISO/IEC 27001:2022](https://www.iso.org/standard/27001)
- [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)
- [JPDP: DPO and other FAQs](https://www.pdp.gov.my/en/faq/)
- [JPDP: breach notification guidance](https://www.pdp.gov.my/ppdpv1/wp-content/uploads/2025/08/GP_DBN_ENG.pdf)
- [CNIL current storage recommendation](https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf)
- [China PIPL: representatives and incidents](https://en.spp.gov.cn/2021-12/29/c_948419_3.htm)
- [JPDP principles](https://www.pdp.gov.my/en/principles-of-personal-data-protection/)
- MCMC direct requests returned HTTP 403. Complaint route corroborated by an official Malaysian government page; no substantive MCMC privacy-policy text is claimed to have been inspected.
- ASEAN official index was available through search; direct retrieval later returned 403. No full clause-by-clause ASEAN framework assessment claimed.
- EU scope uses EDPB guidance; EUR-Lex returned a browser challenge. This is not a full GDPR article-by-article audit.
- ISO public summaries were reviewed; the complete paid standards were not inspected.
- US review screens COPPA and California applicability; it does not cover all state laws. Canada screening does not replace provincial analysis.

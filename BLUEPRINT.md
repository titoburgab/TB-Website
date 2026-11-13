# BLUEPRINT: TB_Webside (titoburga.app portfolio site)

_Last updated: 2026-11-13_

## 1. Working on
Get the new custom domain **titoburga.app** (bought through Vercel, Pro plan) working for the portfolio site, and set up the Vercel CLI on the ASTRA11-v1 drive so deploys and domain checks can be done from this project.

## 2. Where we are
- Done:
  - Domain verified on the Vercel side (tested via `npx vercel domains inspect` and `npx vercel dns ls`): registrar Vercel, created 2026-11-13, expires 2027-11-13, nameservers ns1/ns2.vercel-dns.com both OK, attached to project `tb-website`. `titoburga.app` redirects (308) to `www.titoburga.app`, and `www` serves the site. DNS has only default records (CAA + ALIAS to Vercel); no stray A record. (tested)
  - Forced a request to Vercel's edge (76.76.21.21): 308 on the apex, 200 on www. (tested)
  - Vercel CLI 65.15.0 installed as a dev dependency in this project (tested: `npx vercel --version`).
  - Logged in as `titoburgab-5234`, team `tito-b-s-projects`. Folder linked to project `tb-website` (tested: `.vercel/repo.json` exists, `.env.local` created).
  - Preview deploy made: `tb-website-mm1ayqfr3-tito-b-s-projects.vercel.app`. Its home page was byte-identical (md5) to the live `www.titoburga.app` home page, so no production deploy was needed. (tested, home page only)
- In progress:
  - The domain not loading on the user's Mac network (see Failures). Cause is believed to be the network's DNS filter (Cisco Umbrella block IP) flagging a brand-new domain. Not confirmed from an unfiltered resolver. It loads on the user's phone over cellular.
- Next step: Nothing required. Retry titoburga.app on the Mac in a day or two. If it still fails, switch the Mac's DNS to 1.1.1.1 / 8.8.8.8 (System Settings > Network > Details > DNS), or ask the network admin to allowlist the domain.
- To check / report back:
  - If the user says the domain still fails after 1-2 days, re-check from a different network and look at Vercel dashboard > Project > Settings > Domains for "Valid Configuration".
  - Uncommitted changes exist (see Files in use). The user decides on commit/push.
  - Vercel CLI added a "Protection Bypass for Automation" secret to project `tb-website` (see Changes). Offered to revoke; user has not answered.

## 3. Files in use
- `package.json` / `package-lock.json`: `vercel` added to devDependencies (changed, uncommitted)
- `.gitignore`: now also ignores `.vercel` and `.env*` (changed by the `vercel link` step, uncommitted)
- `.vercel/repo.json`: links this folder to `tb-website` (new, git-ignored)
- `.env.local`: holds a Vercel OIDC token (new, git-ignored; never copy its contents anywhere)
- `index.html`, `project-*.html`: the site pages (not changed this session)
- `inactive/project-cmg.html`, `inactive/project-news-radio.html`: moved from root earlier, still shown as uncommitted renames (not changed this session)
- `CHANGELOG.md`, `Tito-Burga-Resume.pdf`: untracked, not touched this session
- `CLAUDE.md`: project rules (frontend-design skill first, localhost screenshots, etc.)

## 4. Changes
### 2026-11-13
- Installed Vercel CLI locally: `npm install --save-dev vercel` (changes `package.json`, `package-lock.json`). Chosen so it lives on the ASTRA11-v1 drive, not the Mac system.
- User ran `vercel login`; `npx vercel link --yes --project tb-website` linked the folder (created `.vercel/repo.json`, `.env.local`, and appended `.vercel` / `.env*` to `.gitignore`).
- Ran `npx vercel --yes` (preview deploy only, no `--prod`). Verifying it with `vercel curl` added a "Protection Bypass for Automation" secret to project `tb-website` in Vercel; it stays until revoked.
- No site/HTML code changed. Nothing committed or pushed.

## 5. Failures
- [open] titoburga.app and www.titoburga.app do not load on the user's Mac/network: every lookup, even direct to Vercel's nameservers and 8.8.8.8/1.1.1.1, returns 146.112.61.110 (Cisco Umbrella block-page IP) and DoH requests get a 302 from a filter. Works on phone over cellular. Probable cause: network DNS filter blocking a newly registered domain. Expected to clear as the domain ages.
- [resolved] `vercel` command not found at session start: fixed by installing it as a project dev dependency and using `npx vercel`.
- [resolved] `.vercel/project.json` missing after `vercel link`: not an error. CLI 65.x writes `.vercel/repo.json` instead.
- [resolved] `curl` to DoH endpoints failed (exit 60 / 302 page): network is intercepting HTTPS; used `--resolve` to Vercel's IP instead.

## 6. Lessons
### Domain "not working" can be local DNS filtering (2026-11-13)
- Tried: dig against the local resolver, 8.8.8.8, 1.1.1.1 and Vercel's own nameservers.
- Error / symptom: every query returned 146.112.61.110 (Cisco Umbrella). `curl https://titoburga.app` returned nothing.
- Cause: network-level DNS filter on this Mac's network, probably blocking new `.app` domains. The sandbox here intercepts DNS even to external servers, so dig results from here are not proof of what the public sees.
- Fix: none needed on Vercel. Verify with `curl --resolve <domain>:443:76.76.21.21 https://<domain>` and the Vercel CLI (`domains inspect`, `dns ls`); test on cellular.
- Next time: check Vercel's own view (CLI) and a different network before touching DNS records.

### Vercel CLI link file name (2026-11-13)
- Tried: `cat .vercel/project.json` after linking.
- Error / symptom: file not found.
- Cause: newer CLI uses `.vercel/repo.json`.
- Fix: check `ls -la .vercel`.
- Next time: confirm the link with `npx vercel project ls` / `ls .vercel`, not `project.json`.

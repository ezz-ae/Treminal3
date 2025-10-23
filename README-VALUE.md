# Treminal3 – Value-First Sprint (v3)

This pack adds **ROI features** so users actually get value the minute they pay:
- **Trust Badge page** for each launch (LP lock / renounce / tax flags).
- **Launch Wizard** stub (name → deploy → verify → share).
- **Telegram Bot webhook** (status/holders/price stubs; easy to extend).
- **Quests + Airdrop submissions** (engagement loop).
- **Referrals** (track earns by `?ref=` code).
- **Listings Links** (prefilled submit helpers).
- **DB schema** for launches/quests/referrals and APIs for each.

> It’s additive: you can unzip this over the repo you already patched with v1/v2.

## Quick Start
```bash
# 1) Prisma migrate (extends your schema)
npx prisma migrate dev --name value_sprint_v3

# 2) Env (add bot tokens if used)
TELEGRAM_BOT_TOKEN= # optional for outbound posts
TELEGRAM_SECRET= # set a random string; include it in webhook URL as ?secret=...

# 3) Dev
npm run dev
```

### What to test (end-to-end, 15 minutes)
1. **Create a Launch**: POST `/api/launch/create` ⇒ copy returned `slug`.
2. **Trust Badge**: open `/launch/<slug>/trust` ⇒ see settings table (mock values until you wire real checks).
3. **Referrals**: open `/launch/<slug>?ref=0xYourWallet` ⇒ DB stores referral on first visit.
4. **Quests**: open `/quests` ⇒ submit a demo action; see it recorded.
5. **TG Bot**: set webhook to `/api/integrations/tg/webhook?secret=...` and send `/status <slug>` in the chat.
6. **Listings**: GET `/api/listings/links?address=<tokenAddr>&symbol=MEME` ⇒ returns helper URLs.

> Wire in real chain data (LP lock, renounce, holders, price) in `src/lib/chain-readers.ts` when ready.

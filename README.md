# AE Performance Coach

A sales coaching tool built for Gushwork's AE team. Paste a call transcript, get one sharp coaching insight back, and have it sent to your inbox.

No dashboards. No rubric breakdowns. Just the one thing you need to fix before your next call.

## What it does

- Paste a sales call transcript into the textarea
- Hit Analyze
- GPT-4o-mini scores the call against a Gushwork-specific rubric (AEO explanation, ROI timeline, objection handling, credibility, next step clarity)
- Returns one paragraph of coaching, written like a sales manager who just listened to your call
- Sends the same insight to your email via Resend

## Stack

- Next.js 14 App Router
- Tailwind CSS
- OpenAI API (gpt-4o-mini)
- Resend
- Deployed on Vercel

## Running locally

1. Clone the repo
2. Copy the env example and fill in your keys

```bash
cp .env.local.example .env.local
```

```
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...
```

3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

```bash
npx vercel --prod
```

Add `OPENAI_API_KEY` and `RESEND_API_KEY` in your Vercel project settings under Environment Variables, then redeploy.

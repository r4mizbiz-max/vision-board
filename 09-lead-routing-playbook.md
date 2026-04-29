# Lead Routing Playbook

> **The point of this doc:** when a CSM starts a shift, they should never have to guess what their job is, who is responsible for which lead, when something is theirs, or what to do next. Everything is rule-based.

---

## TL;DR (read this first, every other section is detail)

```
A homeowner submits an ad form
  → GHL receives the lead in the right sub-account
    → GHL workflow auto-assigns to the CSM whose shift covers RIGHT NOW
      → That CSM is @-mentioned in #new-lead AND in the per-client channel
        → CSM has 60 seconds to call. If voicemail, GHL queues retry at +5min and +30min.
          → CSM books call into the calendar in GHL
            → GHL fires the appointment webhook to the OS
              → OS records the appointment and triggers per-appt billing
                → Client charged via Whop / GHL on the next billing cycle
```

The CSM only ever has to:
1. Watch their pings.
2. Call within 60 seconds.
3. Set the disposition in GHL after the call.
4. Update happiness + leave a note in the OS dashboard at end of shift.

Everything else is automated.

---

## Where leads come from

| Source | Channel | Volume target/day |
|---|---|---|
| Meta Ads → Lead Form | GHL form on landing page | 10–25 / client |
| Google Ads (eventually) | GHL form | future |
| Direct referrals from existing customer | GHL contact create | low volume, high intent |
| Self-book (lead clicked a calendar link directly) | GHL appointment, no call needed | tracked under SELF BOOK |

We only call the form-submitted ones. Self-book = no CSM action required, just tracked.

---

## The Pod / Sub-Account Model

- **1 GHL sub-account = 1 pod = up to 6 clients = 2 CSMs (split shift)**
- Each pod has its own #pod-N Slack channel for coordination *(create when CSM #2 hires for that pod)*
- Each client inside the pod gets its own `#client-<name>` channel

| Pod size | Daily lead volume (~15/client) | Per-CSM hourly load (6h shift) |
|---|---|---|
| 6 clients | ~90 leads/day | 7.5 leads/hour each |
| 8 clients | ~120 leads/day | 10 leads/hour each |
| 10 clients | ~150 leads/day | 12.5 leads/hour each |

Trigger to spin up Pod #2: Pod #1 hits 6/6 + you have 2 more clients **already signed**. Hire CSMs #3 and #4 BEFORE you onboard those next 2 clients.

---

## Time-of-Day Routing Matrix (EST)

| EST hour | Shift | Routes to |
|---|---|---|
| 6:00am – 1:59pm | Morning | Morning CSM |
| 2:00pm – 7:59pm | Evening | Evening CSM |
| 8:00pm – 5:59am | Off-hours | Queued for morning CSM at 6am |

**Why EST and not local time:** every contractor we sign is in the US, but we're not optimizing for the *lead's* timezone — we're optimizing for *our CSM's* schedule. EST is the operating clock. Period.

---

## GHL Pipeline + Custom Dispositions (the funnel source-of-truth)

The OS dashboard's funnel stats (Connect %, ABR, Show %, Close %) all come from GHL pipeline stage transitions. **This is non-negotiable** — if CSMs don't move opportunities through the pipeline, the funnel breaks.

### Pipeline name (per sub-account)

```
PPSA — Inbound Leads
```

### Pipeline stages — exact list, in order

| # | Stage name | When it fires | Funnel meaning |
|---|---|---|---|
| 1 | New Lead | Form submitted | Top of funnel |
| 2 | Called — No Answer | CSM dialed, no pickup | Counts toward "no-answer rate" |
| 3 | Called — Voicemail | CSM left VM | Same |
| 4 | Connected | Lead picked up | Counts toward "connect rate" |
| 5 | Booked | Appointment booked | ABR numerator |
| 6 | Showed | Customer attended | Show rate numerator |
| 7 | Closed Won | Sale made | Close rate numerator |
| 8 | Closed Lost | Sale didn't happen | Close rate denominator (with Showed) |
| 9 | No Show | Customer didn't attend | Show rate denominator |
| 10 | Cancelled | Customer cancelled | Side bucket |

### Webhook on every stage change

GHL → Workflows → New Workflow → Trigger: **"Opportunity Stage Changed"**

Action: **Webhook** to:

```
https://app.rambitiousmedia.com/api/ghl-webhook
```

Body fields (CSMs see these; never edit):

```
calendar_id        = {{calendar.name}}
assigned_to        = {{user.name}}
lead_name          = {{contact.name}}
lead_phone         = {{contact.phone}}
ghl_appointment_id = {{appointment.id}}
location_id        = {{location.id}}
scheduled_for      = {{appointment.only_start_time}}
```

The OS infers the **pod from the matched client**, so funnel stats roll up by pod automatically — no manual tagging.

## B2B lead webhook (Ram's own pipeline)

For your B2B sales pipeline (your ads → your booking calls), use a **separate** webhook:

```
https://app.rambitiousmedia.com/api/b2b-lead
```

GHL workflow trigger: **Contact Created** (filter to your B2B sub-account / B2B-tagged contacts). Same `Send Webhook` action with these body fields:

```
lead_name   = {{contact.name}}
lead_phone  = {{contact.phone}}
lead_email  = {{contact.email}}
niche       = {{contact.niche}}              (optional custom field)
adset_name  = {{contact.adset_name}}         (optional)
ad_name     = {{contact.ad_name}}            (optional)
```

The OS dedupes by phone — re-firing the workflow won't create duplicate leads.

## GHL Workflow — exact build (per sub-account)

Set this up **once per GHL sub-account.** Every client in the same pod uses the same workflow.

### Workflow name: `Lead Auto-Routing — [Pod Name]`

**Trigger:** "Form Submitted" (any lead form in the sub-account)

**Step 1 — Get current time:**
- Action: **Get Custom Date/Time**
- Format: `HH` (24-hour)
- Timezone: `America/New_York`
- Save as: `current_hour_est`

**Step 2 — If/Else branch on shift:**

```
IF current_hour_est ≥ 6 AND current_hour_est < 14
    → Morning Shift
IF current_hour_est ≥ 14 AND current_hour_est < 20
    → Evening Shift
ELSE
    → Off-Hours Queue
```

**Step 3 — Inside Morning Shift branch:**
- Action: **Assign to User** → Morning CSM (e.g., Ahed Sheta)
- Action: **Send Slack message** to `#new-lead` with:
  ```
  🔥 NEW LEAD · {{contact.name}} · {{contact.phone}}
  Client: {{location.name}}  ·  Niche: {{custom_field.niche}}
  Assigned to: <@morning-csm-slack-id>
  Call within 60 seconds.
  ```
- Action: **Send Slack message** to `#client-<location-slug>` with the same text
- Action: **Wait 60 seconds**
- Action: **Send notification to morning CSM in Slack DM** if no call attempted yet

**Step 4 — Inside Evening Shift branch:**
- Same as morning, but assign to Evening CSM and ping their Slack ID

**Step 5 — Inside Off-Hours Queue branch:**
- Action: **Add Tag** → `overnight-queue`
- Action: **Send Slack message** to `#new-lead` with:
  ```
  ⏰ OVERNIGHT LEAD · {{contact.name}} · {{contact.phone}}
  Will be picked up by morning CSM at 6am.
  ```
- Action: **Wait Until** → next 6:00am EST
- Action: **Assign to User** → Morning CSM
- Action: **Send Slack message** to `#new-lead` with:
  ```
  🔥 OVERNIGHT LEAD NOW LIVE · {{contact.name}}
  Assigned to: <@morning-csm>. Call now.
  ```

### After the call — disposition

When CSM picks up disposition in GHL ("Booked", "No Answer", "Not Interested", etc.), a separate workflow fires:

- **If "Booked":** Already automatic — GHL appointment workflow → existing OS webhook → appointment recorded, billing triggered
- **If "No Answer":** Auto-retry at +5 min, then +30 min (3-touch sequence)
- **If "Not Interested" / "Not Qualified":** Mark lost, no billing
- **If "Callback Requested":** Schedule per their preferred time, ping CSM 15 min before

---

## Slack — channel cheat sheet

| Channel | Who's in it | What posts here | Who reads it |
|---|---|---|---|
| `#all-rambitious-ops` | Everyone | Announcements, weekly metrics, hires | Everyone |
| `#csms` | CSMs + Ram | Shift handoffs, escalations, training, kudos | All CSMs |
| `#new-lead` | CSMs + Ram + GHL bot | EVERY new lead, with @mention of on-shift CSM | All CSMs (filter to your @mentions) |
| `#booked-calls` | CSMs + Ram | Auto-feed when call gets booked | All CSMs |
| `#no-show` | CSMs + Ram | Auto-feed for no-shows | All CSMs |
| `#cancellations` | CSMs + Ram | Auto-feed for cancellations | All CSMs |
| `#closed-deals` | CSMs + Ram | Auto-feed when deal closes | All CSMs |
| `#eod-form` | CSMs + Ram | End-of-day report from each CSM | Ram |
| `#client-<name>` | Ram + 2 assigned CSMs + (optionally) the client | All client-specific lead/call/feedback chatter | The 2 assigned CSMs |
| `#pod-N` *(future, when 2 CSMs share a pod)* | The 2 CSMs in that pod | Pod-internal coordination | Both CSMs |
| `#social` | Everyone | Memes, off-topic | Everyone |
| `#internal` | Ram only | LC notifications, alerts | Ram |

---

## SLA Targets (these are non-negotiable)

| Metric | Target | Auto-tracked? |
|---|---|---|
| Speed-to-lead (lead → first call attempt) | < 60 seconds | Yes — GHL timestamps both |
| Speed-to-lead 90th percentile | < 3 minutes | Yes |
| Connect rate | > 50% | Yes — disposition data |
| Show rate (booked → showed) | > 65% | Yes |
| Close rate (showed → closed) | > 35% | Yes |
| Happiness score per client | ≥ 7 / 10 | Yes — CSM logs daily |

If any number drops below the floor for 2 consecutive weeks for the same CSM → 1:1 with Ram. If for the same client → call with that client.

---

## CSM Daily Rhythm

**Start of shift (6:00am or 2:00pm EST):**
1. Open the dashboard at app.rambitiousmedia.com → My Clients
2. Read the top of `#csms` for handoff from previous shift
3. Check `#new-lead` for any leads from your shift you haven't called yet
4. Reply in `#csms` with: `Online ☀️ — focusing on [client A], [client B] today. [Open thread] from morning still pending.`

**During shift:**
- Phone notifications ON for `#new-lead` and your `#client-*` channels
- Goal: every lead called within 60 sec
- Use GHL's mobile app for outbound dialing (your number is masked)
- After every call: set disposition in GHL (auto-tracks to OS)
- Spotted a hot lead? Drop a note in the per-client channel

**Mid-shift:**
- Lunch break: 30 min anywhere in your 6h shift, post in `#csms`: `🥪 BRB 30min — [other CSM/Ram] please cover any urgent leads`

**End of shift:**
1. Update happiness score (1–10) for each assigned client in the dashboard
2. Drop a note for any client where score is < 7 explaining why
3. Post end-of-day in `#csms`:
   ```
   EOD ✅
   Leads received: 42
   Called: 41 (1 missed → @other-csm please pick up)
   Booked: 18 (43% book rate)
   Open threads: clientX hot lead waiting on callback at 7pm tomorrow
   ```
4. Sign off

**Daily reading: 5 minutes max.** This isn't a writeup-heavy job, it's a phones job.

---

## Edge Cases (what to do when X)

### CSM is sick / out
- Other CSM stretches into the missing shift if they can
- Otherwise Ram covers leads via GHL mobile app for the day
- DO NOT silently drop leads — every lead gets called the same day

### Lead comes in 5 minutes before shift handoff
- Outgoing CSM calls if they can in their last 5 min
- Otherwise puts in `#csms`: `📞 [Lead Name @ Client X] just came in, voicemail left. Incoming CSM please retry in 30min`
- Handoff is a **specific Slack ping**, not a vibe

### Existing customer becomes a new lead (re-engages)
- GHL detects this via duplicate phone/email
- Tag with `repeat-engagement`
- Still routes to on-shift CSM
- CSM sees the prior contact history before calling

### Client requests something specific (extra hours, custom rules)
- Goes in `#client-<name>` only
- Tag Ram if it's a contractual change
- DO NOT modify GHL workflows for one client's request without Ram approving

### After-hours bookings (lead booked through self-book calendar at 11pm)
- Marked as SELF BOOK in OS (no setter attribution)
- Still triggers per-appt billing if it shows up
- Morning CSM pings the client to confirm at 6am

---

## Tracking — where each metric lives

| What | Where | Who watches |
|---|---|---|
| Leads received per client | OS dashboard → Client detail | CSM, Ram |
| Speed-to-lead distribution | OS dashboard (coming soon) | Ram |
| CSM appointments booked | OS Employees → CSM detail | CSM, Ram |
| Show rate / Close rate | OS dashboard | Ram |
| Per-client revenue | OS dashboard B2C tab | Ram only |
| Per-CSM commission YTD | OS Payouts page | CSM, Ram |
| Client happiness | OS CSM Client Dashboard slider | CSM (input), Ram (review) |
| Notes per client | OS CSM Client Detail → Notes column | All CSMs assigned + Ram |

---

## Hiring Trigger (decision tree)

```
If pod is at 5/6 clients
  AND happiness avg ≥ 7
  AND show rate ≥ 65%
  AND speed-to-lead 90th < 3min
    → KEEP SELLING. Don't hire yet.

If pod is at 6/6 clients
  AND I have 2 more deals signed
    → Open Pod #2 NOW. Hire 2 new CSMs. Migrate 2 of the 6 to Pod #2 if needed.

If any of (happiness < 7, show < 65%, speed > 3min) for 2 weeks straight
    → Don't hire. Diagnose first. Probably training or sub-account hygiene issue.
```

---

## TL;DR for the CSM (print this)

> 1. **Watch your @mentions in Slack.** They ping when a lead is yours.
> 2. **Call within 60 seconds.** Speed > everything.
> 3. **Set the disposition in GHL after every call.** No exceptions.
> 4. **At end of shift, update happiness + drop a note** for any client < 7.
> 5. **Read `#csms` first thing.** Last person's handoff is your starting point.
>
> If you don't know who owns something — it's whoever is on-shift right now. The dashboard's "On Shift Now" panel tells you. **You never have to guess.**

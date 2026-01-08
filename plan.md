# Job Application Tracker — GitHub Issues Checklist (France-first)

## AI Context (keep for future chats)

### Product goal
- Track all job applications in one place (CRUD)
- Visualize activity and outcomes on a dashboard (volume, breakdowns, trends)
- France-first fields and terminology (contract types, salary format, remote modes)

### Target user
- A candidate applying mainly in France (CDI/CDD/Alternance/Stage/Freelance/Intérim)

### Default scope decisions (unless changed later)
- **MVP is local-first** (no login, no cloud sync)
- The app is optimized for fast manual entry + simple analysis
- Import/export comes after core CRUD + dashboard

### France-first definitions
- **Contract types**: CDI, CDD, Alternance, Stage, Freelance, Interim
- **Remote modes**: remote, hybrid, onsite
- **Status pipeline** (canonical list): Draft, Applied, Screening, Interview, Offer, Rejected, Ghosted
- **Salary**: prefer *brut annuel* (and/or TJM for freelance)

### Common French job sources (for `source` field)
- LinkedIn, Welcome to the Jungle, APEC, Indeed, HelloWork, France Travail, Malt

### Data/privacy assumptions
- The app stores personal/job-search data; treat it as sensitive
- Provide clear export + delete flows; avoid sending data to third-parties in MVP

### Non-goals for MVP
- No authentication, no multi-device sync
- No email parsing/automation
- No complex scraping of job boards

### Open questions (answer later; don’t block MVP)
- Local storage tech choice: IndexedDB (Dexie) vs localStorage (size limits)
- Do we want Kanban in V2, or table-only?
- Do we need reminders in-app only, or OS notifications?

## Milestones
- **M1 — MVP (Core tracking + Dashboard + List)**
- **M2 — V1 (Productivity + analytics + reminders + import/export)**
- **M3 — V2 (CRM contacts + docs + calendar + automation)**

---

## M1 — MVP

### Issue: Project baseline (routing shell)
- [ ] Ensure App renders an `<Outlet />` layout (header/nav)
- [ ] Add navigation links: Dashboard, Applications
- [ ] Define routes:
  - [ ] `/` → Dashboard
  - [ ] `/applications` → Applications list
  - [ ] `/applications/new` → Create
  - [ ] `/applications/:id` → Detail
  - [ ] `/applications/:id/edit` → Edit

**Acceptance criteria**
- [ ] All routes render without errors
- [ ] Navigation works from UI and direct URL load

---

### Issue: Define core domain model (Application)

**Fields (MVP)**
- [ ] `companyName` (required)
- [ ] `jobTitle` (required)
- [ ] `locationCity`
- [ ] `remoteMode` (**enum**: remote/hybrid/onsite)
- [ ] `contractType` (**enum**: CDI/CDD/Alternance/Stage/Freelance/Interim)
- [ ] `source`
- [ ] `url`
- [ ] `appliedAt`
- [ ] `status` (**enum**: Draft/Applied/Screening/Interview/Offer/Rejected/Ghosted)
- [ ] `notes`
- [ ] `contact` (optional object)
  - [ ] `contact.name`
  - [ ] `contact.email` (optional)
  - [ ] `contact.phone` (optional)
  - [ ] `contact.linkedinUrl` (optional)

**Acceptance criteria**
- [ ] `status`, `remoteMode`, `contractType` cannot be arbitrary text (validated against allowed values)
- [ ] Type/validation exists and is used by forms + list + dashboard

---

### Issue: Local persistence (MVP storage)
- [ ] Implement storage layer (local-first)
- [ ] CRUD: create/read/update/delete application
- [ ] Seed empty state handling

**Acceptance criteria**
- [ ] Refreshing the page keeps saved applications
- [ ] CRUD operations persist correctly

---

### Issue: Applications list page (`/applications`)
- [ ] Table/list UI showing: company, title, **status (badge/pill, not free text)**, appliedAt, source, contract, location, remote
- [ ] Search (company/title)
- [ ] Filters: **status (dropdown from enum)**, source, contract type, remote mode, date range
- [ ] Sorting: appliedAt, company, status
- [ ] Row actions: view, edit, delete, open URL

**Acceptance criteria**
- [ ] Filters/search/sort update list correctly
- [ ] Status is displayed consistently (same labels everywhere)
- [ ] Delete asks confirmation (or undo)

---

### Issue: Create application page (`/applications/new`)
- [ ] Form with validation (company + title required)
- [ ] Defaults: appliedAt = today, status = Applied
- [ ] Status input is a **select** (enum), not a free text field
- [ ] Contact inputs (optional): name/email/phone/LinkedIn
- [ ] Save → redirects to detail or list

**Acceptance criteria**
- [ ] Invalid form cannot be submitted
- [ ] After saving, new item appears in list and dashboard counts

---

### Issue: Edit application page (`/applications/:id/edit`)
- [ ] Form prefilled with existing data
- [ ] Status input is a **select** (enum)
- [ ] Contact fields editable
- [ ] Save changes + cancel

**Acceptance criteria**
- [ ] Edits persist and reflect in list/dashboard

---

### Issue: Application detail page (`/applications/:id`)
- [ ] Display all fields
- [ ] Quick status change control (enum)
- [ ] Notes section
- [ ] Contact section (show only if present)

**Acceptance criteria**
- [ ] Status updates persist and reflect everywhere

---

### Issue: Dashboard page (`/`)
- [ ] KPI: total applications
- [ ] KPI: last 7 / last 30 days
- [ ] Breakdown by status
- [ ] Breakdown by source
- [ ] Timeline: applications per week

**Acceptance criteria**
- [ ] Numbers match the stored applications
- [ ] Empty state is clear (no data yet)

---

## M2 — V1

### Issue: Status history + events timeline
- [ ] Track status changes with timestamps
- [ ] Add “events” for: follow-up, call, interview, tech test, offer, rejection
- [ ] Render timeline in application detail

**Acceptance criteria**
- [ ] Timeline remains correct after edits/reloads

---

### Issue: Reminders (“To follow up”)
- [ ] Default rule: remind after X days from Applied
- [ ] “To follow up” view/filter
- [ ] Snooze reminder

**Acceptance criteria**
- [ ] Items appear/disappear correctly based on dates + snooze

---

### Issue: Dashboard analytics upgrade
- [ ] Funnel conversion (Applied → Interview → Offer)
- [ ] Avg time between stages
- [ ] Response rate by source
- [ ] Weekly goal + progress

**Acceptance criteria**
- [ ] Metrics are reproducible from stored data

---

### Issue: Export / Import
- [ ] Export JSON
- [ ] Export CSV
- [ ] Import CSV via template mapping

**Acceptance criteria**
- [ ] Exported files re-import without data loss (within supported fields)

---

### Issue: Import by URL (prefill application)
- [ ] Add “Paste job URL” entry point (button on list + field on create form)
- [ ] Implement URL fetch in backend (Tauri) to avoid CORS and keep tokens off the client
- [ ] Parse minimal metadata when possible:
  - [ ] `companyName`
  - [ ] `jobTitle`
  - [ ] `locationCity` / remote hints (if present)
  - [ ] `source` inferred from hostname
  - [ ] `url` (original)
- [ ] Show a review step before saving (user confirms/edits fields)
- [ ] Fallback: if parsing fails, still create a draft with URL + manual fields

**Acceptance criteria**
- [ ] User can paste a URL and get a prefilled create form (when metadata is available)
- [ ] No crawling; only single-URL import initiated by the user
- [ ] Parsing failures are handled gracefully (no crash; clear message)
- [ ] Imported applications appear in list + dashboard metrics

---

### Issue: France-first fields (extended)
- [ ] Salary expected (brut/an) and/or TJM
- [ ] Availability (immediate / notice period)
- [ ] Mobility (regions/cities)
- [ ] Work authorization note (optional)

**Acceptance criteria**
- [ ] Fields appear in create/edit/detail and can be filtered (at least salary optional)

---

## M3 — V2

### Issue: Contacts (mini-CRM)
- [ ] Contact entity (name, role, email/phone, LinkedIn)
- [ ] Link contacts to applications
- [ ] Notes + follow-up per contact

**Acceptance criteria**
- [ ] A contact can be reused across multiple applications

---

### Issue: Documents per application
- [ ] Attach links/files for CV/LM/portfolio
- [ ] Mark “used for this application”

**Acceptance criteria**
- [ ] Documents are visible on detail and included in export (links at minimum)

---

### Issue: Kanban view
- [ ] Columns by status
- [ ] Drag & drop to change status

**Acceptance criteria**
- [ ] Dragging updates status and persists

---

### Issue: Calendar integration (lightweight)
- [ ] Export `.ics` for interviews/reminders OR integrate with Google Calendar later
- [ ] Calendar view in-app (optional)

**Acceptance criteria**
- [ ] Calendar events match application events

---

### Issue: Automation rules
- [ ] Rule engine (simple): Applied + 7 days ⇒ reminder
- [ ] Interview scheduled ⇒ calendar event
- [ ] Email templates (follow-up/thank-you) (copy-to-clipboard is enough)

**Acceptance criteria**
- [ ] Rules can be toggled and don’t create duplicates

---

## Optional “meta” issues (recommended)

### Issue: UX polish + empty states
- [ ] Consistent empty states for dashboard/list/detail
- [ ] Loading states (if async storage)
- [ ] Basic accessibility (labels, keyboard focus)

---

### Issue: Testing
- [ ] Unit tests for storage + analytics calculations
- [ ] UI tests for CRUD flow (create → list → detail → edit → delete)

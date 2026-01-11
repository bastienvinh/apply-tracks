PRAGMA foreign_keys = ON;

-- ============
-- Enum-like constraints (SQLite uses CHECK constraints)
-- ============
-- Status: Draft, Applied, Screening, Interview, Offer, Rejected, Ghosted
-- Remote mode: remote, hybrid, onsite
-- Contract: CDI, CDD, Alternance, Stage, Freelance, Interim

-- ============
-- Companies
-- ============
CREATE TABLE IF NOT EXISTS companies (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  website       TEXT,
  industry      TEXT,
  location      TEXT,
  notes         TEXT,
  created_at    TEXT NOT NULL, -- ISO8601
  updated_at    TEXT NOT NULL  -- ISO8601
);

-- ============
-- Contacts (V2-ready, but usable from MVP)
-- ============
CREATE TABLE IF NOT EXISTS contacts (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  role          TEXT,
  company_id    TEXT,
  email         TEXT,
  phone         TEXT,
  linkedin_url  TEXT,
  notes         TEXT,
  created_at    TEXT NOT NULL, -- ISO8601
  updated_at    TEXT NOT NULL, -- ISO8601
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS applications (
  id                TEXT PRIMARY KEY,
  position_title    TEXT NOT NULL,
  company_id        TEXT,
  status            TEXT NOT NULL CHECK (status IN ('Draft', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Ghosted')),
  remote_mode       TEXT CHECK (remote_mode IN ('remote', 'hybrid', 'onsite')),
  contract_type    TEXT CHECK (contract_type IN ('CDI', 'CDD', 'Alternance', 'Stage', 'Freelance', 'Interim')),
  location          TEXT,
  application_url   TEXT,
  source            TEXT,
  notes             TEXT,
  created_at        TEXT NOT NULL, -- ISO8601
  updated_at        TEXT NOT NULL, -- ISO8601
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS application_contacts (
  application_id  TEXT NOT NULL,
  contact_id      TEXT NOT NULL,
  PRIMARY KEY (application_id, contact_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedbacks (
  id              TEXT PRIMARY KEY,
  application_id  TEXT NOT NULL,
  contact_id      TEXT,
  step            TEXT CHECK (step IN ('Draft', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Ghosted')),
  display_order   INTEGER NOT NULL DEFAULT 0,
  author          TEXT NOT NULL CHECK (author IN ('me', 'company')),
  content         TEXT NOT NULL,
  created_at      TEXT NOT NULL, -- ISO8601
  updated_at      TEXT NOT NULL, -- ISO8601
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL
);

-- ============
-- Documents (attachable to applications, contacts, and feedbacks)
-- ============
CREATE TABLE IF NOT EXISTS documents (
  id              TEXT PRIMARY KEY,
  filename        TEXT NOT NULL,
  file_path       TEXT NOT NULL,
  file_size       INTEGER,
  mime_type       TEXT,
  description     TEXT,
  created_at      TEXT NOT NULL, -- ISO8601
  updated_at      TEXT NOT NULL  -- ISO8601
);

-- ============
-- Document relationships
-- ============
CREATE TABLE IF NOT EXISTS application_documents (
  application_id  TEXT NOT NULL,
  document_id     TEXT NOT NULL,
  PRIMARY KEY (application_id, document_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contact_documents (
  contact_id      TEXT NOT NULL,
  document_id     TEXT NOT NULL,
  PRIMARY KEY (contact_id, document_id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedback_documents (
  feedback_id     TEXT NOT NULL,
  document_id     TEXT NOT NULL,
  PRIMARY KEY (feedback_id, document_id),
  FOREIGN KEY (feedback_id) REFERENCES feedbacks(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- ============
-- Tags system for activities categorization
-- ============
CREATE TABLE IF NOT EXISTS tags (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL UNIQUE,
  color           TEXT, -- Hex color for UI display
  description     TEXT,
  created_at      TEXT NOT NULL, -- ISO8601
  updated_at      TEXT NOT NULL  -- ISO8601
);

-- ============
-- Tag relationships
-- ============
CREATE TABLE IF NOT EXISTS application_tags (
  application_id  TEXT NOT NULL,
  tag_id          TEXT NOT NULL,
  PRIMARY KEY (application_id, tag_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contact_tags (
  contact_id      TEXT NOT NULL,
  tag_id          TEXT NOT NULL,
  PRIMARY KEY (contact_id, tag_id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
PRAGMA foreign_keys = ON;

-- ============
-- Enum-like constraints (SQLite uses CHECK constraints)
-- ============
-- Status: Draft, Applied, Screening, Interview, Offer, Rejected, Ghosted
-- Remote mode: remote, hybrid, onsite
-- Contract: CDI, CDD, Alternance, Stage, Freelance, Interim

-- ============
-- Industries
-- ============
CREATE TABLE IF NOT EXISTS industries (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  description   TEXT,
  is_default    INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
  created_at    TEXT NOT NULL, -- ISO8601
  updated_at    TEXT NOT NULL, -- ISO8601
  deleted_at    TEXT           -- ISO8601, NULL if not deleted
);

-- ============
-- Companies (remove industry_id)
-- ============
CREATE TABLE IF NOT EXISTS companies (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  website       TEXT,
  location      TEXT,
  company_size  TEXT CHECK (company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
  glassdoor_url TEXT,
  notes         TEXT,
  is_default    INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
  created_at    TEXT NOT NULL, -- ISO8601
  updated_at    TEXT NOT NULL, -- ISO8601
  deleted_at    TEXT           -- ISO8601, NULL if not deleted
);

-- ============
-- Company-Industries (many-to-many)
-- ============
CREATE TABLE IF NOT EXISTS company_industries (
  company_id   TEXT NOT NULL,
  industry_id  TEXT NOT NULL,
  deleted_at   TEXT, -- ISO8601, NULL if not deleted
  PRIMARY KEY (company_id, industry_id),
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (industry_id) REFERENCES industries(id) ON DELETE CASCADE
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
  github_url    TEXT,
  notes         TEXT,
  created_at    TEXT NOT NULL, -- ISO8601
  updated_at    TEXT NOT NULL, -- ISO8601
  deleted_at    TEXT,          -- ISO8601, NULL if not deleted
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- ============
-- Technologies/Skills (IT job market specific)
-- ============
CREATE TABLE IF NOT EXISTS technologies (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  category      TEXT CHECK (category IN ('language', 'framework', 'database', 'cloud', 'devops', 'tool', 'methodology', 'soft_skill', 'other')),
  description   TEXT,
  created_at    TEXT NOT NULL, -- ISO8601
  updated_at    TEXT NOT NULL, -- ISO8601
  deleted_at    TEXT           -- ISO8601, NULL if not deleted
);

CREATE TABLE IF NOT EXISTS applications (
  id                TEXT PRIMARY KEY,
  position_title    TEXT NOT NULL,
  company_id        TEXT,
  status            TEXT NOT NULL CHECK (status IN ('Draft', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Ghosted')),
  remote_mode       TEXT CHECK (remote_mode IN ('remote', 'hybrid', 'onsite')),
  contract_type     TEXT CHECK (contract_type IN ('CDI', 'CDD', 'Alternance', 'Stage', 'Freelance', 'Interim')),
  seniority_level   TEXT CHECK (seniority_level IN ('intern', 'junior', 'mid', 'senior', 'lead', 'principal', 'staff', 'manager', 'director', 'vp', 'cto')),
  job_category      TEXT CHECK (job_category IN ('backend', 'frontend', 'fullstack', 'mobile', 'devops', 'sre', 'data', 'ml_ai', 'security', 'qa', 'product', 'design', 'management', 'other')),
  location          TEXT,
  application_url   TEXT,
  job_board         TEXT CHECK (job_board IN ('linkedin', 'indeed', 'welcometothejungle', 'glassdoor', 'stackoverflow', 'github', 'angellist', 'company_website', 'referral', 'recruiter', 'other')),
  source            TEXT,
  priority          INTEGER DEFAULT 0 CHECK (priority BETWEEN 0 AND 5), -- 0 = low, 5 = high
  salary_min        INTEGER,          -- Minimum salary expectation
  salary_max        INTEGER,          -- Maximum salary expectation
  salary_currency   TEXT DEFAULT 'EUR',
  salary_period     TEXT CHECK (salary_period IN ('yearly', 'monthly', 'daily', 'hourly')),
  experience_years  INTEGER,          -- Required years of experience
  interview_stages  TEXT,             -- JSON array of interview stages
  notes             TEXT,
  created_at        TEXT NOT NULL, -- ISO8601
  updated_at        TEXT NOT NULL, -- ISO8601
  deleted_at        TEXT,          -- ISO8601, NULL if not deleted
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

-- ============
-- Technical Tests (related to applications)
-- ============
CREATE TABLE IF NOT EXISTS tech_tests (
  id              TEXT PRIMARY KEY,
  application_id  TEXT NOT NULL,
  title           TEXT NOT NULL,
  url             TEXT,
  platform        TEXT CHECK (platform IN ('codility', 'hackerrank', 'leetcode', 'codesignal', 'codingame', 'take_home', 'live_coding', 'github', 'custom', 'other')),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'submitted', 'passed', 'failed', 'expired')),
  difficulty      TEXT CHECK (difficulty IN ('easy', 'medium', 'hard', 'expert')),
  time_limit      INTEGER,           -- Time limit in minutes
  deadline        TEXT,              -- ISO8601
  started_at      TEXT,              -- ISO8601
  submitted_at    TEXT,              -- ISO8601
  score           TEXT,              -- Flexible format: "85%", "7/10", etc.
  feedback        TEXT,              -- Company feedback
  notes           TEXT,
  created_at      TEXT NOT NULL,     -- ISO8601
  updated_at      TEXT NOT NULL,     -- ISO8601
  deleted_at      TEXT,              -- ISO8601, NULL if not deleted
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- ============
-- Tech test documents
-- ============
CREATE TABLE IF NOT EXISTS tech_test_documents (
  tech_test_id    TEXT NOT NULL,
  document_id     TEXT NOT NULL,
  deleted_at      TEXT,
  PRIMARY KEY (tech_test_id, document_id),
  FOREIGN KEY (tech_test_id) REFERENCES tech_tests(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- ============
-- Application required technologies
-- ============
CREATE TABLE IF NOT EXISTS application_technologies (
  application_id  TEXT NOT NULL,
  technology_id   TEXT NOT NULL,
  is_required     INTEGER NOT NULL DEFAULT 1, -- 1 = required, 0 = nice to have
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
  PRIMARY KEY (application_id, technology_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS application_contacts (
  application_id  TEXT NOT NULL,
  contact_id      TEXT NOT NULL,
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
  PRIMARY KEY (application_id, contact_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedbacks (
  id              TEXT PRIMARY KEY,
  application_id  TEXT NOT NULL,
  contact_id      TEXT,
  step            TEXT CHECK (step IN ('Draft', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected', 'Ghosted')),
  interview_type  TEXT CHECK (interview_type IN ('phone', 'video', 'technical', 'live_coding', 'system_design', 'behavioral', 'culture_fit', 'take_home', 'onsite', 'hr', 'manager', 'team', 'other')),
  display_order   INTEGER NOT NULL DEFAULT 0,
  author          TEXT NOT NULL CHECK (author IN ('me', 'company')),
  content         TEXT NOT NULL,
  rating          INTEGER CHECK (rating BETWEEN 1 AND 5), -- Self-assessment of interview performance
  created_at      TEXT NOT NULL, -- ISO8601
  updated_at      TEXT NOT NULL, -- ISO8601
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
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
  document_type   TEXT CHECK (document_type IN ('cv', 'cover_letter', 'portfolio', 'tech_test', 'certificate', 'recommendation', 'other')),
  description     TEXT,
  created_at      TEXT NOT NULL, -- ISO8601
  updated_at      TEXT NOT NULL, -- ISO8601
  deleted_at      TEXT           -- ISO8601, NULL if not deleted
);

-- ============
-- Document relationships
-- ============
CREATE TABLE IF NOT EXISTS application_documents (
  application_id  TEXT NOT NULL,
  document_id     TEXT NOT NULL,
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
  PRIMARY KEY (application_id, document_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contact_documents (
  contact_id      TEXT NOT NULL,
  document_id     TEXT NOT NULL,
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
  PRIMARY KEY (contact_id, document_id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedback_documents (
  feedback_id     TEXT NOT NULL,
  document_id     TEXT NOT NULL,
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
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
  updated_at      TEXT NOT NULL, -- ISO8601
  deleted_at      TEXT           -- ISO8601, NULL if not deleted
);

-- ============
-- Tag relationships
-- ============
CREATE TABLE IF NOT EXISTS application_tags (
  application_id  TEXT NOT NULL,
  tag_id          TEXT NOT NULL,
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
  PRIMARY KEY (application_id, tag_id),
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS company_tags (
  company_id      TEXT NOT NULL,
  tag_id          TEXT NOT NULL,
  deleted_at      TEXT,          -- ISO8601, NULL if not deleted
  PRIMARY KEY (company_id, tag_id),
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- ============
-- Seed data for IT industries
-- ============
INSERT INTO industries (id, name, description, is_default, created_at, updated_at) VALUES
  ('b7e6e7e2-2f6d-4b1a-8e4e-1e2f3c4d5a6b', 'SaaS', 'Software as a Service companies', 1, datetime('now'), datetime('now')),
  ('c1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 'FinTech', 'Financial technology companies', 0, datetime('now'), datetime('now')),
  ('e3f4a5b6-c7d8-4e9f-8a1b-2c3d4e5f6a7b', 'HealthTech', 'Healthcare technology companies', 0, datetime('now'), datetime('now')),
  ('f1e2d3c4-b5a6-4c7d-8e9f-0a1b2c3d4e5f', 'EdTech', 'Education technology companies', 0, datetime('now'), datetime('now')),
  ('a6b7c8d9-e0f1-4a2b-8c3d-4e5f6a7b8c9d', 'E-Commerce', 'Online retail and marketplace platforms', 0, datetime('now'), datetime('now')),
  ('b8c9d0e1-f2a3-4b5c-8d6e-7f8a9b0c1d2e', 'Gaming', 'Video game development and publishing', 0, datetime('now'), datetime('now')),
  ('c2d3e4f5-a6b7-4c8d-8e9f-0a1b2c3d4e5f', 'Cybersecurity', 'Security software and services', 0, datetime('now'), datetime('now')),
  ('d4e5f6a7-b8c9-4d0e-8f1a-2b3c4d5e6f7a', 'AI/ML', 'Artificial Intelligence and Machine Learning', 0, datetime('now'), datetime('now')),
  ('e5f6a7b8-c9d0-4e1f-8a2b-3c4d5e6f7a8b', 'Cloud Services', 'Cloud infrastructure and platforms', 0, datetime('now'), datetime('now')),
  ('f6a7b8c9-d0e1-4f2a-8b3c-4d5e6f7a8b9c', 'IT Consulting', 'Technology consulting and services', 0, datetime('now'), datetime('now')),
  ('a7b8c9d0-e1f2-4a3b-8c4d-5e6f7a8b9c0d', 'Startup', 'Early-stage tech startups', 0, datetime('now'), datetime('now')),
  ('b9c0d1e2-f3a4-4b5c-8d6e-7f8a9b0c1d2e', 'Digital Agency', 'Web and mobile development agencies', 0, datetime('now'), datetime('now')),
  ('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'ESN/SSII', 'IT Services and Consulting (French market)', 0, datetime('now'), datetime('now'));

-- ============
-- Seed data for common technologies
-- ============
INSERT INTO technologies (id, name, category, created_at, updated_at) VALUES
  ('e1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 'JavaScript', 'language', datetime('now'), datetime('now')),
  ('f2b3c4d5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 'TypeScript', 'language', datetime('now'), datetime('now')),
  ('a3c4d5e6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 'Python', 'language', datetime('now'), datetime('now')),
  ('b4d5e6f7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 'Java', 'language', datetime('now'), datetime('now')),
  ('c5e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 'C#', 'language', datetime('now'), datetime('now')),
  ('d6f7a8b9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 'Go', 'language', datetime('now'), datetime('now')),
  ('e7a8b9c0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 'Rust', 'language', datetime('now'), datetime('now')),
  ('f8b9c0d1-e2f3-4a5b-6c7d-8e9f0a1b2c3d', 'PHP', 'language', datetime('now'), datetime('now')),
  ('a9c0d1e2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 'Ruby', 'language', datetime('now'), datetime('now')),
  ('b0d1e2f3-a4b5-4c6d-7e8f-9a0b1c2d3e4f', 'Swift', 'language', datetime('now'), datetime('now')),
  ('c1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 'Kotlin', 'language', datetime('now'), datetime('now')),
  ('d2f3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b', 'React', 'framework', datetime('now'), datetime('now')),
  ('e3a4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c', 'Vue.js', 'framework', datetime('now'), datetime('now')),
  ('f4b5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 'Angular', 'framework', datetime('now'), datetime('now')),
  ('a5c6d7e8-f9a0-4b1c-2d3e-4f5a6b7c8d9e', 'Next.js', 'framework', datetime('now'), datetime('now')),
  ('b6d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 'Node.js', 'framework', datetime('now'), datetime('now')),
  ('c7e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 'Express.js', 'framework', datetime('now'), datetime('now')),
  ('d8f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b', 'NestJS', 'framework', datetime('now'), datetime('now')),
  ('e9a0b1c2-d3e4-4f5a-6b7c-8d9e0f1a2b3c', 'Django', 'framework', datetime('now'), datetime('now')),
  ('f0b1c2d3-e4f5-4a6b-7c8d-9e0f1a2b3c4d', 'FastAPI', 'framework', datetime('now'), datetime('now')),
  ('a1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 'Spring Boot', 'framework', datetime('now'), datetime('now')),
  ('b2d3e4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f', '.NET', 'framework', datetime('now'), datetime('now')),
  ('c3e4f5a6-b7c8-4d9e-0f1a-2b3c4d5e6f7a', 'Ruby on Rails', 'framework', datetime('now'), datetime('now')),
  ('d4f5a6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b', 'Laravel', 'framework', datetime('now'), datetime('now')),
  ('e5a6b7c8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', 'React Native', 'framework', datetime('now'), datetime('now')),
  ('f6b7c8d9-e0f1-4a2b-3c4d-5e6f7a8b9c0d', 'Flutter', 'framework', datetime('now'), datetime('now')),
  ('a7c8d9e0-f1a2-4b3c-4d5e-6f7a8b9c0d1e', 'PostgreSQL', 'database', datetime('now'), datetime('now')),
  ('b8d9e0f1-a2b3-4c4d-5e6f-7a8b9c0d1e2f', 'MySQL', 'database', datetime('now'), datetime('now')),
  ('c9e0f1a2-b3c4-4d5e-6f7a-8b9c0d1e2f3a', 'MongoDB', 'database', datetime('now'), datetime('now')),
  ('d0f1a2b3-c4d5-4e6f-7a8b-9c0d1e2f3a4b', 'Redis', 'database', datetime('now'), datetime('now')),
  ('e1f2a3b4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', 'Elasticsearch', 'database', datetime('now'), datetime('now')),
  ('f2a3b4c5-e6f7-4a8b-9c0d-1e2f3a4b5c6d', 'AWS', 'cloud', datetime('now'), datetime('now')),
  ('a3b4c5d6-f7a8-4b9c-0d1e-2f3a4b5c6d7e', 'Google Cloud', 'cloud', datetime('now'), datetime('now')),
  ('b4c5d6e7-a8b9-4c0d-1e2f-3a4b5c6d7e8f', 'Azure', 'cloud', datetime('now'), datetime('now')),
  ('c5d6e7f8-b9c0-4d1e-2f3a-4b5c6d7e8f9a', 'Docker', 'devops', datetime('now'), datetime('now')),
  ('d6e7f8a9-c0d1-4e2f-3a4b-5c6d7e8f9a0b', 'Kubernetes', 'devops', datetime('now'), datetime('now')),
  ('e7f8a9b0-d1e2-4f3a-4b5c-6d7e8f9a0b1c', 'Terraform', 'devops', datetime('now'), datetime('now')),
  ('f8a9b0c1-e2f3-4a5b-6c7d-8e9f0a1b2c3d', 'CI/CD', 'devops', datetime('now'), datetime('now')),
  ('a9b0c1d2-f3a4-4b5c-6d7e-8f9a0b1c2d3e', 'Git', 'tool', datetime('now'), datetime('now')),
  ('b0c1d2e3-a4b5-4c6d-7e8f-9a0b1c2d3e4f', 'Agile', 'methodology', datetime('now'), datetime('now')),
  ('c1d2e3f4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 'Scrum', 'methodology', datetime('now'), datetime('now'));

-- ============
-- Seed data for common IT job tags
-- ============
INSERT INTO tags (id, name, color, description, created_at, updated_at) VALUES
  ('d1e2f3a4-b5c6-4d7e-8f9a-0b1c2d3e4f5a', 'Urgent', '#EF4444', 'High priority applications', datetime('now'), datetime('now')),
  ('e2f3a4b5-c6d7-4e8f-9a0b-1c2d3e4f5a6b', 'Dream Job', '#8B5CF6', 'Ideal position', datetime('now'), datetime('now')),
  ('f3a4b5c6-d7e8-4f9a-0b1c-2d3e4f5a6b7c', 'Referral', '#10B981', 'Applied via referral', datetime('now'), datetime('now')),
  ('a4b5c6d7-e8f9-4a0b-1c2d-3e4f5a6b7c8d', 'FAANG/Big Tech', '#3B82F6', 'Major tech company', datetime('now'), datetime('now')),
  ('b5c6d7e8-f9a0-4b1c-2d3e-4f5a6b7c8d9e', 'Remote First', '#06B6D4', 'Company is remote-first', datetime('now'), datetime('now')),
  ('c6d7e8f9-a0b1-4c2d-3e4f-5a6b7c8d9e0f', 'Relocation', '#F59E0B', 'Requires relocation', datetime('now'), datetime('now')),
  ('d7e8f9a0-b1c2-4d3e-4f5a-6b7c8d9e0f1a', 'Visa Sponsorship', '#EC4899', 'Offers visa sponsorship', datetime('now'), datetime('now')),
  ('e8f9a0b1-c2d3-4e4f-5a6b-7c8d9e0f1a2b', 'Equity/Stock', '#14B8A6', 'Includes stock options', datetime('now'), datetime('now'));
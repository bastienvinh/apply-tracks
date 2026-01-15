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
-- Companies
-- ============
CREATE TABLE IF NOT EXISTS companies (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  website       TEXT,
  industry_id   TEXT,
  location      TEXT,
  company_size  TEXT CHECK (company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
  tech_stack    TEXT, -- JSON array of technologies used
  glassdoor_url TEXT,
  notes         TEXT,
  is_default    INTEGER NOT NULL DEFAULT 0, -- 0 = false, 1 = true
  created_at    TEXT NOT NULL, -- ISO8601
  updated_at    TEXT NOT NULL, -- ISO8601
  deleted_at    TEXT,          -- ISO8601, NULL if not deleted
  FOREIGN KEY (industry_id) REFERENCES industries(id) ON DELETE SET NULL
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
  ('ind_saas', 'SaaS', 'Software as a Service companies', 1, datetime('now'), datetime('now')),
  ('ind_fintech', 'FinTech', 'Financial technology companies', 0, datetime('now'), datetime('now')),
  ('ind_healthtech', 'HealthTech', 'Healthcare technology companies', 0, datetime('now'), datetime('now')),
  ('ind_edtech', 'EdTech', 'Education technology companies', 0, datetime('now'), datetime('now')),
  ('ind_ecommerce', 'E-Commerce', 'Online retail and marketplace platforms', 0, datetime('now'), datetime('now')),
  ('ind_gaming', 'Gaming', 'Video game development and publishing', 0, datetime('now'), datetime('now')),
  ('ind_cybersecurity', 'Cybersecurity', 'Security software and services', 0, datetime('now'), datetime('now')),
  ('ind_ai_ml', 'AI/ML', 'Artificial Intelligence and Machine Learning', 0, datetime('now'), datetime('now')),
  ('ind_cloud', 'Cloud Services', 'Cloud infrastructure and platforms', 0, datetime('now'), datetime('now')),
  ('ind_consulting', 'IT Consulting', 'Technology consulting and services', 0, datetime('now'), datetime('now')),
  ('ind_startup', 'Startup', 'Early-stage tech startups', 0, datetime('now'), datetime('now')),
  ('ind_agency', 'Digital Agency', 'Web and mobile development agencies', 0, datetime('now'), datetime('now')),
  ('ind_esn', 'ESN/SSII', 'IT Services and Consulting (French market)', 0, datetime('now'), datetime('now'));

-- ============
-- Seed data for common technologies
-- ============
INSERT INTO technologies (id, name, category, created_at, updated_at) VALUES
  -- Languages
  ('tech_js', 'JavaScript', 'language', datetime('now'), datetime('now')),
  ('tech_ts', 'TypeScript', 'language', datetime('now'), datetime('now')),
  ('tech_python', 'Python', 'language', datetime('now'), datetime('now')),
  ('tech_java', 'Java', 'language', datetime('now'), datetime('now')),
  ('tech_csharp', 'C#', 'language', datetime('now'), datetime('now')),
  ('tech_go', 'Go', 'language', datetime('now'), datetime('now')),
  ('tech_rust', 'Rust', 'language', datetime('now'), datetime('now')),
  ('tech_php', 'PHP', 'language', datetime('now'), datetime('now')),
  ('tech_ruby', 'Ruby', 'language', datetime('now'), datetime('now')),
  ('tech_swift', 'Swift', 'language', datetime('now'), datetime('now')),
  ('tech_kotlin', 'Kotlin', 'language', datetime('now'), datetime('now')),
  -- Frameworks
  ('tech_react', 'React', 'framework', datetime('now'), datetime('now')),
  ('tech_vue', 'Vue.js', 'framework', datetime('now'), datetime('now')),
  ('tech_angular', 'Angular', 'framework', datetime('now'), datetime('now')),
  ('tech_nextjs', 'Next.js', 'framework', datetime('now'), datetime('now')),
  ('tech_node', 'Node.js', 'framework', datetime('now'), datetime('now')),
  ('tech_express', 'Express.js', 'framework', datetime('now'), datetime('now')),
  ('tech_nestjs', 'NestJS', 'framework', datetime('now'), datetime('now')),
  ('tech_django', 'Django', 'framework', datetime('now'), datetime('now')),
  ('tech_fastapi', 'FastAPI', 'framework', datetime('now'), datetime('now')),
  ('tech_spring', 'Spring Boot', 'framework', datetime('now'), datetime('now')),
  ('tech_dotnet', '.NET', 'framework', datetime('now'), datetime('now')),
  ('tech_rails', 'Ruby on Rails', 'framework', datetime('now'), datetime('now')),
  ('tech_laravel', 'Laravel', 'framework', datetime('now'), datetime('now')),
  ('tech_reactnative', 'React Native', 'framework', datetime('now'), datetime('now')),
  ('tech_flutter', 'Flutter', 'framework', datetime('now'), datetime('now')),
  -- Databases
  ('tech_postgres', 'PostgreSQL', 'database', datetime('now'), datetime('now')),
  ('tech_mysql', 'MySQL', 'database', datetime('now'), datetime('now')),
  ('tech_mongodb', 'MongoDB', 'database', datetime('now'), datetime('now')),
  ('tech_redis', 'Redis', 'database', datetime('now'), datetime('now')),
  ('tech_elasticsearch', 'Elasticsearch', 'database', datetime('now'), datetime('now')),
  -- Cloud
  ('tech_aws', 'AWS', 'cloud', datetime('now'), datetime('now')),
  ('tech_gcp', 'Google Cloud', 'cloud', datetime('now'), datetime('now')),
  ('tech_azure', 'Azure', 'cloud', datetime('now'), datetime('now')),
  -- DevOps
  ('tech_docker', 'Docker', 'devops', datetime('now'), datetime('now')),
  ('tech_k8s', 'Kubernetes', 'devops', datetime('now'), datetime('now')),
  ('tech_terraform', 'Terraform', 'devops', datetime('now'), datetime('now')),
  ('tech_cicd', 'CI/CD', 'devops', datetime('now'), datetime('now')),
  ('tech_git', 'Git', 'tool', datetime('now'), datetime('now')),
  -- Methodologies
  ('tech_agile', 'Agile', 'methodology', datetime('now'), datetime('now')),
  ('tech_scrum', 'Scrum', 'methodology', datetime('now'), datetime('now'));

-- ============
-- Seed data for common IT job tags
-- ============
INSERT INTO tags (id, name, color, description, created_at, updated_at) VALUES
  ('tag_urgent', 'Urgent', '#EF4444', 'High priority applications', datetime('now'), datetime('now')),
  ('tag_dream', 'Dream Job', '#8B5CF6', 'Ideal position', datetime('now'), datetime('now')),
  ('tag_referral', 'Referral', '#10B981', 'Applied via referral', datetime('now'), datetime('now')),
  ('tag_faang', 'FAANG/Big Tech', '#3B82F6', 'Major tech company', datetime('now'), datetime('now')),
  ('tag_remote_first', 'Remote First', '#06B6D4', 'Company is remote-first', datetime('now'), datetime('now')),
  ('tag_relocation', 'Relocation', '#F59E0B', 'Requires relocation', datetime('now'), datetime('now')),
  ('tag_visa', 'Visa Sponsorship', '#EC4899', 'Offers visa sponsorship', datetime('now'), datetime('now')),
  ('tag_equity', 'Equity/Stock', '#14B8A6', 'Includes stock options', datetime('now'), datetime('now'));
-- Seed data for apply-track application
-- This migration adds sample data for testing and development

-- ============
-- Companies
-- ============
INSERT INTO companies (id, name, website, industry, location, notes, created_at, updated_at)
VALUES
  ('comp-001', 'TechCorp Solutions', 'https://techcorp.example.com', 'Technology', 'San Francisco, CA', 'Leading software development company', '2026-01-01T10:00:00Z', '2026-01-01T10:00:00Z'),
  ('comp-002', 'DataVision Analytics', 'https://datavision.example.com', 'Data Science', 'New York, NY', 'Specializes in AI and machine learning', '2026-01-02T10:00:00Z', '2026-01-02T10:00:00Z'),
  ('comp-003', 'CloudScale Systems', 'https://cloudscale.example.com', 'Cloud Computing', 'Seattle, WA', 'Cloud infrastructure provider', '2026-01-03T10:00:00Z', '2026-01-03T10:00:00Z'),
  ('comp-004', 'StartupHub', 'https://startuphub.example.com', 'Software', 'Austin, TX', 'Fast-growing startup', '2026-01-04T10:00:00Z', '2026-01-04T10:00:00Z'),
  ('comp-005', 'EnterpriseWorks', 'https://enterpriseworks.example.com', 'Enterprise Software', 'Boston, MA', 'Large enterprise solutions provider', '2026-01-05T10:00:00Z', '2026-01-05T10:00:00Z');

-- ============
-- Contacts
-- ============
INSERT INTO contacts (id, name, role, company_id, email, phone, linkedin_url, notes, created_at, updated_at)
VALUES
  ('contact-001', 'Sarah Johnson', 'Senior Recruiter', 'comp-001', 'sarah.johnson@techcorp.example.com', '+1-555-0101', 'https://linkedin.com/in/sarahjohnson', 'Very responsive and helpful', '2026-01-01T11:00:00Z', '2026-01-01T11:00:00Z'),
  ('contact-002', 'Michael Chen', 'Engineering Manager', 'comp-001', 'michael.chen@techcorp.example.com', '+1-555-0102', 'https://linkedin.com/in/michaelchen', 'Leads the frontend team', '2026-01-01T11:30:00Z', '2026-01-01T11:30:00Z'),
  ('contact-003', 'Emily Rodriguez', 'HR Director', 'comp-002', 'emily.rodriguez@datavision.example.com', '+1-555-0201', 'https://linkedin.com/in/emilyrodriguez', 'Handles initial screening', '2026-01-02T11:00:00Z', '2026-01-02T11:00:00Z'),
  ('contact-004', 'David Park', 'CTO', 'comp-003', 'david.park@cloudscale.example.com', '+1-555-0301', 'https://linkedin.com/in/davidpark', 'Technical lead for interviews', '2026-01-03T11:00:00Z', '2026-01-03T11:00:00Z'),
  ('contact-005', 'Lisa Wang', 'Talent Acquisition', 'comp-004', 'lisa.wang@startuphub.example.com', '+1-555-0401', 'https://linkedin.com/in/lisawang', 'Startup recruiter', '2026-01-04T11:00:00Z', '2026-01-04T11:00:00Z');

-- ============
-- Tags
-- ============
INSERT INTO tags (id, name, color, description, created_at, updated_at)
VALUES
  ('tag-001', 'Frontend', '#3b82f6', 'Frontend development positions', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-002', 'Backend', '#10b981', 'Backend development positions', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-003', 'Full Stack', '#8b5cf6', 'Full stack development positions', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-004', 'Remote', '#f59e0b', 'Fully remote positions', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-005', 'Startup', '#ef4444', 'Startup companies', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-006', 'Senior', '#6366f1', 'Senior level positions', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-007', 'Priority', '#ec4899', 'High priority applications', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z');

-- ============
-- Applications
-- ============
INSERT INTO applications (id, position_title, company_id, status, remote_mode, contract_type, location, application_url, source, notes, created_at, updated_at)
VALUES
  ('app-001', 'Senior Frontend Developer', 'comp-001', 'Interview', 'hybrid', 'CDI', 'San Francisco, CA', 'https://techcorp.example.com/jobs/123', 'LinkedIn', 'Second round interview scheduled', '2026-01-05T10:00:00Z', '2026-01-08T14:00:00Z'),
  ('app-002', 'Full Stack Engineer', 'comp-002', 'Applied', 'remote', 'CDI', 'Remote', 'https://datavision.example.com/careers/456', 'Company Website', 'Applied via company website', '2026-01-06T10:00:00Z', '2026-01-06T10:00:00Z'),
  ('app-003', 'Backend Developer', 'comp-003', 'Screening', 'hybrid', 'CDI', 'Seattle, WA', 'https://cloudscale.example.com/jobs/789', 'Referral', 'Referred by a friend', '2026-01-07T10:00:00Z', '2026-01-09T10:00:00Z'),
  ('app-004', 'Software Engineer', 'comp-004', 'Rejected', 'onsite', 'CDI', 'Austin, TX', 'https://startuphub.example.com/careers/321', 'Indeed', 'Not enough experience with their tech stack', '2026-01-03T10:00:00Z', '2026-01-06T10:00:00Z'),
  ('app-005', 'Lead Developer', 'comp-005', 'Draft', 'hybrid', 'CDI', 'Boston, MA', 'https://enterpriseworks.example.com/jobs/654', 'LinkedIn', 'Planning to apply next week', '2026-01-10T10:00:00Z', '2026-01-10T10:00:00Z');

-- ============
-- Application-Contact relationships
-- ============
INSERT INTO application_contacts (application_id, contact_id)
VALUES
  ('app-001', 'contact-001'),
  ('app-001', 'contact-002'),
  ('app-002', 'contact-003'),
  ('app-003', 'contact-004'),
  ('app-004', 'contact-005');

-- ============
-- Application-Tag relationships
-- ============
INSERT INTO application_tags (application_id, tag_id)
VALUES
  ('app-001', 'tag-001'),
  ('app-001', 'tag-006'),
  ('app-001', 'tag-007'),
  ('app-002', 'tag-003'),
  ('app-002', 'tag-004'),
  ('app-003', 'tag-002'),
  ('app-003', 'tag-006'),
  ('app-004', 'tag-003'),
  ('app-004', 'tag-005'),
  ('app-005', 'tag-002');

-- ============
-- Feedbacks
-- ============
INSERT INTO feedbacks (id, application_id, contact_id, step, display_order, author, content, created_at, updated_at)
VALUES
  ('feedback-001', 'app-001', 'contact-001', 'Applied', 1, 'me', 'Submitted application through their careers portal. Highlighted my React and TypeScript experience.', '2026-01-05T10:30:00Z', '2026-01-05T10:30:00Z'),
  ('feedback-002', 'app-001', 'contact-001', 'Screening', 2, 'company', 'HR screening went well. They are interested in my frontend expertise and team leadership experience.', '2026-01-06T15:00:00Z', '2026-01-06T15:00:00Z'),
  ('feedback-003', 'app-001', 'contact-002', 'Interview', 3, 'me', 'Technical interview with engineering manager. Discussed architecture decisions and code review practices. Positive feedback.', '2026-01-08T14:00:00Z', '2026-01-08T14:00:00Z'),
  ('feedback-004', 'app-002', 'contact-003', 'Applied', 1, 'me', 'Applied for full stack position. Emphasized both frontend and backend skills.', '2026-01-06T10:30:00Z', '2026-01-06T10:30:00Z'),
  ('feedback-005', 'app-003', 'contact-004', 'Applied', 1, 'me', 'Friend referred me to this position. Strong match for the role requirements.', '2026-01-07T10:30:00Z', '2026-01-07T10:30:00Z'),
  ('feedback-006', 'app-003', 'contact-004', 'Screening', 2, 'company', 'Initial phone screening completed. Moving to technical assessment.', '2026-01-09T11:00:00Z', '2026-01-09T11:00:00Z'),
  ('feedback-007', 'app-004', 'contact-005', 'Applied', 1, 'me', 'Applied to startup position. Excited about the product and team.', '2026-01-03T10:30:00Z', '2026-01-03T10:30:00Z'),
  ('feedback-008', 'app-004', 'contact-005', 'Rejected', 2, 'company', 'Unfortunately rejected. They needed someone with more experience in Go and Kubernetes.', '2026-01-06T16:00:00Z', '2026-01-06T16:00:00Z');

-- Seed data for apply-track application
-- This migration adds sample data for testing and development

-- ============
-- Industries
-- ============
INSERT INTO industries (id, name, description, is_default, created_at, updated_at)
VALUES
  ('c7e6e3a2-7f2a-4a9a-9b2d-1f1e5b8e1a01', 'Autre', 'Industrie par défaut', 1, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
  ('e2b1c3d4-5f6a-4b7c-8d9e-0a1b2c3d4e5f', 'Technologie', 'Entreprises du secteur technologique et numérique', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('a3b2c1d4-6e7f-4a8b-9c0d-1e2f3a4b5c6d', 'Finance', 'Banques, assurances et services financiers', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('b4c3d2e1-7f8a-4b9c-0d1e-2f3a4b5c6d7e', 'Conseil', 'Cabinets de conseil et ESN', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('c5d4e3f2-8a9b-4c0d-1e2f-3a4b5c6d7e8f', 'E-commerce', 'Commerce en ligne et marketplaces', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('d6e5f4a3-9b0c-4d1e-2f3a-4b5c6d7e8f9a', 'Santé', 'Healthtech et services de santé', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('e7f6a5b4-0c1d-4e2f-3a4b-5c6d7e8f9a0b', 'Énergie', 'Énergies renouvelables et utilities', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('f8a7b6c5-1d2e-4f3a-4b5c-6d7e8f9a0b1c', 'Transport', 'Mobilité et logistique', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('09b8a7c6-2e3f-4a5b-6c7d-8e9f0a1b2c3d', 'Média', 'Médias, divertissement et communication', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z');

-- ============
-- Companies
-- ============
INSERT INTO companies (id, name, website, industry_id, location, notes, is_default, created_at, updated_at)
VALUES
  ('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Non spécifiée', NULL, 'c7e6e3a2-7f2a-4a9a-9b2d-1f1e5b8e1a01', NULL, 'Entreprise par défaut', 1, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
  ('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'Capgemini', 'https://www.capgemini.com', 'b4c3d2e1-7f8a-4b9c-0d1e-2f3a4b5c6d7e', 'Paris, France', 'Leader mondial du conseil et des services informatiques', 0, '2026-01-01T10:00:00Z', '2026-01-01T10:00:00Z'),
  ('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Doctolib', 'https://www.doctolib.fr', 'd6e5f4a3-9b0c-4d1e-2f3a-4b5c6d7e8f9a', 'Paris, France', 'Licorne française spécialisée dans la e-santé', 0, '2026-01-02T10:00:00Z', '2026-01-02T10:00:00Z'),
  ('4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'BlaBlaCar', 'https://www.blablacar.fr', 'f8a7b6c5-1d2e-4f3a-4b5c-6d7e8f9a0b1c', 'Paris, France', 'Plateforme de covoiturage leader en Europe', 0, '2026-01-03T10:00:00Z', '2026-01-03T10:00:00Z'),
  ('5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'OVHcloud', 'https://www.ovhcloud.com', 'e2b1c3d4-5f6a-4b7c-8d9e-0a1b2c3d4e5f', 'Roubaix, France', 'Hébergeur cloud européen majeur', 0, '2026-01-04T10:00:00Z', '2026-01-04T10:00:00Z'),
  ('6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'Société Générale', 'https://www.societegenerale.com', 'a3b2c1d4-6e7f-4a8b-9c0d-1e2f3a4b5c6d', 'Paris La Défense, France', 'Grande banque française', 0, '2026-01-05T10:00:00Z', '2026-01-05T10:00:00Z');

-- ============
-- Contacts
-- ============
INSERT INTO contacts (id, name, role, company_id, email, phone, linkedin_url, notes, created_at, updated_at)
VALUES
  ('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'Marie Dupont', 'Responsable Recrutement', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'marie.dupont@capgemini.com', '+33 6 12 34 56 78', 'https://linkedin.com/in/mariedupont', 'Très réactive et professionnelle', '2026-01-01T11:00:00Z', '2026-01-01T11:00:00Z'),
  ('8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'Thomas Martin', 'Engineering Manager', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'thomas.martin@capgemini.com', '+33 6 23 45 67 89', 'https://linkedin.com/in/thomasmartin', 'Responsable équipe frontend', '2026-01-01T11:30:00Z', '2026-01-01T11:30:00Z'),
  ('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'Sophie Leroy', 'Talent Acquisition', '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'sophie.leroy@doctolib.fr', '+33 6 34 56 78 90', 'https://linkedin.com/in/sophieleroy', 'Gère le premier entretien', '2026-01-02T11:00:00Z', '2026-01-02T11:00:00Z'),
  ('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'Pierre Bernard', 'CTO', '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'pierre.bernard@blablacar.com', '+33 6 45 67 89 01', 'https://linkedin.com/in/pierrebernard', 'Responsable technique des entretiens', '2026-01-03T11:00:00Z', '2026-01-03T11:00:00Z'),
  ('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', 'Julie Moreau', 'Chargée RH', '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'julie.moreau@ovhcloud.com', '+33 6 56 78 90 12', 'https://linkedin.com/in/juliemoreau', 'Recrutement technique', '2026-01-04T11:00:00Z', '2026-01-04T11:00:00Z');

-- ============
-- Tags
-- ============
INSERT INTO tags (id, name, color, description, created_at, updated_at)
VALUES
  ('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'Frontend', '#3b82f6', 'Postes de développement frontend', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d', 'Backend', '#10b981', 'Postes de développement backend', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 'Full Stack', '#8b5cf6', 'Postes de développement full stack', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'Télétravail', '#f59e0b', 'Postes en télétravail complet', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('6d7e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a', 'Startup', '#ef4444', 'Entreprises en phase de démarrage', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b', 'Senior', '#6366f1', 'Postes de niveau senior', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c', 'Prioritaire', '#ec4899', 'Candidatures prioritaires', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  -- Technologies
  ('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'React', '#61dafb', 'React.js framework', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('0b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e', 'Node.js', '#339933', 'Node.js runtime', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f', 'TypeScript', '#3178c6', 'TypeScript language', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a', 'Python', '#3776ab', 'Python language', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('3e4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7a8b', 'Vue.js', '#4fc08d', 'Vue.js framework', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('4f5a6b7c-8d9e-0f1a-2b3c-4d5e6f7a8b9c', 'Angular', '#dd0031', 'Angular framework', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('5a6b7c8d-9e0f-1a2b-3c4d-5e6f7a8b9c0d', 'Java', '#007396', 'Java language', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e', 'Go', '#00add8', 'Go language', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('7c8d9e0f-1a2b-3c4d-5e6f-7a8b9c0d1e2f', 'Rust', '#dea584', 'Rust language', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('8d9e0f1a-2b3c-4d5e-6f7a-8b9c0d1e2f3a', 'Docker', '#2496ed', 'Docker containerization', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('9e0f1a2b-3c4d-5e6f-7a8b-9c0d1e2f3a4b', 'Kubernetes', '#326ce5', 'Kubernetes orchestration', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('0f1a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c', 'AWS', '#ff9900', 'Amazon Web Services', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'PostgreSQL', '#4169e1', 'PostgreSQL database', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'MongoDB', '#47a248', 'MongoDB database', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'GraphQL', '#e10098', 'GraphQL API', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'Next.js', '#000000', 'Next.js framework', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'PHP', '#777bb4', 'PHP language', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'C#', '#239120', 'C# language / .NET', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'Ruby', '#cc342d', 'Ruby / Ruby on Rails', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'Tailwind CSS', '#06b6d4', 'Tailwind CSS framework', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z');

-- ============
-- Applications
-- ============
INSERT INTO applications (id, position_title, company_id, status, remote_mode, contract_type, location, application_url, source, notes, created_at, updated_at)
VALUES
  ('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'Développeur Frontend Senior', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'Interview', 'hybrid', 'CDI', 'Paris, France', 'https://capgemini.com/careers/123', 'LinkedIn', 'Deuxième entretien prévu', '2026-01-05T10:00:00Z', '2026-01-08T14:00:00Z'),
  ('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'Ingénieur Full Stack', '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Applied', 'remote', 'CDI', 'Télétravail', 'https://doctolib.fr/careers/456', 'Site carrière', 'Candidature via le site de l''entreprise', '2026-01-06T10:00:00Z', '2026-01-06T10:00:00Z'),
  ('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', 'Développeur Backend', '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'Screening', 'hybrid', 'CDI', 'Paris, France', 'https://blablacar.com/jobs/789', 'Cooptation', 'Recommandé par un ami', '2026-01-07T10:00:00Z', '2026-01-09T10:00:00Z'),
  ('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'Ingénieur Logiciel', '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'Rejected', 'onsite', 'CDI', 'Roubaix, France', 'https://ovhcloud.com/careers/321', 'Indeed', 'Pas assez d''expérience sur leur stack technique', '2026-01-03T10:00:00Z', '2026-01-06T10:00:00Z'),
  ('3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d', 'Lead Développeur', '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'Draft', 'hybrid', 'CDI', 'Paris La Défense, France', 'https://societegenerale.com/jobs/654', 'LinkedIn', 'Prévu de postuler la semaine prochaine', '2026-01-10T10:00:00Z', '2026-01-10T10:00:00Z');

-- ============
-- Application-Contact relationships
-- ============
INSERT INTO application_contacts (application_id, contact_id)
VALUES
  ('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d'),
  ('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e'),
  ('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f'),
  ('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a'),
  ('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b');

-- ============
-- Application-Tag relationships
-- ============
INSERT INTO application_tags (application_id, tag_id)
VALUES
  ('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c'),
  ('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b'),
  ('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c'),
  ('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e'),
  ('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f'),
  ('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', '3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d'),
  ('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', '7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b'),
  ('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e'),
  ('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', '6d7e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a'),
  ('3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d', '3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d');

-- ============
-- Feedbacks
-- ============
INSERT INTO feedbacks (id, application_id, contact_id, step, display_order, author, content, created_at, updated_at)
VALUES
  ('4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'Applied', 1, 'me', 'Candidature envoyée via leur portail carrières. Mis en avant mon expérience React et TypeScript.', '2026-01-05T10:30:00Z', '2026-01-05T10:30:00Z'),
  ('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'Screening', 2, 'company', 'Entretien RH bien passé. Ils sont intéressés par mon expertise frontend et mon expérience de management.', '2026-01-06T15:00:00Z', '2026-01-06T15:00:00Z'),
  ('6d7e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'Interview', 3, 'me', 'Entretien technique avec le manager engineering. Discussion sur les choix d''architecture et les pratiques de code review. Retour positif.', '2026-01-08T14:00:00Z', '2026-01-08T14:00:00Z'),
  ('7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b', '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'Applied', 1, 'me', 'Candidature pour le poste full stack. Mis en avant mes compétences frontend et backend.', '2026-01-06T10:30:00Z', '2026-01-06T10:30:00Z'),
  ('8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c', '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'Applied', 1, 'me', 'Coopté par un ami pour ce poste. Bon match avec les exigences du rôle.', '2026-01-07T10:30:00Z', '2026-01-07T10:30:00Z'),
  ('9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d', '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'Screening', 2, 'company', 'Premier entretien téléphonique terminé. Passage à l''évaluation technique.', '2026-01-09T11:00:00Z', '2026-01-09T11:00:00Z'),
  ('0b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e', '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', 'Applied', 1, 'me', 'Candidature envoyée. Enthousiaste sur le produit et l''équipe.', '2026-01-03T10:30:00Z', '2026-01-03T10:30:00Z'),
  ('1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f', '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', 'Rejected', 2, 'company', 'Malheureusement refusé. Ils cherchaient quelqu''un avec plus d''expérience en Go et Kubernetes.', '2026-01-06T16:00:00Z', '2026-01-06T16:00:00Z');

-- Seed data for apply-track application
-- This migration adds sample data for testing and development

-- ============
-- Industries
-- ============
INSERT INTO industries (id, name, description, is_default, created_at, updated_at)
VALUES
  ('ind-000', 'Autre', 'Industrie par défaut', 1, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
  ('ind-001', 'Technologie', 'Entreprises du secteur technologique et numérique', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('ind-002', 'Finance', 'Banques, assurances et services financiers', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('ind-003', 'Conseil', 'Cabinets de conseil et ESN', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('ind-004', 'E-commerce', 'Commerce en ligne et marketplaces', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('ind-005', 'Santé', 'Healthtech et services de santé', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('ind-006', 'Énergie', 'Énergies renouvelables et utilities', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('ind-007', 'Transport', 'Mobilité et logistique', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('ind-008', 'Média', 'Médias, divertissement et communication', 0, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z');

-- ============
-- Companies
-- ============
INSERT INTO companies (id, name, website, industry_id, location, notes, is_default, created_at, updated_at)
VALUES
  ('comp-000', 'Non spécifiée', NULL, 'ind-000', NULL, 'Entreprise par défaut', 1, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
  ('comp-001', 'Capgemini', 'https://www.capgemini.com', 'ind-003', 'Paris, France', 'Leader mondial du conseil et des services informatiques', 0, '2026-01-01T10:00:00Z', '2026-01-01T10:00:00Z'),
  ('comp-002', 'Doctolib', 'https://www.doctolib.fr', 'ind-005', 'Paris, France', 'Licorne française spécialisée dans la e-santé', 0, '2026-01-02T10:00:00Z', '2026-01-02T10:00:00Z'),
  ('comp-003', 'BlaBlaCar', 'https://www.blablacar.fr', 'ind-007', 'Paris, France', 'Plateforme de covoiturage leader en Europe', 0, '2026-01-03T10:00:00Z', '2026-01-03T10:00:00Z'),
  ('comp-004', 'OVHcloud', 'https://www.ovhcloud.com', 'ind-001', 'Roubaix, France', 'Hébergeur cloud européen majeur', 0, '2026-01-04T10:00:00Z', '2026-01-04T10:00:00Z'),
  ('comp-005', 'Société Générale', 'https://www.societegenerale.com', 'ind-002', 'Paris La Défense, France', 'Grande banque française', 0, '2026-01-05T10:00:00Z', '2026-01-05T10:00:00Z');

-- ============
-- Contacts
-- ============
INSERT INTO contacts (id, name, role, company_id, email, phone, linkedin_url, notes, created_at, updated_at)
VALUES
  ('contact-001', 'Marie Dupont', 'Responsable Recrutement', 'comp-001', 'marie.dupont@capgemini.com', '+33 6 12 34 56 78', 'https://linkedin.com/in/mariedupont', 'Très réactive et professionnelle', '2026-01-01T11:00:00Z', '2026-01-01T11:00:00Z'),
  ('contact-002', 'Thomas Martin', 'Engineering Manager', 'comp-001', 'thomas.martin@capgemini.com', '+33 6 23 45 67 89', 'https://linkedin.com/in/thomasmartin', 'Responsable équipe frontend', '2026-01-01T11:30:00Z', '2026-01-01T11:30:00Z'),
  ('contact-003', 'Sophie Leroy', 'Talent Acquisition', 'comp-002', 'sophie.leroy@doctolib.fr', '+33 6 34 56 78 90', 'https://linkedin.com/in/sophieleroy', 'Gère le premier entretien', '2026-01-02T11:00:00Z', '2026-01-02T11:00:00Z'),
  ('contact-004', 'Pierre Bernard', 'CTO', 'comp-003', 'pierre.bernard@blablacar.com', '+33 6 45 67 89 01', 'https://linkedin.com/in/pierrebernard', 'Responsable technique des entretiens', '2026-01-03T11:00:00Z', '2026-01-03T11:00:00Z'),
  ('contact-005', 'Julie Moreau', 'Chargée RH', 'comp-004', 'julie.moreau@ovhcloud.com', '+33 6 56 78 90 12', 'https://linkedin.com/in/juliemoreau', 'Recrutement technique', '2026-01-04T11:00:00Z', '2026-01-04T11:00:00Z');

-- ============
-- Tags
-- ============
INSERT INTO tags (id, name, color, description, created_at, updated_at)
VALUES
  ('tag-001', 'Frontend', '#3b82f6', 'Postes de développement frontend', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-002', 'Backend', '#10b981', 'Postes de développement backend', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-003', 'Full Stack', '#8b5cf6', 'Postes de développement full stack', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-004', 'Télétravail', '#f59e0b', 'Postes en télétravail complet', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-005', 'Startup', '#ef4444', 'Entreprises en phase de démarrage', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-006', 'Senior', '#6366f1', 'Postes de niveau senior', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z'),
  ('tag-007', 'Prioritaire', '#ec4899', 'Candidatures prioritaires', '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z');

-- ============
-- Applications
-- ============
INSERT INTO applications (id, position_title, company_id, status, remote_mode, contract_type, location, application_url, source, notes, created_at, updated_at)
VALUES
  ('app-001', 'Développeur Frontend Senior', 'comp-001', 'Interview', 'hybrid', 'CDI', 'Paris, France', 'https://capgemini.com/careers/123', 'LinkedIn', 'Deuxième entretien prévu', '2026-01-05T10:00:00Z', '2026-01-08T14:00:00Z'),
  ('app-002', 'Ingénieur Full Stack', 'comp-002', 'Applied', 'remote', 'CDI', 'Télétravail', 'https://doctolib.fr/careers/456', 'Site carrière', 'Candidature via le site de l''entreprise', '2026-01-06T10:00:00Z', '2026-01-06T10:00:00Z'),
  ('app-003', 'Développeur Backend', 'comp-003', 'Screening', 'hybrid', 'CDI', 'Paris, France', 'https://blablacar.com/jobs/789', 'Cooptation', 'Recommandé par un ami', '2026-01-07T10:00:00Z', '2026-01-09T10:00:00Z'),
  ('app-004', 'Ingénieur Logiciel', 'comp-004', 'Rejected', 'onsite', 'CDI', 'Roubaix, France', 'https://ovhcloud.com/careers/321', 'Indeed', 'Pas assez d''expérience sur leur stack technique', '2026-01-03T10:00:00Z', '2026-01-06T10:00:00Z'),
  ('app-005', 'Lead Développeur', 'comp-005', 'Draft', 'hybrid', 'CDI', 'Paris La Défense, France', 'https://societegenerale.com/jobs/654', 'LinkedIn', 'Prévu de postuler la semaine prochaine', '2026-01-10T10:00:00Z', '2026-01-10T10:00:00Z');

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
  ('feedback-001', 'app-001', 'contact-001', 'Applied', 1, 'me', 'Candidature envoyée via leur portail carrières. Mis en avant mon expérience React et TypeScript.', '2026-01-05T10:30:00Z', '2026-01-05T10:30:00Z'),
  ('feedback-002', 'app-001', 'contact-001', 'Screening', 2, 'company', 'Entretien RH bien passé. Ils sont intéressés par mon expertise frontend et mon expérience de management.', '2026-01-06T15:00:00Z', '2026-01-06T15:00:00Z'),
  ('feedback-003', 'app-001', 'contact-002', 'Interview', 3, 'me', 'Entretien technique avec le manager engineering. Discussion sur les choix d''architecture et les pratiques de code review. Retour positif.', '2026-01-08T14:00:00Z', '2026-01-08T14:00:00Z'),
  ('feedback-004', 'app-002', 'contact-003', 'Applied', 1, 'me', 'Candidature pour le poste full stack. Mis en avant mes compétences frontend et backend.', '2026-01-06T10:30:00Z', '2026-01-06T10:30:00Z'),
  ('feedback-005', 'app-003', 'contact-004', 'Applied', 1, 'me', 'Coopté par un ami pour ce poste. Bon match avec les exigences du rôle.', '2026-01-07T10:30:00Z', '2026-01-07T10:30:00Z'),
  ('feedback-006', 'app-003', 'contact-004', 'Screening', 2, 'company', 'Premier entretien téléphonique terminé. Passage à l''évaluation technique.', '2026-01-09T11:00:00Z', '2026-01-09T11:00:00Z'),
  ('feedback-007', 'app-004', 'contact-005', 'Applied', 1, 'me', 'Candidature envoyée. Enthousiaste sur le produit et l''équipe.', '2026-01-03T10:30:00Z', '2026-01-03T10:30:00Z'),
  ('feedback-008', 'app-004', 'contact-005', 'Rejected', 2, 'company', 'Malheureusement refusé. Ils cherchaient quelqu''un avec plus d''expérience en Go et Kubernetes.', '2026-01-06T16:00:00Z', '2026-01-06T16:00:00Z');

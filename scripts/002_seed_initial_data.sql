-- Seed initial data for AyurSutra

-- Insert sample centers
INSERT INTO centers (name, address, phone, email, facilities, rating, total_reviews) VALUES
('AyurSutra Wellness Center - Koramangala', '123 Koramangala, Bangalore, Karnataka 560034', '+91 98765 43210', 'koramangala@ayursutra.com', ARRAY['Parking', 'AC Rooms', 'Herbal Pharmacy', 'Consultation Rooms'], 4.8, 324),
('AyurSutra Healing Center - Indiranagar', '456 Indiranagar, Bangalore, Karnataka 560038', '+91 98765 43211', 'indiranagar@ayursutra.com', ARRAY['Valet Parking', 'Premium Rooms', 'Yoga Studio', 'Cafe'], 4.6, 198),
('AyurSutra Wellness Hub - Whitefield', '789 Whitefield, Bangalore, Karnataka 560066', '+91 98765 43212', 'whitefield@ayursutra.com', ARRAY['Parking', 'Garden Area', 'Meditation Hall', 'Herbal Kitchen'], 4.7, 156);

-- Insert sample treatments
INSERT INTO treatments (name, description, duration_minutes, base_price, category, benefits, preparation_instructions) VALUES
('Abhyanga', 'Full body therapeutic oil massage for relaxation and circulation', 60, 3500, 'massage', ARRAY['Stress reduction', 'Better circulation', 'Muscle relaxation'], 'Avoid heavy meals 2 hours before treatment'),
('Shirodhara', 'Continuous pouring of medicated oil on forehead for mental clarity', 45, 4000, 'panchakarma', ARRAY['Mental clarity', 'Anxiety relief', 'Better focus'], 'Come with comfortable clothes, avoid caffeine'),
('Panchakarma Detox', 'Complete 5-step detoxification program', 1440, 25000, 'panchakarma', ARRAY['Complete detox', 'System reset', 'Improved immunity'], '3-day preparation diet required'),
('Ayurvedic Consultation', 'Comprehensive health assessment and treatment planning', 30, 2000, 'consultation', ARRAY['Personalized diagnosis', 'Treatment planning', 'Lifestyle guidance'], 'Bring previous medical reports'),
('Nasya Therapy', 'Nasal administration of medicated oils for respiratory health', 30, 2000, 'panchakarma', ARRAY['Respiratory health', 'Sinus relief', 'Mental clarity'], 'Avoid cold foods before treatment'),
('Udvartana', 'Herbal powder massage for weight management and skin health', 45, 2500, 'massage', ARRAY['Weight management', 'Skin health', 'Circulation'], 'Wear old clothes that can get stained');

-- Insert sample treatment packages
INSERT INTO treatment_packages (name, description, total_duration_days, total_price, success_rate, target_conditions) VALUES
('Stress Relief Package', 'Comprehensive stress management program', 21, 9000, 94.5, ARRAY['Stress', 'Anxiety', 'Sleep issues']),
('Digestive Wellness Package', 'Complete digestive health restoration', 14, 13000, 89.2, ARRAY['Digestive issues', 'IBS', 'Acidity']),
('Complete Panchakarma', 'Traditional 21-day detoxification program', 21, 25000, 96.8, ARRAY['Complete detox', 'Chronic conditions', 'Rejuvenation']),
('Weight Management Package', 'Ayurvedic approach to healthy weight loss', 28, 15000, 87.3, ARRAY['Obesity', 'Metabolic issues', 'PCOS']);

-- Link treatments to packages
INSERT INTO package_treatments (package_id, treatment_id, sessions_count, is_optional) VALUES
-- Stress Relief Package
(1, 1, 7, FALSE), -- Abhyanga
(1, 2, 5, FALSE), -- Shirodhara
(1, 4, 2, FALSE), -- Consultation
(1, 5, 3, TRUE),  -- Nasya (optional)

-- Digestive Wellness Package
(2, 4, 2, FALSE), -- Consultation
(2, 1, 5, FALSE), -- Abhyanga
(2, 3, 1, FALSE), -- Panchakarma

-- Complete Panchakarma
(3, 3, 1, FALSE), -- Full Panchakarma
(3, 4, 3, FALSE), -- Multiple consultations

-- Weight Management Package
(4, 6, 10, FALSE), -- Udvartana
(4, 1, 8, FALSE),  -- Abhyanga
(4, 4, 4, FALSE);  -- Consultations

-- Insert sample users (passwords should be hashed in real implementation)
INSERT INTO users (email, password_hash, role) VALUES
('admin@ayursutra.com', '$2b$10$example_hash_admin', 'admin'),
('dr.priya@ayursutra.com', '$2b$10$example_hash_doctor1', 'doctor'),
('dr.rajesh@ayursutra.com', '$2b$10$example_hash_doctor2', 'doctor'),
('dr.meera@ayursutra.com', '$2b$10$example_hash_doctor3', 'doctor'),
('john.doe@email.com', '$2b$10$example_hash_patient1', 'patient'),
('sarah.johnson@email.com', '$2b$10$example_hash_patient2', 'patient');

-- Insert sample doctors
INSERT INTO doctors (user_id, center_id, first_name, last_name, specialization, experience_years, languages, rating, total_reviews, consultation_fee) VALUES
(2, 1, 'Priya', 'Sharma', 'Panchakarma Specialist', 12, ARRAY['English', 'Hindi', 'Kannada'], 4.9, 156, 2000),
(3, 1, 'Rajesh', 'Kumar', 'Ayurvedic Physician', 8, ARRAY['English', 'Hindi'], 4.7, 89, 1800),
(4, 2, 'Meera', 'Nair', 'Stress Management Expert', 15, ARRAY['English', 'Malayalam', 'Tamil'], 4.8, 203, 2200);

-- Insert sample patients
INSERT INTO patients (user_id, first_name, last_name, phone, date_of_birth, gender, constitution, stress_level, sleep_quality, digestive_health, energy_level, status) VALUES
(5, 'John', 'Doe', '+91 98765 43210', '1990-05-15', 'male', 'Vata-Pitta', 7, 5, 6, 4, 'active'),
(6, 'Sarah', 'Johnson', '+91 98765 43211', '1985-08-22', 'female', 'Pitta-Kapha', 5, 7, 8, 7, 'active');

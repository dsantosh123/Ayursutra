-- Add unique Patient ID column to patients table
ALTER TABLE patients ADD COLUMN IF NOT EXISTS patient_id VARCHAR(20) UNIQUE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON patients(patient_id);

-- Update existing patients with generated Patient IDs (if any exist)
UPDATE patients 
SET patient_id = 'AYU-' || EXTRACT(YEAR FROM created_at) || '-' || LPAD(id::text, 3, '0')
WHERE patient_id IS NULL;

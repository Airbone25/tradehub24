/*
  # Create authentication tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `user_type` (text, either 'homeowner' or 'professional')
      - `full_name` (text)
      - `phone` (text)
      - `email_verified` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `professional_profiles` 
      - `id` (uuid, primary key, references user_profiles)
      - `company_name` (text)
      - `business_address` (text)
      - `trade_type` (text)
      - `years_experience` (integer)
      - `license_number` (text)
      - `insurance_info` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('homeowner', 'professional')),
  full_name text,
  phone text,
  email_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create professional_profiles table
CREATE TABLE IF NOT EXISTS professional_profiles (
  id uuid PRIMARY KEY REFERENCES user_profiles ON DELETE CASCADE,
  company_name text,
  business_address text,
  trade_type text,
  years_experience integer,
  license_number text,
  insurance_info text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can read own profile" 
  ON user_profiles 
  FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON user_profiles 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);

-- Policies for professional_profiles
CREATE POLICY "Users can read professional profiles" 
  ON professional_profiles 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Professionals can update own profile" 
  ON professional_profiles 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email_verified)
  VALUES (NEW.id, NEW.email_confirmed_at IS NOT NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
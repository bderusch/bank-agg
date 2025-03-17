-- Create spending_categories table
CREATE TABLE IF NOT EXISTS spending_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create income_sources table
CREATE TABLE IF NOT EXISTS income_sources (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spending_data table
CREATE TABLE IF NOT EXISTS spending_data (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  category_id INTEGER REFERENCES spending_categories(id),
  amount DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create income_data table
CREATE TABLE IF NOT EXISTS income_data (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  source_id INTEGER REFERENCES income_sources(id),
  amount DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for these tables
alter publication supabase_realtime add table spending_categories;
alter publication supabase_realtime add table income_sources;
alter publication supabase_realtime add table spending_data;
alter publication supabase_realtime add table income_data;

-- Insert default spending categories
INSERT INTO spending_categories (name, color)
VALUES 
  ('Groceries', 'rgba(75, 192, 192, 1)'),
  ('Entertainment', 'rgba(153, 102, 255, 1)'),
  ('Utilities', 'rgba(255, 159, 64, 1)'),
  ('Dining Out', 'rgba(255, 99, 132, 1)'),
  ('Transportation', 'rgba(54, 162, 235, 1)'),
  ('Shopping', 'rgba(255, 206, 86, 1)')
ON CONFLICT DO NOTHING;

-- Insert default income sources
INSERT INTO income_sources (name, color)
VALUES 
  ('Salary', '#4f46e5'),
  ('Investments', '#10b981'),
  ('Freelance', '#f59e0b'),
  ('Other', '#8b5cf6')
ON CONFLICT DO NOTHING;
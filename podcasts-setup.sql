-- ============================================
-- Auburn Business Network - Podcast Segments Table
-- Run this in the Supabase SQL Editor once.
-- ============================================

CREATE TABLE podcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  spotify_url TEXT NOT NULL,
  spotify_id TEXT NOT NULL,
  title TEXT,
  artwork_url TEXT,
  description TEXT,
  position INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX podcasts_visible_position_idx
  ON podcasts (is_visible, position);

ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;

-- Public homepage can read visible podcasts only
CREATE POLICY "Public can view visible podcasts"
  ON podcasts FOR SELECT
  TO anon
  USING (is_visible = true);

-- Admin (any authenticated user) can read everything
CREATE POLICY "Admin can view all podcasts"
  ON podcasts FOR SELECT
  TO authenticated
  USING (true);

-- Admin can insert
CREATE POLICY "Admin can insert podcasts"
  ON podcasts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin can update (reorder, toggle visibility, edit title)
CREATE POLICY "Admin can update podcasts"
  ON podcasts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin can delete
CREATE POLICY "Admin can delete podcasts"
  ON podcasts FOR DELETE
  TO authenticated
  USING (true);

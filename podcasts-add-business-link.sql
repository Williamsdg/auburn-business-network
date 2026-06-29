-- ============================================
-- Auburn Business Network - Link podcast segments to a business
-- Run this ONCE in the Supabase SQL Editor on the existing project.
-- Safe to re-run (uses IF NOT EXISTS).
-- ============================================

-- Add an optional link from a podcast segment to a business.
-- ON DELETE SET NULL: if the business is removed, the episode stays but the
-- link is simply cleared (it just won't show a "Featured" chip).
ALTER TABLE podcasts
  ADD COLUMN IF NOT EXISTS business_id UUID
  REFERENCES businesses(id) ON DELETE SET NULL;

-- Anon (public homepage) already has SELECT on visible podcasts; it now also
-- reads business_id. The existing "Public can view visible podcasts" policy
-- covers the new column, so no new policy is needed.

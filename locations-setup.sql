-- ============================================
-- Auburn Business Network - Multiple Locations
-- Run this in the Supabase SQL Editor once.
-- ============================================
-- Adds a JSONB `locations` array to both businesses and applications.
-- Each element looks like:
--   { "city": "Auburn", "state": "AL", "address": "123 Main St", "lat": 32.6, "lng": -85.4 }
-- The existing single location/state/address/lat/lng columns are kept as the
-- "primary" location for backwards compatibility (cards, Near Me, maps).

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS locations JSONB NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS locations JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Backfill: seed the locations array for existing single-location businesses
-- so filters work for them immediately.
UPDATE businesses
SET locations = jsonb_build_array(
  jsonb_build_object(
    'city', split_part(location, ',', 1),
    'state', state,
    'address', address,
    'lat', lat,
    'lng', lng
  )
)
WHERE jsonb_array_length(locations) = 0
  AND location IS NOT NULL;

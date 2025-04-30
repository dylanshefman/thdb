const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

// Load env vars from Netlify
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE; // Using service role key for full access
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async () => {
  // Get active static feeds (authentication type 0)
  const { data: staticFeeds, error: staticError } = await supabase
    .from("gtfs_static")
    .select("*")
    .eq("status", "active")
    .eq("authentication_type", 0); // Only fetch feeds with no authentication key required

  if (staticError) {
    return { statusCode: 500, body: JSON.stringify(staticError) };
  }

  // Helper to fetch a GTFS feed (no authentication needed)
  const fetchGTFS = async (url) => {
    try {
      const res = await fetch(url);
      return res.ok ? res : null;
    } catch (error) {
      console.error("Error fetching GTFS:", error);
      return null;
    }
  };

  // Download static feeds
  for (const feed of staticFeeds) {
    try {
      const res = await fetchGTFS(feed.direct_download);
      if (res) {
        const blob = await res.blob();
        // Store the fetched file in Supabase storage (gtfs_static_files bucket)
        await supabase.storage
          .from("gtfs_static_files")
          .upload(`${feed.id}.zip`, blob, { upsert: true });
        console.log(`Successfully fetched and uploaded static feed ${feed.id}`);
      } else {
        console.error(`Static feed ${feed.id} failed to download`);
      }
    } catch (e) {
      console.error(`Static feed ${feed.id} error:`, e);
    }
  }

  return { statusCode: 200, body: "GTFS Static feeds updated successfully" };
};

const fetch = require("node-fetch");
const { createClient } = require("@supabase/supabase-js");

// Load env vars from Netlify
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE; // Using service role key for full access
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

exports.handler = async () => {
  // Get active realtime feeds (authentication type 0)
  const { data: rtFeeds, error: rtError } = await supabase
    .from("gtfs_rt")
    .select("*")
    .eq("status", "active")
    .eq("authentication_type", 0); // Only fetch feeds with no authentication key required

  if (rtError) {
    return { statusCode: 500, body: JSON.stringify(rtError) };
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

  // Download realtime feeds
  for (const feed of rtFeeds) {
    try {
      const res = await fetchGTFS(feed.direct_download);
      if (res) {
        const blob = await res.blob();
        // Store the fetched file in Supabase storage (gtfs_rt_files bucket)
        await supabase.storage
          .from("gtfs_rt_files")
          .upload(`${feed.id}.pb`, blob, { upsert: true });
        console.log(`Successfully fetched and uploaded realtime feed ${feed.id}`);
      } else {
        console.error(`Realtime feed ${feed.id} failed to download`);
      }
    } catch (e) {
      console.error(`Realtime feed ${feed.id} error:`, e);
    }
  }

  return { statusCode: 200, body: "GTFS Realtime feeds updated successfully" };
};

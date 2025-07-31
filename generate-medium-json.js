// generate-medium-json.js
import Parser from "rss-parser";
import fs from "fs";

const parser = new Parser();
const feed = await parser.parseURL("https://medium.com/feed/@fardiskhann");

const simplified = feed.items.slice(0, 5).map(item => {
  const raw = item["content:encoded"] || item.content || item.description || "";
  const text = raw.replace(/<[^>]+>/g, ""); // Strip HTML
  const shortDescription = text.split(" ").slice(0, 40).join(" ") + "...";

  return {
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: shortDescription // ✅ Add this
  };
});

fs.writeFileSync("medium.json", JSON.stringify(simplified, null, 2));
console.log("✅ medium.json updated");

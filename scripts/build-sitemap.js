#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dbContent = fs.readFileSync(path.join(__dirname, '..', 'db.js'), 'utf8');
const match = dbContent.match(/const articles = (\[[\s\S]*?\]);/);
if (!match) { console.error('No articles found in db.js'); process.exit(1); }
const articles = eval(match[1]);

const domain = process.env.SITE_DOMAIN || 'https://bacalah.linkjer.my';

const months = { 'Jan':1,'Feb':2,'Mac':3,'Apr':4,'Mei':5,'Jun':6,'Jul':7,'Ogos':8,'Sep':9,'Okt':10,'Nov':11,'Dis':12 };
const parseDate = (d) => {
  const parts = String(d || '').trim().split(' ');
  if (parts.length !== 3) return new Date().toISOString().slice(0, 10);
  return `${parts[2]}-${String(months[parts[1]] || 1).padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
};

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
xml += `  <url><loc>${domain}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n`;
articles.forEach(a => {
  xml += `  <url><loc>${domain}/baca.html?slug=${encodeURIComponent(a.slug)}</loc><lastmod>${parseDate(a.date)}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
});
xml += '</urlset>\n';

const outPath = path.join(__dirname, '..', 'sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`sitemap.xml written (${articles.length + 1} URLs)`);

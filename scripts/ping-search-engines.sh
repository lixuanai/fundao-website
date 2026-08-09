#!/bin/bash
# Ping search engines after new articles are deployed

SITEMAP="https://www.fundao.fun/sitemap.xml"
BAIDU_TOKEN="4AGpdHwjLm3Bkz3S"
BAIDU_SITE="https://www.fundao.fun"
TMPFILE="/tmp/fundao_urls.txt"

echo "🔔 Pinging search engines..."

# Google
curl -s "https://www.google.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Google sitemap ping sent"

# Bing
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Bing sitemap ping sent"

# Baidu - push all article URLs
echo "📤 Pushing article URLs to Baidu..."
curl -s "$SITEMAP" | grep -oP '(?<=<loc>)[^<]+/news/[^<]+' > "$TMPFILE"
URL_COUNT=$(wc -l < "$TMPFILE")
echo "   Found $URL_COUNT article URLs"

if [ "$URL_COUNT" -gt 0 ]; then
  RESPONSE=$(curl -s -H 'Content-Type: text/plain' --data-binary @"$TMPFILE" \
    "http://data.zz.baidu.com/urls?site=$BAIDU_SITE&token=$BAIDU_TOKEN")
  echo "   Baidu response: $RESPONSE"
  echo "✅ Baidu push complete"
else
  echo "⚠️  No article URLs found in sitemap"
fi

rm -f "$TMPFILE"
echo "🎉 All done!"

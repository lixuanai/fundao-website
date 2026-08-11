#!/bin/bash
# Ping search engines after new articles are deployed

SITEMAP="https://www.fundao.fun/sitemap.xml"
BAIDU_TOKEN="4AGpdHwjLm3Bkz3S"
BAIDU_SITE="https://www.fundao.fun"

echo "🔔 Pinging search engines..."

# Google
curl -s --connect-timeout 10 "https://www.google.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Google sitemap ping sent"

# Bing
curl -s --connect-timeout 10 "https://www.bing.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Bing sitemap ping sent"

# Baidu - push only new article URLs (batch of 10 to avoid quota issues)
echo "📤 Pushing new article URLs to Baidu..."
NEW_URLS=$(curl -s --connect-timeout 10 "$SITEMAP" | grep -oP '(?<=<loc>)[^<]+/news/[^<]+' | tail -20)
URL_COUNT=$(echo "$NEW_URLS" | wc -l)
echo "   Pushing latest $URL_COUNT article URLs (batch mode)"

if [ -n "$NEW_URLS" ]; then
  # Push in batches of 10
  echo "$NEW_URLS" | head -10 | curl -s --connect-timeout 10 -H 'Content-Type: text/plain' --data-binary @- \
    "http://data.zz.baidu.com/urls?site=$BAIDU_SITE&token=$BAIDU_TOKEN"
  echo ""
  
  REMAINING=$(echo "$NEW_URLS" | tail -n +11)
  if [ -n "$REMAINING" ]; then
    echo "$REMAINING" | curl -s --connect-timeout 10 -H 'Content-Type: text/plain' --data-binary @- \
      "http://data.zz.baidu.com/urls?site=$BAIDU_SITE&token=$BAIDU_TOKEN"
    echo ""
  fi
  echo "✅ Baidu push complete"
else
  echo "⚠️  No article URLs found in sitemap"
fi

echo "🎉 All done!"

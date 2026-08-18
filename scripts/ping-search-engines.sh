#!/bin/bash
# Ping search engines after new articles are deployed

SITEMAP="https://www.fundao.fun/sitemap.xml"
BAIDU_TOKEN="4AGpdHwjLm3Bkz3S"
BAIDU_SITE="https://www.fundao.fun"

echo " Pinging search engines..."

# Google
curl -s --connect-timeout 10 "https://www.google.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Google sitemap ping sent"

# Bing
curl -s --connect-timeout 10 "https://www.bing.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Bing sitemap ping sent"

# Baidu - only push the latest 6 URLs (3 articles × CN/EN)
echo "📤 Pushing latest 6 article URLs to Baidu..."
NEW_URLS=$(curl -s --connect-timeout 10 "$SITEMAP" | grep -oP '(?<=<loc>)[^<]+/news/[^<]+' | tail -6)
URL_COUNT=$(echo "$NEW_URLS" | grep -c .)
echo "   Pushing $URL_COUNT URLs"

if [ -n "$NEW_URLS" ]; then
  echo "$NEW_URLS" | curl -s --connect-timeout 10 -H 'Content-Type: text/plain' --data-binary @- \
    "http://data.zz.baidu.com/urls?site=$BAIDU_SITE&token=$BAIDU_TOKEN"
  echo ""
  echo "✅ Baidu push complete"
else
  echo "⚠️  No article URLs found in sitemap"
fi

echo "🎉 All done!"

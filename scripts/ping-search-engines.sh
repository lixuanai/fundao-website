#!/bin/bash
# Ping search engines after new articles are deployed

SITEMAP="https://www.fundao.fun/sitemap.xml"
BAIDU_TOKEN="4AGpdHwjLm3Bkz3S"
BAIDU_SITE="https://www.fundao.fun"

echo "🔔 Pinging search engines..."

# Google
curl -s "https://www.google.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Google sitemap ping sent"

# Bing
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP" > /dev/null 2>&1
echo "✅ Bing sitemap ping sent"

# Baidu - push all article URLs
echo " Pushing article URLs to Baidu..."
ARTICLE_URLS=$(curl -s "$SITEMAP" | grep -oP '(?<=<loc>)[^<]+/news/[^<]+')
URL_COUNT=$(echo "$ARTICLE_URLS" | wc -l)
echo "   Found $URL_COUNT article URLs"

if [ -n "$ARTICLE_URLS" ]; then
  echo "$ARTICLE_URLS" | curl -s -H 'Content-Type: text/plain' --data-binary @- \
    "http://data.zz.baidu.com/urls?site=$BAIDU_SITE&token=$BAIDU_TOKEN"
  echo ""
  echo "✅ Baidu push complete"
fi

echo " All done!"

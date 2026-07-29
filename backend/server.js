import express from 'express';
import cors from 'cors';
import { getAllArticles, getArticleBySlug, createArticle, updateArticle, deleteArticle } from './routes/articles.js';
import { getPageContent, setPageContent, getSetting, setSetting, getAllSettings } from './routes/settings.js';
import { requireAuth } from './lib/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Public API
app.get('/api/articles', (req, res) => {
  const lang = req.query.lang || 'zh';
  res.json(getAllArticles(lang, true));
});

app.get('/api/articles/:slug', (req, res) => {
  const lang = req.query.lang || 'zh';
  const article = getArticleBySlug(req.params.slug, lang);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
});

app.get('/api/page/:pageKey', (req, res) => {
  const lang = req.query.lang || 'zh';
  res.json(getPageContent(req.params.pageKey, lang) || {});
});

app.get('/api/settings', (req, res) => {
  res.json(getAllSettings());
});

// Agent API (requires auth)
app.post('/api/agent/articles', (req, res) => {
  if (!requireAuth(req, res, 'write')) return;
  try {
    const article = createArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/agent/articles/:slug', (req, res) => {
  if (!requireAuth(req, res, 'write')) return;
  try {
    const article = updateArticle(req.params.slug, req.body);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/agent/articles/:slug', (req, res) => {
  if (!requireAuth(req, res, 'write')) return;
  const deleted = deleteArticle(req.params.slug);
  if (!deleted) return res.status(404).json({ error: 'Article not found' });
  res.json({ success: true });
});

app.post('/api/agent/page/:pageKey', (req, res) => {
  if (!requireAuth(req, res, 'write')) return;
  const lang = req.body.lang || 'zh';
  const content = setPageContent(req.params.pageKey, lang, req.body.content);
  res.json(content);
});

app.put('/api/agent/settings/:key', (req, res) => {
  if (!requireAuth(req, res, 'write')) return;
  const value = setSetting(req.params.key, req.body.value);
  res.json({ key: req.params.key, value });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log('FunDAO Backend API running on http://localhost:' + PORT);
});

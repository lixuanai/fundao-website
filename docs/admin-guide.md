# FunDAO 管理后台使用指南

## 访问地址

- 登录页：`https://fundao.fun/admin/login`
- 文章列表：`https://fundao.fun/admin/articles`
- 新建文章：`https://fundao.fun/admin/articles/new`

## 默认密码

```
fundao2026
```

**部署后请立即修改密码！**

修改方法：在 Vercel 后台 → Settings → Environment Variables → 修改 `ADMIN_PASSWORD`

## 发布文章流程

### 1. 登录
访问 `/admin/login`，输入密码

### 2. 新建文章
点击「新建文章」按钮

### 3. 填写内容
- **中文标题**（必填）
- **英文标题**（可选，不填则用中文标题）
- **分类**：新闻 / 行业资讯
- **URL Slug**：点「自动生成」或手动填写（英文+数字+短横线）
- **标签**：逗号分隔，如 `DeFi, AI, 趋势`
- **状态**：草稿 / 立即发布

### 4. 写摘要
- 中文摘要（推荐填写，用于列表页显示）
- 英文摘要（可选）

### 5. 写正文
使用 Markdown 格式：

```markdown
# 一级标题

## 二级标题

正文内容...

- 列表项 1
- 列表项 2

**粗体** *斜体*

[链接文字](https://example.com)
```

### 6. 预览
点「显示预览」按钮，右边会显示渲染效果

### 7. 发布
- 选「草稿」→ 保存但不发布
- 选「立即发布」→ 保存并发布到前台

## 编辑文章

1. 在文章列表点文章标题
2. 修改内容
3. 点「保存」

## 删除文章

在文章列表点「删除」按钮，确认后删除

## 注意事项

1. **Slug 唯一性**：每个文章的 URL Slug 必须唯一，不能重复
2. **发布即生效**：选「立即发布」后，前台马上能看到（可能有几秒 CDN 延迟）
3. **Markdown 语法**：支持标准 Markdown + GitHub Flavored Markdown（表格、任务列表等）
4. **英文内容**：如果只写中文，英文标题和摘要会自动用中文内容填充

## 环境变量

部署时需要配置以下环境变量：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `ADMIN_PASSWORD` | 后台登录密码 | `fundao2026` |
| `JWT_SECRET` | JWT 签名密钥（随机字符串） | `random-secret-string` |
| `SANITY_API_TOKEN` | Sanity 写权限 Token | `sk-...` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity 项目 ID | `4wq2d1xx` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity 数据集 | `production` |

## 获取 Sanity API Token

1. 访问 https://www.sanity.io/manage/project/4wq2d1xx/api
2. 点「Add API token」
3. 名称填 `fundao-admin`
4. 权限选「Editor」
5. 点「Create token」
6. 复制 token 填到 `SANITY_API_TOKEN` 环境变量

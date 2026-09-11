# Pujara Print N Pack — Public API

Backend API for the Pujara Print N Pack website. This document covers the **public, user-facing APIs** used to build the frontend (homepage, services, portfolio, blog, etc.). Admin/CRUD APIs are a separate, internal concern and are not covered here.

## Base URL

```
http://localhost:5020/api/v1/user
```

Replace the host with the deployed API domain in production.

## Required Headers

Every request (including simple `GET`s) must include the API key header, or the server returns `401 Unauthorized`:

```
api-key: <the shared API key>
```

For `POST /contact`, also send:

```
Content-Type: application/json
```

No login/JWT/token is required for any of the endpoints in this document — they are all public.

## Response Envelope

Every response is JSON with this shape:

```json
{
  "code": 1,
  "message": "Human readable message",
  "data": {}
}
```

- `code` — see the table below. Always check `code`, not just the HTTP status — most "not found" / validation cases return **HTTP 200** with a non-1 `code`.
- `message` — safe to show in a toast/snackbar as-is.
- `data` — present only when there is data to return.
  - **List APIs**: `data` is a plain **array**. Never nested (no `data.items`, `data.services`, etc.).
  - **Detail APIs**: `data` is a plain **object**.
- `pagination` — present only on paginated list APIs, as a sibling of `data` (not nested inside it):

```json
{
  "code": 1,
  "message": "Services fetched successfully",
  "data": [ ],
  "pagination": {
    "current_page": 1,
    "per_page": 12,
    "total": 25,
    "total_pages": 3
  }
}
```

### `code` values

| code | Meaning |
|------|---------|
| `1`  | Success |
| `0`  | Internal/server error (generic) |
| `2`  | Missing/invalid field (validation error — currently only on `POST /contact`) |
| `3`  | No data found (e.g. unknown slug, or a resource that exists but is private/inactive/unpublished) |
| `401` HTTP status, code `-1` | Missing or wrong `api-key` header |
| `500` HTTP status | Unexpected server error |

A slug that doesn't exist, or a resource hidden by an active/public/delete flag, is intentionally indistinguishable in the response (both return `code: 3`) — this is by design so the frontend can render a single generic "not found" state, and so the API never confirms whether a private/inactive record exists.

## Pagination

Any endpoint that supports it accepts:

- `page` — 1-based, default `1`
- `limit` — default varies per endpoint (see below), capped at `100`

Invalid/non-numeric values silently fall back to the defaults rather than erroring.

## Frontend field notes

- Any field named `client_name` or `company_name` can come back as `null` — this means the record owner opted to keep it private. Render a fallback (e.g. "Confidential Client" or just hide the line) instead of showing "null".
- All image fields are plain URLs (`*_image_url`, `logo_url`, `cover_image_url`, etc.) already pointing at hosted (Cloudinary) images — ready to drop straight into an `<img src>`. There are no internal IDs to resolve.
- `featured`/`is_featured` filters expect `?featured=1` — any other value is treated as "not filtering by featured".

---

## Endpoints

### Common

#### `GET /site-settings`
Single global settings object — use for header/footer (logo, contact info, address, footer text).

```json
{
  "code": 1,
  "message": "Site settings fetched successfully",
  "data": {
    "id": 1,
    "site_name": "Pujara Print N Pack",
    "logo_url": null,
    "favicon_url": null,
    "email": null,
    "phone": null,
    "secondary_phone": null,
    "whatsapp": null,
    "address": null,
    "map_embed_url": null,
    "footer_text": "Pujara Print N Pack - Printing, Packaging & Branding Solutions"
  }
}
```

#### `GET /social-links`
Ordered list of social icons/links for header/footer.

```json
{
  "code": 1,
  "message": "Social links fetched successfully",
  "data": [
    { "id": 1, "platform": "facebook", "url": "https://facebook.com/...", "sort_order": 1 }
  ]
}
```

---

### Services

#### `GET /service-categories`
No params. Full list, ordered by `sort_order`. Use to build a services menu/filter bar.

```json
{
  "code": 1,
  "message": "Service categories fetched successfully",
  "data": [
    { "id": 1, "name": "Offset Print", "slug": "offset-print", "description": null, "image_url": null, "sort_order": 1 }
  ]
}
```

#### `GET /services`
Paginated list.

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | int | 1 | |
| `limit` | int | 12 | max 100 |
| `category` | string | — | filter by `service_categories.slug` |
| `featured` | `1` | — | only featured services |

```json
{
  "code": 1,
  "message": "Services fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Offset Printing",
      "slug": "offset-print-jobs",
      "short_description": "...",
      "featured_image_url": "https://...",
      "category_id": 1,
      "category_name": "Offset Print",
      "category_slug": "offset-print",
      "is_featured": 1,
      "sort_order": 1
    }
  ],
  "pagination": { "current_page": 1, "per_page": 12, "total": 1, "total_pages": 1 }
}
```

#### `GET /services/:slug`
Detail. `code: 3` if the slug doesn't exist or the service is inactive.

```json
{
  "code": 1,
  "message": "Service fetched successfully",
  "data": {
    "id": 1,
    "title": "Offset Printing",
    "slug": "offset-print-jobs",
    "short_description": "...",
    "description": "<full description>",
    "featured_image_url": "https://...",
    "category_id": 1,
    "category_name": "Offset Print",
    "category_slug": "offset-print",
    "meta_title": "...",
    "meta_description": "...",
    "is_featured": 1
  }
}
```
There is no `related_services` field currently — omitted intentionally, may be added later.

---

### Portfolio

#### `GET /portfolio-categories`
Same shape as service categories.

```json
{
  "code": 1,
  "message": "Portfolio categories fetched successfully",
  "data": [
    { "id": 1, "name": "Printing", "slug": "printing", "description": null, "sort_order": 1 }
  ]
}
```

#### `GET /portfolio`
Paginated list. Only public, active, non-deleted portfolio items are ever returned.

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | int | 1 | |
| `limit` | int | 12 | max 100 |
| `category` | string | — | filter by `portfolio_categories.slug` |
| `featured` | `1` | — | only featured items |

```json
{
  "code": 1,
  "message": "Portfolio fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Corporate Rebrand Project",
      "slug": "corporate-rebrand-project",
      "short_description": "...",
      "cover_image_url": "https://...",
      "category_id": 1,
      "category_name": "Printing",
      "category_slug": "printing",
      "client_name": "ACME Corp",
      "project_date": "2025-01-01T00:00:00.000Z",
      "is_featured": 1,
      "sort_order": 1
    }
  ],
  "pagination": { "current_page": 1, "per_page": 12, "total": 1, "total_pages": 1 }
}
```
`client_name` is `null` when the client asked to stay unnamed — render accordingly.

#### `GET /portfolio/:slug`
Detail, including the image gallery. `code: 3` if not found/private/inactive.

```json
{
  "code": 1,
  "message": "Portfolio item fetched successfully",
  "data": {
    "id": 1,
    "title": "Corporate Rebrand Project",
    "slug": "corporate-rebrand-project",
    "short_description": "...",
    "description": "<full description>",
    "cover_image_url": "https://...",
    "category_id": 1,
    "category_name": "Printing",
    "category_slug": "printing",
    "client_name": "ACME Corp",
    "project_date": "2025-01-01T00:00:00.000Z",
    "meta_title": "...",
    "meta_description": "...",
    "images": [
      { "id": 1, "image_url": "https://...", "alt_text": "...", "caption": "...", "sort_order": 1 }
    ]
  }
}
```

---

### Clients

#### `GET /clients`
Paginated list of client logos (e.g. for a "trusted by" strip). Only public/active clients.

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | int | 1 | |
| `limit` | int | 20 | max 100 |
| `featured` | `1` | — | only featured clients |

```json
{
  "code": 1,
  "message": "Clients fetched successfully",
  "data": [
    {
      "id": 1,
      "company_name": "ACME Corp",
      "logo_url": "https://...",
      "website_url": "https://acme.example.com",
      "description": "...",
      "is_featured": 1,
      "sort_order": 1
    }
  ],
  "pagination": { "current_page": 1, "per_page": 20, "total": 1, "total_pages": 1 }
}
```

---

### Testimonials

#### `GET /testimonials`
Paginated list. Only active testimonials.

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | int | 1 | |
| `limit` | int | 6 | max 100 |
| `featured` | `1` | — | only featured testimonials |

```json
{
  "code": 1,
  "message": "Testimonials fetched successfully",
  "data": [
    {
      "id": 1,
      "client_name": "John Doe",
      "company_name": "ACME Corp",
      "designation": "CEO",
      "message": "Great service!",
      "rating": 5,
      "client_image_url": "https://...",
      "is_featured": 1,
      "sort_order": 1
    }
  ],
  "pagination": { "current_page": 1, "per_page": 6, "total": 1, "total_pages": 1 }
}
```
`company_name` is `null` when the client asked for their company to stay private — `client_name` itself is always shown.

---

### Blogs

#### `GET /blog-categories`
Same shape as the other category endpoints.

```json
{
  "code": 1,
  "message": "Blog categories fetched successfully",
  "data": [
    { "id": 1, "name": "Printing Tips", "slug": "printing-tips", "description": null, "sort_order": 1 }
  ]
}
```

#### `GET /blogs`
Paginated list. Only active, published (`published_at <= now`) blogs — scheduled/future posts are never returned. Does **not** include full `content` (use the detail API for that).

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | int | 1 | |
| `limit` | int | 10 | max 100 |
| `category` | string | — | filter by `blog_categories.slug` |
| `featured` | `1` | — | only featured posts |
| `search` | string | — | matches title or excerpt |

Sorted newest-first (`published_at DESC`).

```json
{
  "code": 1,
  "message": "Blogs fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "5 Tips for Better Print Quality",
      "slug": "5-tips-for-better-print-quality",
      "excerpt": "...",
      "featured_image_url": "https://...",
      "author_name": "Admin",
      "published_at": "2026-01-10T09:00:00.000Z",
      "category_id": 2,
      "category_name": "Printing Tips",
      "category_slug": "printing-tips",
      "is_featured": 1
    }
  ],
  "pagination": { "current_page": 1, "per_page": 10, "total": 1, "total_pages": 1 }
}
```

#### `GET /blogs/:slug`
Detail with full `content`. `code: 3` if not found, inactive, or not yet published.

```json
{
  "code": 1,
  "message": "Blog fetched successfully",
  "data": {
    "id": 1,
    "title": "5 Tips for Better Print Quality",
    "slug": "5-tips-for-better-print-quality",
    "excerpt": "...",
    "content": "<full HTML/markdown content>",
    "featured_image_url": "https://...",
    "author_name": "Admin",
    "published_at": "2026-01-10T09:00:00.000Z",
    "category_id": 2,
    "category_name": "Printing Tips",
    "category_slug": "printing-tips",
    "meta_title": "...",
    "meta_description": "..."
  }
}
```

---

### Machines

#### `GET /machines`
Paginated list of equipment/machines showcased on the site.

| Query param | Type | Default | Notes |
|---|---|---|---|
| `page` | int | 1 | |
| `limit` | int | 12 | max 100 |
| `featured` | `1` | — | only featured machines |

```json
{
  "code": 1,
  "message": "Machines fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Heidelberg Offset Press",
      "slug": "heidelberg-offset-press",
      "short_description": "...",
      "featured_image_url": "https://...",
      "is_featured": 1,
      "sort_order": 1
    }
  ],
  "pagination": { "current_page": 1, "per_page": 12, "total": 1, "total_pages": 1 }
}
```

#### `GET /machines/:slug`
Detail, including image gallery and specifications. `code: 3` if not found/inactive.

```json
{
  "code": 1,
  "message": "Machine fetched successfully",
  "data": {
    "id": 1,
    "name": "Heidelberg Offset Press",
    "slug": "heidelberg-offset-press",
    "short_description": "...",
    "description": "<full description>",
    "specifications": "<spec text, may be plain text or JSON string depending on how it was entered>",
    "featured_image_url": "https://...",
    "images": [
      { "id": 1, "image_url": "https://...", "alt_text": "...", "caption": "...", "sort_order": 1 }
    ]
  }
}
```

---

### Contact

#### `POST /contact`
Submits an enquiry from the contact form.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "company": "ABC Pvt Ltd",
  "subject": "Printing Requirement",
  "message": "I need a quotation."
}
```

- Required: `name`, `email`, `message` — missing any of these returns `code: 2`.
- `email` must look like a valid email — invalid format returns `code: 2`.
- `phone`, if provided, must be `6-20` chars of digits/`+`/`-`/spaces/parentheses — invalid format returns `code: 2`.
- `phone`, `company`, `subject` are optional.
- All string fields are trimmed server-side.

Success response:

```json
{
  "code": 1,
  "message": "Your enquiry has been submitted successfully",
  "data": { "id": 42 }
}
```

Validation error response (HTTP 200, check `code`):

```json
{ "code": 2, "message": "Name, email and message are required" }
```

The frontend does not need to (and cannot) send `id`, `is_read`, `is_delete`, or `ip_hash` — the server ignores/derives those itself.

---

## Not implemented on the public API

Admin-only concerns (CRUD for services/portfolio/blogs/etc., authentication, file uploads) live under a separate `/api/v1/admin` and `/api/v1/auth` surface and are out of scope for the public frontend integration this document covers.

## Contact enquiry email

The Contact Us page submits to the frontend `/api/contact` proxy, which forwards only form fields to `POST /api/v1/user/contact` with the server-only API key. Nodemailer runs exclusively in the Express backend.

The backend saves the enquiry before sending its notification. The email includes the enquiry ID, name, email, phone, company, subject and requirements, in HTML and plain text. Reply-To is the customer's address; From remains the configured sender.

Existing environment settings are reused: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (or `SMTP_PASSWORD`), and `MAIL_FROM`. Port 465 uses implicit TLS; other ports use STARTTLS when available. Notifications go to `CONTACT_NOTIFY_EMAIL`, falling back to `MAIL_FROM` and then `SMTP_USER`.

Success data now includes `{ id, notification_sent }`. A failed SMTP notification does not discard the saved enquiry or ask the customer to submit it again. The backend logs the enquiry ID and mail error code; notification failures are not automatically retried.

Run `node --test config/contact.test.js` for validation, template escaping, notification and SMTP failure tests. These tests mock database and email delivery and send no external mail.

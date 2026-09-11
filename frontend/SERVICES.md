# Services listing — phase 1

Open `/services` to browse live services. Uses `GET /service-categories` and `GET /services` with category, featured, page and limit parameters. Lists read the plain `data` array and sibling `pagination`, and check the response code even on HTTP 200.

Set `API_BASE_URL` and `API_KEY` in `.env.local` using `.env.example`. The key must match `backend/.env`. Start the backend with `npm run dev` in `backend`, then run `npm run dev` in `frontend`.

Requests run on the Next.js server so the API key is never bundled into browser code. Deploy with `npm run build` and `npm start` on a Node.js host; static `out/` export is no longer used. Restart Next.js after changing environment variables.

The page includes category and featured filters, pagination, loading, empty and retry states, and missing/broken image fallbacks. Filters are preserved in the URL. Existing header/footer styling is reused. Detail pages and the remaining public API modules are deferred to later phases.

import db from "../../../config/db.js";
import Codes from "../../../config/status_codes.js";
import middleware from "../../../middleware/middleware.js";
import { parsePagination, buildPagination, isFeaturedFlag, cleanParam } from "./helpers.js";

export async function getPortfolioPage(req, res) {
    try {
        const [pages] = await db.query("SELECT content FROM portfolio_page_content WHERE id = 1");
        if (!pages.length) return middleware.sendResponse(res, Codes.SUCCESS, Codes.NO_DATA_FOUND, "Portfolio page not configured");
        const content = typeof pages[0].content === "string" ? JSON.parse(pages[0].content) : pages[0].content;
        const [items] = await db.query(`SELECT p.id, p.title, p.slug, p.short_description, p.cover_image_url,
            p.category_id, c.name AS category_name, c.slug AS category_slug,
            s.sort_order, s.is_featured
            FROM portfolio_page_items s JOIN portfolio p ON p.id = s.portfolio_id
            JOIN portfolio_categories c ON c.id = p.category_id
            WHERE p.is_public = 1 AND p.is_active = 1 AND p.is_delete = 0
            AND c.is_active = 1 AND c.is_delete = 0 ORDER BY s.sort_order, p.id`);
        return middleware.sendResponse(res, Codes.SUCCESS, Codes.RESPONSE_SUCCESS, "Portfolio page fetched successfully", { content, items });
    } catch (error) {
        console.error("Get portfolio page error:", error);
        return middleware.sendResponse(res, Codes.INTERNAL_ERROR, Codes.RESPONSE_ERROR, "INTERNAL_SERVER_ERROR");
    }
}

// ---------------------------------------------------------------------------
// PORTFOLIO CATEGORIES
// ---------------------------------------------------------------------------

export async function getPortfolioCategories(req, res) {
    try {
        const [categories] = await db.query(
            `SELECT id, name, slug, description, sort_order
             FROM portfolio_categories
             WHERE is_active = 1 AND is_delete = 0
             ORDER BY sort_order ASC`,
            [],
        );

        return middleware.sendResponse(
            res,
            Codes.SUCCESS,
            Codes.RESPONSE_SUCCESS,
            "Portfolio categories fetched successfully",
            categories,
        );
    } catch (error) {
        console.error("Get portfolio categories error:", error);
        return middleware.sendResponse(
            res,
            Codes.INTERNAL_ERROR,
            Codes.RESPONSE_ERROR,
            "INTERNAL_SERVER_ERROR",
        );
    }
}

// ---------------------------------------------------------------------------
// PORTFOLIO LIST
// ---------------------------------------------------------------------------

export async function getPortfolio(req, res) {
    try {
        const { page, limit, offset } = parsePagination(req.query, 12);
        const category = cleanParam(req.query.category);
        const featured = isFeaturedFlag(req.query.featured);

        const conditions = ["p.is_public = 1", "p.is_active = 1", "p.is_delete = 0"];
        const params = [];

        if (category) {
            conditions.push("c.slug = ?");
            params.push(category);
        }
        if (featured) {
            conditions.push("p.is_featured = 1");
        }

        const whereClause = conditions.join(" AND ");

        const [countRows] = await db.query(
            `SELECT COUNT(*) AS total
             FROM portfolio p
             JOIN portfolio_categories c ON c.id = p.category_id
             WHERE ${whereClause}`,
            params,
        );
        const total = countRows[0]?.total || 0;

        const [rows] = await db.query(
            `SELECT p.id, p.title, p.slug, p.short_description, p.cover_image_url,
                    p.category_id, c.name AS category_name, c.slug AS category_slug,
                    p.client_name, p.is_client_name_public, p.project_date,
                    p.is_featured, p.sort_order
             FROM portfolio p
             JOIN portfolio_categories c ON c.id = p.category_id
             WHERE ${whereClause}
             ORDER BY p.sort_order ASC
             LIMIT ? OFFSET ?`,
            [...params, limit, offset],
        );

        const items = rows.map(({ is_client_name_public, ...item }) => ({
            ...item,
            client_name: is_client_name_public ? item.client_name : null,
        }));

        return middleware.sendResponse(
            res,
            Codes.SUCCESS,
            Codes.RESPONSE_SUCCESS,
            "Portfolio fetched successfully",
            items,
            buildPagination(page, limit, total),
        );
    } catch (error) {
        console.error("Get portfolio error:", error);
        return middleware.sendResponse(
            res,
            Codes.INTERNAL_ERROR,
            Codes.RESPONSE_ERROR,
            "INTERNAL_SERVER_ERROR",
        );
    }
}

// ---------------------------------------------------------------------------
// PORTFOLIO DETAIL
// ---------------------------------------------------------------------------

export async function getPortfolioBySlug(req, res) {
    try {
        const slug = cleanParam(req.params.slug, 255);
        if (!slug) {
            return middleware.sendResponse(
                res,
                Codes.SUCCESS,
                Codes.NO_DATA_FOUND,
                "Portfolio item not found",
            );
        }

        const [rows] = await db.query(
            `SELECT p.id, p.title, p.slug, p.short_description, p.description, p.cover_image_url,
                    p.category_id, c.name AS category_name, c.slug AS category_slug,
                    p.client_name, p.is_client_name_public, p.project_date,
                    p.meta_title, p.meta_description
             FROM portfolio p
             JOIN portfolio_categories c ON c.id = p.category_id
             WHERE p.slug = ? AND p.is_public = 1 AND p.is_active = 1 AND p.is_delete = 0
             LIMIT 1`,
            [slug],
        );

        const portfolio = rows[0];
        if (!portfolio) {
            return middleware.sendResponse(
                res,
                Codes.SUCCESS,
                Codes.NO_DATA_FOUND,
                "Portfolio item not found",
            );
        }

        const { is_client_name_public, ...portfolioData } = portfolio;
        portfolioData.client_name = is_client_name_public ? portfolioData.client_name : null;

        const [images] = await db.query(
            `SELECT id, image_url, alt_text, caption, sort_order
             FROM portfolio_images
             WHERE portfolio_id = ? AND is_active = 1 AND is_delete = 0
             ORDER BY sort_order ASC`,
            [portfolio.id],
        );

        portfolioData.images = images;

        return middleware.sendResponse(
            res,
            Codes.SUCCESS,
            Codes.RESPONSE_SUCCESS,
            "Portfolio item fetched successfully",
            portfolioData,
        );
    } catch (error) {
        console.error("Get portfolio detail error:", error);
        return middleware.sendResponse(
            res,
            Codes.INTERNAL_ERROR,
            Codes.RESPONSE_ERROR,
            "INTERNAL_SERVER_ERROR",
        );
    }
}
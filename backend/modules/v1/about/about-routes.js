import express from "express";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import db from "../../../config/db.js";
import Codes from "../../../config/status_codes.js";
import middleware from "../../../middleware/middleware.js";

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_PATH = path.join(__dirname, "../../../content/about-content.json");

// Read from disk on every request so edits to the JSON file go live without a redeploy.
async function readAboutContent() {
    const raw = await readFile(CONTENT_PATH, "utf-8");
    return JSON.parse(raw);
}

// ---------------------------------------------------------------------------
// STATS
// ---------------------------------------------------------------------------

router.get("/about/stats", async (req, res) => {
    try {
        const { stats } = await readAboutContent();
        return middleware.sendResponse(
            res,
            Codes.SUCCESS,
            Codes.RESPONSE_SUCCESS,
            "About stats fetched successfully",
            stats,
        );
    } catch (error) {
        console.error("Get about stats error:", error);
        return middleware.sendResponse(
            res,
            Codes.INTERNAL_ERROR,
            Codes.RESPONSE_ERROR,
            "INTERNAL_SERVER_ERROR",
        );
    }
});

// ---------------------------------------------------------------------------
// TIMELINE
// ---------------------------------------------------------------------------

router.get("/about/timeline", async (req, res) => {
    try {
        const { timeline } = await readAboutContent();
        return middleware.sendResponse(
            res,
            Codes.SUCCESS,
            Codes.RESPONSE_SUCCESS,
            "About timeline fetched successfully",
            timeline,
        );
    } catch (error) {
        console.error("Get about timeline error:", error);
        return middleware.sendResponse(
            res,
            Codes.INTERNAL_ERROR,
            Codes.RESPONSE_ERROR,
            "INTERNAL_SERVER_ERROR",
        );
    }
});

// ---------------------------------------------------------------------------
// CORE VALUES
// ---------------------------------------------------------------------------

router.get("/about/core-values", async (req, res) => {
    try {
        const { coreValues } = await readAboutContent();
        return middleware.sendResponse(
            res,
            Codes.SUCCESS,
            Codes.RESPONSE_SUCCESS,
            "About core values fetched successfully",
            coreValues,
        );
    } catch (error) {
        console.error("Get about core values error:", error);
        return middleware.sendResponse(
            res,
            Codes.INTERNAL_ERROR,
            Codes.RESPONSE_ERROR,
            "INTERNAL_SERVER_ERROR",
        );
    }
});

// ---------------------------------------------------------------------------
// CLIENTS (backed by testimonials.client_image_url, same logos shown site-wide)
// ---------------------------------------------------------------------------

router.get("/about/clients", async (req, res) => {
    try {
        const [clients] = await db.query(
            `SELECT id, company_name, client_image_url AS logo_url, sort_order
             FROM testimonials
             WHERE is_company_public = 1 AND is_active = 1 AND is_delete = 0
                   AND client_image_url IS NOT NULL AND client_image_url <> ''
             ORDER BY sort_order ASC
             LIMIT 20`,
            [],
        );

        return middleware.sendResponse(
            res,
            Codes.SUCCESS,
            Codes.RESPONSE_SUCCESS,
            "About clients fetched successfully",
            clients,
        );
    } catch (error) {
        console.error("Get about clients error:", error);
        return middleware.sendResponse(
            res,
            Codes.INTERNAL_ERROR,
            Codes.RESPONSE_ERROR,
            "INTERNAL_SERVER_ERROR",
        );
    }
});

export default router;

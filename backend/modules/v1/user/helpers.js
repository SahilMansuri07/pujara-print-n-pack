export const parsePagination = (query, defaultLimit, maxLimit = 100) => {
    let page = parseInt(query.page, 10);
    let limit = parseInt(query.limit, 10);

    if (!Number.isInteger(page) || page < 1) page = 1;
    if (!Number.isInteger(limit) || limit < 1) limit = defaultLimit;
    if (limit > maxLimit) limit = maxLimit;

    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

export const buildPagination = (page, limit, total) => ({
    current_page: page,
    per_page: limit,
    total,
    total_pages: total > 0 ? Math.ceil(total / limit) : 0,
});

export const isFeaturedFlag = (value) => value === "1" || value === 1 || value === "true";

export const cleanParam = (value, maxLength = 150) => {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    return trimmed.slice(0, maxLength);
};

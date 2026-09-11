import jwt from "jsonwebtoken";
import db from "../config/db.js";
import Codes from "../config/status_codes.js";
const sendResponse = (res, httpStatus = Codes.SUCCESS, resCode, message, data, pagination) => {
    const response = {
        code: resCode,
        message: message || "",
    };

    if (data != null) {
        response.data = data;
    }

    if (pagination != null) {
        response.pagination = pagination;
    }

    return res.status(httpStatus).json(response);
};

const checkAPI = (req, res, next) => {
    try {
        const apiKey = req.headers['api-key'];
        if (!apiKey || apiKey !== process.env.API_KEY) {
            return sendResponse(
                res,
                Codes.UNAUTHORIZED,
                Codes.INVALID_APIKEY,
                "Unauthorized",
                null
            );
        }
        next();
    } catch (error) {
        console.log("Error in API key verification: ", error);
        return sendResponse(
            res,
            Codes.UNAUTHORIZED,
            Codes.INVALID_APIKEY,
            "Unauthorized",
            null
        );
    }
}



async function tokenMiddleware (req, res, next) {
    // check if route should bypass
    const requestPath = (req.originalUrl || req.url || req.path || "").split("?")[0];
    if (bypassRoutes.some((route) => requestPath.startsWith(route))) {
        return next(); // skip API key check
    }

      const token = req.headers['token'] || req.headers['authorization']  ;
    //    console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        const bearerToken = token.replace("Bearer ", "").trim();
        
        let decoded;
        
        try {
            decoded = jwt.verify(bearerToken, process.env.JWT_WEB_TOKEN);
          //  console.log("decode user " , decoded)
           // console.log("decode token" , bearerToken)
        } catch (err) {
           // console.log(err)
            if (err.name === "TokenExpiredError") {
                return sendApiResponse(
                    res,
                    Codes.UNAUTHORIZED,
                    Codes.INVALID_TOKEN,
                    "Token_expired_Please_login_again",
                    null,
                );
            }
            return sendApiResponse(
                res,
                Codes.UNAUTHORIZED,
                Codes.INVALID_TOKEN,
                "Invalid_token",
                null,
            );
        }
          const tableName = (decoded.role === "admin" || decoded.role === "superadmin") 
            ? "tbl_admin_device" 
            : "tbl_user_device";

            
            const id = (decoded.role === "admin" || decoded.role === "superadmin") 
            ? "admin_id" 
            : "user_id";
        const device = await db.query(
            `SELECT id FROM ${tableName} 
             WHERE ${id}=? AND token=? AND is_active=1 AND is_delete =0`,
            [decoded.id, bearerToken]
        );
        // console.log()
        // console.log(device)
        if (!device[0] || device[0].length === 0) {
            return sendApiResponse(res, Codes.SUCCESS , Codes.UNAUTHORIZED, "You_Are_Not_Logged_In", null);
        }

        if (device[0] && device[0][0] && device[0][0].id) {
            const user = await common.getUserDetails(device[0][0].id)
            // console.log(user)
            if (user.is_active == 0 || user.is_delete == 1) {
                return sendApiResponse(res, Codes.SUCCESS , Codes.UNAUTHORIZED, "rest_keywords_unauthorized", null);
            }
        }

        req.loginUser = decoded;
        next();
}

export default {
    sendResponse,
    checkAPI,
};
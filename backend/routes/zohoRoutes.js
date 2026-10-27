import express from "express";
import axios from "axios";

const router = express.Router();

// Step 1: Redirect the user to Zoho authorization
router.get("/connect", (req, res) => {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const redirectUri = process.env.ZOHO_REDIRECT_URI;

    if (!clientId || !redirectUri) {
        return res.status(500).send("Zoho OAuth environment variables are missing.");
    }

    const params = new URLSearchParams({
        scope: "ZohoSheet.dataAPI.READ",
        client_id: clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        access_type: "offline",
        prompt: "consent",
    });

    res.redirect(
        `https://accounts.zoho.in/oauth/v2/auth?${params.toString()}`
    );
});

// Step 2: Handle Zoho's callback and exchange the code for tokens
router.get("/callback", async (req, res) => {
    const { code, error } = req.query;

    if (error) {
        return res.status(400).send(`Zoho authorization failed: ${error}`);
    }

    if (!code) {
        return res.status(400).send("Authorization code was not received from Zoho.");
    }

    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const redirectUri = process.env.ZOHO_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        return res.status(500).send("Zoho OAuth environment variables are missing.");
    }

    try {
        const response = await axios.post(
            "https://accounts.zoho.in/oauth/v2/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, refresh_token, expires_in, error: tokenError } =
            response.data;

        console.log("Refresh token received:", !!refresh_token);

        if (refresh_token) {
            console.log("ZOHO_REFRESH_TOKEN:", refresh_token);
        }

        if (tokenError) {
            return res.status(400).send(`Zoho token exchange failed: ${tokenError}`);
        }

        if (!refresh_token) {
            return res
                .status(400)
                .send(
                    "Zoho did not return a refresh token. Revoke the previous grant if needed, then reconnect with consent."
                );
        }

        // Do not expose tokens in the browser or server logs.
        // Store the refresh token securely in your backend environment variables.
        console.log("Zoho authorization successful. Save the refresh token securely.");

        res.send(
            "Zoho connected successfully! Save the refresh token securely in your backend environment variables."
        );
    } catch (err) {
        console.error(
            "Zoho token exchange failed:",
            err.response?.data?.error || err.message
        );

        res.status(500).send("Failed to exchange the Zoho authorization code. Check backend logs.");
    }
});




// Fetch existing Zoho Sheet records
router.get("/data", async (req, res) => {
    try {
        const {
            ZOHO_CLIENT_ID,
            ZOHO_CLIENT_SECRET,
            ZOHO_REFRESH_TOKEN,
            ZOHO_SHEET_RESOURCE_ID,
            ZOHO_SHEET_WORKSHEET_NAME,
        } = process.env;

        if (
            !ZOHO_CLIENT_ID ||
            !ZOHO_CLIENT_SECRET ||
            !ZOHO_REFRESH_TOKEN ||
            !ZOHO_SHEET_RESOURCE_ID ||
            !ZOHO_SHEET_WORKSHEET_NAME
        ) {
            return res.status(500).json({
                message: "Required Zoho environment variables are missing.",
            });
        }

        // Generate a fresh access token
        const tokenResponse = await axios.post(
            "https://accounts.zoho.in/oauth/v2/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                client_id: ZOHO_CLIENT_ID,
                client_secret: ZOHO_CLIENT_SECRET,
                refresh_token: ZOHO_REFRESH_TOKEN,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        if (!accessToken) {
            return res.status(502).json({
                message: "Zoho did not return an access token.",
                details: tokenResponse.data.error || "Unknown token error",
            });
        }

        // Fetch the existing worksheet records
        const sheetResponse = await axios.post(
            `https://sheet.zoho.in/api/v2/${ZOHO_SHEET_RESOURCE_ID}`,
            new URLSearchParams({
                method: "worksheet.records.fetch",
                worksheet_name: ZOHO_SHEET_WORKSHEET_NAME,
                records_start_index: "1",
                count: "100",
            }),
            {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return res.json(sheetResponse.data);
    } catch (error) {
        console.error(
            "Zoho Sheet fetch failed:",
            error.response?.data || error.message
        );

        return res.status(500).json({
            message: "Failed to fetch Zoho Sheet data.",
            details: error.response?.data || error.message,
        });
    }
});

export default router;













// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// const {
//     ZOHO_CLIENT_ID,
//     ZOHO_CLIENT_SECRET,
//     ZOHO_REDIRECT_URI,
// } = process.env;

// // Step 1: Redirect to Zoho's authorization page
// router.get("/connect", (req, res) => {
//     if (
//         !ZOHO_CLIENT_ID ||
//         !ZOHO_CLIENT_SECRET ||
//         !ZOHO_REDIRECT_URI
//     ) {
//         return res.status(500).send(
//             "Zoho OAuth environment variables are missing."
//         );
//     }

//     const params = new URLSearchParams({
//         response_type: "code",
//         client_id: ZOHO_CLIENT_ID,
//         scope: "ZohoSheet.dataAPI.READ",
//         redirect_uri: ZOHO_REDIRECT_URI,
//         access_type: "offline",
//         prompt: "consent",
//     });

//     res.redirect(
//         `https://accounts.zoho.com/oauth/v2/auth?${params.toString()}`
//     );
// });

// // Step 2: Receive the authorization code from Zoho
// router.get("/callback", async (req, res) => {
//     const { code, error } = req.query;

//     if (error) {
//         return res.status(400).send(
//             `Zoho authorization failed: ${error}`
//         );
//     }

//     if (!code) {
//         return res.status(400).send(
//             "Authorization code was not received from Zoho."
//         );
//     }

//     try {
//         const response = await axios.post(
//             "https://accounts.zoho.com/oauth/v2/token",
//             new URLSearchParams({
//                 grant_type: "authorization_code",
//                 client_id: ZOHO_CLIENT_ID,
//                 client_secret: ZOHO_CLIENT_SECRET,
//                 redirect_uri: ZOHO_REDIRECT_URI,
//                 code,
//             }).toString(),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );

//         const { access_token, refresh_token } = response.data;

//         if (!refresh_token) {
//             return res.status(500).send(
//                 "Zoho did not return a refresh token. Reauthorize with offline access and consent."
//             );
//         }

//         // Do not print or expose either token.
//         // Save the refresh token securely in Render Environment.
//         // See the instructions below.

//         return res.status(200).send(`
//       <h2>Zoho authorization successful!</h2>
//       <p>Your refresh token has been generated.</p>
//       <p>Next, securely save it in your Render environment variables.</p>
//     `);
//     } catch (err) {
//         console.error(
//             "Zoho token exchange failed:",
//             err.response?.data || err.message
//         );

//         return res.status(500).send(
//             "Unable to exchange the authorization code. Check the backend logs."
//         );
//     }
// });

// module.exports = router;
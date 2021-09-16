import { google } from "googleapis";
import axios from "axios";

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = ["https://www.googleapis.com/auth/plus.me", "https://www.googleapis.com/auth/userinfo.email"];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
const getConnectionUrl = (auth: any) => {
    return auth.generateAuthUrl({
        access_type: "offline",
        prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope,
    });
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
const createConnection = () => {
    return new google.auth.OAuth2(process.env.GOOGLE_AUTH_CLIENT_ID, process.env.GOOGLE_AUTH_CLIENT_SECRET, process.env.GOOGLE_AUTH_REDIRECT_URL);
};

/**
 *
 * Get Access Token
 */
const getAccessToken = async (code: string, auth: any) => {
    const { tokens } = await auth.getToken(code);
    return tokens.access_token;
};

/**
 * Get User Information
 */
const getUserUser = async (access_token: string) => {
    const { data } = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    return data;
};

/**
 * Create the google url to be sent to the client.
 */
export const urlGoogle = () => {
    return getConnectionUrl(createConnection());
};

/**
 * Get Google Account info from code
 *
 */
export const getGoogleAccountFromCode = async (code: string) => {
    try {
        return getUserUser(await getAccessToken(code, createConnection()));
    } catch (err) {
        return err;
    }
};

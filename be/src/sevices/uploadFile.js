require("dotenv").config();
import stream from "stream";
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

let setFilePublic = async (fileId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });
            const getURL = await drive.files.get({
                fileId,
                fields: "webViewLink, webContentLink",
            });
            resolve(getURL);
        } catch (e) {
            reject(e);
        }
    });
};

let uploadFile = async (filepdf, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bufferStream = new stream.PassThrough();
            bufferStream.end(filepdf.filepdf.data);
            const createFile = await drive.files.create({
                requestBody: {
                    name: `document/${name}`,
                    mimeType: filepdf.mimetype,
                    parents: name,
                },
                media: {
                    mimeType: filepdf.mimetype,
                    body: bufferStream,
                },
            });
            const fileIdPDF = createFile.data.id;
            const getUrl = await setFilePublic(fileIdPDF);
            resolve({
                dol: getUrl.data.webContentLink,
                view: getUrl.data.webViewLink,
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default uploadFile;

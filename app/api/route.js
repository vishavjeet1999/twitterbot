import { NextResponse } from "next/server";
require("dotenv").config({ path: __dirname + "/.env" });
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

// To handle a GET request to /api
export async function GET(request) {
    // Do whatever you want
    try {
        await twitterClient.v2.tweet("Hello world!");
        return NextResponse.json({ message: "Hello World" }, { status: 200 });
    } catch (e) {
        console.log(e)
        return NextResponse.json(e, { status: 200 });
    }
}

// To handle a POST request to /api
export async function POST(request) {
    // Do whatever you want
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
    if (req.nextUrl.pathname?.startsWith("/api/get-url/")) return;

    const slug = req.nextUrl.pathname.split("/").pop();
    const data = await (
        await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    ).json();

    if (data?.url) {
        return NextResponse.redirect(data.url);
    }
};

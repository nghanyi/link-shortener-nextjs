import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    if (req.nextUrl.pathname?.startsWith("/api/get-url/")) return;

    const slug = req.nextUrl.pathname.split("/").pop();
    if (!slug) return;

    console.log(`SLUG: ${slug}`);
    const data = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-url/${slug}`)
    ).json();

    console.log(`DATA: ${JSON.stringify(data)}`);

    if (data?.url) {
        return NextResponse.redirect(data.url);
    }
};

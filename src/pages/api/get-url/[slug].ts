import { NextApiHandler } from "next";
import { prisma } from "../../../db/client";

export const getLink: NextApiHandler = async (req, res) => {
    const slug = req.query["slug"];

    if (!slug || typeof slug !== "string") {
        return res.status(404).json({ message: "please use with a slug" });
    }

    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    if (!data) {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Cache-Control",
            "s-maxage-1000000000, stale-while-revalidate"
        );
        return res.status(404).json({ message: "slug not found" });
    }

    res.json(data);
};

export default getLink;

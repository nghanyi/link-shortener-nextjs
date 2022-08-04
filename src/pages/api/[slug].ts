import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";

export const getLink = async (req: NextApiRequest, res: NextApiResponse) => {
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
        return res.status(404).json({ message: "slug not found" });
    }

    res.redirect(data.url!);
};

export default getLink;

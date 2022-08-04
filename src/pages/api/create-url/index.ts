import { NextApiHandler } from "next";
import { prisma } from "../../../db/client";

const generateId = (maxLength: number) => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for (let i = 0; i < maxLength; i++) {
        id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return id;
};

export const createLink: NextApiHandler = async (req, res) => {
    const { url } = req.body;
    const slug = generateId(5);
    const data = await prisma.shortLink.create({
        data: {
            url,
            slug,
        },
    });
    res.json({
        url: `${process.env.NEXT_PUBLIC_API_URL}/${data.slug}`,
    });
};

export default createLink;

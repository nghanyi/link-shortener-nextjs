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

const isValidLink = (str: string) => {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
};

export const createLink: NextApiHandler = async (req, res) => {
    const { url } = req.body;
    if (!isValidLink(url)) {
        return res.status(400).json({
            error: "Invalid URL",
        });
    }
    const slug = generateId(5);
    const data = await prisma.shortLink.create({
        data: {
            url,
            slug,
        },
    });
    res.status(201).json({
        url: `${process.env.NEXT_PUBLIC_API_URL}/${data.slug}`,
    });
};

export default createLink;

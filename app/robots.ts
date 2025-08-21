import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',
                '/admin/*',
                '/api',
                '/login'
            ],
        },
        sitemap: `${process.env.NEXT_PUBLIC_HOST}/sitemap.xml`,
    };
}
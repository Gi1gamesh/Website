import { RequestHandler  } from '@builder.io/qwik-city';
import { ArticleData } from '~/types';
import posts from '../../../blogData/article-manifest.json';

export const onGet: RequestHandler = async ({ url,headers,send }) => {
    const baseUrl = url.toString().replace("/sitemap","");
    headers.set("content-type","text/xml");
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}/about</loc>
            <lastmod>2022-10-24T10:21:24.944Z</lastmod>
        </url>
        ${
            posts
            .map((p:ArticleData) => `
                <url>
                <loc>${baseUrl}/article/${p.path}/</loc>
                <lastmod>${new Date(p.created).toISOString()}</lastmod>
                </url>`)
            .join('')
        }
        </urlset>`;

    send(200, rssFeed);
  };


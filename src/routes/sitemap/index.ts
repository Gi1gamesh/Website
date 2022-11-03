import { RequestHandler, useLocation  } from '@builder.io/qwik-city';
import { ArticleData } from '~/types';
import posts from '../../../blogData/article-manifest.json';
import { author} from '../../../blogData/site-metadata.json';

export const onGet: RequestHandler<any> = async ({ response,url }) => {
    response.headers.set("content-type","text/xml");
    const baseUrl = url.toString().replace("/rss","")
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}</loc>
            <lastmod>${new Date(posts[0].created).toISOString()}</lastmod>
        </url>
        <url>
            <loc>${baseUrl}/about</loc>
            <lastmod>2022-10-24T10:21:24.944Z</lastmod>
        </url>
        ${
            posts
            .map(p => `
                <url>
                <loc>${baseUrl}/article/${p.path}</loc>
                <lastmod>${new Date(p.created).toISOString()}</lastmod>
                </url>`)
            .join('')
        }
        ${
            posts
            .map(p => `
                <url>
                <loc>${baseUrl}/article/${p.path}</loc>
                <lastmod>${new Date(p.created).toISOString()}</lastmod>
                </url>`)
            .join('')
        }
        </urlset>`;


    return rssFeed
  };


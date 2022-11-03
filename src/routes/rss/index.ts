import { RequestHandler  } from '@builder.io/qwik-city';
import { ArticleData } from '~/types';
import posts from '../../../blogData/article-manifest.json';
import {description, author} from '../../../blogData/site-metadata.json';

const buildRssItems = (url: string,items: ArticleData[]): string => items
      .map((item) => {
        return `
          <item>
            <title>${item.title}</title>
            <author>${item.author || author}</author>
            <link>${url}/article/${item.path}</link>
            <guid>/article/${item.path}</guid>
            <pubDate>${new Date(item.created).toISOString()}</pubDate>
          </item>
          `;
      })
      .join("");

export const onGet: RequestHandler<any> = async ({ response,url }) => {
    response.headers.set("content-type","text/xml");
    const baseUrl = url.toString().replace("/rss","")
    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
    <title>Kevin Mckenny</title>
    <link>${baseUrl}</link>
    <description>${description}</description>
    ${buildRssItems(baseUrl,posts as ArticleData[] )}
    </channel>
</rss>`;


    return rssFeed
  };


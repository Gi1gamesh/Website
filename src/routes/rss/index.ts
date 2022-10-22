import type { RequestHandler  } from '@builder.io/qwik-city';

export const onGet: RequestHandler<any> = async ({ response }) => {
    response.headers.set("content-type","application/xml")
    return '<?xml version="1.0" encoding="UTF-8"?><rss>asd</rss>'
  };


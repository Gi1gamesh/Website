import { component$ } from '@builder.io/qwik';
import { RequestHandler, DocumentHead, useLocation } from '@builder.io/qwik-city';
import Header from '../../../components/articleInfo/articleInfo';


export const modules = import.meta.glob('../../../../blogData/articles/*.mdx');


export const onGet: RequestHandler<any> = async ({ params }) => {
  const post: any = await modules[`../../../../blogData/articles/${params.id}.mdx`]();
  return ({ metadata: post.frontmatter, head: post.head })
};


export default component$((async () => {
  const { params } = useLocation();
  const post: any = await modules[`../../../../blogData/articles/${params.id}.mdx`]();
  const { words, title, created, tags } = post.frontmatter;
  return (<article>
    <header>
      <div class="header">
        <h1>{title}</h1>
        <Header date={created} wordCount={words} tags={tags} />
      </div>
      <br />
      <br />
    </header>
    {post.default()}
  </article>);
}) as any);

export const head: DocumentHead<any> = ({ data, href }) => {
  return {
    title: data.metadata.title,
    links: [
      { rel: "cannonical", href: href }
    ],
    meta: [

      { name: "og:site_name", content: "Kevin Mckenny" },
      { name: 'og:title', content: "Kevin Mckenny" },
      { name: 'og:description', content: "Kevin Mckenny" },
      { name: 'description', content: "Kevin Mckenny" },
      { name: 'og:url', content: href },
      { name: 'og:image', content: "./background.png" },
      { name: 'og:image:url', content: "./background.png" },
      { name: 'twitter:image', content: "./background.png" },
    ]
  }
};

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { RequestHandler, DocumentHead, useLocation } from '@builder.io/qwik-city';
import Header from '../../../components/articleInfo/articleInfo';
import styles from './index.css?inline'; 

export const modules = import.meta.glob('../../../../blogData/articles/*.mdx');

export const onGet: RequestHandler = async ({ params,json }) => {
  const post: any = await modules[`../../../../blogData/articles/${params.id}.mdx`]();
  json(200,{ metadata: post.frontmatter, head: post.head })
};


export default component$((async () => {
  useStylesScoped$(styles);
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

export const head: DocumentHead = ({  url }) => {
  return {
    title: "",//data.metadata.title,
    links: [
      //{ rel: "cannonical", href: url }
    ],
    meta: [

      // { name: "og:site_name", content:  data.metadata.author },
      // { name: 'og:title', content: data.metadata.title },
      // { name: 'og:description', content: data.metadata.description },
      // { name: 'description', content: data.metadata.description },
      // { name: 'og:url', content: url },
      // { name: 'og:image', content: "./background.png" },
      // { name: 'og:image:url', content: "./background.png" },
      // { name: 'twitter:image', content: "./background.png" },
    ]
  }
};

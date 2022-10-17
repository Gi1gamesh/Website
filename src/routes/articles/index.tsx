import articles from './articles.json';
import { ArticleData } from '~/types';
import { component$ } from '@builder.io/qwik';
import Card from "../../components/card";

export default component$(() => {
  return (
    <div>
    {
        (articles as Array<ArticleData>)
          .map(({title,description,url,created}) => 
            (<Card title={title} created={created} description={description} url={url} />) )
    }
    </div>
  );
});
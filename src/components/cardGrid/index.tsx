import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { ArticleData } from '~/types';
import Card from '../card';

import styles from './index.css?inline';

type Props = {
    articles: ArticleData[]
}

export default component$(({ articles }: Props) => {
    useStylesScoped$(styles);
    const {href} = useLocation();
    const baseUrl = href.split("/").slice(0,-1).join('/');
    return (
        <div class='cards'>
            {articles.map(a => (<Card article={a} rootUrl={baseUrl} />))}
        </div>
    );
});
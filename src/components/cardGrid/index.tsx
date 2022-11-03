import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ArticleData } from '~/types';
import Card from '../card';

import styles from './index.css?inline';

type Props = {
    articles: ArticleData[]
}

export default component$(({ articles }: Props) => {
    useStylesScoped$(styles);
    return (
        <div class='cards'>
            {articles.map(a => (<Card article={a} />))}
        </div>
    );
});
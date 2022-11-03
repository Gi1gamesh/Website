import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ArticleData } from '~/types';
import Info from '../articleInfo/articleInfo';
import styles from './index.css?inline';

type Props = {
    article: ArticleData
}

export default component$(({ article }: Props) => {
    const { title, description, created, words } = article;
    useStylesScoped$(styles);
    return (
        <article class="card">
            <div class="container">
                <h3>{title}</h3>
                <p>{description.length < 400 ? description : description.slice(0, 397) + '...'}</p>
            </div>
            <div class="info">
                <Info wordCount={words} date={created} tags={article.tags} />
            </div>
        </article>
    );
});
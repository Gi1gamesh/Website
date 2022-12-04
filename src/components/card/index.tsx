import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ArticleData } from '~/types';
import Info from '../articleInfo/articleInfo';
import styles from './index.css?inline';

type Props = {
    article: ArticleData
    rootUrl: string
}

export default component$(({ article, rootUrl }: Props) => {
    const { title, description, created, words, tags, path } = article;
    useStylesScoped$(styles);
    return (
        <article class="card">
            <a href={`${rootUrl}/article/${path}`}>
                <div class="container">
                    <h3>{title}</h3>
                    <p>{description.length < 400 ? description : description.slice(0, 397) + '...'}</p>
                </div>
            </a>
            <div class="info">
                <Info wordCount={words} date={created} tags={tags} />
            </div>
        </article>
    );
});
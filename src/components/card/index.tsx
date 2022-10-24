import { component$ } from '@builder.io/qwik';
import { ArticleData } from '~/types';

export default component$(({title, description, path, created}: ArticleData) => {

    return (
        <div class="card">
            <div class="container">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
});
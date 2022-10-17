import { component$ } from '@builder.io/qwik';
import { ArticleData } from '~/types';

export default component$(({title, description, url, created}: ArticleData) => {

    return (
        <div class="card">
            <div class="container">
                <h4><b>{title}</b></h4>
                <p>{description}</p>
            </div>
        </div>
    );
});
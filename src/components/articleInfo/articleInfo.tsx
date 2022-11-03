import { component$, useStylesScoped$ } from '@builder.io/qwik';
import ProfileImage from '../profileImage/profileImage';
import styles from './articleInfo.css?inline';

type Props = {
    date: number
    wordCount: number,
    tags: string[]
}

export default component$(({date,wordCount }: Props) => {
    //const rootUrl = href.split('/').slice(0,3).join('/');
    useStylesScoped$(styles);
    return (
                    <div class="details">
                        <div class="profile">
                            <ProfileImage size={35}/>
                        </div>
                        <div>
                            <h5>Kevin Mckenny</h5>
                            <div class="details-text">
                                <p>{new Date(Number(date)).toLocaleDateString()}</p>
                                <p>&#x2022;</p>
                                <p>{Math.round(Number(wordCount)/200)} min read</p>
                                {
                                    /* <p>&#x2022;</p>
                                 {tags.map(tag => <a class="chip" href={`${rootUrl}/tag/${tag.toLowerCase()}`}>{tag}</a>)} */}
                            </div>
                        </div>
                    </div>
           
    );
});

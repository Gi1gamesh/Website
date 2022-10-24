import { component$, useStylesScoped$ } from '@builder.io/qwik';
import ProfileImage from '../profileImage/profileImage';
import styles from './headerInfo.css?inline';

type Props = {
    title: string
    date: number
    wordCount: number,
}

export default component$(({title,date,wordCount}: Props) => {
    useStylesScoped$(styles);
    return (
            <header>
                <div class="header">
                    <h1>{title}</h1>
                    <div class="details">
                        <ProfileImage size={35}/>
                        <div class="details-text">
                            <p>{new Date(Number(date)).toLocaleDateString()}</p>
                            <p>|</p>
                            <p>{Math.round(Number(wordCount)/200)} min read</p>
                        </div>
                    </div>
                </div>
            </header>
    );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import ProfileImage from '../../profileImage/profileImage';
import styles from './header.css?inline';

type Props = {
    title: string
    date: string
    wordCount: number,
}

export default component$(({title,date,wordCount}: Props) => {
    useStylesScoped$(styles);
    return (
            <header>
                <div class="header-info">
                    <ProfileImage size={35}/>
                    <div class="header-info-text">
                        <p>{date}</p>
                        <p>|</p>
                        <p>{wordCount/200} min read</p>
                    </div>
                </div>
            </header>
    );
});

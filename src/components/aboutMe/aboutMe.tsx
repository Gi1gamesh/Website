import { component$, useStylesScoped$ } from '@builder.io/qwik';
import ProfileImage from '../profileImage/profileImage'
import styles from './aboutMe.css?inline';



export default component$(() => {
    useStylesScoped$(styles);
    return (
        <article>
            <header>
                <ProfileImage />
                <h1>About Me</h1>
            </header>
            <p>
                Hi I'm Kevin! I am an experienced software developer in Ottawa, Canada.
            </p>
            <p>
                Currently I'm a lead developer at <a href="www.Ceridian.com">Ceridian</a> working on platform architecture. Most of my experience is with .NET or TypeScript/JavaScript. You can find out more about me on <a href='https://www.linkedin.com/in/kevinmckenny'>LinkedIn</a> or contact me at <a href="Kevin_Mckenny@outlook.com">Kevin_Mckenny@outlook.com</a>.
            </p>
        </article>
    );
});
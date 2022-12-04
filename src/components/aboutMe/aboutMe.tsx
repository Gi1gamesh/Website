import { component$, useStylesScoped$ } from '@builder.io/qwik';
import ProfileImage from '../profileImage/profileImage'
import styles from './aboutMe.css?inline';

export default component$(() => {
    useStylesScoped$(styles);
    return (
        <article>
            <header>
                <ProfileImage size={65}/>
                <h1>About Me</h1>
            </header>
            <p>
                Hi, I'm Kevin! I'm a programming enthusiast based out of Ottawa, Canada.
            </p>
            <p>
                You will typically find me writing code in .NET and TypeScript. I have a passion for software design & architecture, and I'm always fascinated by how simplicity can create the most elegant solutions to our problems.
            </p>
            <p>
                Currently, I'm a lead developer at <a href="https://www.ceridian.com">Ceridian</a> working on platform architecture. Most of my experience is with .NET or TypeScript/JavaScript. You can find out more about me on <a href='https://www.linkedin.com/in/kevinmckenny'>LinkedIn</a>.
            </p>
        </article>
    );
});
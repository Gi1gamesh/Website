import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import AboutMe from '../components/aboutMe/aboutMe'

export default component$(() => {
  return (
    <div>
     <AboutMe />
    </div>
  );
});

const description = "Hi I'm Kevin. This is my personal blog where I will occasionally post articles about programming, software architecture .NET, TypeScript, C#, Infrastructure, Azure and various other topics.";
const title ='Kevin Mckenny';

export const head: DocumentHead = {
  title: "Kevin Mckenny",
  links: [
    {rel:"cannonical", href:"www.kevinmckenny.com"}
  ],
  meta: [
    {name: "og:site_name",    content: "Kevin Mckenny"},
    {name: 'og:title',        content: title},
    {name: 'og:description',  content: description },
    {name: 'og:url',          content: "www.kevinmckenny.com"},
    {name: 'og:image',        content:"./background.png" },
    {name: 'og:image:url',    content:"./background.png" },
    {name: 'twitter:image',   content:"./background.png" },
  ]
};

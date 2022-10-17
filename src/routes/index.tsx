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

const description = "I'm Kevin mckenny, a software developer and enthusiast";
const title ='Kevin Mckenny - Software development';
export const head: DocumentHead = {
  title: "Kevin's Blog",
  links: [
    {rel:"cannonical", href:"www.kevinmckenny.com"}
  ],
  meta: [
    {name: "og:site_name", content: "Kevin Mckenny"},
    {name: 'og:title', content: title},
    {name: 'og:description', content: description },
    {name: 'description', content: description },
    {name: 'og:url', content: "www.kevinmckenny.com"}
  ]
};

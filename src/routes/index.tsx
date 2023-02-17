import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import AboutMe from '../components/aboutMe/aboutMe'
import siteData from '../../blogData/site-metadata.json';
import articles from '../../blogData/preview-manifest.json';
import Grid from '../components/cardGrid';

export default component$(() => {
  return (
    <div>
      <AboutMe />
      <Grid articles={articles} />
    </div>
  );
});


export const head: DocumentHead = ({ href }) => {
  return {
    title: siteData.author,
    links: [
      { rel: "cannonical", href: href }
    ],
    meta: [
      { name: "og:site_name", content: siteData.author },
      { name: 'og:title', content: siteData.author },
      { name: 'og:description', content: siteData.description },
      { name: 'description', content: siteData.description },
      { name: 'og:url', content: href },
      { name: 'og:image', content: "./background.png" },
      { name: 'og:image:url', content: "./background.png" },
      { name: 'twitter:image', content: "./background.png" },
    ]
  }
}

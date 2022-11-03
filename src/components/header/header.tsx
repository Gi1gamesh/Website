import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Logo } from '../icons/logo';
import { LinkedInLogo } from '../icons/linkedin';
import { GithubLogo } from '../icons/github';

import styles from './header.css?inline';
import { TwitterLogo } from '../icons/twitter';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <header>
      <div class="content-wrapper" >
        <div class="logo">
          <a href="https://www.kevinmckenny.com" >
            <Logo />
          </a>
        </div>
        <span>
          Kevin Mckenny
        </span>
        <nav class="social-links">
          <a href='https://github.com/Gi1gamesh' title='Github' target="_blank">
            <GithubLogo />
          </a>
          <a href='https://www.linkedin.com/in/kevinmckenny/' title='LinkedIn' target="_blank">
            <LinkedInLogo />
          </a>
          <a href='https://twitter.com/KevMcKenny' title='twitter' target="_blank">
            <TwitterLogo />
          </a>
        </nav>
      </div>
    </header>
  );
});

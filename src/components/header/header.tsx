import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Logo } from '../icons/logo';
import { LinkedInLogo } from '../icons/linkedin';
import { GithubLogo } from '../icons/Github';
import { useDocumentHead } from '@builder.io/qwik-city';

import styles from './header.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  const head = useDocumentHead();
  return (
    <header>
      <div class="content-wrapper" >
       <div class="logo">
          <a href="/" >
            <Logo />
          </a>
        </div>
        <span>
          {head.title}
        </span>
        <nav class="social-links">
          <a href="https://github.com/Gi1gamesh" title='Github' target="_blank">
            <GithubLogo />
          </a>
          <a href="https://www.linkedin.com/in/kevinmckenny/" title='LinkedIn' target="_blank">
            <LinkedInLogo />
          </a>
        </nav>
      </div>
    </header>
  );
});
import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './footer.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <footer>
        <div class="content-wrapper" >
            <a href="https://github.com/Gi1gamesh/Website" target="_blank">
            Kevin Mckenny © {new Date().getFullYear()}
            </a>
        </div>
      </footer>
  );
});

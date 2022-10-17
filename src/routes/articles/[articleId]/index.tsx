import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const location = useLocation();
  return (
    <div>
      <article>
        <header>
          <h1>Article</h1>
        </header>
        <section>
          <div>
            <h1>Article</h1>
            <p>Pathname: {location.pathname}</p>
            <p>article Id: {location.params.articlId}</p>
          </div>
        </section>

      </article>
    </div>
  );
});
import { Resource, component$ } from '@builder.io/qwik';
import { RequestHandler, useLocation, useEndpoint } from '@builder.io/qwik-city';
import { json } from 'stream/consumers';
const modules = import.meta.glob('../../../../public/*.json');

export const onGet: RequestHandler<any> = async ({ params }) => {
  // put your DB access here, we are hard coding a response for simplicity.
  return await modules["../../../../public/manifest.json"]();
};

export default component$(() => {
  const location = useLocation();
  const articleData = useEndpoint<any>();
  return (
    <Resource
      value={articleData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(article) => (
        <div>
          <article>
            <header>
              <h1>Article</h1>
            </header>
            <section>
              <div>
                <h1>{JSON.stringify(article)}</h1>
                <p>Pathname: {location.pathname}</p>
                <p>article Id: {location.params.articlId}</p>
              </div>
            </section>

          </article>
        </div>)} />
  );
});
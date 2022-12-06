import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import Footer from '~/components/footer/footer';

export default component$(() => {

  return (
    <>
      <Header />
      <main class="content-wrapper main-content">
        <div class="content-flex-container">
          <Slot />
        </div>
      </main>
      <Footer />
    </>
  );
});

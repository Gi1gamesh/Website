import { component$ } from '@builder.io/qwik';
import { RequestHandler, DocumentHead, useLocation } from '@builder.io/qwik-city';
import Header from '../../../components/articleInfo/articleInfo';


export default component$((async () => {
    const { params, href } = useLocation();
    return (<article>{params.id}  {href }</article>);
  }) as any);
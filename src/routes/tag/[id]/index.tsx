import { component$ } from '@builder.io/qwik';
import {  useLocation } from '@builder.io/qwik-city';


export default component$((async () => {
    const { params, href } = useLocation();
    return (<article>{params.id}  {href.split('/').slice(0,3).join('/') }</article>);
  }) as any);
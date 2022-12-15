import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';


type Props = {
  text: string
}

export const SumList = component$(({text}: Props ) => 
{
  const values = text.split('--');
  const sums = [];
  for(let i = 1; i<values.length; i+=2)
  {
    const sum = (values[i+1].match(/\b\d+(?:[.,]\d+)*\b/g) || []).reduce((acc, num) => acc + Number(num), 0); 
    sums.push({category: values[i], sum})
  }

  return <>{sums.map((s, uniqueKey) => (<div class="sum-category" key={uniqueKey}><b>{s.category}</b>: {s.sum}</div>))}</>
})

export default component$(() => {
  useStylesScoped$(styles);
  const state = useSignal('');

  return (
    <div class="sum-container">
      <textarea class="sum-input" onChange$={(event) => {state.value = event.target.value}}/>
      <div class="sum-categories">
        { <SumList text={state.value} /> }
      </div>
    </div >
  );
});

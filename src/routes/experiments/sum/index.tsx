import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';

type Sum = {
  category: string,
  sum: number
}

type State = {
  value: string
}

export const SumList = component$(({value}: State ) => 
{
  const values = value.split('--');
  const sums = [];
  for(let i = 1; i<values.length; i+=2)
  {
    const sum = (values[i+1].match(/\b\d+(?:[.,]\d+)*\b/g) || []).reduce((acc, num) => acc + Number(num), 0); 
    sums.push({category: values[i], sum})
  }

  return <div>{sums.map(s => (<div class="sum-category"><b>{s.category}</b>: {s.sum}</div>))}</div>
})

export default component$(() => {
  useStylesScoped$(styles);
  const state = useStore<State>({ value: '' });

  return (
    <div class="sum-container">
      <textarea class="sum-input" onChange$={event => state.value = event.target.value}/>
      <div class="sum-categories">
        <SumList value={state.value} />
      </div>
    </div >
  );
});

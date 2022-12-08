import { component$, useStore, $, useStyles$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';

type Sum = {
  category: string,
  sum: number
}

type State = {
  sums: Sum[]
}

export default component$(() => {
  useStylesScoped$(styles);
  const state = useStore<State>({ sums:[] });

  const setSums = $((value: string) => { 

    const values = value.split('--');
    const newValues = [];
    for(let i = 1; i<values.length; i+=2)
    {
      const sum = (values[i+1].match(/\b\d+(?:[.,]\d+)*\b/g) || []).reduce((acc, num) => acc + Number(num), 0); 
      newValues.push({category: values[i], sum})
    }
    state.sums = newValues;
  });

  return (
    <div class="sum-container">
      <textarea class="sum-input" onChange$={event => setSums(event.target.value)}/>
      <div class="sum-categories">
        {state.sums.map(s => (<div class="sum-category"><b>{s.category}</b>: {s.sum}</div>) )}
      </div>
    </div >
  );
});

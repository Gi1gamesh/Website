import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './profileImage.css?inline';

type Props = {
    size: Number
}

export default component$(() => {
  useStylesScoped$(styles);
  return ( <img alt="profile picture" class="profile-gravatar" src="/profile.png" />);
});
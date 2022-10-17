import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './profileImage.css?inline';

type Props = {
    size: number
}

export default component$(({size}: Props) => {
  useStylesScoped$(styles);
  return ( <img width={size} height={size} alt="profile picture" class="profile-gravatar" src="/profile.png" />);
});
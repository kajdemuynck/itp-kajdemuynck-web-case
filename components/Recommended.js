import Link from 'next/link';
import { Image as DatoImage } from "react-datocms";
import styles from '../styles/Recommended.module.css';

const Recommended = ({ recipe }) => {
  return (
    <section className={styles.recommended__container}>
      <h2 className={styles.subtitle}>Recommended</h2>
      <Link href={`/recipes/${recipe.slug}`}>
        <a>
          <article className={styles.recommended__item}>
            <DatoImage data={recipe.image.imageBig} />
            <div className={styles.recommended__info}>
              <h3 className={styles.rotd__title}>Recipe of the day</h3>
              <p className={styles.rotd__name}>{recipe.name}</p>
            </div>
          </article>
        </a>
      </Link>
    </section>
  );
}
 
export default Recommended;
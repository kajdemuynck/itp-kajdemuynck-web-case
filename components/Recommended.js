import styles from '../styles/Recommended.module.css';
import { Image as DatoImage } from "react-datocms";

const Recommended = ({ recipe }) => {
  return (
    <section className={styles.recommended__container}>
      <h2 className={styles.subtitle}>Recommended</h2>
      <article className={styles.recommended__item}>
        <DatoImage data={recipe.image.imageBig} />
        <div className={styles.recommended__info}>
          <h3 className={styles.rotd__title}>Recipe of the day</h3>
          <p className={styles.rotd__name}>{recipe.name}</p>
        </div>
      </article>
    </section>
  );
}
 
export default Recommended;
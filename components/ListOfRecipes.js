import Image from 'next/image';
import Link from 'next/link';
import { Image as DatoImage } from "react-datocms";
import { useState } from 'react';
import styles from '../styles/ListOfRecipes.module.css';

const ListOfRecipes = ({ data }) => {
  console.log(data);
  const sortOptions = ['az', 'za', 'time'];
  const [sortSelected, setSortSelected] = useState(0);

  // Changing the order of the recipes in the list
  const handleClickSort = () => {
    let value = sortSelected + 1;
    value %= sortOptions.length;
    setSortSelected(value);
  };

  return (
    <section className={styles.recipes__container}>
      <div className={styles.subtitle__container}>
        <h2 className={styles.subtitle}>Recipes</h2>
        <div className={styles.section__options}>
          <button className={styles.btn__sort} onClick={handleClickSort}>
            <Image src={`/images/icon-sort-${sortOptions[sortSelected]}.svg`} alt="sort" width={32} height={32} />
          </button>
        </div>
      </div>
      <ul className={styles.recipes}>
        {data.allRecipes.map((recipe, index) => (
          <li key={index}>
            <Link href={`/recipes/${recipe.slug}`} key={recipe.id}>
              <a className={styles.recipe}>
                <div className={styles.recipe__img}>
                  <DatoImage data={recipe.image.imageSmall} />
                </div>
                <p className={styles.recipe__name}>{recipe.name}</p>
                <p className={styles.recipe__ingredients}>ingredients</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
 
export default ListOfRecipes;
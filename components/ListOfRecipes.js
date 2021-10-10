import styles from '../styles/ListOfRecipes.module.css';
import { Image } from "react-datocms";
import { useState } from 'react';

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
            {/* <Image src={`/images/icon-sort-${sortOptions[sortSelected]}.svg`} alt="sort" width={32} height={32} /> */}
          </button>
        </div>
      </div>
      <ul className={styles.recipes}>
        {data.allRecipes.map((recipe, index) => (
          <li className={styles.recipe} key={index}>
            <div className={styles.recipe__img}>
              <Image data={recipe.image.responsiveImage} />
            </div>
            <p className={styles.recipe__name}>{recipe.title}</p>
            <p className={styles.recipe__ingredients}>ingredients</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
 
export default ListOfRecipes;
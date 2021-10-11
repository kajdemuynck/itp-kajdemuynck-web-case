import Image from 'next/image';
import Link from 'next/link';
import { Image as DatoImage } from "react-datocms";
import { useState } from 'react';
import styles from '../styles/ListOfRecipes.module.css';

const ListOfRecipes = ({ data, inputSearch }) => {
  const sortOptions = ['az', 'za', 'time'];
  const [sortSelected, setSortSelected] = useState(0);
  const [recipesSorted, setRecipesSorted] = useState([...data]);

  // Changing the order of the recipes in the list
  const handleClickSort = () => {
    let value = sortSelected + 1;
    value %= sortOptions.length;
    let recipes = [...data];

    // Sorting alphabetically
    if (sortOptions[value] === 'az' || sortOptions[value] === 'za') {
      // Sort them from a to z
      recipes.sort((a, b) => {
        const name01 = a.name.toLowerCase();
        const name02 = b.name.toLowerCase();
        if (name01 < name02) {
          return -1;
        } else if (name01 > name02) {
          return 1;
        } else {
          return 0;
        }
      });

      // Reverse the order if necessary
      if (sortOptions[value] === 'za') {
        recipes = recipes.reverse();
      }
    }
    // Sorting by cooking time
    else if (sortOptions[value] === 'time') {
      recipes.sort((a, b) => {
        return a.time - b.time;
      });
    }

    setSortSelected(value);
    setRecipesSorted(recipes);
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
        {recipesSorted.map((recipe, index) => (
          <li key={index}>
            <Link href={`/recipes/${recipe.slug}`} key={recipe.id}>
              <a className={styles.recipe}>
                <div className={styles.recipe__img}>
                  <DatoImage data={recipe.image.imageSmall} />
                </div>
                <p className={styles.recipe__name}>{recipe.name}</p>
                <p className={styles.recipe__ingredients}>{recipe.ingredients.map(ingredient => ingredient.plural ? ingredient.plural : ingredient.name).join(`, `)}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
 
export default ListOfRecipes;
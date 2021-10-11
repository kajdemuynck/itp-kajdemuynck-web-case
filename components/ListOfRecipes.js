import Image from 'next/image';
import Link from 'next/link';
import { Image as DatoImage } from "react-datocms";
import { useState, useEffect } from 'react';
import styles from '../styles/ListOfRecipes.module.css';

const ListOfRecipes = ({ data, inputSearch }) => {
  const sortOptions = ['az', 'za', 'time'];
  const [sortSelected, setSortSelected] = useState(0);
  const [recipesSorted, setRecipesSorted] = useState([...data]);

  useEffect(() => {
    // Filtering the list based on the search criteria
    const filterRecipesBySearch = tmp => {
      // Retrieving all the keywords
      const keywordsArr = inputSearch.split(` `).map(word => word.toLowerCase());
      let recipes = [...tmp];

      // Running over every keyword
      keywordsArr.forEach(keyword => {
        // Running over every recipe
        recipes = recipes.filter(recipe => {
          let valid = false;
          // Checking the name of the recipe
          if (recipe.name.toLowerCase().includes(keyword)) {
            valid = true;
          } else {
            // Checking the ingredients
            recipe.ingredients.forEach(ingredient => {
              if (ingredient.name.toLowerCase().includes(keyword) || ingredient.plural.toLowerCase().includes(keyword)) {
                valid = true;
              }
            });
          }

          return valid;
        });
      });

      return recipes;
    };

    // Sorting the list of recipes
    const sortRecipes = recipes => {
      // Sorting alphabetically
      if (sortOptions[sortSelected] === 'az' || sortOptions[sortSelected] === 'za') {
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
        if (sortOptions[sortSelected] === 'za') {
          recipes = recipes.reverse();
        }
      }
      // Sorting by cooking time
      else if (sortOptions[sortSelected] === 'time') {
        recipes.sort((a, b) => {
          return a.time - b.time;
        });
      }

      return recipes;
    };

    // Altering the list of recipes based on values
    let tmp = [...data];
    tmp = filterRecipesBySearch(tmp);
    tmp = sortRecipes(tmp);
    setRecipesSorted(tmp);
  }, [inputSearch, sortSelected]);

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
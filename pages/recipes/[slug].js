import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Image as DatoImage } from "react-datocms";
import { StructuredText } from "react-datocms";
import { request } from "../../lib/datocms";
import styles from '../../styles/Recipe.module.css';

const ALL_RECIPES_QUERY = `query GetAllRecipes {
  allRecipes {
    slug
    id
  }
}`;

const RECIPE_QUERY = `query GetRecipe($slug: String) {
  allRecipes(filter: {slug: {eq: $slug}}) {
    id
    slug
    name
    image {
      responsiveImage {
        alt
        aspectRatio
        base64
        height
        sizes
        src
        srcSet
        title
        width
        webpSrcSet
      }
    }
    method {
      value
    }
    servings
    time
  }
}`;

const INGREDIENTS_QUERY = `query GetIngredientsFromRecipe($id: ItemId) {
  allRecipeIngredients(filter: { recipe: { eq: $id } }) {
    amount
    ingredient {
      name
      plural
    }
    unit {
      plural
      singular
      abbreviation
    }
  }
}`;

export const getStaticProps = async ({ params }) => {
  // Getting the recipe
  const data = await request({
    query: RECIPE_QUERY,
    variables: { slug: params.slug }
  });
  // Getting the ingredients from the recipe
  const ingredients = await request({
    query: INGREDIENTS_QUERY,
    variables: { id: data.allRecipes[0].id }
  });
  data.allRecipes[0].ingredients = ingredients.allRecipeIngredients;

  return {
    props: { data }
  };
};

export const getStaticPaths = async () => {
  // Getting all the recipes
  const data = await request({
    query: ALL_RECIPES_QUERY
  });

  return {
    paths: data.allRecipes.map(recipe => ({ params: { slug: `${recipe.slug}` } })),
    fallback: false
  }
};

const Recipe = ({ data }) => {
  const recipe = data.allRecipes[0];
  console.log(recipe);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{recipe.name}</title>
      </Head>
      <main className={styles.main}>
        <Link href="/">
          <a>
            <button className={styles.btn__back}></button>
          </a>
        </Link>
        <div className={styles.data}>
          <div className={styles.img}>
            <DatoImage data={recipe.image.responsiveImage} />
          </div>
          <h1 className={styles.title}>{recipe.name}</h1>
          <ul className={styles.extra}>
            <li className={styles.extra__item} key="time">
              <Image className={styles.extra__img} src="/images/icon-time.svg" alt="" width={40} height={40} />
              <p className={styles.extra__txt}>{recipe.time} min.</p>
            </li>
            <li className={styles.extra__item} key="servings">
              <Image className={styles.extra__img} src="/images/icon-serves.svg" alt="" width={40} height={40} />
              <p className={styles.extra__txt}>{recipe.servings} serves</p>
            </li>
          </ul>
          <div className={styles.info}>
            <section className={styles.ingredients__container}>
              <h2 className={styles.subtitle}>What you will need</h2>
              <ul className={styles.ingredients}>
                {recipe.ingredients.map(ingredient => (
                  <li className={styles.ingredient} key={ingredient.ingredient.name}>
                    <p className={styles.ingredient__amount}>{ingredient.amount}{ingredient.unit ? ingredient.unit.abbreviation : ingredient.amount ? 'x' : ''}</p>
                    <p className={styles.ingredient__name}>{ingredient.amount !== 1 && ingredient.ingredient.plural ? ingredient.ingredient.plural : ingredient.ingredient.name}</p>
                  </li>
                ))}
              </ul>
            </section>
            <section className={styles.method__container}>
              <h2 className={styles.subtitle}>Let's get cooking!</h2>
              <div className={styles.method}>
                <StructuredText data={recipe.method} />
              </div>
            </section>
          </div>
        </div>
        <div></div>
      </main>
    </div>
  );
};

export default Recipe;
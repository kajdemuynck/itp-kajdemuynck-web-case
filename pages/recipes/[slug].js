import Head from 'next/head';
import Image from 'next/image'
import styles from '../../styles/Recipe.module.css';

const Recipe = () => {
  // testdata
  const recipe = {
    name: 'Spaghetti bolognese',
    img: 'vercel.svg',
    time: 60,
    servings: 4,
    method: ''
  };

  const ingredients = [{
    name: 'mushroom',
    plural: 'mushrooms',
    amount: 90,
    unit: {
      singular: 'gram',
      plural: 'grams',
      abbrevation: 'g'
    }
  }];
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{recipe.name}</title>
      </Head>
      <main>
        <button className={styles.btn__back}></button>
        <Image className={styles.img} src="/vercel.svg" alt="" width={360} height={240} />
        <h1 className={styles.title}>{recipe.name}</h1>
        <ul className={styles.extra}>
          <li className={styles.time}>
            <Image className={styles.time__img} src="/vercel.svg" alt="" width={40} height={40} />
            <p className={styles.time__txt}>{recipe.time} min.</p>
          </li>
          <li className={styles.servings}>
            <Image className={styles.servings__img} src="/vercel.svg" alt="" width={40} height={40} />
            <p className={styles.servings__txt}>{recipe.servings} serves</p>
          </li>
        </ul>
        <div className={styles.info}>
          <section className={styles.ingredients__container}>
            <h2 className={styles.subtitle}>What you will need</h2>
            <ul className={styles.ingredients}>
              {ingredients.map(ingredient => (
                <li className={styles.ingredient} key={ingredient.name}>
                  <p className={styles.ingredient__amount}>{ingredient.amount}{ingredient.unit.abbrevation}</p>
                  <p className={styles.ingredient__name}>{ingredient.name}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.method__container}>
            <h2 className={styles.subtitle}>Let's get cooking!</h2>
            <div className={styles.method}>
              {recipe.method}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Recipe;
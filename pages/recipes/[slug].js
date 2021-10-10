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
      <main className={styles.main}>
        <button className={styles.btn__back}></button>
        <div className={styles.data}>
          <div className={styles.img}>
            <Image src="/images/recipe.jpg" alt="" width={360} height={240} />
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
                {ingredients.map(ingredient => (
                  <li className={styles.ingredient} key={ingredient.name}>
                    <p className={styles.ingredient__amount}>{ingredient.amount}{ingredient.unit.abbrevation}</p>
                    <p className={styles.ingredient__name}>{ingredient.amount === 1 ? ingredient.name : ingredient.plural}</p>
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
        </div>
        <div></div>
      </main>
    </div>
  );
};

export default Recipe;
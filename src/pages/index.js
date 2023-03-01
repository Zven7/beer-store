import Head from "next/head";
import Image from "next/image";
import Styles from "@/styles/Home.module.css";
import products from "public/products";
import Card from "@/components/Card/Card";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(0);
  const CATEGORIES = [
    { title: "All", img: "" },
    { title: "Beer", img: "beer.svg" },
    { title: "Wine", img: "wine.svg" },
  ];
  return (
    <>
      <Head>
        <title>Zven's Beer Store</title>
        <meta name="description" content="Beer store by Zven" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap");
        </style>
      </Head>
      <main className={Styles.main}>
        <div className={Styles.Greetings}>
          <p>Hi Mr. Michael,</p>
          <h1 className={Styles.headerText}>Welcome Back!</h1>
        </div>
        <div className={Styles.searchBarContainer}>
          <Image
            className={Styles.glass}
            alt="Search"
            src={`/images/search.svg`}
            width={15}
            height={15}
          />
          <input
            className={Styles.searchBar}
            placeholder="Search burger, pizza, drink or etc..."
          />
        </div>
        <div className={Styles.categories}>
          <p className={Styles.subHeaderText}>Drink Category</p>
          <div className={Styles.categoriesContainer}>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.title}
                className={`${Styles.btn} ${
                  activeCategory == i ? Styles.active : Styles.inactive
                }`}
                onClick={() => setActiveCategory(i)}
              >
                {cat.img !== "" ? (
                  <Image
                    src={`/images/${cat.img}`}
                    width={20}
                    height={20}
                    alt={cat.title}
                  />
                ) : null}
                {cat.title}
              </button>
            ))}
          </div>
        </div>
        <div className={Styles.list}>
          <p className={Styles.subHeaderText}>Popular</p>
          <div className={Styles.cardsContainer}>
            {products.map((product) => (
              <Card product={product} key={product.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

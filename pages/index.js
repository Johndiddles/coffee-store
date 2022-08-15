import Head from "next/head";
import Hero from "../components/Hero/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Time</title>
        <meta
          name="description"
          content="Get a list of coffee shops around you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </div>
  );
}

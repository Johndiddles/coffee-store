import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroSection__left}>
        <h1 className={styles.title}>
          <span className={styles.title1}> Coffee</span> Time
        </h1>
        <p className={styles.subTitle}>Find coffee shops around you</p>
        <button className={styles.button}>Find Coffee Shops</button>
      </div>
      <div className={styles.heroSection__right}>
        <Image
          src="/static/nextjs.svg"
          alt="hero section image"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Hero;

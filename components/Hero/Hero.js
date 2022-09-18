import React, { useEffect } from "react";
import styles from "./Hero.module.css";
import cls from "classnames";
import useTrackLocation from "../../hooks/use-track-location";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

const Hero = ({
  handleHeroButton,
  isFindingLocation,
  locationErrorMsg,
  coffeeStoresError,
}) => {
  return (
    <div className={styles.heroSectionWrapper}>
      <div className={styles.heroSection}>
        <div className={styles.heroSection__left}>
          <h1 className={cls("font-bold", styles.title)}>
            <span className={styles.title1}>Coffee</span> Time
          </h1>
          <p
            className={cls(
              "font-medium text-lg text-gray-700",
              styles.subTitle
            )}
          >
            Find coffee shops around you
          </p>
          <button
            onClick={handleHeroButton}
            className={cls(
              "bg-gray-800 py-4 px-12 rounded text-md font-semibold cursor-pointer hover:bg-gray-900 transition-all duration-300 outline-none"
            )}
          >
            {isFindingLocation ? "Locating..." : "View stores nearby"}
          </button>
          {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
          {coffeeStoresError && (
            <p>Error finding coffee stores: {coffeeStoresError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;

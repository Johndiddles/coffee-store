import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Card from "../components/Card/Card";
import Hero from "../components/Hero/Hero";
import styles from "../styles/Home.module.css";
import cls from "classnames";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { ACTION_TYPES, StoreContext } from "../store/storeContext";

export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  // console.log(props);
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const { dispatch, state } = useContext(StoreContext);
  // console.log(state);
  const { coffeeStores, latLong } = state;

  // const [coffeeStores, setCoffeeStores] = useState({});
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const handleHeroButton = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const fetchNearbyStores = async () => {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 20);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores,
            },
          });
          setCoffeeStoresError("");
        } catch (error) {
          console.log({ error });
          setCoffeeStoresError(error?.message);
        }
      }
    };

    fetchNearbyStores();
  }, [latLong, dispatch]);

  return (
    <div className={cls(" text-white", styles.container)}>
      <Head>
        <title>Coffee Time</title>
        <meta
          name="description"
          content="Get a list of coffee shops around you."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        handleHeroButton={handleHeroButton}
        isFindingLocation={isFindingLocation}
        locationErrorMsg={locationErrorMsg}
        coffeeStoresError={coffeeStoresError}
      />

      {/* stores near me  */}
      {coffeeStores?.length > 0 && (
        <div className={styles.coffeeStoresLayout}>
          <h2
            className={cls(
              "pt-12 px-12 text-3xl font-semibold",
              styles.heading2
            )}
          >
            Nearby Coffee Stores
          </h2>
          <div className={styles.cardLayout}>
            {coffeeStores?.map((store) => (
              <Card
                store={store}
                // href={`/coffee-store/${store.fsq_id}`}
                key={store.fsq_id}
              />
            ))}
          </div>
        </div>
      )}

      {/* Toronto stores  */}
      {props?.coffeeStores?.length > 0 && (
        <div className={styles.coffeeStoresLayout}>
          <h2
            className={cls(
              "pt-12 px-12 text-3xl font-semibold",
              styles.heading2
            )}
          >
            Toronto Stores
          </h2>
          <div className={styles.cardLayout}>
            {props?.coffeeStores?.map((store) => (
              <Card
                store={store}
                // href={`/coffee-store/${store.fsq_id}`}
                key={store.fsq_id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

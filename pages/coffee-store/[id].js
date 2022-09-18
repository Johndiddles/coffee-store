import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { MdLocationOn } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { BiArrowBack } from "react-icons/bi";
import cls from "classnames";
import styles from "../../styles/singleCoffee.module.css";
import { StoreContext } from "../../store/storeContext";
import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.fsq_id === params.id
  );

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

const SingleCoffeeStore = (initialProps) => {
  // console.log(initialProps);
  const router = useRouter();
  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(coffeeStore)) {
      const findCoffeeStoreById = coffeeStores.find(
        (coffeeStore) => coffeeStore.fsq_id === id
      );

      setCoffeeStore(findCoffeeStoreById);
    }
  }, [id, coffeeStore, coffeeStores]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, location, imageUrl } = coffeeStore;
  const { address, neighborhood } = location || {};

  console.log({ coffeeStore });

  return (
    <div
      className={cls(
        "flex items-center w-screen gap-12  h-screen  p-24 ",
        styles.singleCoffeePage
      )}
    >
      <Head>
        <title>{name}</title>
      </Head>
      <div className="w-1/2 flex flex-col gap-12 ">
        <Link href="/" className="cursor-pointer w-fit">
          <span className="flex gap-4 items-center cursor-pointer font-semibold hover:translate-x-2 duration-300 w-fit">
            <BiArrowBack /> Back to Home
          </span>
        </Link>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold"> {name} </h1>
          <Image
            src={imageUrl || "/static/darkhouse.jpg"}
            alt={name}
            width={600}
            height={400}
            className="rounded-2xl"
          />
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-4 justify-start">
        <div className="bg-white bg-opacity-30 backdrop-blur-sm text-slate-800 text-lg font-semibold w-96 p-8 rounded-2xl flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {address && (
              <p className="flex gap-4 items-center">
                <span>
                  <MdLocationOn />
                </span>
                {address}
              </p>
            )}
            {neighborhood && (
              <p className="flex gap-4 items-center">
                {" "}
                <span>
                  <FaLocationArrow />
                </span>{" "}
                {neighborhood}
              </p>
            )}
            <p className="flex gap-4 items-center">
              <span>
                <AiFillStar />
              </span>
              5
            </p>
          </div>
          <button className="text-xl font-semibold bg-slate-800 hover:bg-slate-900 transition-all duration-300 text-white w-fit py-2 px-4 rounded">
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCoffeeStore;

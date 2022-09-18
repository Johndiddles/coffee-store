import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";
import cls from "classnames";

console.log({ styles });
const Card = (props) => {
  const { store } = props;
  return (
    <Link href={`/coffee-store/${store?.fsq_id}`}>
      <a
        className={cls(
          "glass bg-gray-100 bg-opacity-90 backdrop-blur-lg w-[360px] ",
          styles.cardLink
        )}
      >
        <h2 className="text-2xl font-semibold text-gray-700 py-4 px-8">
          {store?.name?.length > 17
            ? `${store?.name?.slice(0, 17)}...`
            : store?.name}
        </h2>
        <div className={styles.cardDetails}>
          <div className={styles.cardImageWrapper}>
            <Image
              className="rounded-t-2xl"
              src={store?.imageUrl}
              width={360}
              height={200}
              alt="card"
            />
          </div>
          <div className={styles.cardHeaderWrapper}>
            <h2
              className={cls(
                "text-lg font-semibold text-gray-50",
                styles.cardHeader
              )}
            >
              {store?.name}
            </h2>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;

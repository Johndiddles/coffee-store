import Image from "next/image";
import Link from "next/link";
import styles from "./Card.module.css";
import cls from "classnames";

const Card = (props) => {
  return (
    <Link href={props.href}>
      <a className={cls("glass", styles.cardLink)}>
        <div className={styles.cardDetails}>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imageUrl}
              width={360}
              height={240}
              alt="card"
            />
          </div>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;

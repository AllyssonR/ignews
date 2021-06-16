import styles from "./styles.module.scss";
interface SubcribeButtonProps{
  priceId:string;
}
export function SubcribeButton({priceId}:SubcribeButtonProps) {
  return (
    <button type="button" className={styles.subcribeButton}>
      Subcribe now
    </button>
  );
}

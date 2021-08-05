import { useSession, signIn } from "next-auth/client";
import { api } from "../../../Services/api";
import { getStripeJs } from "../../../Services/stripe-js";
import styles from "./styles.module.scss";
interface SubcribeButtonProps {
  priceId: string;
}
export function SubcribeButton({ priceId }: SubcribeButtonProps) {
  const [session] = useSession();
  async function handleSubcribe() {
    if (!session) {
      signIn("github");
      return;
    }
    //criação da checkout session
    try {
      const response = await api.post("./subscribe");
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <button
      type="button"
      className={styles.subcribeButton}
      onClick={handleSubcribe}
    >
      Subcribe now
    </button>
  );
}

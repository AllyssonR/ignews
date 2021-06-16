import Head from "next/head";
import { SubcribeButton } from "../Components/SignInButton/SubscribeButton";
import { GetServerSideProps } from "next/";
import styles from "./home.module.scss";
import { stripe } from "../Services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey ,welcome </span>
          <h1>
            News about the <span>React</span> Word.
          </h1>
          <p>
            Get access to all publications <br />
            <span> for {product.amount} month</span>
          </p>
          <SubcribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1J2hktAqwIHWWpBIw83Z7vwS");
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };
  return {
    props: {
      product,
    },
  };
};

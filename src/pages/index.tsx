import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../Components/SubscribeButton'
import styles from './home.module.scss'
import { stripe } from '../Services/stripe'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, Welcome</span>
          <h1>
            News about <br /> The <span>React</span> World.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} mouth</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image
          src="/images/avatar.svg"
          height={520}
          width={334}
          alt="girl coding"
        />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1J2hktAqwIHWWpBIw83Z7vwS')
  const product = {
    priceId: price.id,
    amount: price.unit_amount
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price.unit_amount / 100)
      : 'error'
  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // revalidate every 24 hours
  }
}

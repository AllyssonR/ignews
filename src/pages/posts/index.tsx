import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createClient } from '../../Services/prismic'
import Prismic from '@prismicio/client'
import styles from './styles.module.scss'
export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>
              Creating a Monorepo with Lerna &amp; Yarn Workspaces
            </strong>
            <p>
              in this guide , you will learn how to create a Monorepo to menage
              multple packages with a shared business
            </p>
          </a>{' '}
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>
              Creating a Monorepo with Lerna &amp; Yarn Workspaces
            </strong>
            <p>
              in this guide , you will learn how to create a Monorepo to menage
              multple packages with a shared business
            </p>
          </a>{' '}
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>
              Creating a Monorepo with Lerna &amp; Yarn Workspaces
            </strong>
            <p>
              in this guide , you will learn how to create a Monorepo to menage
              multple packages with a shared business
            </p>
          </a>{' '}
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>
              Creating a Monorepo with Lerna &amp; Yarn Workspaces
            </strong>
            <p>
              in this guide , you will learn how to create a Monorepo to menage
              multple packages with a shared business
            </p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient()

  const response = await prismic.get(
    [Prismic.predicates.at('document.type', 'publication')],
    {
      fetch: ['publication.title', 'publication.content']
    }
  )
  console.log(response)
  return {
    props: {}
  }
}

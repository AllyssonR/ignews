/* eslint-disable react/jsx-key */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from './styles.module.scss'
import { getPrismicClient } from '../../Services/prismic'
import { RichText } from 'prismic-dom'
import Link from 'next/link'
type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}
type PostsProps = {
  posts: Post[]
}
export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getAllByType('publication', { pageSize: 100 })
  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(
          (content: { type: string }) => content.type === 'paragraph'
        )?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
    }
  })
  return {
    props: { posts },
    revalidate: 60 * 60
  }
}

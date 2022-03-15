import * as Prismic from '@prismicio/client'

// Update the link Resolver to match your project's route strutures.

export function getPrismicClient() {
  const prismic = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })
  return prismic
}

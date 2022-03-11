import * as Prismic from '@prismicio/client'
export const endpoint = process.env.PRISMIC_ENDPOINT
export const repositoryName = Prismic.getRepositoryName(endpoint)

// Update the link Resolver to match your project's route strutures.

export function createClient() {
  const prismic = Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN
  })
  return prismic
}

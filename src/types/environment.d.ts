declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_API_KEY: string
      NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string
      PRISMIC_ENDPOINT: path
      STRIPE_WEBHOOK_SECRET: string
      PRISMIC_ACCESS_TOKEN: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      FAUNADB_KEY: string
      SIGNING_KEY: string
      STRIPE_SUCCESS_URL: string
      STRIPE_CANCEL_URL: string
      NODE_ENV: 'development'
      PORT?: string
      PWD: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}

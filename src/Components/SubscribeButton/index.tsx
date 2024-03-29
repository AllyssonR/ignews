import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '../../Services/api'
import { getStripejs } from '../../Services/stripe-js'
import styles from './styles.module.scss'
type SubscribeButtonProps = {
  priceId: string
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  async function handleSubcribe() {
    if (!session) {
      signIn('github')
      return
    }
    // criação da checkout session
    if (session.activeSubscription) {
      router.push('/posts')
      return
    }
    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripejs()
      await stripe.redirectToCheckout({ sessionId: sessionId })
    } catch (error) {
      alert(error)
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubcribe}
    >
      Subscribe now
    </button>
  )
}

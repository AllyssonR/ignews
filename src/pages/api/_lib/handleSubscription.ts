import { query as q } from 'faunadb'
import { fauna } from '../../../Services/fauna'
import { stripe } from '../../../Services/stripe'
export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  // Buscar o usuario no banco do FaunaDB com ID {costumerId}
  // Salvar os dados da subscription no faunaDB

  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)) // nessa foi adquidira o somente a referencia do usuario no faunaDB
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId) // nessa linha foi pega toda a informação do usuario no stripe
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }
  if (createAction) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData })
    )
  } else {
    // aqui esta atualizando um cadastro ja existente
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))
        ),
        { data: subscriptionData }
      )
    )
  }
}

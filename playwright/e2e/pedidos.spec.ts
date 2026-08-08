import { test } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import type { OrderDetails } from '../support/actions/orderLockupActions'

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-5SFLHW',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Mariana Monteiro',
        email: 'mariana-1411@hotmail.com',
      },
      payment: 'À Vista',
    }

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-PT77KO',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Judinete Dantas',
        email: 'judantas@gmail.com',
      },
      payment: 'À Vista',
    }

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-QXDN4N',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Joao da Silva',
        email: 'joao@velo.com.br',
      },
      payment: 'À Vista',
    }

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()

    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    const order = '123-abc-XYZ'

    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  })
})

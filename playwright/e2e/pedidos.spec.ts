import { test } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import type { OrderDetails } from '../support/actions/orderLockupActions'
import { insertOrder, deleteOrderByNumber } from '../support/database/orderRepository'

import testData from '../support/fixtures/orders.json' with { type: 'json' }

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = testData.aprovado as OrderDetails

<<<<<<< Updated upstream
    await deleteOrderByNumber(order.number)
    await insertOrder(order)
=======
    // Test Data
    const order = {
      number: 'VLO-5SFLHW',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Mariana Monteiro',
        email: 'mariana-1411@hotmail.com'
      },
      payment: 'À Vista'
    }

    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validadeOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
>>>>>>> Stashed changes

    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = testData.reprovado as OrderDetails

    await deleteOrderByNumber(order.number)
    await insertOrder(order)

<<<<<<< Updated upstream
    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
=======
    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validadeOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
>>>>>>> Stashed changes
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = testData.em_analise as OrderDetails

    await deleteOrderByNumber(order.number)
    await insertOrder(order)

<<<<<<< Updated upstream
    await app.orderLockup.searchOrder(order.number)
    await app.orderLockup.validateOrderDetails(order)
    await app.orderLockup.validateStatusBadge(order.status)
=======
    // Act  
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validadeOrderDetails(order)

    // Validação do badge de status encapsulada no Page Object
    await orderLockupPage.validateStatusBadge(order.status)
>>>>>>> Stashed changes
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {
    const order = generateOrderCode()
<<<<<<< Updated upstream
    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
=======

    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)

    await orderLockupPage.validadeOrderNotFound()

  })

  test('deve exibir mensagem quando o pedido em qualquer formato não é encontrado', async ({ page }) => {

    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder('ABC')

    await orderLockupPage.validadeOrderNotFound()

>>>>>>> Stashed changes
  })


  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    const order = '123-abc-XYZ'

    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  })
})

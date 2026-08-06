import { test } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { Navbar } from '../support/components/Navbar'

import { LandingPage } from '../support/pages/LandingPage'
import { OrderDetails, OrderLockupPage } from '../support/pages/OrderLockupPage'


test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)
    orderLockupPage.validateLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-5SFLHW',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Mariana Monteiro',
        email: 'mariana-1411@hotmail.com'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-PT77KO',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Judinete Dantas',
        email: 'judantas@gmail.com'
      },
      payment: 'À Vista'
    }
 
    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-QXDN4N',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Joao da Silva',
        email: 'joao@velo.com.br'
      },
      payment: 'À Vista'
    }
 
    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    const order = generateOrderCode()

    await orderLockupPage.searchOrder(order)

    await orderLockupPage.validateOrderNotFound()

  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {
 
    const order = '123-abc-XYZ'
 
    await orderLockupPage.searchOrder(order)
 
    await orderLockupPage.validateOrderNotFound()
  })


})

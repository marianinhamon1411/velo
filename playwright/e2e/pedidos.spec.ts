import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  //Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  //Act
  await page.getByTestId('search-order-id').fill('VLO-5SFLHW')
  await page.getByTestId('search-order-button').click()

  //Assert
  await expect(page.locator("//p[@class='font-mono font-medium']")).toBeVisible()
  await expect(page.locator("//p[@class='font-mono font-medium']")).toContainText('VLO-5SFLHW')

  await expect(page.locator('.flex.items-center.gap-2.px-4.py-2.rounded-full.text-sm.font-medium.bg-green-100.text-green-700')).toBeVisible()
  await expect(page.locator('.flex.items-center.gap-2.px-4.py-2.rounded-full.text-sm.font-medium.bg-green-100.text-green-700')).toContainText('APROVADO')
 
})
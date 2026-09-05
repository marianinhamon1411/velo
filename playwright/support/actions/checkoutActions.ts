import { Page, expect } from '@playwright/test'

export type CustomerData = {
  name: string
  lastname: string
  email: string
  phone: string
  document: string
}

export function createCheckoutActions(page: Page) {
  // Locators
  const heading = page.getByRole('heading', { name: 'Finalizar Pedido' })
  const summaryTotal = page.getByTestId('summary-total-price')
  const storeSelect = page.getByTestId('checkout-store')
  const downPaymentInput = page.getByTestId('input-entry-value')
  const termsCheckbox = page.getByTestId('checkout-terms')
  const submitButton = page.getByRole('button', { name: 'Confirmar Pedido' })

  const nameInput = page.getByTestId('checkout-name')
  const lastnameInput = page.getByTestId('checkout-lastname')
  const emailInput = page.getByTestId('checkout-email')
  const phoneInput = page.getByTestId('checkout-phone')
  const documentInput = page.getByTestId('checkout-document')

  const alerts = {
    name: page.getByTestId('error-name'),
    lastname: page.getByTestId('error-lastname'),
    email: page.getByTestId('error-email'),
    phone: page.getByTestId('error-phone'),
    document: page.getByTestId('error-document'),
    store: page.getByTestId('error-store'),
    terms: page.getByTestId('error-terms'),
  }

  return {
    elements: {
      terms: termsCheckbox,
      alerts,
    },

    async open() {
      await page.goto('/order')
    },

    async expectLoaded() {
      await expect(heading).toBeVisible()
    },

    async expectSummaryTotal(price: string) {
      await expect(summaryTotal).toHaveText(price)
    },

    async fillCustomerData(data: CustomerData) {
      await nameInput.fill(data.name)
      await lastnameInput.fill(data.lastname)
      await emailInput.fill(data.email)
      await phoneInput.fill(data.phone)
      await documentInput.fill(data.document)
    },

    // Alias para manter compatibilidade
    async fillCustomerlData(data: CustomerData) {
      await this.fillCustomerData(data)
    },

    async selectStore(storeName: string) {
      await storeSelect.click()
      await page.getByRole('option', { name: storeName }).click()
    },

    async selectPaymentMethod(method: string) {
      await page.getByRole('button', { name: new RegExp(method, 'i') }).click()
    },

    async fillDownPayment(value: string) {
      await downPaymentInput.fill(value)
    },

    async acceptTerms() {
      await termsCheckbox.check()
    },

    async submit() {
      await submitButton.click()
    },

    async expectResult(status: string) {
      await expect(page).toHaveURL(/\/success/)
      await expect(page.getByRole('heading', { name: status })).toBeVisible()
    },
  }
}
import { expect, Page } from '@playwright/test'

export class LandingPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async visit() {
        const catalogLoaded = this.page.waitForResponse('**/catalog')
        await this.page.goto('/')
        await catalogLoaded
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click()
        await expect(this.page.getByTestId('modal').getByRole('heading')).toHaveText('Fila de espera')
    }

    async submitLeadForm(name: string, email: string) {
        await this.page.getByPlaceholder('Informe seu nome').fill(name)
        await this.page.getByPlaceholder('Informe seu email').fill(email)
        await this.page.getByRole('button', { name: 'Quero entrar na fila!' }).click()
    }

    async alertHaveText(target: string | string[]) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}

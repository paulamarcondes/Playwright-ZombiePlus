import { expect, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async doLogin(email: string, password: string) {
        await this.visit()
        await this.submitAdminForm(email, password)
        await this.isLoggedIn()
    }

    async visit() {
        await this.page.goto('/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submitAdminForm(email: string, password: string) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByRole('button', { name: 'Entrar' }).click()
    }

    async isLoggedIn() {
        await expect(this.page).toHaveURL(/\/admin\/movies/)
    }

    async alertHaveText(target: string | string[]) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }
}

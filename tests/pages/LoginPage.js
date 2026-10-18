const { expect } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async doLogin(email, password) {
        await this.visit()
        await this.submitAdminForm(email, password)
        await this.isLoggedIn()
    }

    async visit() {
        await this.page.goto('/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submitAdminForm(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async alertHaveText(text) {
        await expect(this.page.locator('span.alert')).toHaveText(text)
    }
}

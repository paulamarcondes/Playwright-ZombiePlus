const { expect } = require('@playwright/test')

export class MoviesPage {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="movies/register"]').click()
    }

    async submitForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async createMovie(title, overview, company, release_year) {
        await this.goForm()
        await this.page.locator('#title').fill(title)
        await this.page.locator('#overview').fill(overview)
        await this.page.locator('#select_company_id .react-select__dropdown-indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click()
        await this.submitForm()
    }
}
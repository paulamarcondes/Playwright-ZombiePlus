const { expect } = require('@playwright/test')

export class SeriesPage {
    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="/admin/tvshows"]').click()
        await this.page.locator('a[href$="tvshows/register"]').click()
    }

    async submitForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async createSeries(series) {
        await this.page.locator('a[href$="/admin/tvshows"]').click()
        await this.goForm()
        await this.page.locator('#title').fill(series.title)
        await this.page.locator('#overview').fill(series.overview)
        await this.page.locator('#select_company_id .react-select__dropdown-indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: series.company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: series.release_year }).click()
        await this.page.locator('#seasons').fill(String(series.seasons))
        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures' + series.cover)
        if (series.featured) {
            await this.page.locator('.react-switch').click()
        }
        await this.submitForm()
    }

    async searchSeries(target) {
        await this.page.locator('a[href$="/admin/tvshows"]').click()
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.click('.actions')
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async removeSeries(title) {
        await this.page.locator('a[href$="/admin/tvshows"]').click()
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
}

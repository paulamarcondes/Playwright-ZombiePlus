import { expect, Page } from '@playwright/test'
import { fixturePath } from '../support/paths'
import { Series } from '../support/types'

export class SeriesPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goList() {
        await this.page.locator('a[href$="/admin/tvshows"]').click()
    }

    async goForm() {
        await this.goList()
        await this.page.locator('a[href$="tvshows/register"]').click()
    }

    async submitForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async alertHaveText(target: string | string[]) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async createSeries(series: Series) {
        await this.goForm()
        await this.page.locator('#title').fill(series.title)
        await this.page.locator('#overview').fill(series.overview)
        await this.page.locator('#select_company_id .react-select__dropdown-indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: series.company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: String(series.release_year) }).click()
        await this.page.locator('#seasons').fill(String(series.seasons))
        await this.page.locator('input[name=cover]').setInputFiles(fixturePath(series.cover))
        if (series.featured) {
            await this.page.locator('.react-switch').click()
        }
        await this.submitForm()
    }

    async searchSeries(target: string) {
        await this.goList()
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.locator('.actions').click()
    }

    async tableHave(content: string[]) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async removeSeries(title: string) {
        await this.goList()
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.locator('.confirm-removal').click()
    }
}

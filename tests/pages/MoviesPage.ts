import { expect, Page } from '@playwright/test'
import { fixturePath } from '../support/paths'
import { Movie } from '../support/types'

export class MoviesPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="movies/register"]').click()
    }

    async submitForm() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async alertHaveText(target: string | string[]) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async createMovie(movie: Movie) {
        await this.goForm()
        await this.page.locator('#title').fill(movie.title)
        await this.page.locator('#overview').fill(movie.overview)
        await this.page.locator('#select_company_id .react-select__dropdown-indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: movie.company }).click()
        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: String(movie.release_year) }).click()
        await this.page.locator('input[name=cover]').setInputFiles(fixturePath(movie.cover))
        if (movie.featured) {
            await this.page.locator('.react-switch').click()
        }
        await this.submitForm()
    }

    async searchMovie(target: string) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.locator('.actions').click()
    }

    async tableHave(content: string[]) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async removeMovie(title: string) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.locator('.confirm-removal').click()
    }
}

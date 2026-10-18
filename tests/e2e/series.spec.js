const { test } = require('../support')

const data = require('../support/fixtures/series.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL('DELETE FROM tvshows')
})


test('should create new series', async ({ loginPage, seriesPage, popup }) => {
    const series = data.createSeries
    await loginPage.doLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
    await seriesPage.createSeries(series)
    await popup.haveText(`A série '${series.title}' foi adicionada ao catálogo.`)
})


test('should remove series', async ({ loginPage, seriesPage, popup, api }) => {
    const series = data.removeSeries
    await api.postSeries(series)
    await loginPage.doLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
    await seriesPage.removeSeries(series.title)
    await popup.haveText('Série removida com sucesso.')
})


test('should not create duplicate series', async ({ loginPage, seriesPage, popup, api }) => {
    const series = data.duplicateSeries
    await api.postSeries(series)
    await loginPage.doLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
    await seriesPage.createSeries(series)
    await popup.haveText(`O título '${series.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})


test('should not create series when required fields are empty', async ({ loginPage, seriesPage }) => {
    await loginPage.doLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
    await seriesPage.goForm()
    await seriesPage.submitForm()
    await seriesPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])
})


test('should search series by the term "dead"', async ({ loginPage, api, seriesPage }) => {
    const series = data.searchSeries
    for (const m of series.data) {
        await api.postSeries(m)
    }
    await loginPage.doLogin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
    await seriesPage.searchSeries(series.input)
    await seriesPage.tableHave(series.outputs)
})

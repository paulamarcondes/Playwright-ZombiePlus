const { test, expect } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')
const { MoviesPage } = require('../pages/MoviesPage')

test.beforeAll(async () => {
    await executeSQL('DELETE FROM movies')
})


test('deve poder cadastrar um novo filme', async ({ loginPage, moviesPage, popup }) => {
    // precisar estar logado
    const movie = data.createMovie
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.createMovie(movie)
    await popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})


test('deve poder remover um filme', async ({ loginPage, moviesPage, popup, api }) => {
    const movie = data.removeMovie
    await api.postMovie(movie)
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.removeMovie(movie.title)
    await popup.haveText('Filme removido com sucesso.')
})


test('não deve poder cadastrar um filme duplicado', async ({ loginPage, moviesPage, popup, api }) => {
    const movie = data.duplicateMovie
    await api.postMovie(movie)
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.createMovie(movie)
    await popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})


test('não deve poder cadastrar quando campos obrigatórios estiverem vazios', async ({ loginPage, moviesPage, popup }) => {
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.goForm()
    await moviesPage.submitForm()
    await moviesPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})


test('deve realizar busca pelo termo zumbi', async ({ loginPage, api, moviesPage, page }) => {
    const movies = data.searchMovie
    for (const m of movies.data) {
        await api.postMovie(m)
    }
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.searchMovie(movies.input)
    await moviesPage.tableHave(movies.outputs)
})

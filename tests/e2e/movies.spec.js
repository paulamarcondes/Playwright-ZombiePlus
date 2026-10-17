const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL('DELETE FROM movies')
})


test('should create a new movie', async ({ loginPage, moviesPage, popup }) => {
    const movie = data.createMovie
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.createMovie(movie)
    await popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})


test('should remove a movie', async ({ loginPage, moviesPage, popup, api }) => {
    const movie = data.removeMovie
    await api.postMovie(movie)
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.removeMovie(movie.title)
    await popup.haveText('Filme removido com sucesso.')
})


test('should not create a duplicate movie', async ({ loginPage, moviesPage, popup, api }) => {
    const movie = data.duplicateMovie
    await api.postMovie(movie)
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.createMovie(movie)
    await popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})


test('should not create a movie when required fields are empty', async ({ loginPage, moviesPage }) => {
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


test('should search movies by the term "zumbi"', async ({ loginPage, api, moviesPage }) => {
    const movies = data.searchMovie
    for (const m of movies.data) {
        await api.postMovie(m)
    }
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.searchMovie(movies.input)
    await moviesPage.tableHave(movies.outputs)
})

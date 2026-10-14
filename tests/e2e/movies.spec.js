const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')


test('deve poder cadastrar um novo filme', async ({ loginPage, moviesPage, toast }) => {
    // precisar estar logado
    const movie = data.createMovie
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

    await loginPage.visit()
    await loginPage.submitAdminForm('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
    await moviesPage.createMovie(movie.title, movie.overview, movie.company, movie.release_year)
    await toast.containText('Cadastro realizado com sucesso!')
})
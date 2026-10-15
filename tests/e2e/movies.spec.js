const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')


test('deve poder cadastrar um novo filme', async ({ loginPage, moviesPage, toast }) => {
    // precisar estar logado
    const movie = data.createMovie
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.createMovie(movie.title, movie.overview, movie.company, movie.release_year)
    await toast.containText('Cadastro realizado com sucesso!')
})

test('não deve poder cadastrar quando campos obrigatórios estiverem vazios', async ({ loginPage, moviesPage, toast }) => {
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.goForm()
    await moviesPage.submitForm()
    await moviesPage.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})
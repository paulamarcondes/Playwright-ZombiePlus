const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL('DELETE FROM movies')
})

test('deve poder cadastrar um novo filme', async ({ loginPage, moviesPage, toast }) => {
    // precisar estar logado
    const movie = data.createMovie
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.createMovie(movie)
    await toast.containText('Cadastro realizado com sucesso!')
})

test('não deve poder cadastrar um filme duplicado', async ({ loginPage, moviesPage, toast }) => {
    const movie = data.duplicateMovie
    await loginPage.doLogin('admin@zombieplus.com', 'pwd123')
    await moviesPage.createMovie(movie)
    await toast.containText('Cadastro realizado com sucesso!')
    await moviesPage.createMovie(movie)
    await toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
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

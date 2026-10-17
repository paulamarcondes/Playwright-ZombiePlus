const { test } = require('../support')

const LOGIN_ERROR = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."

test.beforeEach(async ({ loginPage }) => {
    await loginPage.visit()
})

test('deve logar como adminstrador', async ({ loginPage }) => {
    await loginPage.submitAdminForm('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()
})

test('não deve logar com email incorreto', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm('errado@zombieplus.com', 'pwd123')
    await popup.haveText(LOGIN_ERROR)
})


test('não deve logar com senha incorreta', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm('admin@zombieplus.com', 'errado123')
    await popup.haveText(LOGIN_ERROR)
})


test('não deve logar quando email não é preenchido', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', 'pwd123')
    await loginPage.alertHaveText(['Campo obrigatório'])
})


test('não deve logar quando senha não é preenchida', async ({ loginPage }) => {
    await loginPage.submitAdminForm('admin@zombieplus.com', '')
    await loginPage.alertHaveText(['Campo obrigatório'])
})


test('não deve logar quando nenhum campo é preenchido', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', '')
    await loginPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})

const { test } = require('../support')

const LOGIN_ERROR = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."

test.beforeEach(async ({ loginPage }) => {
    await loginPage.visit()
})


test('should log in as admin', async ({ loginPage }) => {
    await loginPage.submitAdminForm('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()
})


test('should not log in with wrong email', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm('wrong@zombieplus.com', 'pwd123')
    await popup.haveText(LOGIN_ERROR)
})


test('should not log in with wrong password', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm('admin@zombieplus.com', 'wrong123')
    await popup.haveText(LOGIN_ERROR)
})


test('should not log in when email is empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', 'pwd123')
    await loginPage.alertHaveText(['Campo obrigatório'])
})


test('should not log in when password is empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm('admin@zombieplus.com', '')
    await loginPage.alertHaveText(['Campo obrigatório'])
})


test('should not log in when all fields are empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', '')
    await loginPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})

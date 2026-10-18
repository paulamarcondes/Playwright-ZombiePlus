const { test } = require('../support')

const LOGIN_ERROR = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."

test.beforeEach(async ({ loginPage }) => {
    await loginPage.visit()
})


test('should log in as admin', async ({ loginPage }) => {
    await loginPage.submitAdminForm(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
    await loginPage.isLoggedIn()
})


test('should not log in with wrong email', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm('wrong@zombieplus.com', process.env.ADMIN_PASSWORD)
    await popup.haveText(LOGIN_ERROR)
})


test('should not log in with wrong password', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm(process.env.ADMIN_EMAIL, 'wrong123')
    await popup.haveText(LOGIN_ERROR)
})


test('should not log in when email is empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', process.env.ADMIN_PASSWORD)
    await loginPage.alertHaveText(['Campo obrigatório'])
})


test('should not log in when password is empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm(process.env.ADMIN_EMAIL, '')
    await loginPage.alertHaveText(['Campo obrigatório'])
})


test('should not log in when all fields are empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', '')
    await loginPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})

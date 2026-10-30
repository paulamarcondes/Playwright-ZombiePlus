import { test } from '../support'
import { env } from '../support/env'

const LOGIN_ERROR = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

test.beforeEach(async ({ loginPage }) => {
    await loginPage.visit()
})


test('should log in as admin', async ({ loginPage }) => {
    await loginPage.submitAdminForm(env.adminEmail, env.adminPassword)
    await loginPage.isLoggedIn()
})


test('should not log in with wrong email', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm('wrong@zombieplus.com', env.adminPassword)
    await popup.haveText(LOGIN_ERROR)
})


test('should not log in with wrong password', async ({ loginPage, popup }) => {
    await loginPage.submitAdminForm(env.adminEmail, 'wrong123')
    await popup.haveText(LOGIN_ERROR)
})


test('should not log in when email is empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', env.adminPassword)
    await loginPage.alertHaveText('Campo obrigatório')
})


test('should not log in when password is empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm(env.adminEmail, '')
    await loginPage.alertHaveText('Campo obrigatório')
})


test('should not log in when all fields are empty', async ({ loginPage }) => {
    await loginPage.submitAdminForm('', '')
    await loginPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})

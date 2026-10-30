import { faker } from '@faker-js/faker'
import { test } from '../support'
import { executeSQL } from '../support/database'

test.beforeAll(async () => {
    await executeSQL('DELETE FROM leads')
})

test.beforeEach(async ({ landingPage }) => {
    await landingPage.visit()
    await landingPage.openLeadModal()
})


test('should register a lead in the waiting list', async ({ landingPage, popup }) => {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()
    await landingPage.submitLeadForm(leadName, leadEmail)
    await popup.haveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.')
})


test('should not register a duplicate lead', async ({ landingPage, api, popup }) => {
    const leadName = faker.person.fullName()
    const leadEmail = faker.internet.email()
    await api.postLead(leadName, leadEmail)
    await landingPage.submitLeadForm(leadName, leadEmail)
    await popup.haveText('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.')
})


test('should not register a lead with an invalid email', async ({ landingPage }) => {
    await landingPage.submitLeadForm('Playwright Test', 'test.com')
    await landingPage.alertHaveText('Email incorreto')
})


test('should not register a lead when name is empty', async ({ landingPage }) => {
    await landingPage.submitLeadForm('', 'test@test.com')
    await landingPage.alertHaveText('Campo obrigatório')
})


test('should not register a lead when email is empty', async ({ landingPage }) => {
    await landingPage.submitLeadForm('Playwright Test', '')
    await landingPage.alertHaveText('Campo obrigatório')
})


test('should not register a lead when all fields are empty', async ({ landingPage }) => {
    await landingPage.submitLeadForm('', '')
    await landingPage.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório'
    ])
})

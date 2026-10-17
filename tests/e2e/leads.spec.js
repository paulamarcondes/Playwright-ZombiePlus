const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')


test.beforeEach(async ({ landingPage }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
})


test('deve cadastrar um lead na fila de espera', async ({ landingPage, popup }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  await landingPage.submitLeadForm(leadName, leadEmail)
  await popup.haveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.')
});


test('não deve cadastrar um lead que já existe', async ({ landingPage, request, popup }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      email: leadEmail,
      name: leadName
    }
  })
  expect(newLead.ok()).toBeTruthy()

  await landingPage.submitLeadForm(leadName, leadEmail)
  await popup.haveText('Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.')
});


test('não deve cadastrar um lead com email incorreto', async ({ landingPage }) => {
  await landingPage.submitLeadForm('Teste Playwright', 'teste.com')
  await landingPage.alertHaveText('Email incorreto')
});


test('não deve cadastrar um lead quando o nome não é preenchido', async ({ landingPage }) => {
  await landingPage.submitLeadForm('', 'teste@test.com')
  await landingPage.alertHaveText('Campo obrigatório')
});


test('não deve cadastrar um lead quando o email não é preenchido', async ({ landingPage }) => {
  await landingPage.submitLeadForm('Teste Playwright', '')
  await landingPage.alertHaveText('Campo obrigatório')
});


test('não deve cadastrar um lead quando nenhum campo é preenchido', async ({ landingPage }) => {
  await landingPage.submitLeadForm('', '')
  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})

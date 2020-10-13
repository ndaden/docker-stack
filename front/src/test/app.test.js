/* eslint-disable */
import puppeteer from 'puppeteer';

const url = 'https://testsite.fr/';
let browser;
let page;
let counter = 0;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(url, { waitUntil: 'domcontentloaded'});
});

afterAll(async () => {
    // Se déconnecter
    await page.click("#logout");
    await page.waitFor(500);
    await clean();
    await browser.close();
});

afterEach(async () => {
    counter++;
    await page.screenshot({ path: 'screenshot-'+counter+'.jpg' });
})

test('Validating page title',async () => {
    const pageTitle = await page.mainFrame().title();
    expect(pageTitle).toBe('My app');
});

test('Creating account', async () => {
    await page.click("#signup");
    await page.type("input[name=username]","autotester");
    await page.type("input[name=email]", "auto@test.com");
    await page.type("input[name=password]", "autotester");
    await page.click("button[type=submit]");

    await page.waitForSelector("#account-created");
    const notificationMessage = await page.$("#account-created > div.message-header > p");
    const result = await page.evaluate(notificationMessage => notificationMessage.innerHTML, notificationMessage);
    expect(result).toBe('Felicitations');
});

test('login with account', async () => {
    await page.click("#login");
    await page.waitForSelector("form");
    await page.type("input[name=username]","autotester");
    await page.type("input[name=password]", "autotester");
    await page.click("button[type=submit]");

    await page.waitForSelector("#username");

    const loginArea = await page.$("#username > span:nth-child(2)");
    const result = await page.evaluate(loginArea => loginArea.innerHTML, loginArea);
    expect(result).toBe('autotester');
});

const clean = async () => {
    // Se connecter
    await page.click("#login");
    await page.waitForSelector("form");

    // login, mot de passe, clic sur se connecter
    await page.type("input[name=username]","testeur");
    await page.type("input[name=password]", "testeur");
    await page.click("button[type=submit]");

    await page.waitForSelector("#username");

    // Admin utilisateur
    await page.click("#nvmenu > div.navbar-end > a:nth-child(2)");
    await page.waitForSelector("#actions-autotester");

    await page.click("#actions-autotester > div > div.dropdown-trigger > button");
    await page.waitForSelector("#actions-autotester > div > div.dropdown-menu > div > a:nth-child(2)");

    await page.click("#actions-autotester > div > div.dropdown-menu > div > a:nth-child(2)");

    await page.waitForSelector("#modale");
    await page.click("#modale > div > div.modal-card > footer > button.button.is-success");
};
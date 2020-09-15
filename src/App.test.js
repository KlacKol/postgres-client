import puppeteer from "puppeteer";

describe('test client', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 250
    });
    page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1590,
        height: 1000
      },
      userAgent: ''
    });
  })
  describe('registration', () => {
    it('should registration', async () => {
      await page.goto('http://history-map.com:3000/registration');
      await page.waitForSelector('.page-registration');
      await page.click("input[name=email]");
      await page.type("input[name=email]", 'itache@ukr.net');
      await page.click("input[name=password]");
      await page.type("input[name=password]", 'aye');
      await page.click("input[name=name]");
      await page.type("input[name=name]", 'aye');
      await page.click("input[name=checkedIsAdmin]");
      await page.click("button[type=submit]");
      await page.waitForSelector('.home-page');
    }, 9000000);
  })
  describe('logout', () => {
    it('should logout', async () => {
      await page.goto('http://history-map.com:3000/home');
      await page.click("button[name=toggle-menu]");
      await page.click("div[name=menu-page-logout]");
      await page.waitForSelector('.page-login');
    }, 9000000);
  })
  describe('login', () => {
    it('should return string email', function () {
      const isEmailOrName = (val) => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return val.match(mailFormat) ? 'email' : 'name';
      };
      expect(isEmailOrName('qwe@qwe.qwe')).toEqual('email');
      expect(isEmailOrName('qwe.qwe')).toEqual('name');
      expect(isEmailOrName('qwe@qwe')).toEqual('name');
      expect(isEmailOrName('qwe')).toEqual('name');
      expect(isEmailOrName('ches@gmail.com')).toEqual('email')
    });
    it('should login', async () => {
      await page.goto('http://history-map.com:3000');
      await page.click("input[name=emailOrName]");
      await page.type("input[name=emailOrName]", 'aye');
      await page.click("input[name=password]");
      await page.type("input[name=password]", 'aye');
      await page.click("button[type=submit]");
      await page.waitForSelector('.home-page');
    }, 9000000);
  })
  describe('add marker', () => {
    it('should add marker to map', async () => {
      await page.goto('http://history-map.com:3000/home');
      await page.click("button[name=toggle-menu]");
      await page.click("a[name=menu-page-add-marker]");
      await page.waitForSelector('.page-add-marker');
      await page.mouse.click(960, 200);
      await page.click("input[name=description]");
      await page.type("input[name=description]", 'zxc-asdq-qwdqpodwjqpwdj');
      await page.click("button[type=submit]");
      await page.waitForSelector('.home-page');
    }, 9000000);
  })
  // describe('delete marker', () => {
  //   it('should delete marker', async () => {
  //     await page.goto('http://history-map.com:3000/home');
  //     await page.click("div[.bnkjhhjhjhjhjhjhjhjhjhjaa]");
  //     await page.click("button[.button-delete-marker]");
  //   }, 9000000);
  // })
  describe('admin panel', () => {
    it('should delete user in admin panel', async () => {
      await page.goto('http://history-map.com:3000/home');
      await page.click("button[name=toggle-menu]");
      await page.click("a[name=menu-page-admin]");
      await page.click("button[name=aye]");
      await page.waitForSelector('.page-login');
      await browser.close();
    }, 9000000);
  })
})
import { SmiteAppPage } from './app.po';

describe('smite-app App', () => {
  let page: SmiteAppPage;

  beforeEach(() => {
    page = new SmiteAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

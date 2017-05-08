import { NethackAngularPage } from './app.po';

describe('nethack-angular App', () => {
  let page: NethackAngularPage;

  beforeEach(() => {
    page = new NethackAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

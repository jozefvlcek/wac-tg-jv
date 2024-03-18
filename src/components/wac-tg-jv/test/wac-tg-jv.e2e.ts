import { newE2EPage } from '@stencil/core/testing';

describe('wac-tg-jv', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wac-tg-jv></wac-tg-jv>');

    const element = await page.find('wac-tg-jv');
    expect(element).toHaveClass('hydrated');
  });
});

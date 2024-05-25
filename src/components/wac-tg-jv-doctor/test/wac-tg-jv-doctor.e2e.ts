import { newE2EPage } from '@stencil/core/testing';

describe('wac-tg-jv-doctor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wac-tg-jv-doctor></wac-tg-jv-doctor>');

    const element = await page.find('wac-tg-jv-doctor');
    expect(element).toHaveClass('hydrated');
  });
});

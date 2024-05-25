import { newE2EPage } from '@stencil/core/testing';

describe('wac-tg-jv-patient', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wac-tg-jv-patient></wac-tg-jv-patient>');

    const element = await page.find('wac-tg-jv-patient');
    expect(element).toHaveClass('hydrated');
  });
});

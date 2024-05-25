import { newE2EPage } from '@stencil/core/testing';

describe('wac-tg-jv-requirements', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wac-tg-jv-requirements></wac-tg-jv-requirements>');

    const element = await page.find('wac-tg-jv-requirements');
    expect(element).toHaveClass('hydrated');
  });
});

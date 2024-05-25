import { newE2EPage } from '@stencil/core/testing';

describe('wac-tg-jv-new-requirement', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wac-tg-jv-new-requirement></wac-tg-jv-new-requirement>');

    const element = await page.find('wac-tg-jv-new-requirement');
    expect(element).toHaveClass('hydrated');
  });
});

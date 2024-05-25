import { newE2EPage } from '@stencil/core/testing';

describe('wac-tg-jv-doctor-requirement', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wac-tg-jv-doctor-requirement></wac-tg-jv-doctor-requirement>');

    const element = await page.find('wac-tg-jv-doctor-requirement');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('wac-tg-jv-patient-requirement', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<wac-tg-jv-patient-requirement></wac-tg-jv-patient-requirement>');

    const element = await page.find('wac-tg-jv-patient-requirement');
    expect(element).toHaveClass('hydrated');
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { WacTgJvPatientRequirement } from '../wac-tg-jv-patient-requirement';

describe('wac-tg-jv-patient-requirement', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJvPatientRequirement],
      html: `<wac-tg-jv-patient-requirement></wac-tg-jv-patient-requirement>`,
    });
    expect(page.root).toEqualHtml(`
      <wac-tg-jv-patient-requirement>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wac-tg-jv-patient-requirement>
    `);
  });
});

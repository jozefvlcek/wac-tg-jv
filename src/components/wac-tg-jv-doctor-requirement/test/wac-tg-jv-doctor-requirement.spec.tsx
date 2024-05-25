import { newSpecPage } from '@stencil/core/testing';
import { WacTgJvDoctorRequirement } from '../wac-tg-jv-doctor-requirement';

describe('wac-tg-jv-doctor-requirement', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJvDoctorRequirement],
      html: `<wac-tg-jv-doctor-requirement></wac-tg-jv-doctor-requirement>`,
    });
    expect(page.root).toEqualHtml(`
      <wac-tg-jv-doctor-requirement>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wac-tg-jv-doctor-requirement>
    `);
  });
});

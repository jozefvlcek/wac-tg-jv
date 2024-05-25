import { newSpecPage } from '@stencil/core/testing';
import { WacTgJvPatient } from '../wac-tg-jv-patient';

describe('wac-tg-jv-patient', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJvPatient],
      html: `<wac-tg-jv-patient></wac-tg-jv-patient>`,
    });
    expect(page.root).toEqualHtml(`
      <wac-tg-jv-patient>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wac-tg-jv-patient>
    `);
  });
});

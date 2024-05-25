import { newSpecPage } from '@stencil/core/testing';
import { WacTgJvDoctor } from '../wac-tg-jv-doctor';

describe('wac-tg-jv-doctor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJvDoctor],
      html: `<wac-tg-jv-doctor></wac-tg-jv-doctor>`,
    });
    expect(page.root).toEqualHtml(`
      <wac-tg-jv-doctor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wac-tg-jv-doctor>
    `);
  });
});

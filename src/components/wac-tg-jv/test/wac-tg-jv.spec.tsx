import { newSpecPage } from '@stencil/core/testing';
import { WacTgJv } from '../wac-tg-jv';

describe('wac-tg-jv', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJv],
      html: `<wac-tg-jv></wac-tg-jv>`,
    });
    expect(page.root).toEqualHtml(`
      <wac-tg-jv>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wac-tg-jv>
    `);
  });
});

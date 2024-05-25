import { newSpecPage } from '@stencil/core/testing';
import { WacTgJvRequirements } from '../wac-tg-jv-requirements';

describe('wac-tg-jv-requirements', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJvRequirements],
      html: `<wac-tg-jv-requirements></wac-tg-jv-requirements>`,
    });
    expect(page.root).toEqualHtml(`
      <wac-tg-jv-requirements>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wac-tg-jv-requirements>
    `);
  });
});

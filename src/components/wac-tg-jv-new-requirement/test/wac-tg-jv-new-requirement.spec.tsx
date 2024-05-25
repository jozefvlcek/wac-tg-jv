import { newSpecPage } from '@stencil/core/testing';
import { WacTgJvNewRequirement } from '../wac-tg-jv-new-requirement';

describe('wac-tg-jv-new-requirement', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJvNewRequirement],
      html: `<wac-tg-jv-new-requirement></wac-tg-jv-new-requirement>`,
    });
    expect(page.root).toEqualHtml(`
      <wac-tg-jv-new-requirement>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wac-tg-jv-new-requirement>
    `);
  });
});

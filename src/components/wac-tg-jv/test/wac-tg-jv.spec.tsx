import { newSpecPage } from '@stencil/core/testing';
import { WacTgJv } from '../wac-tg-jv';

describe('wac-tg-jv', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WacTgJv],
      html: `<wac-tg-jv-app></wac-tg-jv-app>`,
    });

    
    expect(page.root).toEqualHtml(`
    <wac-tg-jv>
        <mock:shadow-root>
          <md-filled-text-field label="Label" value="Value"></md-filled-text-field>
          <md-filled-button>Ok</md-filled-button>
          <span></span>
        </mock:shadow-root>
    </wac-tg-jv>
    `);
  });
});

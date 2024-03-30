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
          <md-filled-text-field label="Label" value="Value"></md-filled-text-field>
          <md-outlined-text-field label="Label" value="Value"></md-outlined-text-field>
          <md-outlined-button>Back</md-outlined-button>
          <md-filled-button>Complete</md-filled-button>
        </mock:shadow-root>
    </wac-tg-jv>
    `);
  });
});

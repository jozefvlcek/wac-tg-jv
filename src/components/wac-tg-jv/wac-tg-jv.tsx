import { Component, Host, h } from '@stencil/core';
import '@material/web/button/outlined-button.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field'
import '@material/web/textfield/outlined-text-field'


@Component({
  tag: 'wac-tg-jv',
  styleUrl: 'wac-tg-jv.css',
  shadow: true,
})
export class WacTgJv {



  render() {
    return (
      <Host>
        <md-filled-text-field label="Label" value="Value">
        </md-filled-text-field>

        <md-outlined-text-field label="Label" value="Value">
        </md-outlined-text-field>
        <md-outlined-button>Back</md-outlined-button>
        <md-filled-button>Complete</md-filled-button>
      </Host>
    );
  }


}

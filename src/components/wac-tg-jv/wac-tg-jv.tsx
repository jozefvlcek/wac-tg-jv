import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'wac-tg-jv',
  styleUrl: 'wac-tg-jv.css',
  shadow: true,
})
export class WacTgJv {

  async componentWillLoad() {
    console.log("componentWillLoad command");
  }

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

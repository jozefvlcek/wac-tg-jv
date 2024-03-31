import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'wac-tg-jv',
  styleUrl: 'wac-tg-jv.css',
  shadow: true,
})
export class WacTgJv {

  @State() labelContent: string;

  async componentWillLoad() {
    console.log("componentWillLoad command");
  }

  private handleInputEvent( ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    this.labelContent = target.value;
  }

  private handleOnClick(){
    console.log(this.labelContent);
    this.labelContent = "Vsetko ok";
  }

  render() {
    return (
      <Host>
        <md-filled-text-field label="Label" value="Value"
        oninput = { (ev: InputEvent) => this.handleInputEvent(ev)}>
        </md-filled-text-field>
        <md-filled-button onclick = {() => this.handleOnClick()}>Ok</md-filled-button>
        <span>{this.labelContent}</span>
      </Host>
    );
  }


}

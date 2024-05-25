import { Component, Host, h, Event, EventEmitter, Prop, State, Element } from '@stencil/core';
import { MdDialog } from '@material/web/dialog/dialog';
import axios from 'axios';

@Component({
  tag: 'wac-tg-jv-new-requirement',
  styleUrl: 'wac-tg-jv-new-requirement.css',
  shadow: true,
})
export class WacTgJvNewRequirement {
  @Element() el: HTMLElement;
  @Prop() currentUser: string;
  @Event({ eventName: 'button-clicked' }) buttonClicked: EventEmitter<string>;
  @State() title: string;
  @State() symptoms: string;
  @State() isValid: boolean;
  @State() headline: string;
  @State() message: string;
  @State() errorMessage: string;
  @Prop() apiBase: string;
  @Prop() currentUserID: string;

  private formElement: HTMLFormElement;

  private async showDialog() {
    const dialog = this.el.shadowRoot.querySelector('md-dialog') as MdDialog;
    dialog.show();
  }

  private async hideDialog() {
    const dialog = this.el.shadowRoot.querySelector('md-dialog') as MdDialog;
    dialog.close();
    this.buttonClicked.emit('store-requirement');
  }

  private async save() {
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    try {
      const response = await axiosInstance.post(
        '/record?collection=requirements',
        { patientID: this.currentUserID, name: this.title, description: this.symptoms, patientName: this.currentUser },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status < 299) {
        this.headline = 'Úspech';
        this.message = 'Požiadvka bola vytvorená';
      } else {
        this.headline = 'Chyba';
        this.message = `${response.statusText}`;
      }
    } catch (err: any) {
      this.headline = 'Chyba';
      this.message = `${err.message || 'unknown'}`;
    }

    this.showDialog();
  }

  render() {
    return (
      <Host>
        <div class="username">
          <md-filled-button id="pacient" class="large-button">
            <md-icon slot="icon">person</md-icon>
            {this.currentUser}
          </md-filled-button>
        </div>
        {this.errorMessage ? (
          <div class="error">{this.errorMessage}</div>
        ) : (
          <div class="hostApi">
            <form ref={el => (this.formElement = el)}>
              <md-outlined-text-field
                label="Nazov Požiadavky"
                required
                minlength="3"
                maxlength="30"
                oninput={(ev: InputEvent) => {
                  this.title = this.handleInputEvent(ev);
                }}
              ></md-outlined-text-field>

              <md-outlined-text-field
                label="Popis"
                type="textarea"
                rows="4"
                required
                minlength="3"
                maxlength="220"
                oninput={(ev: InputEvent) => {
                  this.symptoms = this.handleInputEvent(ev);
                }}
              ></md-outlined-text-field>
            </form>

            <md-filled-button id="confirm" disabled={!this.isValid} onClick={() => this.save()}>
              <md-icon slot="icon">add</md-icon>
              Vytvoriť
            </md-filled-button>

            <md-dialog>
              <div slot="headline">{this.headline}</div>
              <div slot="content">{this.message}</div>
              <div slot="actions">
                <md-text-button form="form" value="ok" autofocus onClick={() => this.hideDialog()}>
                  OK
                </md-text-button>
              </div>
            </md-dialog>
          </div>
        )}
      </Host>
    );
  }

  private handleInputEvent(ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
      const element = this.formElement.children[i];
      if ('reportValidity' in element) {
        const valid = (element as HTMLInputElement).reportValidity();
        this.isValid &&= valid;
      }
    }
    return target.value;
  }
}

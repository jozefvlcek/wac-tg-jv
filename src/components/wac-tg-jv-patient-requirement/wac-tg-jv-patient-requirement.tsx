import { MdDialog } from '@material/web/dialog/dialog';
import { Component, Host, h, Event, EventEmitter, State, Prop, Element } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'wac-tg-jv-patient-requirement',
  styleUrl: 'wac-tg-jv-patient-requirement.css',
  shadow: true,
})
export class WacTgJvPatientRequirement {
  @Element() el: HTMLElement;
  @Event({ eventName: 'button-clicked' }) buttonClicked: EventEmitter<string>;
  @State() isValid: boolean;
  @Prop() requirementID: string;
  @State() headline: string;
  @Prop() apiBase: string;
  @State() message: string;
  @State() requirement: any;
  @State() title: string;
  @State() symptoms: string;
  @State() errorMessage: string;

  private formElement: HTMLFormElement;

  private async getRequirement() {
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    let requirement;

    try {
      const response = await axiosInstance.post('/filter?collection=requirements', { id: this.requirementID });
      if (response.status < 299) {
        requirement = response.data.results[0];
      } else {
        this.errorMessage = `Cannot retrieve data from server: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve data from server: ${err.message || 'unknown'}`;
    }

    try {
      const response = await axiosInstance.post('/filter?collection=comments', { requirementID: this.requirementID });
      if (response.status < 299) {
        if (response.data.results[0]) {
          requirement['comment'] = response.data.results[0]['description'];
        } else {
          requirement['comment'] = 'Lekar nepretržito pracuje aby Vám čo najskôr odpísal';
        }
        return requirement;
      } else {
        this.errorMessage = `Cannot retrieve data from server: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve data from server: ${err.message || 'unknown'}`;
    }

    return {};
  }

  private async showDialog() {
    const dialog = this.el.shadowRoot.querySelector('md-dialog') as MdDialog;
    dialog.show();
  }

  private async hideDialog() {
    const dialog = this.el.shadowRoot.querySelector('md-dialog') as MdDialog;
    dialog.close();
    this.buttonClicked.emit('change-saved');
  }

  private async save() {
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    try {
      const response = await axiosInstance.post(
        '/update?collection=requirements',
        { id: this.requirementID, name: this.title, description: this.symptoms },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status < 299) {
        this.headline = 'Úspech';
        this.message = 'Požiadavka bola upravená';
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

  private async delete() {
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    try {
      const response = await axiosInstance.post(
        '/delete?collection=requirements',
        { id: this.requirementID },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status < 299) {
        this.headline = 'Úspech';
        this.message = 'Požiadvka bola vymazaná';
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

  async componentWillLoad() {
    this.requirement = await this.getRequirement();
  }

  render() {
    return (
      <Host>
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
                value={this.requirement.name}
                oninput={(ev: InputEvent) => {
                  this.title = this.handleInputEvent(ev);
                }}
              ></md-outlined-text-field>

              <md-outlined-text-field
                label="Popis"
                type="textarea"
                rows="4"
                value={this.requirement.description}
                required
                minlength="3"
                maxlength="220"
                oninput={(ev: InputEvent) => {
                  this.symptoms = this.handleInputEvent(ev);
                }}
              ></md-outlined-text-field>

              <div class="container">
                <div class="box-container">
                  <span class="title">Komentár lekára</span>
                  <div class="box">
                    <span class="text">{this.requirement.comment}</span>
                  </div>
                </div>
              </div>
            </form>

            <div>
              <md-filled-button id="confirm" disabled={!this.isValid} onClick={() => this.save()}>
                <md-icon slot="icon">save</md-icon>
                Uložiť
              </md-filled-button>

              <md-filled-button id="confirm" onClick={() => this.delete()}>
                <md-icon slot="icon">delete</md-icon>
                Vymazať
              </md-filled-button>
            </div>

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

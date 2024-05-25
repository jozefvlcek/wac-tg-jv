import { MdDialog } from '@material/web/dialog/dialog';
import { Component, Host, h, Event, EventEmitter, State, Prop, Element } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'wac-tg-jv-doctor-requirement',
  styleUrl: 'wac-tg-jv-doctor-requirement.css',
  shadow: true,
})
export class WacTgJvDoctorRequirement {
  @Element() el: HTMLElement;
  @Event({ eventName: 'button-clicked' }) buttonClicked: EventEmitter<string>;
  @State() requirement: any;
  @State() isValid: boolean;
  @State() comment: string;
  @Prop() apiBase: string;
  @Prop() requirementID: string;
  @State() headline: string;
  @State() message: string;
  @State() errorMessage: string;
  @State() hasComment: boolean;
  @State() commentID: string;

  private formElement: HTMLFormElement;

  private async getRequirement() {
    let patientID;
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    let requirement;

    try {
      let response = await axiosInstance.post('/filter?collection=requirements', { id: this.requirementID });
      if (response.status < 299) {
        requirement = response.data.results[0];
        patientID = response.data.results[0]['patientID'];
      } else {
        this.errorMessage = `Cannot retrieve data from server: ${response.statusText}`;
      }

      response = await axiosInstance.post('/filter?collection=comments', { requirementID: this.requirementID });
      if (response.status < 299) {
        if (response.data.results[0]) {
          requirement['comment'] = response.data.results[0]['description'];
          this.commentID = response.data.results[0]['_id'];
        } else {
          this.hasComment = false;
          requirement['comment'] = '';
        }
      } else {
        this.errorMessage = `Cannot retrieve data from server: ${response.statusText}`;
      }

      response = await axiosInstance.post('/filter?collection=patients', { id: patientID });
      if (response.status < 299) {
        requirement['dateOfBirth'] = response.data.results[0]['dateOfBirth'];

        return requirement;
      } else {
        this.errorMessage = `Cannot retrieve data from server: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve data from server: ${err.message || 'unknown'}`;
    }
  }

  private async showDialog() {
    const dialog = this.el.shadowRoot.querySelector('md-dialog') as MdDialog;
    dialog.show();
  }

  private async hideDialog() {
    const dialog = this.el.shadowRoot.querySelector('md-dialog') as MdDialog;
    dialog.close();
    this.buttonClicked.emit('comment-saved');
  }

  private async save() {
    let method;
    let data;
    if (this.hasComment) {
      method = 'update';
      data = { description: this.comment, id: this.commentID };
    } else {
      data = { description: this.comment, requirementID: this.requirementID };
      method = 'record';
    }

    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    try {
      const response = await axiosInstance.post(`/${method}?collection=comments`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status < 299) {
        this.headline = 'Úspech';
        this.message = 'Komentár bol upravený';
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
        '/delete?collection=comments',
        { id: this.commentID },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status < 299) {
        this.headline = 'Úspech';
        this.message = 'Komentár bol vymazaný';
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
    this.hasComment = true;
    this.requirement = await this.getRequirement();
  }

  render() {
    return (
      <Host>
        {this.errorMessage ? (
          <div class="error">{this.errorMessage}</div>
        ) : (
          <form ref={el => (this.formElement = el)}>
            <div class="container">
              <div class="box-container">
                <span class="title">Meno a Priezvisko</span>
                <div class="box">
                  <span class="text">{this.requirement.patientName}</span>
                </div>
              </div>

              <div class="box-container">
                <span class="title">Dátum narodenia</span>
                <div class="box">
                  <span class="text">{this.requirement.dateOfBirth}</span>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="box-container">
                <span class="title">Skráteny názov požiadavky</span>
                <div class="box">
                  <span class="text">{this.requirement.name}</span>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="box-container">
                <span class="title">Symptómy</span>
                <div class="box">
                  <span class="text">{this.requirement.description}</span>
                </div>
              </div>
            </div>

            <div class="container-comment">
              <md-outlined-text-field
                label="Komentár"
                type="textarea"
                value={this.requirement.comment}
                rows="4"
                maxlength="220"
                minlength="5"
                oninput={(ev: InputEvent) => {
                  this.comment = this.handleInputEvent(ev);
                }}
              ></md-outlined-text-field>
            </div>

            <div class="buttons">
              <md-filled-button id="confirm" disabled={!this.isValid} onClick={() => this.save()}>
                <md-icon slot="icon">save</md-icon>
                Uložiť
              </md-filled-button>

              <md-filled-button id="confirm" disabled={!this.hasComment} onClick={() => this.delete()}>
                <md-icon slot="icon">delete</md-icon>
                Vymazať komentár
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
          </form>
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

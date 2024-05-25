import { Component, Host, h, Event, EventEmitter, State, Prop } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'wac-tg-jv-patient',
  styleUrl: 'wac-tg-jv-patient.css',
  shadow: true,
})
export class WacTgJvPatient {
  @Event({ eventName: 'button-clicked' }) buttonClicked: EventEmitter<{ user: string; userID: string }>;
  @State() names: any[] = [];
  @State() user: string;
  @State() errorMessage: string;
  @Prop() apiBase: string;
  @State() userID: string;

  private async getNames() {
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    try {
      const response = await axiosInstance.get('/records?collection=patients');
      if (response.status < 299) {
        return response.data.results;
      } else {
        this.errorMessage = `Cannot retrieve data from server: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve data from server: ${err.message || 'unknown'}`;
    }

    return [];
  }

  async componentWillLoad() {
    this.names = await this.getNames();
  }

  render() {
    return (
      <Host>
        <div class="button-container">
          <md-filled-button id="pacient" class="large-button">
            <md-icon slot="icon">person</md-icon>
            Pacient
          </md-filled-button>
          <md-outlined-button id="lekar" class="large-button" onClick={() => this.handleDoctorClick()}>
            <md-icon slot="icon">local_hospital</md-icon>
            Lekár
          </md-outlined-button>
        </div>

        {this.errorMessage ? (
          <div class="error">{this.errorMessage}</div>
        ) : (
          <div class="hostApi">
            <div class="menu">{this.renderNames()}</div>

            <div class="login-container">
              <md-filled-button id="login" class="large-login-button" onClick={() => this.handleLoginClick()}>
                <md-icon slot="icon">login</md-icon>
                Prihlásiť sa
              </md-filled-button>
            </div>
          </div>
        )}
      </Host>
    );
  }

  private handleDoctorClick() {
    this.buttonClicked.emit({ user: 'doctor', userID: 'none' });
  }

  private handleLoginClick() {
    this.buttonClicked.emit({ user: this.user, userID: this.userID });
  }

  private renderNames() {
    let names = this.names || [];

    return (
      <md-filled-select label="Pacient" oninput={(ev: InputEvent) => this.handleName(ev)}>
        {undefined}
        {names.map(name => {
          return (
            <md-select-option value={name}>
              <div slot="headline">{name.name}</div>
            </md-select-option>
          );
        })}
      </md-filled-select>
    );
  }

  private handleName(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    this.user = target.value['name'];
    this.userID = target.value['_id'];
  }
}

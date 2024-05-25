import { Component, Host, h, Event, EventEmitter, State, Prop } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'wac-tg-jv-doctor',
  styleUrl: 'wac-tg-jv-doctor.css',
  shadow: true,
})
export class WacTgJvDoctor {
  @Event({ eventName: 'button-clicked' }) buttonClicked: EventEmitter<{ event: string; requirementID: string }>;
  @State() requirements: any[];
  @State() errorMessage: string;
  @Prop() apiBase: string;

  private async getRequirements() {
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    try {
      const response = await axiosInstance.get('/records?collection=requirements');
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
    this.requirements = await this.getRequirements();
  }

  render() {
    return (
      <Host>
        <div class="button-container">
          <md-outlined-button id="pacient" class="large-button" onClick={() => this.handleClick()}>
            <md-icon slot="icon">person</md-icon>
            Pacient
          </md-outlined-button>
          <md-filled-button id="lekar" class="large-button">
            <md-icon slot="icon">local_hospital</md-icon>
            Lekár
          </md-filled-button>
        </div>

        {this.errorMessage ? (
          <div class="error">{this.errorMessage}</div>
        ) : (
          <div class="list">
            <md-list>
              {this.requirements.map(requirement => (
                <md-list-item class="item" onClick={() => this.buttonClicked.emit({ event: 'none', requirementID: requirement._id })}>
                  <div slot="headline">{requirement.patientName}</div>
                  <div slot="supporting-text">{requirement.name}</div>
                </md-list-item>
              ))}
            </md-list>
          </div>
        )}
      </Host>
    );
  }

  private async handleClick() {
    this.buttonClicked.emit({ event: 'patient', requirementID: 'none' });
  }
}

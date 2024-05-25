import { Component, Host, h, Event, EventEmitter, State, Prop } from '@stencil/core';
import axios from 'axios';

@Component({
  tag: 'wac-tg-jv-requirements',
  styleUrl: 'wac-tg-jv-requirements.css',
  shadow: true,
})
export class WacTgJvRequirements {
  @Prop() currentUser: string;
  @Prop() currentUserID: string;
  @Event({ eventName: 'button-clicked' }) buttonClicked: EventEmitter<{ event: string; requirementID: string }>;
  @State() requirements: any[] = [];
  @State() errorMessage: string;
  @Prop() apiBase: string;

  private async getRequirements() {
    const axiosInstance = axios.create({
      baseURL: `${this.apiBase}`,
    });

    try {
      const response = await axiosInstance.post('/filter?collection=requirements', { patientID: this.currentUserID });
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
        <div class="username">
          <md-filled-button id="pacient" class="large-button" onClick={() => this.buttonClicked.emit({ event: 'main-screen', requirementID: 'none' })}>
            <md-icon slot="icon">person</md-icon>
            {this.currentUser}
          </md-filled-button>
        </div>

        {this.errorMessage ? (
          <div class="error">{this.errorMessage}</div>
        ) : (
          <div class="hostApi">
            <div class="list">
              <md-list>
                {this.requirements.map(requirement => (
                  <md-list-item class="item" onClick={() => this.buttonClicked.emit({ event: 'requirement', requirementID: requirement['_id'] })}>
                    <div slot="headline">{requirement.name}</div>
                  </md-list-item>
                ))}
              </md-list>
            </div>
            <md-filled-icon-button class="add-button" onClick={() => this.buttonClicked.emit({ event: 'new-requirement', requirementID: 'none' })}>
              <md-icon>add</md-icon>
            </md-filled-icon-button>
          </div>
        )}
      </Host>
    );
  }
}

import { Component, Host, h, State, Prop } from '@stencil/core';

declare global {
  interface Window {
    navigation: any;
  }
}

@Component({
  tag: 'wac-tg-jv',
  styleUrl: 'wac-tg-jv.css',
  shadow: true,
})
export class WacTgJv {
  @State() private relativePath = '';
  @State() currentUser: string;
  @State() currentUserID: string;
  @State() requirementID: string;
  @Prop() basePath: string = '';
  @Prop() apiBase: string;

  navigate = (path: string) => {
    const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
    window.navigation.navigate(absolute);
  };

  handleLogin(data: { user: string; userID: string }) {
    const user = data.user;
    if (user === 'doctor') {
      this.navigate('./doctor');
    } else if (user) {
      this.currentUser = user;
      this.currentUserID = data.userID;
      this.navigate('./requirements');
    }
  }

  handleDoctor(data: { event: string; requirementID: string }) {
    if (data.event == 'patient') {
      this.navigate('./patient');
    } else {
      this.requirementID = data.requirementID;
      this.navigate('./doctor-requirement');
    }
  }

  handleRequirement(data: { event: string; requirementID: string }) {
    if (data.event == 'new-requirement') {
      this.navigate('./new-requirement');
    } else if (data.event == 'main-screen') {
      this.navigate('./patient');
    } else {
      this.requirementID = data.requirementID;
      this.navigate('./patient-requirement');
    }
  }

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = '';
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }

  render() {
    let element = 'patient';

    if (this.relativePath.startsWith('doctor-requirement')) {
      element = 'doctor-requirement';
    } else if (this.relativePath.startsWith('requirements')) {
      element = 'requirements';
    } else if (this.relativePath.startsWith('new-requirement')) {
      element = 'new-requirement';
    } else if (this.relativePath.startsWith('doctor')) {
      element = 'doctor';
    } else if (this.relativePath.startsWith('patient-requirement')) {
      element = 'patient-requirement';
    }

    return (
      <Host>
        {element === 'patient' && (
          <wac-tg-jv-patient api-base={this.apiBase} onbutton-clicked={(ev: CustomEvent<{ user: string; userID: string }>) => this.handleLogin(ev.detail)}></wac-tg-jv-patient>
        )}
        {element == 'doctor' && (
          <wac-tg-jv-doctor
            api-base={this.apiBase}
            onbutton-clicked={(ev: CustomEvent<{ event: string; requirementID: string }>) => this.handleDoctor(ev.detail)}
          ></wac-tg-jv-doctor>
        )}
        {element == 'requirements' && (
          <wac-tg-jv-requirements
            api-base={this.apiBase}
            currentUser={this.currentUser}
            currentUserID={this.currentUserID}
            onbutton-clicked={(ev: CustomEvent<{ event: string; requirementID: string }>) => this.handleRequirement(ev.detail)}
          ></wac-tg-jv-requirements>
        )}
        {element == 'new-requirement' && (
          <wac-tg-jv-new-requirement
            api-base={this.apiBase}
            currentUser={this.currentUser}
            currentUserID={this.currentUserID}
            onbutton-clicked={() => this.navigate('./requirements')}
          ></wac-tg-jv-new-requirement>
        )}
        {element == 'doctor-requirement' && (
          <wac-tg-jv-doctor-requirement
            api-base={this.apiBase}
            onbutton-clicked={() => this.navigate('./doctor')}
            requirementID={this.requirementID}
          ></wac-tg-jv-doctor-requirement>
        )}
        {element == 'patient-requirement' && (
          <wac-tg-jv-patient-requirement
            api-base={this.apiBase}
            onbutton-clicked={() => this.navigate('./requirements')}
            requirementID={this.requirementID}
          ></wac-tg-jv-patient-requirement>
        )}
      </Host>
    );
  }
}

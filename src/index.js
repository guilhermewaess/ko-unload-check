export default class {
  constructor(params) {
    this.startProperties();
    this.subscribeObservables(params.properties);
    this.subscribeOnUnload();
  }

  startProperties() {
    this.subscriptions = [];
    this.shouldCheck = false;
  }

  subscribeObservables(properties) {
    properties.forEach(this.subscribeProperty.bind(this));
  };

  subscribeProperty(property) {
    const subscription = property.subscribe(() => { this.shouldCheck = true; });
    this.subscriptions.push(subscription);
  }

  subscribeOnUnload() {
    window.onbeforeunload = (e) => {
      if (this.shouldCheck) {
        return '';
      }
    };
  }
}
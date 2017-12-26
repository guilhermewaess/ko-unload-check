export default class {
  constructor(params) {
    this.subscriptions = [];
    this.shouldCheck = false;
    this.subscribeProperties(params.properties);
    this.subscribeOnUnload();
  }

  subscribeProperties(properties) {
    properties.forEach(this.subscribeProperty.bind(this));
  };

  subscribeProperty(property) {
    property.subscribe(() => {
      this.shouldCheck = true;
    });
  }


  subscribeOnUnload() {
    window.onbeforeunload = (e) => {
      if (this.shouldCheck) {
        return "";
      }
    };
  }
}
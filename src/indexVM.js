import KoUnloadCheck from './index';
import ko from 'knockout';

class vm {
  constructor() {
    this.input = ko.observable();
    this.input2 = ko.observable();
    new KoUnloadCheck({ properties: [this.input, this.input2] });
  }
};


ko.applyBindings(new vm(), document.getElementById('app'));

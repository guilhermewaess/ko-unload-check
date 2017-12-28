import KoUnloadCheck from './../src/index';
import ko from 'knockout';

let koUnloadCheck;
let observable1;
let observable2;

describe('index', () => {
  beforeEach(() => {
    observable1 = ko.observable();
    observable2 = ko.observable();
    koUnloadCheck = new KoUnloadCheck({ properties: [observable1, observable2] });
  });
  describe('when construct', () => {
    test('should start with shouldCheck false', () => {
      expect(koUnloadCheck.shouldCheck).toEqual(false);
      expect(koUnloadCheck.shouldCheck).toEqual(false);
    });
    test('should have subscriptions length equal of properties param length', () => {
      expect(koUnloadCheck.subscriptions.length).toEqual(2);
    });
    test('should have a function on window.onbeforeunload', () => {
      expect(window.onbeforeunload).not.toBeNull();
    });
  });
  describe('When any observable is updated', () => {
    beforeEach(function(){
      observable2('1');
      
    });
    test('should change shouldCheck to true', () => {
      expect(koUnloadCheck.shouldCheck).toEqual(true);
    });
  });
  describe('When an event unbeforeunload happen', () => {
    test('should return string empty when shouldCheck is true', () => {
      koUnloadCheck.shouldCheck = true;
      expect(window.onbeforeunload()).toEqual('');
    });
    test('should return undefined when shouldCheck is false', () => {
      koUnloadCheck.shouldCheck = false;
      expect(window.onbeforeunload()).toBeUndefined();
    });
  });
});
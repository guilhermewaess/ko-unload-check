# ko-unload-check
A simple lib to help you on edited forms.

When an observable is updated, the lib will guarantee that user will not navigate without confirmation.

Example:

    import KoUnloadCheck from 'ko-unload-check';
    import ko from 'knockout';
    
    class vm {
      constructor() {
        this.input = ko.observable();
        this.input2 = ko.observable();
        new KoUnloadCheck({ properties: [this.input, this.input2.....] });
      }
    };

**soon I'll put a demo/gif here**

You can use with RequireJs as well.


# Contributing
1. Make a fork
2. Install dependencies
3. Run: yarn run dev
4. Use index.html and indexVM.js to test your changes.
5. Commit and open a Pull Request :D

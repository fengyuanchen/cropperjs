# Contributing to Cropper

## How to report bugs

### Make sure it is a Cropper bug

Most bugs reported to our bug tracker are actually bugs in user code, not in Cropper code. Keep in mind that just because your code throws an error inside of Cropper, this does *not* mean the bug is a Cropper bug.

Ask for help first in a discussion forum like [Stack Overflow](http://stackoverflow.com/). You will get much quicker support, and you will help avoid tying up the Cropper team with invalid bug reports.

### Disable browser extensions

Make sure you have reproduced the bug with all browser extensions and add-ons disabled, as these can sometimes cause things to break in interesting and unpredictable ways. Try using incognito, stealth or anonymous browsing modes.

### Try the latest version of Cropper

Bugs in old versions of Cropper may have already been fixed. In order to avoid reporting known issues, make sure you are always testing against the [latest release](https://github.com/fengyuanchen/cropperjs/releases/latest). We cannot fix bugs in older released files, if a bug has been fixed in a subsequent version of Cropper the site should upgrade.

### Simplify the test case

When experiencing a problem, [reduce your code](http://webkit.org/quality/reduction.html) to the bare minimum required to reproduce the issue. This makes it *much* easier to isolate and fix the offending code. Bugs reported without reduced test cases take on average 9001% longer to fix than bugs that are submitted with them, so you really should try to do this if at all possible.

### Search for related or duplicate issues

Go to the [Cropper issue tracker](https://github.com/fengyuanchen/cropperjs/issues) and make sure the problem hasn't already been reported. If not, create a new issue there and include your test case.

### Browser support

Remember that Cropper supports multiple browsers and their versions; any contributed code must work in all of them. You can refer to the [browser support page](https://github.com/fengyuanchen/cropperjs/blob/master/README.md#browser-support) for the current list of supported browsers.

## Notes for pull request

- Run the test suites in the `test` directory first.
- Don't modify any files in the `dist` directory.
- Follow the same code style as the library.

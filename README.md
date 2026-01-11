# StickerCollectionNgZorro

An Angular 21 application (with [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5) with NG-ZORRO-ANTD (An enterprise-class Angular UI component library based on Ant Design).

This demo shows a 'Sticker Collection' with hard-coded data:

*   Carousel at Homepage
*   Grid Layout at All Stickers page.
*   See image in full-screen.
*   Table at overview page.
*   Create and Update form.
*   To top button
*   Implemented loading Spinner

See the images in the root of this project for examples.

### **Angular application installation**

**Angular 21** needs a **Node.js** version of at least _20.19.0_

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_January 2026_

\- Added 8 new stickers.

\- Upgrade to _Angular 21_ and upgraded other packages.

*   Removed deprecated _Karma_ and installed _Vitest._
*   Migrated _Jasmine_ tests to _Vitest_ tests for future use (command: **ng generate refactor-jasmine-vitest**).

\- Minor fix for the image preview, by adding the property: _nzNoAnimation: true_

_November 2025:_

\- Added to top component.

\- Added spinner commponent.

\- Added new Stickers.

\- Various small changes (e.g. increase of font-size overview page).

_October 2025:_

\- First commit of project **StickerCollectionNgZorro**
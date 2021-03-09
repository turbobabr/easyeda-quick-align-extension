![Hero](docs/github-hero-logo.png?raw=true "Logo")
===========

`EasyEDA Quick Align` is a productivity extension for [EasyEDA](https://easyeda.com/) and [LCEDA: Standard Edition](https://lceda.cn/standard). The extension introduces an optimized workflow for footprints, symbols, shapes and prefixes alignment via help of a specially crafted contextual panel that provides the better user experience comparing to the standard toolbar actions and keyboard shortcuts.

## Installation

1. Download [${downloadFileName}](${downloadUrl})
2. Un-zip the downloaded archive on your hard drive.
3. Go to `Extension Settings` dialog by using main menu `Advanced -> Extensions -> Extensions Settings...`.
4. Click `Load Extension...` button and add all the files in from the extracted folder using `Select Files...` button. 
5. Click `Load Extension` and close the `Extension Settings` dialog.

> Caution: This extension is considered to be in `alpha/beta` stages. So far it was tested on `macOS` and `Chrome` browser only, thus it can contain potential issues on other platforms.

## Usage

Right after the installation, be sure to refresh the page of the editor in order to get the extension a change to properly initialize itself. 

### Using alignment inline panel

1. Select two or more components or other objects in 'PCB' editor.
2. Hit a single `A` shortcut and click on the desired button in the shown up panel to align the objects.

![Intro](docs/easyeda-quick-align-intro-demo.gif?raw=true)

The panel always shows up centered at the current cursor position in the active editor's area. All the buttons in the panel are located intuitively taking in account the directions and functionality, thus it is very easy to remember what and where to click in the future.

> Hint: In order to dismiss the panel without doing any alignment actions, just click outside of the panel or hit `Esc` key.

The extension also supports alignment of objects using the same `A` shortcut in `Schematic` based editors:

![Schematic Support](docs/easyeda-quick-align-schematics.gif?raw=true)

### Performing multiple actions at once

It is possible to perform several alignment actions by opening the panel only once. 

For example, in case you need to align a bunch of comoponents by the left edge and distribute them vertically:
1. Hit `A` shortcut 
2. Press and hold `shift` modifer key
3. Click on `Align items to left` button by holding the `shift`
4. Release the `shift` key and click on `Distribute Vertically` button.

![Multipe Actions](docs/easyeda-quick-align-multiple-actions.gif?raw=true)

> Note: You can perform as many alignment actions as you wish as long as the `shift` key is kept pressed.

### Prefixes positioning

The `Quick Align` extension has a special mode for setting position for prefixes of selected components located on a `PCB` board:

1. Select one or several components and hit `SHIFT + A` shortcut
2. Click on a desired location to set the postion for prefixes

![Prefixes Demo](docs/easyeda-quick-align-prefixes.gif?raw=true)

> Note: This mode is not available for `schematic`, `simulation` and `symbol` editors. Only `PCB` based editors are supported.

### A note on shortcut conflicts

Unfortunatelly `EasyEDA` doesn't provide any capabilities to use custom shortcuts for extensions, thus in order to get access to the precious shortcuts, this extension uses a `hackish` approach by overriding and sometimes blocking the default shortcuts provided by the editor.

Both single key `A` and the combo `SHIFT + A` shortcuts are hardcoded and cannot be customized at the moment. Sadly, the single key `A` shortcut is by default occupied with `Zoom In` action and `Quick Align` extension overrides it.

To fix the issue:
1. Re-assign `Zoom In` action to another shortcut using built-in `Settings -> Shortcut Key Settings...` settings menu command.
2. In case you still want to use the default behaviour and want to assign `Quick Align` to something else -> [open an issue](https://github.com/turbobabr/easyeda-quick-align-extension/issues) and I'll try to figure out something in order to make those hardcoded shortcuts customizable.

> Note: I personally use `Cmd +/-` shortcuts instead of `A / Z` for `Zoom In` and `Zoom Out` actions. Also, the good old `mouse wheel` thing is perfect for the job! :)

## Version history

**Quick Align 1.0.0: 3/9/2021**
* Initial Release

## Feedback

If you discover  any issue or have any suggestions for improvement of the plugin, please [open an issue](https://github.com/turbobabr/easyeda-quick-align-extension/issues) or find me on twitter [@turbobabr](http://twitter.com/turbobabr).

## License

The MIT License (MIT)

Copyright (c) 2021 Andrey Shakhmin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
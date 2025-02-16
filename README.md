# Radoslav's Homeassistant Add-ons

![Project Stage][project-stage-shield]
![Maintenance][maintenance-shield]
[![License][license-shield]](LICENSE.md)

## About

You can find here my personal add-ons

## Installation

In Home Assistant go to `Settings` > `Add-ons` > `Add-on Store` > dots top-right > `Repositories` and add the repository URL:

```txt
https://github.com/radoslavirha/ha-addons-repository
```

## Add-ons provided by this repository

### &#10003; [LaskaKit data feeder][addon-laskakit-data-feeder]

[![Release][laskakit-data-feeder-version-shield]][laskakit-data-feeder-release]
![Supports aarch64 Architecture][laskakit-data-feeder-aarch64-shield]
![Supports amd64 Architecture][laskakit-data-feeder-amd64-shield]
![Supports armv7 Architecture][laskakit-data-feeder-armv7-shield]
![Supports armhf Architecture][laskakit-data-feeder-armhf-shield]
![Supports i386 Architecture][laskakit-data-feeder-i386-shield]

Data Feeder for LaskaKit Interactive Map of the Czech Republic

[:books: LaskaKit data feeder add-on documentation][addon-doc-laskakit-data-feeder]

## Releases

Releases are based on [Semantic Versioning][semver], and use the format
of ``MAJOR.MINOR.PATCH``. In a nutshell, the version will be incremented
based on the following:

- ``MAJOR``: Incompatible or major changes.
- ``MINOR``: Backwards-compatible new features and enhancements.
- ``PATCH``: Backwards-compatible bugfixes and package updates.

## Support

You could also open an issue here on GitHub. Please ensure you are creating the issue
on the correct GitHub repository matching the add-on.

- [Open an issue for the add-on: LaskaKit data feeder][laskakit-data-feeder-issue]

For a general repository issue or add-on ideas [open an issue here][issue]

## Adding a new add-on

Please contact [me Radoslav Irha][radoslavirha]:

- email: <radoslav.irha@gmail.com>

[addon-laskakit-data-feeder]: https://github.com/radoslavirha/ha-addons/blob/laskakit-data-feeder@0.0.5/addons/laskakit-data-feeder/README.md
[addon-doc-laskakit-data-feeder]: https://github.com/radoslavirha/ha-addons/blob/laskakit-data-feeder@0.0.5/addons/laskakit-data-feeder/DOCS.md
[laskakit-data-feeder-issue]: https://github.com/radoslavirha/ha-addons/issues
[laskakit-data-feeder-version-shield]: https://img.shields.io/badge/version-0.0.5-blue.svg
[laskakit-data-feeder-release]: https://github.com/radoslavirha/ha-addons/releases/tag/laskakit-data-feeder@0.0.5
[laskakit-data-feeder-aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[laskakit-data-feeder-amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[laskakit-data-feeder-armhf-shield]: https://img.shields.io/badge/armhf-no-red.svg
[laskakit-data-feeder-armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[laskakit-data-feeder-i386-shield]: https://img.shields.io/badge/i386-no-red.svg
[radoslavirha]: https://github.com/radoslavirha
[issue]: https://github.com/radoslavirha/ha-addons-repository/issues
[license-shield]: https://img.shields.io/badge/License-MIT-yellow.svg
[maintenance-shield]: https://img.shields.io/maintenance/yes/2025.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-production%20ready-brightgreen.svg
[semver]: http://semver.org/spec/v2.0.0.html
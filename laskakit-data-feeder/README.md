# Home Assistant Add-on: LaskaKit data feeder

[![Release][release-shield]][github-release]
![Project Stage][project-stage-shield]
![Project Maintenance][maintenance-shield]
[![License][license-shield]][license-url]

![Supports aarch64 Architecture][laskakit-data-feeder-aarch64-shield]
![Supports amd64 Architecture][laskakit-data-feeder-amd64-shield]
![Supports armv7 Architecture][laskakit-data-feeder-armv7-shield]
![Supports armhf Architecture][laskakit-data-feeder-armhf-shield]
![Supports i386 Architecture][laskakit-data-feeder-i386-shield]

This add-on is insired by <https://github.com/jakubcizek/pojdmeprogramovatelektroniku/tree/master/SrazkovyRadar>.

## Description

This add-on is Node.js server that processes data from the ČHMÚ precipitation radar and sends it to the pre-programmed [LaskaKit](https://www.laskakit.cz/laskakit-interaktivni-mapa-cr-ws2812b/).

## Releases

Releases are based on [Semantic Versioning][semver], and use the format
of ``MAJOR.MINOR.PATCH``. In a nutshell, the version will be incremented
based on the following:

- ``MAJOR``: Incompatible or major changes.
- ``MINOR``: Backwards-compatible new features and enhancements.
- ``PATCH``: Backwards-compatible bugfixes and package updates.

## Support

For an addon issue or idea [open an issue here][github-issue]

[maintenance-shield]: https://img.shields.io/maintenance/yes/2025.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-production%20ready-brightgreen.svg
[release-shield]: https://img.shields.io/badge/version-0.0.5-blue.svg
[github-release]: https://github.com/radoslavirha/ha-addons/releases/tag/laskakit-data-feeder@0.0.5
[github-issue]: https://github.com/radoslavirha/ha-addons/issues
[license-shield]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT
[semver]: http://semver.org/spec/v2.0.0.html
[laskakit-data-feeder-aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[laskakit-data-feeder-amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[laskakit-data-feeder-armhf-shield]: https://img.shields.io/badge/armhf-no-red.svg
[laskakit-data-feeder-armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[laskakit-data-feeder-i386-shield]: https://img.shields.io/badge/i386-no-red.svg

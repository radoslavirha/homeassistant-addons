# Home Assistant Add-on: LaskaKit data feeder

[![Release][release-shield]][release] ![Project Stage][project-stage-shield] ![Project Maintenance][maintenance-shield]

This add-on is insired by https://github.com/jakubcizek/pojdmeprogramovatelektroniku/tree/master/SrazkovyRadar.

## Description

This add-on is basically a Node.js server that processes data from the ČHMÚ precipitation radar and sends it to the pre-programmed [LaskaKit](https://www.laskakit.cz/laskakit-interaktivni-mapa-cr-ws2812b/).

### How does it work?

Homeassistant automation calls `laskakit_feeder_rain` rest_command service, add-on processes precipitation image and send data to LaskaKit.

[maintenance-shield]: https://img.shields.io/maintenance/yes/2023.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-production%20ready-brightgreen.svg
[release-shield]: https://img.shields.io/badge/version-v0.2.5-blue.svg
[release]: https://github.com/radoslavirha/ha-addon-laskakit-data-feeder/tree/v0.2.5
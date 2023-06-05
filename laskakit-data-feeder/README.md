# Home Assistant Add-on: LaskaKit data feeder

[![Release][release-shield]][release] ![Project Stage][project-stage-shield] ![Project Maintenance][maintenance-shield]

This add-on is insired by https://github.com/jakubcizek/pojdmeprogramovatelektroniku/tree/master/SrazkovyRadar.

## Description

This add-on is basically a Node.js server that processes data from the ČHMÚ precipitation radar and sends it to the pre-programmed [LaskaKit](https://www.laskakit.cz/laskakit-interaktivni-mapa-cr-ws2812b/).

### How does it work?

Homeassistant automation calls `laskakit_feeder_rain` rest_command service, add-on processes precipitation image and send data to LaskaKit.

## Installation

1) In Home Assistant go to `Settings` > `Add-ons` > `Add-on Store` > dots top-right > `Repositories` and add the repository URL `https://github.com/radoslavirha/homeassistant-addons.git`.
2) Click on `LaskaKit data feeder` > `INSTALL`.
3) Click on `Configuration` and set required value of `laskakit_url`.
4) Click on `START` after enabling `Watchdog` and optionally `Auto update`. Click on `LOGS` and `REFRESH` to see everything is working as expected.

## Configuration

- `laskakit_url` (required) - URL to LaskaKit
- `image_to_console` (default false) - displays the ČHMÚ image with the picture where it is raining in the console
- `log_level` (default info) - one of `debug` | `info` | `warn` | `error`

## Homeassistant service

Add the following to `configuration.yaml` and restart:

```yaml
rest_command:
  laskakit_feeder_rain:
    url: http://{your IP}:8000/rain
    method: GET
```

## Add-on REST API

Visit `http://{your IP}:8000/documentation`

Swagger UI does not show parsed payload/params/query/headers validators. It's built for Joi, not Zod. Requested feature: https://github.com/hapi-swagger/hapi-swagger/issues/804#issue-1734729569

### GET /rain

Downloads precipitation image from ČHMÚ, process and send data to LaskaKit

#### Query parameters

- `pixelBuffer` (default 0) - a pixel buffer around the city, used to determine if it is raining at a given location. The resulting value is the maximum R,G,B value of the selected pixels
  - E.g. `{laskakit_url}?pixelBuffer=2`

## Future

Add more data sources!

[maintenance-shield]: https://img.shields.io/maintenance/yes/2023.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-production%20ready-brightgreen.svg
[release-shield]: https://img.shields.io/badge/version-v0.1.1-blue.svg
[release]: https://github.com/radoslavirha/ha-addon-laskakit-data-feeder/tree/v0.1.1
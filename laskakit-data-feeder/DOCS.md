# Home Assistant Add-on: LaskaKit data feeder

This add-on is insired by https://github.com/jakubcizek/pojdmeprogramovatelektroniku/tree/master/SrazkovyRadar.

## Description

This add-on is basically a Node.js server that processes data from the ČHMÚ precipitation radar and sends it to the pre-programmed [LaskaKit](https://www.laskakit.cz/laskakit-interaktivni-mapa-cr-ws2812b/).

### How does it work?

Homeassistant automation calls `laskakit_feeder_rain` rest_command service, add-on processes precipitation image and send data to LaskaKit.

## Installation

1) In Home Assistant go to `Settings` > `Add-ons` > `Add-on Store` > dots top-right > `Repositories` and add the repository URL `https://github.com/radoslavirha/homeassistant-addons.git`.
2) Click on `LaskaKit data feeder` > `INSTALL`.
3) Click on `Configuration` and set required value of `laskaKitURL`.
4) Click on `START` after enabling `Watchdog` and optionally `Auto update`. Click on `LOGS` and `REFRESH` to see everything is working as expected.

## Configuration

- `laskaKitURL` (required) - URL to LaskaKit
- `imageToConsole` (default false) - displays the ČHMÚ image with the picture where it is raining in the console

## Homeassistant service

Add the following to `configuration.yaml` and restart:

```yaml
rest_command:
  laskakit_feeder_rain:
    url: http://{your IP}:8000/rain
    method: GET
```

## Add-on REST API

<details>
  <summary><code>GET</code> <code><b>/documentation</b></code> <code>(Swagger documentation UI)</code></summary>
</details>

<details>
  <summary><code>GET</code> <code><b>/rain</b></code> <code>(Downloads precipitation image from ČHMÚ, process and send data to LaskaKit)</code></summary>

Query Parameters

> | name        | type      | data type | default | description                                 |
> |-------------|-----------|-----------|---------|---------------------------------------------|
> | pixelBuffer | optional  | int       | 0       | Pixel buffer around the city                |

Responses

> | http code     | content-type              | response                          |
> |---------------|---------------------------|-----------------------------------|
> | `200`         | `application/json`        | Array of cities sent to LaskaKit  |
> | `400`         | `application/json`        | Boom error                        |

Example cURL

> ```javascript
> curl -X GET http://0.0.0.0:8000/rain
> curl -X GET http://0.0.0.0:8000/rain?pixelBuffer=5
> ```

</details>

<details>
  <summary><code>GET</code> <code><b>/rain/image</b></code> <code>(Downloads precipitation image from ČHMÚ, creates current image and returns joined image)</code></summary>

Query Parameters

> | name        | type      | data type | default | description                                 |
> |-------------|-----------|-----------|---------|---------------------------------------------|
> | pixelBuffer | optional  | int       | 0       | Pixel buffer around the city                |

Responses

> | http code     | content-type              | response                            |
> |---------------|---------------------------|-------------------------------------|
> | `200`         | `image/png`               | Radar and current conditions image  |
> | `400`         | `application/json`        | Boom error                          |

Example cURL

> ```javascript
> curl -X GET http://0.0.0.0:8000/rain/image
> curl -X GET http://0.0.0.0:8000/rain/image?pixelBuffer=5
> ```

</details>

## Future

Add more data sources!

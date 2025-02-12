# Home Assistant Add-on: LaskaKit data feeder

This add-on is insired by <https://github.com/jakubcizek/pojdmeprogramovatelektroniku/tree/master/SrazkovyRadar>.

## Description

This add-on is a Node.js server that processes data from the ČHMÚ precipitation radar and sends it to the pre-programmed [LaskaKit](https://www.laskakit.cz/laskakit-interaktivni-mapa-cr-ws2812b/).

### How does it work?

LaskaKit should call REST API provided by this addon to get RGBA color for each city representing current radar data.

## Installation

1) In Home Assistant go to `Settings` > `Add-ons` > `Add-on Store` > dots top-right > `Repositories` and add the repository URL `https://github.com/radoslavirha/homeassistant-addons.git`.
2) Click on `LaskaKit data feeder` > `INSTALL`.
3) Click on `START` after enabling `Watchdog` and optionally `Auto update`. Click on `LOGS` and `REFRESH` to see everything is working as expected.

## Configuration

## Add-on REST API

<details>
  <summary><code>GET</code> <code><b>/v1/radar/cities</b></code> <code>(Returns array of district cities with corresponding RGBA color for LEDs)</code></summary>

Query Parameters

> | name        | type      | data type | default | description                                           |
> |-------------|-----------|-----------|---------|-------------------------------------------------------|
> | radius      | optional  | int       | 2.5     | Radius (km) around city to calculate data from radar  |

Responses

> | http code     | content-type              | response                          |
> |---------------|---------------------------|-----------------------------------|
> | `200`         | `application/json`        | Response with array of cities     |
> | `500`         | `application/json`        |                                   |

Example cURL

> ```javascript
> curl -X GET http://0.0.0.0:8000/v1/radar/cities
> curl -X GET http://0.0.0.0:8000/v1/radar/cities?radius=5
> ```

</details>

<details>
  <summary><code>GET</code> <code><b>/v1/radar/image</b></code> <code>(Returns radar image from ČHMÚ combined with surface and cities)</code></summary>

Responses

> | http code     | content-type              | response                            |
> |---------------|---------------------------|-------------------------------------|
> | `200`         | `image/png`               | Combined radar image                |

Example cURL

> ```javascript
> curl -X GET http://0.0.0.0:8000/v1/radar/image
> ```

</details>

## Future

Add more data sources!

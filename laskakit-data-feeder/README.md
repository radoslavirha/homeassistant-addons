# Home Assistant Add-on: LaskaKit data feeder

[![Release][release-shield]][release] ![Project Stage][project-stage-shield] ![Project Maintenance][maintenance-shield]

This add-on is insired by <https://github.com/jakubcizek/pojdmeprogramovatelektroniku/tree/master/SrazkovyRadar>.

## Description

This add-on is basically a Node.js server that processes data from the ČHMÚ precipitation radar and sends it to the pre-programmed [LaskaKit](https://www.laskakit.cz/laskakit-interaktivni-mapa-cr-ws2812b/).

### How does it work?

Homeassistant automation calls `laskakit_feeder_rain` rest_command service, add-on processes precipitation image and send data to LaskaKit.
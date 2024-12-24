# TODO

hassio-addons/repository-updater is not suitable for what I want. It cannot be tweaked to use monorepo due to tags,...

- accept addon + tag in workflow (addon@1.0.0)
  - all URL links will use this tag to show correct Readme,... not on `main`
- copy/move addon Readme, icons,... from monorepo? Is it ok? Monorepo is code, this repo is presentation layer ... If I move everything to monorepo and just copy it here on release, I can manage everything from single repo. In this repo only root Readme will be updated, everything else copied
  - will it work?
- script will be probably in TS, so no jinja2 but handlebars?

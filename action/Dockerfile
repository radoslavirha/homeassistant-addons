FROM node:22.14-slim

RUN apt-get update                          && \
    apt-get upgrade -y                      && \
    apt-get install -y git                  && \
    npm install -g corepack                 && \
    corepack enable pnpm

WORKDIR /usr/src/app

COPY . .

RUN pnpm install --prod --frozen-lockfile   && \
    pnpm build

COPY entrypoint.sh /entrypoint.sh

RUN chmod a+x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
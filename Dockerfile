ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json .
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]
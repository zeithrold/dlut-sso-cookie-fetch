FROM node:20-alpine AS builder

WORKDIR /workspace
ADD package.json yarn.lock ./

RUN yarn install

ADD . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /workspace/dist /app/dist

ENTRYPOINT node dist/msw.js

EXPOSE 3000

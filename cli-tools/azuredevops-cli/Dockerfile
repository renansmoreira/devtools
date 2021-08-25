FROM denoland/deno:1.12.2

RUN mkdir bot
COPY bot.sh config.json deps.ts src/ bot/

WORKDIR bot

ENTRYPOINT [ './bot.sh' ]

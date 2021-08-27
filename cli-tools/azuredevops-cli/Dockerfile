FROM denoland/deno:1.13.2

WORKDIR /app
USER deno

COPY bot.sh config.json deps.ts .
COPY src ./src

RUN deno cache deps.ts
RUN deno cache src/presentation/chatbot/main.ts

CMD [ "run", "--allow-net", "--allow-read", "src/presentation/chatbot/main.ts" ]

FROM node:18-bullseye

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# 👇 Add this
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
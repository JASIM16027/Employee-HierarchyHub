FROM node:18-alpine AS builder

WORKDIR /home/node/app
COPY . .

RUN npm install && npm run build


# Step 2: Production image

FROM node:18-alpine


#ENV NODE_ENV production
WORKDIR /home/node/app

COPY --from=builder /home/node/app/package*.json ./
RUN npm install --only=production && npm cache clean --force

# Copy the built application files from the builder stage
COPY --from=builder /home/node/app/dist ./dist

EXPOSE 4000

CMD ["npm", "run", "start:prod"]

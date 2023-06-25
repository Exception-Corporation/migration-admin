FROM node:16
# Bundle APP files
COPY . /app
WORKDIR /app

#ARG STAGE
#RUN echo ${STAGE}
#RUN if [ "${STAGE}" == "development" ] ; then base64 -d .semaphore/.sandbox >> /app/.env ; else base64 -d .semaphore/.production >> /app/.env ; fi

# Install app dependencies
RUN yarn install --ignore-engines
RUN yarn build

# Expose the listening port of your app
ARG PORT

EXPOSE $PORT

CMD yarn start
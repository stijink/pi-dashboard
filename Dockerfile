FROM node:9

# Configure yarn
ENV YARN_CACHE='/var/cache/yarn'
ENV PATH=/root/.yarn/bin:$PATH

# Install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Globally install vue cli
RUN yarn global add @vue/cli

# Expose the port the app runs in
EXPOSE 8080
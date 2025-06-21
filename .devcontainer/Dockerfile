FROM node:20-slim

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Set up non-root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME

# Install global npm packages with cache optimization
RUN npm install -g wrangler @anthropic-ai/claude-code --cache /tmp/empty-cache

USER $USERNAME

WORKDIR /workspace

# Set up essential shell aliases
RUN echo 'alias g="git"' >> ~/.bashrc \
    && echo 'alias gs="git status"' >> ~/.bashrc \
    && echo 'alias ll="ls -la"' >> ~/.bashrc \
    && echo 'alias la="ls -A"' >> ~/.bashrc \
    && echo 'alias l="ls -CF"' >> ~/.bashrc

# Fix git safe.directory issue by setting up custom git config
RUN echo '[safe]' >> ~/.gitconfig \
    && echo '	directory = /workspace' >> ~/.gitconfig \
    && echo 'export GIT_CONFIG_GLOBAL=/home/node/.gitconfig' >> ~/.bashrc

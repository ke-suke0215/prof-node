FROM node:20-slim

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    vim \
    procps \
    make \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install gh -y \
    && rm -rf /var/lib/apt/lists/*

# Set up non-root user
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME

# Install global npm packages that might be useful for development
RUN npm install -g wrangler @anthropic-ai/claude-code

USER $USERNAME

WORKDIR /workspace

# Set up shell aliases for better development experience
RUN echo 'alias g="git"' >> ~/.bashrc \
    && echo 'alias gs="git status"' >> ~/.bashrc \
    && echo 'alias d="docker"' >> ~/.bashrc \
    && echo 'alias dc="docker compose"' >> ~/.bashrc \
    && echo 'alias br="bin/rails"' >> ~/.bashrc \
    && echo 'alias ll="ls -la"' >> ~/.bashrc \
    && echo 'alias t="terraform"' >> ~/.bashrc \
    && echo 'alias la="ls -A"' >> ~/.bashrc \
    && echo 'alias l="ls -CF"' >> ~/.bashrc

# Load .env file if it exists
RUN echo 'if [ -f /workspace/.env ]; then set -a && source /workspace/.env && set +a; fi' >> ~/.bashrc

# Set up git config environment
RUN echo 'export GIT_CONFIG_GLOBAL=/home/node/.gitconfig' >> /home/node/.bashrc

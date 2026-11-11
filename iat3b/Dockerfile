ARG PIP_VERSION=24.0
ARG BASE_IMAGE=ubuntu:22.04

FROM ${BASE_IMAGE} AS build-image-base

# 避免 apt 安装时弹出交互提示
ENV DEBIAN_FRONTEND=noninteractive

# Rust 工具链版本（Cargo 随 Rust 一同安装，即 cargo 1.85.0）
ARG RUST_VERSION=1.85.0

# 安装到全局目录，任何用户都可以直接使用
ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get --no-install-recommends install -yq \
        curl \
        g++ \
        gcc \
        git \
        libgeos-dev \
        libldap2-dev \
        libsasl2-dev \
        make \
        nasm \
        pkg-config \
        python3-dev \
        python3-pip \
        libxml2-dev \
        libxmlsec1-dev \
        libxmlsec1-openssl \
        libhdf5-dev \
        ca-certificates \
        build-essential \
        libssl-dev \
    && rm -rf /var/lib/apt/lists/*

ARG PIP_VERSION
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
RUN --mount=type=cache,target=/root/.cache/pip/http \
    python3 -m pip install -U pip==${PIP_VERSION} -i https://pypi.tuna.tsinghua.edu.cn/simple

# 通过 rustup 安装固定版本的工具链
#   --profile minimal    仅安装 rustc、cargo、rust-std
#   --no-modify-path     不修改 shell 配置文件，路径由上面的 ENV 提供
#   chmod -R a+w         允许任意 UID 使用（如以非 root 用户运行容器）
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
        | sh -s -- -y --no-modify-path --profile minimal --default-toolchain "${RUST_VERSION}" \
    && chmod -R a+w "${CARGO_HOME}" "${RUSTUP_HOME}" \
    && rustc --version \
    && cargo --version

# 国内pip方式1
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
# 国内pip方式2
RUN mkdir -p /root/.pip && \
    echo "[global]" > /root/.pip/pip.conf && \
    echo "index-url = https://pypi.tuna.tsinghua.edu.cn/simple" >> /root/.pip/pip.conf

RUN cargo --version
RUN rustc --version
#RUN which rustup
#RUN which cargo


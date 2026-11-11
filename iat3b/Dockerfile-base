ARG PIP_VERSION=24.0
ARG BASE_IMAGE=ubuntu:22.04

FROM ${BASE_IMAGE} AS build-image-base

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
        cargo \
    && rm -rf /var/lib/apt/lists/*

ARG PIP_VERSION
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
RUN --mount=type=cache,target=/root/.cache/pip/http \
    python3 -m pip install -U pip==${PIP_VERSION} -i https://pypi.tuna.tsinghua.edu.cn/simple

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


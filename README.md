# video-chat-mokumoku

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> video chat by peer.js

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```
git clone git@github.com:ichiwa/video-chat-mokumoku.git
```

And you need to install docker.

## Usage

```
make start
```

Check the process status.

```
make ps
docker-compose -f docker-compose.yml -p video-chat-mokumoku ps
         Name                        Command               State                    Ports
-----------------------------------------------------------------------------------------------------------
peer_client               sh -c npm install --silent ...   Up
peer_server               sh -c npm install --silent ...   Up      0.0.0.0:9030->9030/tcp
peer_server_proxy_nginx   /init                            Up      0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp
```

You can access the localhost with SSL.
And allow to access unsafe script.
https://localhost/client/


## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © ichiwa

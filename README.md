# AGAN docker compose action for GitHub

This action allows to run docker compose in your step and cleans up before the action is finished.

## Usage

### Inputs
### `compose-file`
**required** You must specify at least one docker compose config file. The path MUST be relative to your root.

Example:
```yaml
compose-file: |
  ./docker-compose.yaml
  ./compose.yml
```

### `services`
**Optional** You CAN specify one or more services which you want to start.

Example:
```yaml
services: |
  serviceA
  serviceB
```

### `compose-options`
**Optional** You CAN specify some compose options (see [COMPOSE DOCU](https://docs.docker.com/compose/reference/#command-options-overview-and-help))

### `compose-up-options`
**Optional** You CAN specify some compose up options (see [COMPOSE UP DOCU](https://docs.docker.com/engine/reference/commandline/compose_up/))
```yaml
DEFAULT is and not overrideable: --detach
Allowed Options are:
    '--abort-on-container-exit',
    '--build',
    '--exit-code-from',
    '--no-deps',
    '--pull',
    '--quiet-pull',
    '--wait'
```
### `compose-down-options`
**Optional** You CAN specify some compose up options (see [COMPOSE DOWN DOCU](https://docs.docker.com/engine/reference/commandline/compose_down/))
```yaml
DEFAULT is and not overrideable: --volumes
Allowed Options are:
  '--remove-orphans',
  '--rmi'
```

## EXAMPLE Usage
```yaml

steps:
  - name: Test default Action
    id: test-default
    uses: 'kurt-junker/agan-docker-compose-workflow@v0.1'
    with:
      compose-file: './docker-compose.yml'
      services: |
        service1
      compose-options: '--project-name test-default'
      compose-up-options: '--build --quiet-pull'
      compose-down-options: '--rmi all'
```


build:
	docker compose build

test:
	$(MAKE) build
	docker compose run --rm cli npm test

setup:
	$(MAKE) build
	docker compose run --rm cli npm install

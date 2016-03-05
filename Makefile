PATH := node_modules/.bin:$(PATH)
NPM=node_modules/.bin/npm
NODE_VERSION=$(shell node --version)
NVMRC=$(shell cat .nvmrc)
SOURCE_DIR=
DIST_DIR=dist
TEST_REPORTS_DIR=test-reports
COVERAGE_REPORTS_DIR=coverage
CODE_REPORTS_DIR=plato
ROOT=index.js
SOURCES=$(ROOT)
SCRIPTS=`find scripts -name "*.js"`
TESTS=`find __tests__ -name "*.js"`
MOCKS=
JESTRC=.jestrc
JEST_FLAGS=
NODE_ENVIRONMENT=
DEVELOPMENT=development
PRODUCTION=production

LINT = standard
TEST = jest -c $(JESTRC) $(JEST_FLAGS)
BABEL = babel $(ROOT) $(SOURCE_DIR) -d $(DIST_DIR)

all: i test clean build | configure

configure:
ifneq "$(shell echo $(NODE_VERSION) | sed 's/^v\(.\).*/\1/')" "$(NVMRC)"
$(info )
$(info | Pro tip: install the node version manager (nvm) to manage multiple nodes.)
$(info | https://github.com/creationix/nvm)
$(info )
$(info | Hint: `nvm install $(NVMRC)`)
$(info )
$(error No or wrong node version.  Found "$(NODE_VERSION)", please install node $(NVMRC))
endif

i:
	npm cache clear;
	npm i npm@2;
	$(NPM) cache clear;
ifeq "$(NODE_ENVIRONMENT)" "$(DEVELOPMENT)"
	$(NPM) link;
else
	$(NPM) i;
endif

build: babel

babel:
	rm -rf $(DIST_DIR);
	$(BABEL);

test: lint
	rm -rf $(TEST_REPORTS_DIR);
	mkdir -p $(TEST_REPORTS_DIR);
	JEST_JUNIT_REPORTS_DIR=$(TEST_REPORTS_DIR) $(TEST);

lint:
	$(LINT) $(SOURCES) $(TESTS) $(MOCKS) $(SCRIPTS);

clean:
	rm -rf $(DIST_DIR) \
	$(TEST_REPORTS_DIR) \
	$(COVERAGE_REPORTS_DIR) \
	$(CODE_REPORTS_DIR);
	git checkout dist;

watch:

.PHONY : all \
	babel \
	build \
	configure \
	clean \
	i \
	lint \
	test \
	watch

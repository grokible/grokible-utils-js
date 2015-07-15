
# Top-level dirs
BUILD_DIR=build
TEST_DIR=test

# Externals
UGLIFY_CMD=node_modules/uglify-js/bin/uglifyjs

SRCS=$(wildcard lib/*.js)
TEST_SRCS=$(wildcard $(TEST_DIR)/*.js)

#	$(info $(BRW_TESTS))

# Targets
BRW_DIR=$(BUILD_DIR)/browserified
BRW_TESTS=$(addprefix $(BRW_DIR)/, $(TEST_SRCS))

# This turns into -r Class1 -r Class2 ...
BRW_REQUIRE_EXPR=$(subst .js,,$(subst lib/,-r ,$(SRCS)))

# | is an order only pre-requisite (so make sure directory is created
#   before the tests are browserified
$(BRW_TESTS): | $(BRW_DIR)

$(BRW_DIR):
	mkdir -p $(BRW_DIR)

$(BUILD_DIR)/browserified/%.js : %.js
	browserify $< -o $@

$(BUILD_DIR)/build.js : $(SRCS)
	browserify $(BRW_REQUIRE_EXPR) $(SRCS) | $(UGLIFY_CMD) --compress --mangle > $(BUILD_DIR)/grokible-utils-build.js

build: $(BUILD_DIR)/build.js

run-browser-tests: $(BRW_TESTS)
	karma start --single-run


# Browserify individual test files to check that we have isomorphic js
browserify-tests: $(BRW_TESTS)

# mytest:
#	$(info $(subst .js,,$(subst lib/,-r ,$(SRCS))))


test:
	node_modules/mocha/bin/mocha $(TEST_SRCS)

clean:
	rm -f $(BRW_DIR)/$(TEST_DIR)/* $(BUILD_DIR)/grokible-utils-build.js


.PHONY: clean test run-browser-tests browserify-tests mytest



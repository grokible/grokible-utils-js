
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

# | is an order only pre-requisite (so make sure directory is created
#   before the tests are browserified
$(BRW_TESTS): | $(BRW_DIR)

$(BRW_DIR):
	mkdir -p $(BRW_DIR)

$(BUILD_DIR)/browserified/%.js : %.js
	browserify $< -o $@

$(BUILD_DIR)/build.js : $(SRCS)
	browserify $(SRCS) | $(UGLIFY_CMD) --compress --mangle > $(BUILD_DIR)/build.js

build: $(BUILD_DIR)/build.js

run-browser-tests: $(BRW_TESTS)
	karma start --single-run


# Browserify individual test files to check that we have isomorphic js
browserify-tests: $(BRW_TESTS)


test:
	mocha $(TEST_SRCS)

clean:
	rm -f $(BRW_DIR)/$(TEST_DIR)/*


.PHONY: clean test run-browser-tests browserify-tests



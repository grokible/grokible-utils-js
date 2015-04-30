
# Can

# Top-level dirs
BUILD_DIR=build
TEST_DIR=test

TEST_SRCS=Describe-spec.js Exception-spec.js
TESTS=$(addprefix $(TEST_DIR)/, $(TEST_SRCS))


# Targets
BRW_DIR=$(BUILD_DIR)/browserified
BRW_TESTS=$(addprefix $(BRW_DIR)/, $(TESTS))

# | is an order only pre-requisite (so make sure directory is created
#   before the tests are browserified
$(BRW_TESTS): | $(BRW_DIR)

$(BRW_DIR):
	mkdir -p $(BRW_DIR)

$(BUILD_DIR)/browserified/%.js : %.js
	browserify $< -o $@

run-browser-tests: $(BRW_TESTS)
	karma start --single-run

# Depend on build/test/*.js, browserify rule will resolve
browserify-tests: $(BRW_TESTS)

test:
	mocha $(TESTS)

clean:
	rm -f $(BRW_DIR)/$(TEST_DIR)/*


.PHONY: clean test run-browser-tests browserify-tests



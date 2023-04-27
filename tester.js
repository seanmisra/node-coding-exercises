const EventEmitter = require('events');

const TEST_EVENT = "test_emit_event";
class TestEmitter extends EventEmitter {
    test() {
        this.emit(TEST_EVENT, {
            testProp: "test"
        })
    }
}

module.exports = {
    TestEmitter: TestEmitter,
    TEST_EVENT: TEST_EVENT
};
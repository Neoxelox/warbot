"use strict";

module.exports = {
    ping: require("./ping.js"), // can also be done as a hole object named ping...
    ping_name: "ping",
    ping_description: "Shows the latency in milliseconds between responses of the WARBOT.",

    fortune: require("./fortune.js"),
    fortune_name: "fortune",
    fortune_description: "Well... actually it seems more like a quoting system.",

    help: require("./help.js"),
    help_name: "help",
    help_description: "Well, you are actually here.",

    create: require("./create.js"),
    create_name: "create",
    create_description: "Creates a new party of WARBOT.",

    test: require("./test.js"),
    test_name: "test",
    test_description: "HIDDEN! JUST FOR TESTING!"
};
const { config } = require("./wdio.shared.conf");
const { join } = require("path");
// ============
// Specs
// ============
config.specs = ["./scenarios/androidplayground/tests/specs/**/app*.spec.js"];

// ============
// Capabilities
// ============

config.capabilities = [
  {
    platformName: "Android",
    maxInstances: 1,
    "appium:deviceName": "eaa05f6a",
    "appium:platformVersion": "11.0",
    "appium:orientation": "PORTRAIT",
    "appium:automationName": "UiAutomator2",
    "appium:app": join(process.cwd(), "./apps/Android-NativeDemoApp-0.4.0.apk"),
    "appium:appWaitActivity": "com.wdiodemoapp.MainActivity",
    "appium:newCommandTimeout": 240,
  },
];

//
// ======
// Appium
// ======
//
config.services = ["appium"];
//
// =====================
// Server Configurations
// =====================
//
config.port = 4723;

exports.config = config;

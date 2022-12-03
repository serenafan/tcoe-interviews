const { config } = require("./wdio.shared.conf");
const { join } = require("path");

const LOG_LEVEL = process.env.LOG_LEVEL;
// ============
// Specs
// ============
config.specs = ["./scenarios/androidplayground/tests/specs/**/*.spec.js"];

// ============
// Capabilities
// ============

config.capabilities = [
  {
    platformName: "Android",
    maxInstances: LOG_LEVEL === "debug" ? 1 : 5,
    "appium:deviceName": "Pixel_3a_API_33_x86_64",
    "appium:platformVersion": "13.0",
    "appium:orientation": "PORTRAIT",
    "appium:automationName": "UiAutomator2",
    "appium:app": join(process.cwd(), "./scenarios/androidplayground/apps/Android-NativeDemoApp-0.4.0.apk"),
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

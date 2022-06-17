import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    "testEnvironment": "node",
    "transform": {
      "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!variables/.*)"
    ],
    moduleDirectories: ["node_modules", "src"],
};
export default config;
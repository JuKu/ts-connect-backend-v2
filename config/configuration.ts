/* export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});*/


import {existsSync, readFileSync} from "fs";
import * as yaml from "js-yaml";
import {join} from "path";

let YAML_CONFIG_FILENAME = "configuration.yml";

export default () => {
  if (!existsSync(__dirname + "/" + YAML_CONFIG_FILENAME)) {
    // file does not exists, use example config instead
    // eslint-disable-next-line max-len
    console.warn("configuration file 'config/configuration.yml' does not exists. " +
      "Use configuration.example.yml instead.");

    YAML_CONFIG_FILENAME = "configuration.example.yml";
  }

  console.info("load configuration file: " + YAML_CONFIG_FILENAME);

  return yaml.load(
      readFileSync(join(__dirname, YAML_CONFIG_FILENAME), "utf8"),
  ) as Record<string, any>;
};


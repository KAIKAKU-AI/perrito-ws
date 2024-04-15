import { app } from "electron";
import fs from "fs";
import path from "path";
import { defaultConfig } from "./default-config";

const appConfigPath = path.join(app.getPath("userData"), "perrito_config.json");

const readConfig = (): Record<string, any> => {
	const data = fs.readFileSync(appConfigPath, "utf8");
	return JSON.parse(data);
};

const writeConfig = (config: Record<string, any>) => {
	fs.writeFileSync(appConfigPath, JSON.stringify(config, null, 2));
};

export const configExists = (): boolean => {
	return fs.existsSync(appConfigPath);
};

export const resetConfig = () => {
	fs.writeFileSync(appConfigPath, JSON.stringify(defaultConfig));
};

export const setConfig = (newConfig: any) => {
	writeConfig(newConfig);
};

export const getConfigKey = (key: string): any => {
	const config = readConfig();
	return config[key];
};

export const getConfig = (): any => {
	return readConfig();
};

export const updateConfig = (key: string, value: any) => {
	const config = readConfig();
	config[key] = value;
	writeConfig(config);
};

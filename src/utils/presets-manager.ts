import { app } from "electron";
import fs from "fs";
import path from "path";

const presetsDirPath = path.join(app.getPath("userData"), "presets");

export interface MessagePreset {
  id: string;
  name: string;
  content: string;
}

export interface MessagePresetResponse {
  success: boolean;
  message: string;
}

export const presetsDirExists = (): boolean => {
  return fs.existsSync(presetsDirPath);
};

export const resetPresetsDir = () => {
  // Clear the presets directory
  try {
    fs.rmSync(presetsDirPath, {
      recursive: true,
    });
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(error);
    }
  }

  // Recreate the presets directory
  fs.mkdirSync(presetsDirPath);
};

export const getPreset = (id: string): MessagePreset | undefined => {
  // Return the preset with the given id (id.json)
  const filePath = path.join(presetsDirPath, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

export const listPresets = (): MessagePreset[] => {
  // For each file in the presets directory, parse the JSON and return the array of presets

  const files = fs.readdirSync(presetsDirPath);

  return files.map((file) => {
    const data = fs.readFileSync(path.join(presetsDirPath, file), "utf8");
    return JSON.parse(data);
  });
};

export const savePreset = (preset: MessagePreset) => {
  try {
    const filePath = path.join(presetsDirPath, `${preset.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(preset, null, 2));
  } catch (error) {
    return { success: false, message: "Error saving preset - " + error.message || "Unknown error" };
  }

  return { success: true, message: "Preset saved successfully" };
};

export const deletePreset = (id: string) => {
  try {
    const filePath = path.join(presetsDirPath, `${id}.json`);
    fs.rmSync(filePath);
    return { success: true, message: "Preset deleted successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Error deleting preset - " + error.message || "Unknown error",
    };
  }
};

export const updatePreset = (id: string, newPreset: MessagePreset) => {
  try {
    deletePreset(id);
    savePreset(newPreset);
    return { success: true, message: "Preset updated successfully" };
  } catch (error) {
    return {
      success: false,
      message: "Error updating preset - " + error.message || "Unknown error",
    };
  }
};

import { Asset } from "expo-asset";
import { Paths, File, Directory } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { fetch } from "expo/fetch";
import { Platform } from "react-native";

type DownloadFileCallbacks = {
  onBegin?: () => void;
  onSuccess?: (uri: string) => void;
  onError?: (error: unknown) => void;
  onComplete?: () => void;
};

export const downloadFile = async (
  url: string,
  filename: string,
  mimeType: string,
  callbacks?: DownloadFileCallbacks
): Promise<string> => {
  try {
    callbacks?.onBegin?.();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }

    const bytes = await response.bytes();

    if (Platform.OS === "ios") {
      const uri = await saveToIosCache(bytes, filename);
      callbacks?.onSuccess?.(uri);
      await shareFile(uri);
      return uri;
    }

    const uri = await saveToAndroidPickedDirectory(bytes, filename, mimeType);
    callbacks?.onSuccess?.(uri);
    return uri;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code !== "ERR_PICKER_CANCELLED") {
      console.error("downloadFile failed", error);
      callbacks?.onError?.(error);
    }

    throw error;
  } finally {
    callbacks?.onComplete?.();
  }
};

const saveToIosCache = async (
  bytes: Uint8Array,
  filename: string
): Promise<string> => {
  const file = new File(Paths.cache, filename);
  file.write(bytes);
  return file.uri;
};

const saveToAndroidPickedDirectory = async (
  bytes: Uint8Array,
  filename: string,
  mimeType: string
): Promise<string> => {
  const selectedDirectory = await Directory.pickDirectoryAsync();

  const file = selectedDirectory.createFile(filename, mimeType);
  file.write(bytes);
  return file.uri;
};

const shareFile = async (uri: string) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      return;
    }

    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("saveFile failed", error);
    throw error;
  }
};

export const getBundledAssetUrl = async (assetModuleId: number) => {
  const asset = Asset.fromModule(assetModuleId);
  return asset.uri;
};

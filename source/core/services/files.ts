import { Asset } from "expo-asset";
import { Paths, File } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { fetch } from "expo/fetch";

type DownloadFileCallbacks = {
  onBegin?: () => void;
  onSuccess?: (uri: string) => void;
  onError?: (error: unknown) => void;
  onComplete?: () => void;
};

export const downloadFile = async (
  url: string,
  filename: string,
  callbacks?: DownloadFileCallbacks
): Promise<string> => {
  try {
    callbacks?.onBegin?.();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Download failed with status ${response.status}`);
    }

    const bytes = await response.bytes();
    const file = new File(Paths.cache, filename);

    file.write(bytes);
    callbacks?.onSuccess?.(file.uri);
    await saveFile(file.uri);

    return file.uri;
  } catch (error) {
    console.error("downloadFile failed", error);
    callbacks?.onError?.(error);
    throw error;
  } finally {
    callbacks?.onComplete?.();
  }
};

const saveFile = async (uri: string) => {
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

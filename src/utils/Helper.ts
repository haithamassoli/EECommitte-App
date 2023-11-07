import NetInfo from "@react-native-community/netinfo";
import { Dimensions } from "react-native";
import { MMKV } from "react-native-mmkv";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ar";

dayjs.extend(relativeTime);
dayjs.locale("ar");

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const storage = new MMKV();

export const getDataMMKV = (key: string) => {
  try {
    const json = storage.getString(key);
    if (!json) return null;
    return JSON.parse(json);
  } catch (error) {
    console.log("Error reading data from MMKV", error);
  }
};

export const storeDataMMKV = (key: string, value: any) => {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error storing data in MMKV", error);
  }
};

export const deleteDataMMKV = (key: string) => {
  try {
    storage.delete(key);
  } catch (error) {
    console.log("Error deleting data from MMKV", error);
  }
};

export const deleteAllStorage = () => {
  try {
    storage.clearAll();
  } catch (e) {
    console.log(e);
  }
};

export const rtlWebview = (html: string) => {
  return `<html dir="rtl" lang="ar"><body>${html}</body></html>`;
};

export const isConnected = async () => {
  const connectionStatus = await NetInfo.fetch();
  return connectionStatus.isConnected;
};

export const blurhash = "L7Oy^s[V}K=M~B00*|U_L%#W00]Q";

export const dateFromNow = (date: Date) => {
  return dayjs(date).fromNow();
};

import { LogType } from "./types";
interface ColorConfig {
  [key: string]: number;
}

const COLOR_CODES: ColorConfig = {
  INFO: 32,   // 绿色
  ERROR: 31,  // 红色
  WARN: 33,   // 黄色
  DEBUG: 34,  // 蓝色
  USER: 34,   // 蓝色
  AI: 95,     // 紫色
  NEED: 31,    // 红色
  EMPTY: 31   // 红色
};

/**
 * 获取东八区（UTC+8）的时间
 */
const getUTC8Time = (): string => {
  const date = new Date();
  const utc8Date = new Date(date.getTime() + (8 * 60 * 60 * 1000));
  return utc8Date.toISOString();
};

/**
 * 处理内容中的特殊格式
 */
const processContent = (content: string): string => {
  return content.replace(/\[(\d+\/)?([^-\]]+)(-\d+\.\w+)?\]/g, '[$2]');
};

/**
 * 通用日志输出函数
 * @param type 日志类型
 * @param content 日志内容
 * @param processSpecialContent 是否处理特殊内容格式（默认为false）
 */
export const log = (type: LogType, content: string, processSpecialContent: boolean = false): void => {
  const timestamp = getUTC8Time();
  const colorCode = COLOR_CODES[type] || 0;
  const processedContent = processSpecialContent ? processContent(content) : content;
  
  console.log(
    `\x1b[36m[${timestamp}]\x1b[0m \x1b[${colorCode}m[${type}]\x1b[0m ${processedContent}`
  );
};

import React from 'react';

/**
 * 解析简单的 Markdown 语法并返回 JSX 元素
 * 目前支持：**粗体** 语法
 */
export const formatText = (text: string): React.ReactNode => {
  if (!text) return null;

  // 分割文本，处理 **粗体** 语法
  const parts = text.split(/(\*\*[^*]+\*\*)/);

  return parts.map((part, index) => {
    // 检查是否是粗体语法
    if (part.startsWith('**') && part.endsWith('**')) {
      // 移除 ** 标记并返回 strong 元素
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }

    // 普通文本直接返回
    return part;
  });
};

/**
 * 专门用于处理列表项的格式化
 * 用于 creative_features、user_experience、how_to_use_steps 等
 */
export const formatListItem = (text: string): React.ReactNode => {
  return formatText(text);
};

/**
 * 专门用于处理段落的格式化
 * 用于 intro_paragraph 等较长文本
 */
export const formatParagraph = (text: string): React.ReactNode => {
  return formatText(text);
};

import React from 'react';
import { Button } from 'antd';

export const isImg = /(^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?)|((png)|(svg))/;
export const isLocalImg = /(png)|(svg)/;
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children = typeof item.children === 'string' && (item.children.match(isImg) || item.children.match(isLocalImg)) 
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

---
order: 6
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

用于页面头部的展示。

## en-US

Used for the display of the page header.

```jsx
import { HcfPageHeader } from 'antd';

const headerText = 'HcfPageHeader';

function onClickBack() {
  console.log('onClickBack');
}

ReactDOM.render(
  <div>
    <HcfPageHeader headerText={headerText} onClickBack={onClickBack} />
  </div>,
  mountNode,
);
```

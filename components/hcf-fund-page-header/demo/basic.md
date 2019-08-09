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
import { HcfFundPageHeader } from 'antd';

const headerText = 'HcfFundPageHeader';

function onClickBack() {
  console.log('onClickBack');
}

ReactDOM.render(
  <div>
    <HcfFundPageHeader headerText={headerText} onClickBack={onClickBack} />
  </div>,
  mountNode,
);
```

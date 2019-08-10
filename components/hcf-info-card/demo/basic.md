---
order: 6
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

用于单据信息的展示。

## en-US

Used for the display of document information.

```jsx
import { HcfInfoCard } from 'antd';

const infoColumns = [
  {
    title: '账号',
    dataIndex: 'accountNumber',
  },
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '银行',
    dataIndex: 'bank',
  },
  {
    title: '地址',
    dataIndex: 'bankAddress',
  },
  {
    title: '开户日期',
    dataIndex: 'openDate',
    type: 'date',
  },
  {
    title: '客户经理',
    dataIndex: 'customerManager',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
  },
];

const infoData = {
  accountNumber: 12334444444444,
  account: '李四',
  bank: '中国银行',
  bankAddress: '北京路',
  openDate: new Date(),
  customerManager: '小浪',
  phone: 176787878788,
};

ReactDOM.render(
  <HcfInfoCard infoColumns={infoColumns} infoData={infoData} colNumber={4} infoTitle="账户信息" />,
  mountNode,
);
```

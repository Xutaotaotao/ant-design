import * as React from 'react';
import chunk from 'lodash/chunk';
import moment from 'moment';
import Icon from '../icon';
import Card from '../card';
import Row from '../row';
import Col from '../col';

export interface HcfInfoCardProps {
  infoData?: any;
  infoColumns?: any;
  colNumber: number;
  infoTitle: string;
}

export interface HcfInfoCardState {
  infoData?: any;
  infoColumns?: any;
  colNumber: number;
  infoTitle: string;
}

function arrChunk(arr: any, size: number) {
  return chunk(arr, size);
}

export default class HcfInfoCard extends React.Component<HcfInfoCardProps, HcfInfoCardState> {
  renderInfoColumns = () => {
    const columnsChildren = [];
    const { infoColumns, colNumber } = this.props;
    const copyInfoColumns = arrChunk(infoColumns, colNumber);
    for (let i = 0, len = copyInfoColumns.length; i < len; i += 1) {
      columnsChildren.push(
        <Row style={{ paddingTop: '16px' }} key={i}>
          {this.renderRowCol(copyInfoColumns[i])}
        </Row>,
      );
    }
    return columnsChildren;
  };

  renderRowCol = (item: any) => {
    let rowchild: any[] = [];
    const { infoData, colNumber } = this.props;
    const spanNumber = 24 / colNumber;
    if (infoData) {
      item.forEach((element: any) => {
        rowchild.push(
          <Col span={spanNumber} key={element.title} style={{ color: element.color }}>
            <Col span={6}>{element.title}:</Col>
            <Col span={18}>
              {element.type === 'date' && infoData[element.dataIndex] !== null
                ? moment(infoData[element.dataIndex]).format('YYYY-MM-DD')
                : infoData[element.dataIndex]}
            </Col>
          </Col>,
        );
      });
    }
    return rowchild;
  };

  render() {
    const { infoTitle } = this.props;
    return (
      <div>
        <Card className="info-card">
          <Icon type="file-text" style={{ color: '#4390FF ' }} />
          <span className="info-card-title">{infoTitle}</span>
          {this.renderInfoColumns()}
        </Card>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Menu, Row, Col, Icon, Popover, Input, Button } from 'antd';
import Santa from './Santa';
import * as utils from '../utils';

let docsearch;
if (typeof window !== 'undefined') {
  docsearch = require('docsearch.js'); // eslint-disable-line
}

function initDocSearch(locale) {
  if (!docsearch) {
    return;
  }
  const lang = locale === 'zh-CN' ? 'cn' : 'en';
  docsearch({
    apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
    indexName: 'ant_design',
    inputSelector: '#search-box input',
    algoliaOptions: { facetFilters: [`tags:${lang}`] },
    transformData(hits) {
      hits.forEach(hit => {
        hit.url = hit.url.replace('ant.design', window.location.host); // eslint-disable-line
        hit.url = hit.url.replace('https:', window.location.protocol); // eslint-disable-line
      });
      return hits;
    },
    debug: false, // Set debug to true if you want to inspect the dropdown
  });
}

export default class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
  };

  state = {
    menuVisible: false,
  };

  componentDidMount() {
    const { intl, router } = this.context;
    router.listen(this.handleHideMenu);
    const { searchInput } = this;
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput.focus();
      }
    });
    initDocSearch(intl.locale);
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  onMenuVisibleChange = visible => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleVersionChange = url => {
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;
    window.location.href = currentUrl
      .replace(window.location.origin, url)
      .replace(currentPathname, utils.getLocalizedPathname(currentPathname));
  };

  handleLangChange = () => {
    const {
      location: { pathname },
    } = this.props;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
      );
  };

  render() {
    const { menuVisible } = this.state;
    const { isMobile } = this.context;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const { location, themeConfig } = this.props;
    // const docVersions = { ...themeConfig.docVersions, [antdVersion]: antdVersion };
    // const versionOptions = Object.keys(docVersions).map(version => (
    //   <Option value={docVersions[version]} key={version}>
    //     {version}
    //   </Option>
    // ));
    const module = location.pathname
      .replace(/(^\/|\/$)/g, '')
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (activeMenuItem === 'components' || location.pathname === 'changelog') {
      activeMenuItem = 'docs/react';
    }
    const {
      intl: { locale },
    } = this.context;
    const isZhCN = locale === 'zh-CN';

    const headerClassName = classNames({
      clearfix: true,
    });

    const menu = [
      <Button
        ghost
        size="small"
        onClick={this.handleLangChange}
        className="header-lang-button"
        key="lang-button"
      >
        <FormattedMessage id="app.header.lang" />
      </Button>,
      <Menu
        className="menu-site"
        mode={menuMode}
        selectedKeys={[activeMenuItem]}
        id="nav"
        key="nav"
      >
        <Menu.Item key="home" className="hide-in-home-page">
          <Link to={utils.getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="docs/spec">
          <Link to={utils.getLocalizedPathname('/docs/spec/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.spec" />
          </Link>
        </Menu.Item> */}
        <Menu.Item key="docs/react">
          <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN)}>
            <FormattedMessage id="app.header.menu.components" />
          </Link>
        </Menu.Item>
      </Menu>,
    ];

    const searchPlaceholder = locale === 'zh-CN' ? '搜索' : 'Search';
    return (
      <header id="header" className={headerClassName}>
        {isMobile && (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon className="nav-phone-icon" type="menu" onClick={this.handleShowMenu} />
          </Popover>
        )}
        <Row>
          <Col xxl={4} xl={5} lg={5} md={5} sm={24} xs={24}>
            <Link to={utils.getLocalizedPathname('/', isZhCN)} id="logo">
              <img
                alt="logo"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAABphJREFUeAHtnbFOHFcUhs8dJ5jCvMCKwhJSQpVXCC5SREgg9zSW4i7CoqFlSUkTJUoXSzT01lpCKVLEz+DKWEJygfYFoCBY7M25wwLLwk7wZZmfnf8fCbG7s3f+Pd/5uLM7K2aCVSzftePscc+Wg9miBZvzp7ZitCcVQ6hXhWBHDqBr0faj2e50YZ337XDACMWdub58244th7PpEr3wtY+uP0OP3JLAqcu27X+UG3vt0L3lmEY87ZpYLtWS9WzH/+JmGlHhAyjCIR9aYSsu19sH8HJqeQnFYIpLteqz1BtJNUjl7rcTz8Q18b371iZjCxczVpqpUvG+C7wi22SUMSGvMljPd43PGWauUiyXquW7vw+aqe5f0P5ucb7p77nOZqf0Rl3vqe7fKk8oOTvvWsKAIaF/SOGTvwZ9+quvEad+KOJpkw9FFOk4laSqz6h+0qM+99qD6wosfJ+/WFeYci4JNJ170T+iflmxbtVD4OybjHqyACnpzXsLkKvIhnMv/NiVvvsDaN507joYCpCKIVJiMXQZUKPEAkBniJRYDF0G1CixANAZIiUWQ5cBNUosAHSGSInF0GVAjRILAJ0hUmIxdBlQo8QCQGeIlFgMXQbUKLEA0BkiJRZDlwE1SiwAdIZIicXQZUCNEgsAnSFSYjF0GVCjxAJAZ4iUWAxdBtQosQDQGSIlFkOXATVKLAB0hkiJxdBlQI0SCwCdIVJiMXQZUKPEAkBniJRYDF0G1CixANAZIiUWQ5cBNUosAHSGSInF0GVAjRILAJ0hUmIxdBlQo8QCQGeIlFgMXQbUKLEA0BkiJRZDlwE1SiwAdIZIicXQZUCNEgsAnSFSYjF0GVDjV4DM2iI//uIXyn3AS/x+1a+LOSFLsCO/imfXLOxbCLtmU53wbutg1KvXjDWKjB6/SuDsmkvf+DVif7TY+8Ps+FNcWP0z/rB+40W+JNZVfLp3WwLRr8gb7Sc7+fdDfPZqaXiYxBomovtfSCDO+IXq37hcq4MDJdYgDd3OJBALl+vXwZlLYmWi1LBhAqVcO+fvuSTWMB/dvwMB3y1+Pt5MG5BYd8CooTcSeBEX1mcl1o1s9GA2gfRp0U6WJVY2QQ0cSSDGRYk1ko5W5BOIcxIrn55GjiIQrCWxRsHR4/kE/OsfiZWPTyMrCEisCjhalU9AYuWz08gKAhKrAo5W5ROQWPnsNLKCgMSqgKNV+QQkVj47jawgILEq4GhVPgGJlc9OIysISKwKOFqVT0Bi5bPTyAoCEqsCjlblE5BY+ew0soKAxKqAo1X5BCRWPjuNrCBQ+NkNjirWa5UIZBFIM5af6EGLCIyXQOH/f78/3k1qayLg/1fo59HxU9JoEYHxEiimC+v4Jk/Hu1ltjZ1A8b4dDvwN/DY7CNU/XgJnhxuCbfip7w7Hu2ltjZlAKdZeO3T9LA4rFvxkNFpEYAwELg6QulxvfZe4JrnGQFWbuHq2GZfrd5fruXaLMuOuBC5mrPMNpZnLdZt3wV77Y/q0eA5Gv7+IwDWx0uj0nmtvM7z0QxFP/e7PPoP95aJ99B99/ZMAaflfAu5Mc5eJOo96w9pw44zVsBpVDoCAxAJAZ4iUWAxdBtQosQDQGSIlFkOXATVKLAB0hkiJxdBlQI0SCwCdIVJiMXQZUKPEAkBniJRYDF0G1CixANAZIiUWQ5cBNUosAHSGSInF0GVAjRILAJ0hUmIxdBlQo8QCQGeIlFgMXQbUKLEA0BkiJRZDlwE1SiwAdIZIicXQZUCNEgsAnSFSYjF0GVCjxAJAZ4iUWAxdBtQosQDQGSIlFkOXATVKLAB0hkiJxdBlQI0SCwCdIVJiMXQZUKPEAkBniJRYDF0G1CixANAZIiUWQ5cBNUosAHSGSInF0GVAjRILAJ0hUmIxdBlQo8QCQGeIbLZYuvYPxmHn3myxonUxZMlTnXuzxbKwT95iUPlhv9lihbALIssd69ybLZZNdfxSxLqYZ52al7ynOo0WK7zbOnCm23VyVZZtJ+6NFqts8tfTG2bhUA2vg4BzLnnb1YuN1xFdd0b4e6vrVa64XL26s7nynK9zLnl74c2fsbzI8M9v6QLqa5LrvlQvpVorOfcjGn1N6GGM8dmrJevZjlmcGV6n+7kEfPeXZqr0xzuwUMxY5/WWxU89nvdPiq/1afGcSubv9OkvcXSew1KlLVLNWIMI48L6rNnJssW46DPYnJNoWbQng8/R7QEC6eux8psMP+hcHh+c6vQ/dQ886fLmf5ek8l8VC2NNAAAAAElFTkSuQmCC"
              />
              <span style={{ color: '#314659', fontSize: '24px' }}>Hcf Front</span>
              <Santa />
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={19} md={19} sm={0} xs={0}>
            <div id="search-box">
              <Icon type="search" />
              <Input
                ref={ref => {
                  this.searchInput = ref;
                }}
                placeholder={searchPlaceholder}
              />
            </div>
            {!isMobile && menu}
          </Col>
        </Row>
      </header>
    );
  }
}

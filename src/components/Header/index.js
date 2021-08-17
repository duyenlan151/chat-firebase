import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Layout, Menu, Row } from "antd";
import React from "react";

const { Header } = Layout;

export default function HeaderMain(props) {
    const { collapsed, toggle } = props;

    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row wrap={false}>
                <Col flex="auto">
                    <div style={{ padding: "0 16px" }}>
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: () => toggle(),
                            }
                        )}
                    </div>
                </Col>
                <Col flex="none">
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={["2"]}
                    >
                        <Menu.Item 
                            key="1"
                            onClick={() => alert('log out')}
                        >
                            {/* Log out */}
                            <LogoutOutlined />
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
}

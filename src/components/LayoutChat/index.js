import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import React, { useState } from "react";
import SidebarChat from "./SidebarChat";
import UserInfo from "./UserInfo";

const { Header, Content } = Layout;

export default function LayoutChat({ children, addNewFriend }) {
    const [collapsed, setcollapsed] = useState(false);

    const toggle = () => {
        setcollapsed(!collapsed);
    };

    return (
        <Layout>
            {/* Sidebar */}
            <SidebarChat
                toggle={toggle}
                addNewFriend={addNewFriend}
                collapsed={collapsed}
                className={`${collapsed ? "hide" : ""}`}
            />
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                    style={{
                        position: "sticky",
                        top: 0,
                        right: 0,
                        zIndex: 1,
                        width: "100%",
                    }}
                >
                    <Row wrap={false}>
                        <Col flex="auto">
                            <MenuUnfoldOutlined
                                className="tl"
                                onClick={() => setcollapsed(!collapsed)}
                            />
                        </Col>
                        <Col flex="none">
                            <UserInfo />
                            {/* <Button>Logout</Button> */}
                        </Col>
                    </Row>
                </Header>
                {/* content */}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

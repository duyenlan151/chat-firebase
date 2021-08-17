import {
    BellOutlined,
    CalendarOutlined,
    HomeOutlined,
    MessageFilled,
    SettingOutlined, UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function SideBar(props) {
    const { collapsed } = props;

    return (
        <Sider
            className="sidebar"
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="logo">Chat</div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["0"]}>
                <Menu.Item key="0" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<MessageFilled />}>
                    <Link to="/chat">Chat</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    Contact
                </Menu.Item>
                <Menu.Item key="3" icon={<BellOutlined />}>
                    Notifications
                </Menu.Item>
                <Menu.Item key="4" icon={<CalendarOutlined />}>
                    Calendar
                </Menu.Item>
                <Menu.Item key="5" icon={<SettingOutlined />}>
                    Settings
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

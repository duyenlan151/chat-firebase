import { CloseOutlined, LaptopOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Text from "antd/lib/typography/Text";
import { AppContext } from "Context/AppProvider";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import User from "./User";
const { Sider } = Layout;

SidebarChat.propTypes = {
    addNewFriend: PropTypes.func,
};

export default function SidebarChat(props) {
    const { addNewFriend, className, toggle } = props;
    const { roomsRef } = useContext(AppContext);

    return (
        <Sider
            className={`sidebar sidebar-chat ${className}`}
            theme="light"
            trigger={null}
            collapsible
        >
            <div style={{ textAlign: 'center'}} className="sidebar-copy">
                <LaptopOutlined />
                <Text disabled>@Copyright-DuyenLan</Text>
            </div>
            <CloseOutlined onClick={toggle} className="btn-close tl" />
            <div className="logo">Messager</div>
            <div style={{ textAlign: "center", margin: 5 }}>
                <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={addNewFriend}
                    style={{ textAlign: "center", margin: 5 }}
                >
                    Add new friend
                </Button>
            </div>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["0"]}>
                {!isEmpty(roomsRef) &&
                    roomsRef.map((room, index) => (
                        <Menu.Item key={index + 1}>
                            <User key={index} room={room} />
                        </Menu.Item>
                    ))}
                {isEmpty(roomsRef) && (
                    <Menu.Item key="0" style={{ textAlign: "center" }}>
                        Let add new friend 😃
                    </Menu.Item>
                )}
                {/* <Menu.Item key="1">
                    <Link to="/chat">Chat</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<PlusOutlined />}>
                    Contact
                </Menu.Item>
                <Menu.Item key="3" icon={<PlusOutlined />}>
                    Notifications
                </Menu.Item>
                <Menu.Item key="4" icon={<PlusOutlined />}>
                    Calendar
                </Menu.Item>
                <Menu.Item key="5" icon={<PlusOutlined />}>
                    Settings
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
}

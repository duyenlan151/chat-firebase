import { Layout } from "antd";
import HeaderMain from "components/Header";
import SideBar from "components/SideBar";
import { AppContext } from "Context/AppProvider";
import React, { useContext, useState } from "react";

const { Content } = Layout;

export default function LayoutMain({ children }) {
    const [collapsed, setcollapsed] = useState(false);

    const { selectedRoomId } = useContext(AppContext);

    useEffect(() => {
        toggle();
        return () => {
            
        }
    }, [selectedRoomId])

    const toggle = () => {
        setcollapsed(!collapsed);
    };

    return (
        <Layout>
            {/* Sidebar */}
            <SideBar collapsed={collapsed} />
            <Layout className="site-layout">
                {/* header */}
                <HeaderMain collapsed={collapsed} toggle={toggle}/>
                {/* content */}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                    }}
                >
                    { children }
                </Content>
            </Layout>
        </Layout>
    );
}

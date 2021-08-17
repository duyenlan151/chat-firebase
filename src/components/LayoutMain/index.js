import { Layout } from "antd";
import HeaderMain from "components/Header";
import SideBar from "components/SideBar";
import { AppContext } from "Context/AppProvider";
import React, { useContext, useState } from "react";

const { Content } = Layout;

export default function LayoutMain({ children }) {
    const [collapsed, setcollapsed] = useState(false);

    const toggle = () => {
        setcollapsed(!collapsed);
    };

    return (
        <Layout>
        </Layout>
    );
}

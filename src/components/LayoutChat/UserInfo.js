import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Image } from "antd";
import { auth } from "firebase/config";
import React, { useEffect } from "react";

function UserInfo() {
    let userLocal = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        return () => {};
    }, []);
    return (
        <div>
            <Avatar
                style={{ marginRight: 4 }}
                src={
                    userLocal.photoURL
                    ? <Image
                        src={ userLocal.photoURL }
                    />
                    : <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                }
            />
            {userLocal.displayName}
            <span style={{ marginLeft: 5 }}>
                <Button onClick={() => {
                    window.location.reload();
                    localStorage.removeItem('user');
                    auth.signOut()
                }}>Logout</Button>
            </span>
        </div>
    );
}

UserInfo.propTypes = {};

export default UserInfo;

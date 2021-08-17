import { Avatar, Button, Image } from "antd";
import { AuthContext } from "Context/AuthProvider";
import { auth } from "firebase/config";
import React, { useContext, useEffect } from "react";

function UserInfo() {
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);

    useEffect(() => {
        return () => {};
    }, []);
    return (
        <div>
            <Avatar
                style={{ marginRight: 4 }}
                src={
                    <Image
                        src={
                            photoURL
                                ? photoURL
                                : displayName?.charAt[0]?.toUpperCase()
                        }
                    />
                }
            />
            {displayName}
            <span style={{ marginLeft: 5 }}>
                <Button onClick={() => auth.signOut()}>Logout</Button>
            </span>
        </div>
    );
}

UserInfo.propTypes = {};

export default UserInfo;

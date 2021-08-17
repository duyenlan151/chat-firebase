import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Row, notification } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import firebase, { auth } from "firebase/config";
import { addDocument, generateKeywords } from "firebase/services";
import React from "react";

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
    const handleLogin = async (provider) => {
        try {
            const { additionalUserInfo, user } = await auth.signInWithPopup(
                provider
            );
    
            if (additionalUserInfo?.isNewUser) {
                // nếu lần đầu tiên user login vào
                // ghi dữ liệu vào database
    
                await addDocument("users", {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: additionalUserInfo.providerId,
                    keywords: generateKeywords(user.displayName?.toLowerCase()),
                    friends: [],
                });
            }
        } catch (err) {
            // console.log(err);
            notification.warning({
                message: "An account already exists with the same email address!",
                description: `${err?.email}`,
            });
        }
        
    };

    return (
        <div className="login">
            <Row justify="center" style={{ height: 800 }}>
                <Col sm={16} md={14} lg={10}>
                    <Title style={{ textAlign: "center" }} level={3}>
                        🤩 Welcome to MeeChat 🥳
                    </Title>
                    <Row gutter={10} justify="center" align="center">
                        <Col md={24} lg={12}>
                            <Button
                                icon={<GoogleOutlined />}
                                style={{ width: "100%", marginBottom: 8 }}
                                onClick={() => handleLogin(ggProvider)}
                            >
                                Google
                            </Button>
                        </Col>
                        <Col md={24} lg={12}>
                            <Button
                                icon={<FacebookOutlined />}
                                style={{ width: "100%" }}
                                onClick={() => handleLogin(fbProvider)}
                            >
                                Facebook
                            </Button>
                        </Col>
                    </Row>
                    <Text
                        style={{ textAlign: "center", display: "block" }}
                        disabled
                    >
                        @Copyright-DuyenLan
                    </Text>
                </Col>
            </Row>
        </div>
    );
}

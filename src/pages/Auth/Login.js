import {
    FacebookOutlined,
    GoogleOutlined,
    RobotOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, notification, Input, Form, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import firebase, { auth } from "firebase/config";
import {
    addDocument,
    autoGenerateName,
    generateKeywords,
} from "firebase/services";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from "react-simple-captcha";

import { v4 as uuidv4 } from "uuid";

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ggProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [botName, setBotName] = useState("");
    const [errMsg, setErrMsg] = useState("Please input capcha");
    const history = useHistory();

    useEffect(() => {
        return () => {};
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
        setBotName(autoGenerateName());
        setTimeout(() => {
            loadCaptchaEnginge(6);
        }, 100);
    };

    const doSubmit = () => {
        let user_captcha = document.getElementById("user_captcha_input").value;

        if (validateCaptcha(user_captcha) == true) {
            loadCaptchaEnginge(6);

            document.getElementById("user_captcha_input").value = "";
            notification.success({
                message: "Register successfully!",
            });

            setIsModalVisible(false);
            handleAddUser();
        } else {
            document.getElementById("user_captcha_input").value = "";
            setErrMsg("Captcha Does Not Match");
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddUser = async () => {
        try {
            await addDocument("users", {
                displayName: botName,
                email: botName,
                photoURL: null,
                uid: uuidv4(),
                providerId: null,
                keywords: generateKeywords(botName.toLowerCase()),
            });

            localStorage.setItem("user", JSON.stringify({
                displayName: botName,
                email: botName,
                photoURL: null,
                uid: uuidv4(),
            }))

            setTimeout(() => {
                history.push('/');
            }, 1200);
        } catch (error) {
            console.log("🚀 ~ file: Login.js ~ line 32 ~ Login ~ error", error);
        }
    };

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
                message:
                    "An account already exists with the same email address!",
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
                        <Col lg={12}>
                            <Button
                                icon={<RobotOutlined />}
                                style={{ width: "100%" }}
                                onClick={showModal}
                            >
                                Continue with bot
                                {/* <LoadCanvasTemplateNoReload /> */}
                            </Button>
                        </Col>
                    </Row>
                    <Modal
                        // title={`Continue with: ${(
                        //     <Text type="success">{botName}</Text>
                        // )}`}
                        visible={isModalVisible}
                        onOk={() => doSubmit()}
                        onCancel={handleCancel}
                        title={
                            <>
                                Continue with: 
                                <Text type="success" style={{ marginLeft: 3 }}>{botName}</Text>
                            </>
                        }
                    >
                        <Col lg={24} style={{ margin: "5px auto" }}>
                            <div className="form-group">
                                <div className="col mt-3">
                                    <LoadCanvasTemplate />
                                </div>

                                <div className="col mt-3">
                                    {/* <Input
                                        placeholder="Enter Captcha Value"
                                        id="user_captcha_input"
                                        name="user_captcha_input"
                                        type="text"
                                    /> */}
                                    <Form
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        layout="vertical"
                                        // onFinish={onFinish}
                                        // onFinishFailed={onFinishFailed}
                                    >
                                        <Input
                                            placeholder="Enter Captcha Value"
                                            id="user_captcha_input"
                                            name="user_captcha_input"
                                            type="text"
                                        />
                                        <Text
                                            style={{
                                                fontSize: 10,
                                            }}
                                            type="danger"
                                        >
                                            {errMsg}
                                        </Text>

                                        <Form.Item
                                            label="Your Name"
                                            style={{ marginTop: 4 }}
                                        >
                                            <Input
                                                placeholder="Enter Captcha Value"
                                                id="botname"
                                                name="botname"
                                                type="text"
                                                maxLength={10}
                                                style={{ width: "100%" }}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        setBotName(
                                                            e.target.value
                                                        );
                                                    } else {
                                                        setBotName(
                                                            autoGenerateName()
                                                        );
                                                    }
                                                }}
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Modal>
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

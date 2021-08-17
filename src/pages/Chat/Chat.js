import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Result, Row, Tooltip } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Message from "components/Chat/Message";
import LayoutChat from "components/LayoutChat";
import { AppContext } from "Context/AppProvider";
import { AuthContext } from "Context/AuthProvider";
import { addDocument } from "firebase/services";
import { isEmpty } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const listEmoji = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", 
    "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", 
    "🤬", "🤯", "😳", "🥵",
]

export default function Chat() {
    const {
        user: { uid, photoURL },
    } = useContext(AuthContext);
    const { setIsInviteMemberVisible, selectedRoomId, messageRef } =
        useContext(AppContext);
    const messagesWrapperRef = useRef(false);

    const [listMessages, setListMessages] = useState([]);
    const [valueMess, setValueMess] = useState([]);
    const [isEmoji, setisEmoji] = useState(false);

    useEffect(() => {
        handleScrollBottom(true);
    }, [listMessages]);

    useEffect(() => {
        setListMessages(messageRef);
        handleScrollBottom();

        return () => {};
    }, [messageRef]);

    const handleSendMessage = async (value) => {

        await addDocument("messages", {
            uid: uuidv4(),
            room_id: selectedRoomId,
            message: value,
            photoURL: photoURL,
            dayTime: new Date(),
            user_send: uid,
        });
    };

    const handleChangeMessage = (e, type) => {
        // let value = e.target.value;

        if ((e.key === "Enter" && !e.shiftKey && valueMess) || (valueMess != undefined && type === 'btn')) {
            e.preventDefault();

            setValueMess("");
            setListMessages([
                ...listMessages,
                {
                    message: valueMess,
                    photoURL: photoURL,
                    createAt: new Date(),
                },
            ]);

            handleSendMessage(valueMess);
        }
    };

    const handleScrollBottom = (smooth) => {
        let temp = document.querySelector(".messages__content");
        if (temp && temp != undefined) {
            temp.scrollTo({
                top: temp.scrollHeight,
                left: 0,
                behavior: smooth ? "smooth" : "auto",
            });
        }
    };

    const handleAddNewFriend = () => {
        setIsInviteMemberVisible(true);
    };

    const handleClickEmoji = (e) => {
        setValueMess(valueMess + e.target.innerText)
    }

    return (
        <LayoutChat addNewFriend={handleAddNewFriend}>
            {!selectedRoomId && (
                <>
                    <Alert
                        message="Please select friend to chat"
                        type="info"
                        showIcon
                        showIcon
                        style={{ margin: 10 }}
                    />
                    <Result
                        icon={<SmileOutlined />}
                        title="If something went wrong, you can fresh f5 to refresh page! Thanks 🥰"
                        extra={
                            <Button
                                type="primary"
                                onClick={() => window.location.reload()}
                            >
                                Refresh
                            </Button>
                        }
                    />
                </>
            )}
            {selectedRoomId && (
                <div className="messages-wrapper messages">
                    <div className="messages__content" ref={messagesWrapperRef}>
                        <Result
                            status="success"
                            title="😎 You'r Friends! Chat now 😎"
                        />
                        {/* list messages */}

                        {/* <Message />
                        <Message className="comment--right" /> */}
                        {!isEmpty(listMessages) &&
                            listMessages.map((mess, index) => (
                                <Message
                                    className={
                                        mess.user_send === uid
                                            ? "comment--right"
                                            : ""
                                    }
                                    key={index}
                                    mess={mess}
                                />
                            ))}
                    </div>
                    <Tooltip title="search"></Tooltip>

                    <div className="messages__controls">
                        <Row align="middle">
                            <Col flex="auto">
                                <TextArea
                                    onChange={(e) =>
                                        setValueMess(e.target.value)
                                    }
                                    className="input_message"
                                    value={valueMess}
                                    placeholder="Typing message..."
                                    autoSize={{ minRows: 1, maxRows: 1 }}
                                    onKeyPress={handleChangeMessage}
                                />
                            </Col>
                            <Col flex="50px">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Button
                                        type="text"
                                        icon={<SendOutlined />}
                                        onClick={(e) => handleChangeMessage(e, 'btn')}
                                    />
                                    <div className="emoji">
                                        <Button
                                            className="emoji-btn"
                                            type="text"
                                            icon={<SmileOutlined />}
                                            onClick={() => setisEmoji(!isEmoji)}
                                        />
                                        { isEmoji && <div class="emoji-list">
                                            <Card style={{ width: 300 }}>
                                                { listEmoji && listEmoji.map((emoji, index) => 
                                                    <span onClick={(e) => handleClickEmoji(e)} key={index}>{emoji}</span>
                                                )}
                                            </Card>
                                        </div>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </LayoutChat>
    );
}

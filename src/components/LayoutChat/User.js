import { Avatar, Col, Image, Row, Typography } from "antd";
import { AppContext } from "Context/AppProvider";
// import Avatar from "antd/lib/avatar/avatar";
import { AuthContext } from "Context/AuthProvider";
import { db } from "firebase/config";
import { isEmpty } from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
const { Title, Text } = Typography;

export default function User({ room }) {
    const {
        user: { uid },
    } = useContext(AuthContext);

    const {
        setSelectedRoomId,
    } = useContext(AppContext);

    const { friend_id, user_id } = room;
    const [userInfo, setUserInfo] = useState({});

    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        if (uid === friend_id) {
            fetchInfoUser(user_id).then((resUser) => setUserInfo(resUser[0]));
        } else {
            fetchInfoUser(friend_id).then((resUser) => setUserInfo(resUser[0]));
        }
        return () => {};
    }, []);

    const fetchInfoUser = async (value) => {
        return db
            .collection("users")
            .where("uid", "==", value)
            .get()
            .then((snapshot) => {
                return snapshot.docs.map((doc) => doc.data());
            });
    };

    const handleSelectRoom = () => {
        setSelectedRoomId(room.uid);

        history.push({
            pathname: `${match.url}`,
            search: `?room=${room.uid}`
        })
    }

    return (
        <Row wrap={false} className="user-group" onClick={() => handleSelectRoom()}>
            <Col flex="2.2rem" className="user-group__avatar">
                <Avatar
                    size={38}
                    src={
                        <Image
                            src={
                                userInfo?.photoURL
                                    ? userInfo?.photoURL
                                    : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            }
                        />
                    }
                />
            </Col>
            <Col flex="auto" className="user-group__txt">
                {!isEmpty(userInfo) && (
                    <>
                        <p>{userInfo?.displayName}</p>
                        <Text>We supply a series of design principles</Text>
                    </>
                )}
            </Col>
        </Row>
    );
}

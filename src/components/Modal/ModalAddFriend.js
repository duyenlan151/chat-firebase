import { Form, Modal, notification, Select, Spin } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { AppContext } from "Context/AppProvider";
import { AuthContext } from "Context/AuthProvider";
import { addDocument } from "firebase/services";
import { debounce, isEmpty } from "lodash";
import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase/config";

const { Option } = Select;

function ModalAddFriend(props) {
    const {
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        selectedRoom,
        fetchRooms
    } = useContext(AppContext);

    const { user } = useContext(AuthContext);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        form.resetFields();

        if (!isEmpty(value)) {
            fetchFriendInRooms(value, user).then((res) => {
                if (!isEmpty(res)) {
                    notification.warning({
                        message: "You are has been friend!",
                        description: "Please select another user",
                    });
                } else {
                    handleAddFriend();
                }
            });
        }else{
            notification.warning({
                message: "This user does not exist!",
                description: "Please select another user",
            });
        }
    };

    const handleAddFriend = async () => {
        notification.success({
            message: "You has been add new friend!",
        });

        // const usersCollection = await db.collection("users").where("uid", "==", user.uid).get();
        // usersCollection.forEach((doc) => {
        //     doc.ref.update({
        //         friends: [...userRef.friends, value],
        //     });
        // });

        await addDocument('friends', { 
            uid: uuidv4(),
            user_id: user.uid,
            friend_id: value
        });

        await addDocument('chat_rooms', { 
            uid: uuidv4(),
            user_id: user.uid,
            friend_id: value
        });

        setIsInviteMemberVisible(false);
        setValue();
        fetchRooms();
    };

    const handleCancel = () => {
        setIsInviteMemberVisible(false);
        setValue();
        form.resetFields();
    };

    return (
        <Modal
            title="Add friend"
            visible={isInviteMemberVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <DebounceSelect
                    // mode="multiple"
                    name="search-user"
                    label="Tên các thành viên"
                    value={value}
                    placeholder="Please enter user name"
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => setValue(newValue)}
                    style={{ width: "100%" }}
                    allowClear
                    showSearch
                    currentUser={user.uid}
                />
            </Form>
        </Modal>
    );
}

ModalAddFriend.propTypes = {};

export default ModalAddFriend;

const fetchFriendInRooms = async (value, user) => {
    return db
        .collection("friends")
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => doc.data())
                .filter(
                    (opt) =>
                        (opt.user_id === value && opt.friend_id === user.uid) ||
                        (opt.friend_id === value && opt.user_id === user.uid)
                );
        });
};

async function fetchUserList(search, currentUser) {
    return db
        .collection("users")
        .where("keywords", "array-contains", search?.toLowerCase())
        .orderBy("displayName")
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                }))
                .filter((opt) => !currentUser.includes(opt.value));
        });
}

function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    currentUser,
    ...props
}) {
    // Search: abcddassdfasdf

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, currentUser).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, currentUser]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            filterOption={false}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            onSearch={debounceFetcher}
            {...props}
        >
            {options.map((opt) => (
                <Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL
                            ? ""
                            : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Option>
            ))}
        </Select>
    );
}

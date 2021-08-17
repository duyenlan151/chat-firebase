import { db } from "firebase/config";
import React, { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

// (opt.user_id === value && opt.friend_id === user.uid) ||
//                         (opt.friend_id === value && opt.user_id === user.uid)

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [userRef, setUserRef] = useState({});
    const [roomsRef, setRoomsRef] = useState({});
    // const [messageRef, setMessageRef] = useState([]);

    const {
        user: { uid },
    } = React.useContext(AuthContext);

    useEffect(() => {
        fetchRooms();
        return () => {
            // fetchData();
        };
    }, []);

    const fetchRooms = () => {
        fetchAllRoomsByUserId(uid).then((res) => setRoomsRef(res));
    };

    const fetchAllRoomsByUserId = async (uid) => {
        return db
            .collection("friends")
            .get()
            .then((snapshot) => {
                return snapshot.docs
                    .map((doc) => doc.data())
                    .filter(
                        (opt) => opt.user_id === uid || opt.friend_id === uid
                    );
            });
    };

    // fetch all message off room
    // const fetchMessageByRoomId = async (roomId) => {
    //     return db
    //         .collection("messages")
    //         .where("room_id", "==", roomId)
    //         .orderBy("createAt", "asc")
    //         .get()
    //         .then((snapshot) => {
    //             return snapshot.docs.map((doc) => doc.data());
    //         });
    // };

    // const selectedRoom = React.useMemo(
    //     () =>
    //         fetchMessageByRoomId(selectedRoomId).then((resMessages) =>
    //             setMessageRef(resMessages)
    //         ),
    //     [selectedRoomId]
    // );

    const conditionMessage = React.useMemo(
        () => ({
            fieldName: "room_id",
            operator: "==",
            compareValue: selectedRoomId,
        }),
        [selectedRoomId]
    );

    const messageRef = useFirestore("messages", conditionMessage);

    const clearState = () => {
        setSelectedRoomId("");
        setIsAddRoomVisible(false);
        setIsInviteMemberVisible(false);
    };

    return (
        <AppContext.Provider
            value={{
                userRef,
                roomsRef,
                // members,
                // selectedRoom,
                // isAddRoomVisible,
                // setIsAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
                fetchRooms,
                messageRef,
                // fetchMessageByRoomId,
                // clearState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

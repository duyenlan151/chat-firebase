import { Comment, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { formatRelative } from 'date-fns/esm';

Message.propTypes = {
    className: PropTypes.string,
};

Message.defaultProps = {
    className: "",
};

function formatDate(seconds) {
    let formattedDate = '';
  
    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());
  
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
  
    return formattedDate;
  }

export default function Message(props) {
    const { className, mess } = props;
    
    const actions = [
        <Tooltip title={moment(new Date()).format("YYYY-MM-DD")}>
            {/* <span>{moment(mess?.createAt).format("YYYY-MM-DD HH:mm:ss")}</span> */}
            {moment(new Date()).format("YYYY-MM-DD HH:mm")}
        </Tooltip>,
    ];

    return (
        <div className={"comment-wrapper " + className}>
            <Comment
                avatar={
                    <Avatar
                        src={
                            mess.photoURL
                                ? mess.photoURL
                                : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                        alt="Han Solo"
                    />
                }
                content={
                    <>
                        <p>{mess.message}</p>
                    </>
                }
                datetime={
                    <Tooltip title={formatDate(mess.dayTime?.seconds)}>
                        <span>{formatDate(mess.dayTime?.seconds)}</span>
                    </Tooltip>
                }
                actions={actions}
            />
        </div>
    );
}

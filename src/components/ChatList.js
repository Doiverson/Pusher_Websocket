import React from "react";
import logo from "../logo.svg";

export default ({ chats }) => (
    <ul>
        {chats.map(chat => {
            return (
                <div>
                    <div className="row show-grid">
                        <div className="col-xs-12">

                            <div className="chatMessage">
                                <div key={chat.id} className="box">
                                    <p>
                                        <strong>{chat.username}</strong>
                                    </p>
                                    <p>{chat.message}</p>
                                </div>
                                <div className="imageHolder">
                                    <img src={logo} className="img-responsive avatar" alt="logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </ul>
);

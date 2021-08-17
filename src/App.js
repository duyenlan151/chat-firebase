import { Spin } from "antd";
import ModalAddFriend from "components/Modal/ModalAddFriend";
import AppProvider from "Context/AppProvider";
import AuthProvider from "Context/AuthProvider";
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "routes";

export default function App() {

    const renderElement = () => {
        return (
            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        );
    };

    return (
        <Suspense
            fallback={
                <Spin
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%) scale(1.5)",
                    }}
                />
            }
        >
            <AuthProvider>
                <AppProvider>
                    {renderElement()}

                    {/* Modal */}
                    <ModalAddFriend />
                </AppProvider>
            </AuthProvider>
        </Suspense>
    );
}

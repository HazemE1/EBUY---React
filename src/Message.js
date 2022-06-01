import React, {Component} from "react";
import "firebase/compat/database";
import "firebase/compat/auth";

class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            show: false
        }

        global.showMessages = () => {

            this.setState({show: true})
        }
    }

    componentDidMount() {

    }

    removeMessage() {

    }

    render() {
        return (
            <div className={"messages__view"} style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backdropFilter: " blur(2px)",
                zIndex: 200,
                display: this.state.show === true ? "" : "none"
            }}>
                <div  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}>
                    <div style={{
                        flex: 1,
                        backgroundColor: "grey",
                        maxWidth: 300,
                        height: 600,
                        borderRadius: 10
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            backgroundColor: "rgba(0,0,0,0.3)",
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                        }}>
                            <h3 style={{flex: 1, padding: 5, textAlign: "right"}}>MESSAGES</h3>
                            <h3 onClick={() => this.setState({show: false})} style={{flex: 1, textAlign: "right", color: "red", fontSize: 20, padding: 5}}>X</h3>
                        </div>

                        <div style={{display: "flex", flex: 1, flexDirection: "column"}}>
                            {global.user.messages.map((v) => {
                                return (
                                    <div key={v.uuid} style={{
                                        width: "100%",
                                        backgroundColor: "rgba(0,0,0,0.1)",
                                        marginBottom: 3,
                                    }}>
                                        <h4 style={{
                                            textAlign: "center",
                                            backgroundColor: "rgba(0,0,0,0.3)",

                                        }}>{v.title}</h4>
                                        <span> {v.message}</span>
                                        <h4 onClick={() => {
                                            global.user.delMessage(v.uuid)
                                            this.setState({
                                                show: false
                                            })
                                        }} style={{textAlign: "right", color: "red", marginRight: 1}}>DELETE</h4>

                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Message

import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";

let openSnackbarFn;

class Notifier extends Component {
    state = {
        open: false,
        message: ""
    };

    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    }

    openSnackbar = ({ message }) => {
        this.setState({
            open: true,
            message
        });
    };

    handleSnackbarClose = () => {
        this.setState({
            open: false,
            message: ""
        });
    };
    
    render() {
        const message = (
            <span
                id="snackbar-message-id"
                dangerouslySetInnerHTML={{ __html: this.state.message }}
            />
        );
        return (
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                message={message}
                autoHideDuration={3000}
                onClose={this.handleSnackbarClose}
                open={this.state.open}
                ContentProps={{
                    "aria-describedby": "snackbar-message-id"
                }}
            />
        );
    }
}

export default Notifier;

export function openSnackbar({ message }) {
    openSnackbarFn({ message });
}

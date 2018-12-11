import React, { Component } from "react";
import { history } from "./../../commons/helpers/history";
import StyledMain from "../../commons/styled/StyledMain";
import {
    StyledHeader,
    HeaderDiv1,
    HeaderDiv2,
    HeaderLimiter,
    HeaderTitle,
    LogoutButton,
    HeaderSubTitle,
    HeaderNav2,
    HeaderNav2Link
} from "./../../commons/styled/StyledHeader";
import {
    StyledContainer,
    Form1,
    Input1,
    StyledButton,
    StyledDiv
} from "./../../commons/styled/StyledUtils";
import StyledSection from "./../../commons/styled/StyledSection";
import { connect } from "react-redux";
import { todoActions } from "./../../store/actions/todo.action";
import TodoList from "./../todoList/TodoList";

class Dashboard extends Component {
    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(todoActions.getTodo(user.user.id));
    }
    logoutClick = () => {
        history.push("/login");
    };
    exportPdfClick = () => {
        console.log("export PDF");
    };
    archiveClick = () => {
        const { dispatch } = this.props;
        dispatch(todoActions.toggleShowArchived());
    };
    addTaskClick = e => {
        e.preventDefault();
        const { dispatch, user } = this.props;
        const name = this.taskInput.value;
        const priority = this.priorityInput.value;
        if (name && priority)
            dispatch(
                todoActions.createTodo({
                    owner: user.user.id,
                    name,
                    priority
                })
            );
    };
    render() {
        const { user, showArchived } = this.props;
        return (
            <StyledMain>
                <StyledHeader>
                    <HeaderDiv1>
                        <HeaderLimiter>
                            <HeaderTitle>Todo Dashboard</HeaderTitle>
                            <LogoutButton onClick={this.logoutClick}>
                                Logout
                            </LogoutButton>
                        </HeaderLimiter>
                    </HeaderDiv1>
                    <HeaderDiv2>
                        <HeaderLimiter>
                            <HeaderSubTitle>
                                Welcome {user.user.name}
                            </HeaderSubTitle>
                            <HeaderNav2>
                                {showArchived ? (
                                    <HeaderNav2Link onClick={this.archiveClick}>
                                        Show UnArchived
                                    </HeaderNav2Link>
                                ) : (
                                    <HeaderNav2Link onClick={this.archiveClick}>
                                        Show Archived
                                    </HeaderNav2Link>
                                )}
                                <HeaderNav2Link onClick={this.exportPdfClick}>
                                    Export to PDF
                                </HeaderNav2Link>
                            </HeaderNav2>
                        </HeaderLimiter>
                    </HeaderDiv2>
                </StyledHeader>
                <StyledSection>
                    <StyledDiv>
                        <Form1 onSubmit={this.addTaskClick}>
                            <Input1
                                type="text"
                                name="task"
                                ref={ref => {
                                    this.taskInput = ref;
                                }}
                                placeholder="Enter Task"
                            />
                            <select
                                name="priority"
                                ref={ref => {
                                    this.priorityInput = ref;
                                }}
                                style={{
                                    background: "palevioletred",
                                    color: "#fff",
                                    borderRadius: "3px",
                                    border: "2px solid palevioletred",
                                    padding: "2px 6px",
                                    outline: "none",
                                    cursor: "pointer",
                                    marginRight: "4px",
                                    marginLeft: "4px"
                                }}
                            >
                                <option value="">--Priority--</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            <StyledButton type="submit">Add Task</StyledButton>
                        </Form1>
                    </StyledDiv>
                    <StyledContainer>
                        <TodoList />
                    </StyledContainer>
                </StyledSection>
            </StyledMain>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    return {
        user,
        showArchived: state.todo.showArchived
    };
};
export default connect(mapStateToProps)(Dashboard);

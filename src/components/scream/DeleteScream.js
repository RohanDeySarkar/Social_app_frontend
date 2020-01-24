import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';

import { connect } from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const styles = (theme) => ({
    ...theme.spreadThis,
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '18%'
    }
});

class DeleteScream extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false, })
    };

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
        this.setState({ open: false })
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton 
                    tip="Delete Scream"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutlinedIcon color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>
                        Delete this scream ? 
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

const mapActionsToProps = {
    deleteScream
};

export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteScream));
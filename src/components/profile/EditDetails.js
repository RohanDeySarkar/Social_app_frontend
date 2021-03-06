import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: 'right'
    }
})

class EditDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }

    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    handleOpen = () => {
        this.setState({ open: true });
        // this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>Edit your details</DialogTitle>
                        <DialogContent>
                            <form>
                                <TextField
                                    name="bio"
                                    type="text"
                                    label="Bio"
                                    multiline
                                    rows="2"
                                    placeholder="Provide a short bio"
                                    className={classes.textField}
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    fullwidth
                                />
                                <TextField
                                    name="website"
                                    type="text"
                                    label="Website"
                                    placeholder="Provide a website"
                                    className={classes.textField}
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    fullwidth
                                />
                                <TextField
                                    name="location"
                                    type="text"
                                    label="Location"
                                    placeholder="Provide a location"
                                    className={classes.textField}
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    fullwidth
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="secondary">
                                Save
                            </Button>
                        </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

const mapActionsToProps = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/link';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture =  () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        // check userReducer
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location}, loading, authenticated }} = this.props;
        
        let profileMarkup = !loading ? 
        (authenticated ? 
            (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img src={imageUrl} alt="profile" className="profile-image"/>
                            <input 
                                type="file" 
                                id="imageInput"
                                hidden="hidden" 
                                onChange={this.handleImageChange} 
                            />
                            <Tooltip title="Upload new picture" placement="top">
                                <IconButton onClick={this.handleEditPicture} className="button">
                                    <PhotoCameraIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && <Typography variant="body2">{bio}</Typography>}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary" />
                                    <span>{location}</span>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <a href={website} target="_blank" rel="noopener noreferrer">
                                        {' '}{website}
                                    </a>
                                    <hr />
                                </Fragment>
                            )}
                            <EventNoteIcon color="primary" /> {' '}
                            <span>Joined {dayjs(createdAt).format('MMM YYYY ')}</span>
                        </div>
                        <Tooltip title="Logout" placement="top">
                            <IconButton onClick={this.handleLogout}>
                                <PowerSettingsNewIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found, pleasy login again
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="secondary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Signup
                        </Button>
                    </div>
                </Paper>
            )) : (<p>loading...</p>) 

        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.object.isRequired
};

// user => userReducer => combinedReducer => store
const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    uploadImage, logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
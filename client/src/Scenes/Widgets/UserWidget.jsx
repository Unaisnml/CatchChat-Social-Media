import React from "react";
import {
  ManageAccountsOutlined,
  // EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, ButtonBase } from "@mui/material";
import UserImage from "Components/UserImage";
import FlexBetween from "Components/FlexBetween";
import WidgetWrapper from "Components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import Modal from "@mui/material/Modal";
import { Button, Form, Input } from "antd";
// import axios from "axios";
import { setLogin } from "State/state";
import { editUser, getUserProfile } from "Api/UserRequest";

const Userwidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const currentUserId = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (userId === currentUserId._id) {
      // console.log(currentUserId);
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [isCurrentUser]); //eslint-disable-line react-hooks/exhaustive-deps

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid",
    boxShadow: 24,
    p: 4,
  };

  const onFinish = async (values) => {
    try {
      const response = await editUser(currentUserId._id, values);

      if (response.data.success) {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          }),

          handleClose()
        );
      } else {
        console.log("No response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const response = await getUserProfile(userId, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data) {
      const data = response.data;
      setUser(data);
      console.log(response.data, "got user");
    }
  };
  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    // viewedProfile,
    // impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper sx={{ postion: "sticky", top: "0" }}>
      {/* FIRST RAW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile`, { state: { userId: userId } })}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND RAW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
        {isCurrentUser ? (
          <Box display="flex" alignItems="center" gap="1rem">
            <CreateIcon fontSize="large" sx={{ color: main }} />
            <ButtonBase onClick={handleOpen}>
              {" "}
              <Typography color={medium}>Edit Profile</Typography>
            </ButtonBase>
          </Box>
        ) : null}
      </Box>

      {/* <Divider /> */}

      {/* THIRD RAW */}
      {/* <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impression of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider /> */}

      {/* FOURTH RAW */}
      {/* <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box> */}

      {/* Edit Profile Section */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" componet="h2">
            Edit Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="First Name" name="firstName">
                <Input placeholder={currentUserId.firstName} />
              </Form.Item>

              <Form.Item label="Last Name" name="lastName">
                <Input placeholder={currentUserId.lastName} />
              </Form.Item>

              <Form.Item label="Location" name="location">
                <Input placeholder={currentUserId.location} />
              </Form.Item>

              <Form.Item label="Occupation" name="occupation">
                <Input placeholder={currentUserId.occupation} />
              </Form.Item>

              <Form.Item
                label="Occupation"
                name="_id"
                hidden={true}
                initialValue={currentUserId._id}
              >
                <Input />
              </Form.Item>

              <div className="d-flex flex-column">
                <Button htmlType="submit">Submit</Button>
              </div>
            </Form>
          </Typography>
        </Box>
      </Modal>
    </WidgetWrapper>
  );
};

export default Userwidget;

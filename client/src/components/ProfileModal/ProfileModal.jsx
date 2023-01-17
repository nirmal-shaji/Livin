import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { coverPhotoUpload,profilePhotoUpload,updateDetails} from "../../redux/actions/uploadActions";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSetState } from "@mantine/hooks";
// import { uploadImage } from "../../actions/UploadAction";
// import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {

  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
   
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    let userData = formData;
   
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
    
      data.append("upload_preset", "ogamtbe3");
      data.append("cloud_name","dxxgj5lfp")
   
      try {
        const cover = dispatch(profilePhotoUpload(data,userData));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      data.append("upload_preset", "ogamtbe3");
      data.append("cloud_name","dxxgj5lfp")
      
      try {
        const cover = dispatch(coverPhotoUpload(data,userData));
        
      
      } catch (err) {
        console.log(err);
      }
    }
  
    dispatch(updateDetails(data, userData))
  
    // dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="InfoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder={data.firstName?data.firstName:"First Name"}
            name="firstName"
            className="InfoInput"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder={data.lastName?data.lastName:"Last Name"}
            name="lastName"
            className="InfoInput"
          />
        </div>

        <div>
          <input
            value={formData.worksAt?formData.worksAt:""}
            onChange={handleChange}
            type="text"
            placeholder={data.worksAt?data.worksAt:"Works at"}
            name="worksAt"
            className="InfoInput"
          />
        </div>

        <div>
          <input
            value={formData.livesIn?formData.livesIn:""}
            onChange={handleChange}
            type="text"
            placeholder={data.livesIn?data.livesIn:"Lives in"}
            name="livesIn"
            className="InfoInput"
          />
          <input
            value={formData.country?formData.country:""}
            onChange={handleChange}
            type="text"
            placeholder={data.country?data.country:"Country"}
            name="country"
            className="InfoInput"
          />
        </div>

        <div>
          <input
            value={formData.relationship?formData.relationship:""}
            onChange={handleChange}
            type="text"
            className="InfoInput"
            placeholder={data.relationship?data.relationship:"Relationship status"}
            name="relationship"
          />
        </div>

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;

import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";
import { Profile } from "../components/Profile";
import { UserInformation } from "../components/UserInformation";
import './Register.css';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker';
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
	  userInformation: UserInformation; 
};

const Register: React.FC<Props> = ({userInformation}) => {

  const profileForm = {
    name: "Navn Navnesen",
    age: 0,
    email: "navn.navnesen@email.com",
    phoneNumber: 0,
    linkedInUrl: "",
    imgUrl: "",
    education: "",
    descriptionTitle: "",
    description: "",
    isEmployer: false
  }
  
  const [isUserCreated, setIsUserCreated] = useState(false);

  const createProfile = () => {
    const profile = new Profile(
      profileForm.name, profileForm.age, profileForm.email, 
      profileForm.phoneNumber, profileForm.linkedInUrl, 
      profileForm.imgUrl, profileForm.education, 
      profileForm.descriptionTitle, profileForm.description, 
      profileForm.isEmployer
    );
    userInformation.setProfile(profile); 
    setIsUserCreated(true);
    console.log(userInformation.getProfile());

    //------ UPDATE TO DATABASE ------- //

    
    // -------------------------------- //
    
  } 
  
  const openLibrary = async () => {
    const imageResponse: string[] = [];
    const options = {
      outputType: 1
    } 
    await ImagePicker.getPictures(options).then(res => {
      for (var i = 0; i < res.length; i++) {
        imageResponse.push('data:image/jpeg;base64,' + res[i]);
      }
    });
    profileForm.imgUrl = imageResponse[0];
    console.log(profileForm.imgUrl);
  }

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          
        <IonList>
          <IonItemDivider>Personal Information</IonItemDivider>
          <IonItem>
            <IonInput disabled value={profileForm.name}></IonInput>
          </IonItem>

          
          <IonItem>
            <IonInput disabled value={profileForm.email}></IonInput>
          </IonItem>

          <IonItem>
            <IonInput onIonChange={e => profileForm.phoneNumber = parseInt(e.detail.value!)} placeholder={"cell phone number"}></IonInput>
          </IonItem>

          <IonItem>
            <IonSegment onIonChange={e => profileForm.isEmployer = (e.detail.value === "true")}>
              <IonSegmentButton value="false">
                <IonLabel>Job Seeker</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="true">
                <IonLabel>Employer</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>

          <IonItem>
            <IonInput onIonChange={e => profileForm.education = e.detail.value!} placeholder={"education / job title"}></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput onIonChange={e => profileForm.linkedInUrl = e.detail.value!} placeholder={"LinkedIn url"}></IonInput>
          </IonItem>

          <IonItemDivider>Application</IonItemDivider>
          <IonItem>
            <IonInput onIonChange={e => profileForm.descriptionTitle = e.detail.value!} placeholder={"application title"}></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea autoGrow onIonChange={e => profileForm.description = e.detail.value!} placeholder={"application description"}></IonTextarea>
          </IonItem>

          <IonItemDivider>Upload Image</IonItemDivider>

          <IonItem>

            <IonButton onClick={() => openLibrary()}>Upload Profile Image</IonButton>
          </IonItem>
          <IonItem>
          {isUserCreated ? (
            <IonButton href="/">Continue</IonButton>
          ) : (
            <IonButton onClick={() => createProfile()}>Create Profile</IonButton>
          )}
          </IonItem>
          <IonItem>
            <IonButton onClick={() => console.log(userInformation.getProfile())}>Check info</IonButton>
          </IonItem>
        </IonList>
      </IonContent>      
      
    </IonPage>
  );
};

export default Register;
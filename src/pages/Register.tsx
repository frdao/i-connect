import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTextarea, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { Profile } from "../components/Profile";
import { UserInformation } from "../components/UserInformation";
import './Register.css';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker';
import { AccountInfo } from "@azure/msal-browser";
import { Camera, CameraResultType } from '@capacitor/camera';
import { useState } from "react";

type Props = {
	  setUserInformation: (userInformation: UserInformation) =>  void;
    account: AccountInfo 
};

const Register: React.FC<Props> = ({setUserInformation, account}) => {

  const profileForm = {
    id: account.tenantId,
    name: account.name,
    age: 0,
    email: account.username,
    phoneNumber: 0,
    linkedInUrl: "",
    imgUrl: "",
    education: "",
    descriptionTitle: "",
    description: "",
    isEmployer: false
  }
  

  const createProfile = () => {
    const profile = new Profile(
      profileForm.name!, profileForm.age, profileForm.email, 
      profileForm.phoneNumber, profileForm.linkedInUrl, 
      profileForm.imgUrl, profileForm.education, 
      profileForm.descriptionTitle, profileForm.description, 
      profileForm.isEmployer
    );
    const userInformation = new UserInformation();
    userInformation.setProfile(profile);

    setUserInformation(userInformation);

    //------ UPLOAD IMAGE TO DATABASE ----- //
    
    // Remember to update the profileForm.imgUrl to this url.

    //------------------------------------- //

    //------ UPDATE TO DATABASE ------- //
    
    // -------------------------------- //
    
  } 

  const [imagePath, setImagePath] = useState<any>("");
  const takePicture = async() => {
    try {
      const cameraResult = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      })
  
      const path = cameraResult?.path || cameraResult?.webPath
      setImagePath(path);
      console.log(path);
      return true;
    } catch (e: any){
      console.log(e);
    }
    
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
          <IonThumbnail>
              <IonImg src={imagePath}/>
          </IonThumbnail>
          <IonItem>
            <IonButton onClick={takePicture}>Upload Profile Picture</IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => createProfile()}>Create Profile</IonButton>
          </IonItem>
        </IonList>
      </IonContent>      
      
    </IonPage>
  );
};

export default Register;
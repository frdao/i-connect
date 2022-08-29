import React, { useEffect, useRef } from "react";
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCardContent, IonItem, IonImg, IonIcon, IonLabel, IonButton,
    createGesture, Gesture, GestureConfig, IonInput, IonTextarea
} from '@ionic/react';
import { Profile } from "./Profile";

type Props = {
	profile: Profile; 
    editMode: boolean;
};

const ProfileCard: React.FC<Props> = ({profile, editMode}) => {

    const profileCard = useRef<HTMLDivElement | null>(null);
    let profileCardStyle:CSSStyleDeclaration;
    let profileCardBackgroundStyle:CSSStyleDeclaration;
    let profileCardHeaderStyle:CSSStyleDeclaration;
    useEffect(() => {

        if (profileCard.current) {
            profileCardStyle = profileCard.current.style;
            profileCardBackgroundStyle = document.getElementById("profileCardBackground")!.style;
            profileCardHeaderStyle = document.getElementById("profileCardHeader")!.style;
            profileCard.current!.style.backgroundColor = "white";
            profileCardStyle.backgroundColor = "transparent";
            profileCardHeaderStyle.height = "400px";
            profileCardHeaderStyle.backgroundImage = 'url( ' + profile.imgUrl + ' )';
            profileCardHeaderStyle.backgroundRepeat = "no-repeat";
            profileCardHeaderStyle.backgroundSize = "cover";
            profileCardBackgroundStyle.backgroundColor = "white";
        }
    });

    const expandText = () => {
        profileCardBackgroundStyle.transition = '0.3s ease-out';
        profileCardBackgroundStyle.height = profileCardBackgroundStyle.height == "90%" ? "65%" : "90%";
    }
    

    if(editMode){
        return (
            <div ref={profileCard} className="profileCard" onClick={expandText}>
             <IonCard id="profileCardBackground">
                <IonCardHeader id="profileCardHeader">
                  <IonCardTitle color="dark">{profile.name}</IonCardTitle>
                  <IonCardSubtitle color="dark">
                    <IonInput onIonChange={e => profile.education = e.detail.value!} value={profile.education}></IonInput>
                  </IonCardSubtitle>
                  <br />
                </IonCardHeader>
                <br />
                <IonCardContent className="ion-padding">
                <h1>
                  <IonInput onIonChange={e => profile.descriptionTitle = e.detail.value!} value={profile.descriptionTitle}></IonInput>
                </h1>
                <p color="dark">
                  <IonTextarea autoGrow onIonChange={e => profile.description = e.detail.value!} value={profile.description}></IonTextarea>
                </p>
                </IonCardContent>
            </IonCard>
            </div>
        );
    }
    else {
        return (
            <div ref={profileCard} className="profileCard" onClick={expandText}>
             <IonCard id="profileCardBackground">
                <IonCardHeader id="profileCardHeader">
                  <IonCardTitle color="dark">{profile.name}</IonCardTitle>
                  <IonCardSubtitle color="dark">{profile.education}</IonCardSubtitle>
                  <br />
                </IonCardHeader>
                <br />
                <IonCardContent className="ion-padding">
                <h1>{profile.descriptionTitle}</h1>
                <p color="dark">
                  {profile.description}
                </p>
                  
                </IonCardContent>
    
            </IonCard>
            </div>
        );
    }
    
}

export default ProfileCard;
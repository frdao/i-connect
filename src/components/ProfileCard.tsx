import React, { useEffect, useRef } from "react";
import {
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCardContent, IonInput, IonTextarea, IonItemDivider, IonIcon
} from '@ionic/react';
import { Profile } from "./Profile";
import { logoLinkedin } from "ionicons/icons";
import './ProfileCard.css';

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
                    <IonInput onIonChange={e => profile.email = e.detail.value!} value={profile.email}></IonInput>
                  </IonCardSubtitle>
                  <IonCardSubtitle color="dark">
                    <IonInput onIonChange={e => profile.education = e.detail.value!} value={profile.education}></IonInput>
                  </IonCardSubtitle>
                  <IonCardSubtitle color="dark">{profile.isEmployer ? "Employer" : "Job seeker"}</IonCardSubtitle>
                  <IonCardSubtitle color="dark">
                    <IonInput onIonChange={e => profile.phoneNumber = parseInt(e.detail.value!)} value={profile.phoneNumber.toString()}></IonInput>
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
                <IonItemDivider color="dark">
                  <IonInput onIonChange={e => profile.linkedInUrl = e.detail.value!} value={profile.linkedInUrl}></IonInput>
                </IonItemDivider>
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
                  <IonCardSubtitle color="dark">{profile.email}</IonCardSubtitle>
                  <IonCardSubtitle color="dark">{profile.education}</IonCardSubtitle>
                  <IonCardSubtitle color="dark">{profile.isEmployer ? "Employer" : "Job seeker"}</IonCardSubtitle>
                  <IonCardSubtitle color="dark">{profile.phoneNumber}</IonCardSubtitle>
                  <br />
                </IonCardHeader>
                <br />
                <IonCardContent className="ion-padding">
                <h1>{profile.descriptionTitle}</h1>
                <p color="dark">
                  {profile.description}
                </p>
                  
                </IonCardContent>
                <IonItemDivider color="dark">
                  <a href={profile.linkedInUrl}><IonIcon icon={logoLinkedin}></IonIcon></a>
                </IonItemDivider>
            </IonCard>
            </div>
        );
    }
    
}

export default ProfileCard;
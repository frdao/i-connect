import React, { useEffect, useRef } from "react";
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCardContent, IonItem, IonImg, IonIcon, IonLabel, IonButton,
    createGesture, Gesture, GestureConfig
} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './SwipeCard.css';
import { IonicReactExternalProps } from '@ionic/react/dist/types/components/utils';
import {Profile}  from "./Profile";

type Props = {
	profile: Profile; 
	SetNewProfile: () => void;
};

const Tab2: React.FC<Props> = ({profile, SetNewProfile}) => {

  const swipeCard = useRef<HTMLDivElement | null>(null);
  let swipeCardStyle:CSSStyleDeclaration;
  let swipeCardBackgroundStyle:CSSStyleDeclaration;
  let swipeCardHeaderStyle:CSSStyleDeclaration;

  useEffect(() => {
    if (swipeCard.current) {
      swipeCardStyle = swipeCard.current.style;
      const gesture = createGesture({
        el: swipeCard.current,
        gestureName: "onMove",
        onStart: detail => {
          onStart(detail);
        },
        onMove: detail => {
          onMove(detail);
        },
        onEnd: detail => {
          onEnd(detail);
        }
      });

      swipeCardBackgroundStyle = document.getElementById("swipeCardBackground")!.style;
      swipeCardHeaderStyle = document.getElementById("swipeCardHeader")!.style;

      swipeCard.current!.style.backgroundColor = "white";
      swipeCardStyle.backgroundColor = "transparent";
      swipeCardHeaderStyle.height = "400px";
      swipeCardHeaderStyle.backgroundImage = 'url( ' + profile.imgUrl + ' )';
      swipeCardHeaderStyle.backgroundRepeat = "no-repeat";
      swipeCardHeaderStyle.backgroundSize = "cover";
      swipeCardBackgroundStyle.backgroundColor = "white";
      gesture.enable();
    }
  }, []);

  const onStart = (detail: any) => {
    swipeCardStyle.transition = 'none';
  }

  const onMove = (detail: any) => {
    const deltaX = detail.deltaX;

    const colorChange = deltaX < 0 ? (deltaX / (-window.innerWidth / 2)): (deltaX / (window.innerWidth / 2)); 
  
    swipeCardBackgroundStyle.backgroundColor = "rgba(189, 195, 199, " + Math.max((1-colorChange), 0.2) + ")";

    

    swipeCardStyle.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;

  };

  const onEnd = (detail: any) => {
    swipeCardStyle.transition = '0.3s ease-out';
    if (detail.deltaX > window.innerWidth / 2) {
      swipeCardStyle.transform = `translateX(${window.innerWidth * 1.5}px)`;
      swipedRight();
      resetCard();
    } else if (detail.deltaX < -window.innerWidth / 2) {
      swipeCardStyle.transform = `translateX(-${window.innerWidth * 1.5}px)`;
      swipedLeft();
      resetCard(); 
    } else {
      swipeCardStyle.transform = '';
      swipeCardBackgroundStyle.transition = '0.3s ease-out';
      swipeCardBackgroundStyle.backgroundColor = "white";
    }
  }

  const swipedRight = () => {
    console.log("Approved");
    SetNewProfile();
  }

  const swipedLeft = () => {
    console.log("Denied");
    SetNewProfile();
  }

  const expandText = () => {
    swipeCardBackgroundStyle.transition = '0.3s ease-out';
    swipeCardBackgroundStyle.height = swipeCardBackgroundStyle.height == "90%" ? "65%" : "90%";
  }

  const resetCard = () => {
    swipeCardStyle.transition = 'none';
    swipeCardBackgroundStyle.transition = 'none';
    swipeCardStyle.transform = '';
    swipeCardBackgroundStyle.backgroundColor = "white";
  }

  return (
        <div ref={swipeCard} className="swipeCard" onClick={expandText}>
         <IonCard id="swipeCardBackground">
            <IonCardHeader id="swipeCardHeader">
              <IonCardTitle color="dark">{profile.name}</IonCardTitle>
              <IonCardSubtitle color="dark">{profile.education}</IonCardSubtitle>
              <br />
            </IonCardHeader>
            <br />
            <IonCardContent className="ion-padding">
            <h1>Hello!</h1>
            <p color="dark">
              {profile.description}
            </p>
              
            </IonCardContent>

        </IonCard>
        </div>
  );
};

export default Tab2;

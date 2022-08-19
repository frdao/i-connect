import React, { useEffect, useRef } from "react";
import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonCardContent, IonItem, IonImg, IonIcon, IonLabel, IonButton,
    createGesture, Gesture, GestureConfig
} from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { IonicReactExternalProps } from '@ionic/react/dist/types/components/utils';


const Tab2: React.FC = () => {

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
      swipeCardHeaderStyle.backgroundImage = 'url("data:image/jpeg;base64,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")';
      swipeCardHeaderStyle.backgroundRepeat = "no-repeat";
      swipeCardHeaderStyle.backgroundSize = "cover";
      gesture.enable();
    }
  }, []);

  const onStart = (detail: any) => {
    swipeCardStyle.transition = 'none';
  }

  const onMove = (detail: any) => {
    const deltaX = detail.deltaX;

    const colorChange = deltaX < 0 ? (deltaX / (-window.innerWidth / 2)): (deltaX / (window.innerWidth / 2)); 
  
    swipeCardBackgroundStyle.backgroundColor = "rgba(255, 255, 255, " + (1-colorChange) + ")";
    //swipeCardBackgroundStyle.backgroundColor = deltaX < 0 ? 'rgba(253, 177, 150, ' +  (colorChange) + ')' : deltaX == 0 ? 'white' : 'rgba(177, 217, 205, ' +  colorChange + ')' ; 

    

    swipeCardStyle.transform = `translateX(${detail.deltaX}px) rotate(${
      detail.deltaX / 20
    }deg)`;

  };

  const onEnd = (detail: any) => {
    swipeCardStyle.transition = '0.3s ease-out';
    if (detail.deltaX > window.innerWidth / 2) {
      swipeCardStyle.transform = `translateX(${window.innerWidth * 1.5}px)`;
      swipedRight();
    } else if (detail.deltaX < -window.innerWidth / 2) {
      swipeCardStyle.transform = `translateX(-${window.innerWidth * 1.5}px)`;
      swipedLeft();
    } else {
      swipeCardStyle.transform = '';
      swipeCardBackgroundStyle.backgroundColor = "white";
    }
  }

  const swipedRight = () => {
    console.log("Approved");
  }

  const swipedLeft = () => {
    console.log("Denied");
  }

  const expandText = () => {
    swipeCardBackgroundStyle.transition = '0.3s ease-out';
    swipeCardBackgroundStyle.height = swipeCardBackgroundStyle.height == "90%" ? "65%" : "90%";
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Swipe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div ref={swipeCard} className="swipeCard" onClick={expandText}>
         <IonCard id="swipeCardBackground">
            <IonCardHeader id="swipeCardHeader">
              {/* <IonImg src={image.src} /> */}
              <IonCardTitle color="dark">Francis Dao</IonCardTitle>
              <IonCardSubtitle color="dark">IT-Support</IonCardSubtitle>
              <br />
              {/* <IonImg src="data:image/jpeg;base64,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" /> */}
            </IonCardHeader>
            <br />
            <IonCardContent className="ion-padding">
            <h1>Hello!</h1>
            <p color="dark">I want a job. Please help me!
            I am very hard working, and I always do my best!  
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, b
            </p>
              
            </IonCardContent>

        </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

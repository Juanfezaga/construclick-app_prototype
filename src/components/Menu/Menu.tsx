import {
  IonMenu,
  IonIcon,
  IonContent,
  IonItem,
  IonImg,
} from "@ionic/react";
import {
  newspaperOutline,
  pricetagOutline,
  cartOutline,
  peopleOutline,
  closeOutline,
  calculator,
  buildOutline,
  bagAddOutline,
  bagOutline
} from "ionicons/icons";
import { AVATAR_IMAGE } from "../../config/constants";
import useCommons from "../../hooks/useCommons";
import useUser from "../../hooks/useUser";

import "./Menu.css";

const Menu = () => {
  const { professions } = useCommons();
  const { logout, profileUser } = useUser();
  return (
    <IonMenu side="start" contentId="main">
      <IonContent className="content_menu_side">
        <div className="cover_menu_profile">
          <IonImg
            className="cover_menu_profile_img"
            src="https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
          />
          <div className="cover_menu_gradient" />
          <div className="data_profile_menu_side">
            <img src={profileUser?.image_url? profileUser?.image_url : AVATAR_IMAGE} alt="profile" />
            <div className="data_text_profile_menu_side">
              <span className="data_text_profile_menu_side-name">
                {profileUser?.name} {profileUser?.last_name}
              </span>
              <span className="data_text_profile_menu_side-profession">
                {professions.find((profession) => profession._id === profileUser?.profession_id)?.name}
              </span>
            </div>
          </div>
        </div>
        <IonItem className="item_list_menu_side" routerLink="/posts">
          <IonIcon icon={newspaperOutline} color="white" slot="start" />
          Publicaciones
        </IonItem>
        <IonItem className="item_list_menu_side" routerLink="/marketplace">
          <IonIcon icon={pricetagOutline} color="white" slot="start" />
          MarketPlace
        </IonItem>
        <IonItem className="item_list_menu_side" routerLink="/shopping-cart">
          <IonIcon icon={cartOutline} color="white" slot="start" />
          Carrito
        </IonItem>
        <IonItem className="item_list_menu_side" routerLink="/calculator">
          <IonIcon icon={calculator} color="white" slot="start" />
          Calculadora
        </IonItem>
        <IonItem className="item_list_menu_side" routerLink="/gestion">
          <IonIcon icon={buildOutline} color="white" slot="start" />
          Gestion de obra
        </IonItem>
        <IonItem className="item_list_menu_side" routerLink="/profile">
          <IonIcon icon={peopleOutline} color="white" slot="start" />
          Perfil
        </IonItem>
        <IonItem className="item_list_menu_side" routerLink="/sell">
          <IonIcon icon={bagAddOutline} color="white" slot="start" />
          Vender
        </IonItem>
        <IonItem className="item_list_menu_side" routerLink="/purchases">
          <IonIcon icon={bagOutline} color="white" slot="start" />
          Mis compras
        </IonItem>
        <IonItem className="item_list_menu_side" onClick={() => logout()}>
          <IonIcon icon={closeOutline} color="white" slot="start" />
          Salir
        </IonItem>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

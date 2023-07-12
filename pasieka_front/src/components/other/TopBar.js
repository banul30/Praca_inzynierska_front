import React from "react";
import { useNavigate} from "react-router-dom";
import {logoutUserApiCall} from "../../api/userCalls";

const TopBar = () =>{

  const navigate = useNavigate();
  const logout = () =>{
    logoutUserApiCall().then((resp) => {
      localStorage.removeItem('jwtAccessToken');
      localStorage.removeItem('jwtRefreshToken');
      localStorage.removeItem('csrfToken');
      navigate('/');
    }).catch((reason => console.log(reason)));

  };

  return(
      <div className={'topBar'}>
        <div className={'topBarGrid'}>
          <div style={{textAlign:'left'}}>
            {(() => {
              if(  window.location.pathname !== '/pasieki'){
                return(
                    <span className={'back'}  onClick={() => navigate(-1)}>
                      <img src={'/img/back.png'} alt={'user icon'} className={'backIcon'}/>
                      <p>Wróć</p>
                    </span>
                );}
            })()}
          </div>
          <div>
          </div>
          <div>
            <span className={'account'} onClick={() => navigate('/account')}>
              <img src={'/img/userIcon.png'} alt={'user icon'} className={'userIcon'} />
              <p>Konto</p>
            </span>
            <span className={'logout'} onClick={logout}>
              <img src={'/img/logoutIcon.png'} alt={'logout icon'} className={'logoutIcon'}/>
              <p>Wyloguj</p>
            </span>
          </div>
        </div>
            <img src={'/img/logoTextIcon.png'} alt={'logo'} className={'logoText'} onClick={() => navigate('/pasieki')}/>

      </div>
  );
};

export default TopBar;
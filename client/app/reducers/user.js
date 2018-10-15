import Cookie from '../utils/cookie';
import { USER } from '../actions';


const defaultUserModel = {
  isAuthenticate: false,
  username: null,
  password: null,
  token: null,
  avatar: 'https://dummyimage.com/200x200/4d394b/fff'
};


function model(state = defaultUserModel, action) {
  switch (action.type) {
    case USER.CHECKTOKEN:
      const _cookie = Cookie.get('ca');
      let _cookieObj = {};

      if ( _cookie !== "" ) {
        _cookieObj = JSON.parse( _cookie );
      }

      if (
          typeof _cookieObj === 'object' &&
          _cookieObj.u && 
          _cookieObj.t
        ) {
          return Object.assign({}, state, {
            username: _cookieObj.u,
            token: _cookieObj.t,
            isAuthenticate: true
          });
      }


      return state;
    case USER.LOGIN:
      Cookie.set('ca', JSON.stringify({
        'u': action.token.username,
        't': action.token.token
      }), 6 );

      return Object.assign({}, state,{
        avatar: action.token.avatar,
        name: action.token.name,
        username: action.token.username,
        token: action.token.token,
        isAuthenticate: true
      });
    case USER.LOGOUT:
      //clear cookie
      Cookie.set('ca', '', 6);
      return Object.assign({}, state,{
        username: null,
        password: null,
        token: null,
        isAuthenticate: false
      });
    case USER.AVATAR:
      return Object.assign({}, state, {
        avatar: action.avatar
      });
    default:
      return state
  }
}

export default model;
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/common/Home";
import EmailForm from "./components/user/EmailForm";
import LoginForm from "./components/user/LoginForm";
import SignupForm from "./components/user/SignupForm";
import TermsModal from "./components/user/TermsModal";
import BookMarkPrint from "./components/feed/bookMark/BookMarkPrint";
import LikePrint from "./components/feed/like/LikePrint";
import Detail from "./components/feed/article/Detail";
import Mainfeed from "./components/feed/main/Mainfeed";
import Mainfeed2 from "./components/feed/main/MainFeed2";
import Mainfeed3 from "./components/feed/search/Mainfeed3";
import UserProfile from "./components/user/UserProfile";
import StoreProfile from "./components/store/StoreProfile";
import EditProfile from "./components/user/EditProfile";
//  searchtest용입니다. 테스트 끝나면 지울거임
import Search from './components/feed/article/Search'
import PopularSearch from './components/feed/search/PopularSearch'
import RecentSearch from './components/feed/search/RecentSearch'
import LocationSearch from './components/feed/search/KeywordSearch/LocationSearch'
import CafeSearch from './components/feed/search/KeywordSearch/CafeSearch'
import AccountSearch from './components/feed/search/AccountSearch/AccountSearch'
import GoogleRedirect from './components/user/GoogleRedirect'
import KakaoRedirect from './components/user/KakaoRedirect'
import CategorySearch from "./components/feed/search/CategorySearch/CategorySearch";

export default function Routers(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home user={props.user}  setFootershow={props.setFootershow}/>
      </Route>
      <Route path="/login">
        <LoginForm setUser={props.setUser} />
      </Route>
      <Route path="/email" component={EmailForm}></Route>
      <Route path="/signup/:email" component={SignupForm}>
        <SignupForm setUser={props.setUser} />
      </Route>
      <Route path="/EditProfile/:pk" component={EditProfile}>
        <EditProfile setUser={props.setUser} />
      </Route>
      <Route exact path="/feed">
        <Mainfeed setFootershow={props.setFootershow} user={props.user} />
      </Route>
      <Route exact path="/feed2">
        <Mainfeed2 setFootershow={props.setFootershow} user={props.user} />
      </Route>
      <Route exact path="/feed3">
        <Mainfeed3 setFootershow={props.setFootershow} user={props.user} />
      </Route>
      <Route path="/bookmark" component={BookMarkPrint}></Route>
      <Route path="/like" component={LikePrint}></Route>
      <Route path="/article/:pk">
        <Detail user={props.user} />
      </Route>
      <Route path="/profile/:id">
        <UserProfile user={props.user} setFootershow={props.setFootershow} />
      </Route>
      <Route path="/store/:pk/:id">
        <StoreProfile setFootershow={props.setFootershow} user={props.user} />
      </Route>
      <Route path="/termmodal" component={TermsModal}></Route>
      {/* searchtest용입니다. 테스트 끝나면 지울거임 */}
      <Route path="/search"><Mainfeed3 user={props.user} setFootershow={props.setFootershow}/></Route>
      <Route path="/popularsearch" component={PopularSearch}></Route>
      <Route path="/recentsearch" component={RecentSearch}></Route>
      <Route path="/locationsearch">
        <LocationSearch setFootershow={props.setFootershow} />
      </Route>
      <Route path="/cafesearch" component={CafeSearch}></Route>
      <Route path="/accountsearch" component={AccountSearch}></Route>
      <Route path="/oauth/callback/google" component={GoogleRedirect}><GoogleRedirect setUser={props.setUser} /></Route>
      <Route path="/oauth/callback/kakao" component={KakaoRedirect}><KakaoRedirect setUser={props.setUser}/></Route>
      <Route path="/categorysearch/:category"><CategorySearch user={props.user}/></Route>
    </Switch>
  );
}

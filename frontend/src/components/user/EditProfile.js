import React, { useState,useEffect,useRef } from "react";
import './css/SignupForm.css';
import {Col, Row} from 'react-bootstrap'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useParams} from 'react-router-dom';
import Profile from './Profile';
import EmailModal from './EmailModal';
import TermsModal from './TermsModal';
import LikeCategoryModal from './LikeCategoryModal';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditProfile({setUser}) {
    const [editPw, setEditPw] = useState(false);
    const [intro, setIntro] = useState('');
    const [userinfo, setUserinfo] = useState({})
    const categoryRef = useRef();

    useEffect(()=>{
        if(userinfo.introduction){
            let newform = {...form};
            newform.intro = userinfo.introduction
            setForm(newform)
        }

    },[userinfo])

  useEffect( () => {
    const onClickLogin = async () => {
        // console.log(localStorage.getItem('userNo'))
        let userNumber = localStorage.getItem('userNo')
        // const response = await axios.get(`http://i6c104.p.ssafy.io:8080/api/users/${userNumber}`,{
        //   userNo : localStorage.getItem('userNo')
        const response = await axios.get(`http://i6c104.p.ssafy.io:8080/api/users/${userNumber}`)
        if(categoryRef.current){
            // console.log(response.data.categoryList)
            categoryRef.current.setdefaultDetail(response.data.categoryList)}
        // console.log(response.data)
        setUserinfo(response.data)
        // console.log(userinfo)
        setIntro(response.data.introduction)
        setLikearr(response.data.categoryList)
        setTempArr(response.data.categoryList)
        setFileUrl(response.data.picture)
        // console.log(intro)
        
    };
      
    onClickLogin()


        // const editurl = `http://i6c104.p.ssafy.io:8080/api/users/${userNumber}`
        // axios ({
        //     method : "get",
        //     url : editurl
        // }).then(function(response){
        // console.log(response.data)
        // setIntro(response.data.introduction)
        // setUserinfo(response.data)
        // console.log(userinfo)
        // setLikearr(response.data.categoryList)


        },[]
        
        // const userId = response.data.userId
        // const userInstruction = response.data.introduction
        // const userPicture = response.data.picture
        // setFileUrl(userPicture)

        
        
        // const userCategory = response.data.category
        // history.push(`/EditProfile/${localStorage.getItem('userNo')}`)
      
//   }
  )
// },[]);


  let history = useHistory();
  
  const [ProfilemodalShow, ProfilesetModalShow] = React.useState(false);
  const [EmailmodalShow, EmailsetModalShow] = React.useState(false);
  const [TermsmodalShow, TermssetModalShow] = React.useState(false);
  const [LikeCategorymodalShow, LikeCategoryModalShow] = React.useState(false);
  const [likearr, setLikearr] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [temparr,setTempArr] = useState([]);
  // ???????????? ????????????
    // ????????? ????????????
  // const location = useLocation()
  // const email = location.state.email
  // console.log(email)
  const [IdCheck, setIdCheck] = useState(true)
  const [IdPwCheck, setIdPwCheck] = useState(true)
  let checkPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}$/;
  function CheckPass(str){
    var reg1 = /^[A-Za-z0-9-_.\/]{4,10}$/; 
    var reg2 = /[a-z]/g;    
    var reg3 = /[0-9]/g;
    var reg4 = /[-_.]/g;
    var reg5 = /[A-Z]/g;
    return(reg1.test(str) &&  (reg2.test(str) || reg3.test(str) ||  reg4.test(str) || reg5.test(str)));
};

  const [form, setForm] = useState({
    id: localStorage.getItem('userId'),
    intro: intro,
    password: '',
    repassword:''
  })

  // id paswword repassword??? ??????!
  const onChangeId = e => {  
  let newform = {...form}
  newform.id = e.target.value
  setForm(newform)
  // console.log(form)
  }
  const onChangePw = e => {  
  let newform = {...form}
  newform.password = e.target.value
  setForm(newform)
  if (checkPw.test(e.target.value)) {
    setIdPwCheck(true)
  }else{
    setIdPwCheck(false)
  }
  }
  const onChangeRePw = e => {  
  let newform = {...form}
  newform.repassword = e.target.value
  setForm(newform)
  }
  const onChangeIntro = e => {  
  let newform = {...form}
  newform.intro = e.target.value
  setForm(newform)
  }




  const [email,setEmail] = useState("");

  const emailparams = useParams();

  useEffect(()=>{
    setEmail(emailparams)
  },[])
  
  const EditingPw = async() => {
    const response = await axios.post('http://i6c104.p.ssafy.io:8080/api/users/updatePass',{
        email : localStorage.getItem('userEmail'),
        pass : form.password
    });
    // console.log(response.data)
    history.push("/")
  }

  const Editing = async() => {
    console.log(form.id)
    const response = await axios.get(`http://i6c104.p.ssafy.io:8080/api/users/checkUserId/${form.id}`,{
          //???????????? ?????? ????????? 
          userId : form.id
      });
    // console.log(form.id)
    // console.log(response.data)

    if (response.data === true || localStorage.getItem('userId') === form.id){
    let editForm = new FormData();
      {
      editForm.append("userDetailDto",new Blob([JSON.stringify({
        userNo : localStorage.getItem('userNo'),
        userId: form.id,
        categoryList : likearr,
        introduction : form.intro
      })], { type: "application/json"})
      )
    }
      editForm.append("multipartFile",file);
      const editurl = "http://i6c104.p.ssafy.io:8080/api/users/"
      axios ({
        method : "put",
        url : editurl,
        data : editForm,
        headers: { "Content-Type" : "multipart/form-data"}
    }).then(function(res){
      // console.log(res.data)
      if (res.data = "success")
        localStorage.setItem('userPic',fileUrl)
        localStorage.setItem('userId', form.id)
        // console.log('??????!')
        setUser([localStorage.getItem('userId'), localStorage.getItem('userNo')])
        history.push("/");
        
    })
    }else{alert('????????? ??????????????????.')}}
  // ???????????? ??????-> ?????????????????? ???????????? -> ????????????????????? ?????? ??????.
  // ????????? ????????????? ??????????????????, ?????? ?????????????????? ?????????????????? ???????????????
  

  



  const paperStyle = {
    padding: 20,
    
    width: 500,
    margin: "20px auto",
  }

  const avatarStyle = {
    background: "#1bbd7e",
  }

  const btnStyle = {
    margin: "8px, "
  }

  const Profileimage = {
    marginLeft: 155,
    marginBottom: 40,
    border: 1
  }
        return (
            <div>
            <Grid>
              <div id='signup_content'>
                <Paper elevation={10} style={paperStyle}>
                  <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Edit Profile</h2>
                    { localStorage.getItem('userEmail') ?
                    <div>
                    <Button onClick={()=> setEditPw(false)}>???????????? ??????</Button>
                    <Button onClick={()=> setEditPw(true)}>???????????? ??????</Button>
                    </div>
                    :
                      null
                    }

                  </Grid><br />
                  {!fileUrl ?
                  <div>
                    
                    <img style={Profileimage} src={process.env.PUBLIC_URL + "/image/Profileimage.png"} id="signup_profilePic" onClick={() => ProfilesetModalShow(true)}/>
                    <Profile
                      fileUrl = {fileUrl}
                      
                      setFileUrl = {setFileUrl}
                      file = {file}
                      setFile = {setFile}
                      show={ProfilemodalShow}
                      onHide={() => ProfilesetModalShow(false)}
                    />
                  </div>
                  :
                  <div>
                  <img style={Profileimage} id='profile_image' src={fileUrl} onClick={() => ProfilesetModalShow(true)}/>
                    <Profile
                        fileUrl = {fileUrl} 
                        setFileUrl = {setFileUrl}
                        file = {file}
                        setFile = {setFile}
                        show={ProfilemodalShow}
                        onHide={() => ProfilesetModalShow(false)}
                      />
                    </div>
                  
                  }
      

                { !editPw  ?
                <div>
                  <div id="singup_content">
                    <TextField label="Username" defaultValue={form.id} placeholder="???????????? ????????? ???????????????." onChange={onChangeId} type="text" fullWidth required />
                  </div>
                  <div id="singup_content">
                  <TextField label="Introduction" defaultValue={form.intro} onChange={onChangeIntro} placeholder='??????????????? ???????????????.' type="text" fullWidth required/>
                  </div>
                  <div style={{marginTop: "3%", marginBottom: "5%"}}>
                    <Row>
                      <Col>
                        {/* ??????????????? */}
                        <Button id="signup_cate" variant="secondary" size="sm" onClick={() => LikeCategoryModalShow(true)}>
                          ????????? ??????
                        </Button>
                        <LikeCategoryModal ref={categoryRef} likearr={likearr === [] ? temparr : likearr} 
                        setLikearr={setLikearr} show={LikeCategorymodalShow} onHide={() => LikeCategoryModalShow(false)}/>
                      </Col>
      
                      
                    </Row>
                  </div>
                  </div>
                  : 
                  <div>
                  <div id="singup_content">
                  <TextField label="Password" defaultValue='' onChange={onChangePw} placeholder='Enter password' type="password" fullWidth required />
                  </div>
                  <div id="singup_content">
                  <TextField label="Re-Password"   onChange={onChangeRePw} placeholder='Enter password' type="password" fullWidth required />
                  </div>
                  <div style={{marginTop: "3%", marginBottom: "5%"}}>
                    <Row>
                      <Col>
                        {/* ??????????????? */}
                        <Button id="signup_cate2" variant="secondary" size="sm" onClick={() => LikeCategoryModalShow(true)}>
                          
                        </Button>
                        <LikeCategoryModal ref={categoryRef} likearr={likearr === [] ? temparr : likearr} 
                        setLikearr={setLikearr} show={LikeCategorymodalShow} onHide={() => LikeCategoryModalShow(false)}/>
                      </Col>
      
                      
                    </Row>
                  </div>
                  </div>
                } 
                  
                  
                  
      
                  {/* ???????????? ?????? ?????? */}
                  { !editPw ?
                  <Button type="submit" color="primary" onClick={Editing} variant='contained' style={btnStyle} fullWidth>Edit</Button>
                  : (form.password === form.repassword && form.password && form.repassword && IdPwCheck) ?
                    <div>
                    <Button type="submit" color="primary" onClick={EditingPw} variant='contained' style={btnStyle} fullWidth>Edit</Button>
                    <br />
                    <br />
                    </div>
                    : 
                    <div>
                      <a style={{fontSize : 'small'}}>??????????????? ??????+??????+??????????????? ???????????? 8~16????????? ???????????????.</a>
                    <Button type="submit" color="primary" onClick={EditingPw} variant='contained' style={btnStyle} fullWidth disabled>Edit</Button>
                    <br />
                    <br />
                    </div>
}
                  
                  
                
  
      
                  
                  
                </Paper>
              </div>
            </Grid>
          </div>
        )
    }





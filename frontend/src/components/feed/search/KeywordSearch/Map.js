/*global kakao*/ 
import axios from 'axios';
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import "./css/Map.css";
import { useHistory } from 'react-router-dom';
const Map = forwardRef((props,ref)=>{

  const [markerdata,setMarkerdata] = useState([]);

  const history = useHistory();

  const [cafeId,setCafeId] = useState(null);

  useEffect(()=>{
    if(cafeId==null){

    }else{
      history.push({
        pathname:`/store/${cafeId[0]}/${cafeId[1]}`,
        state:{name:cafeId[2]}
      })
      document.location.reload();
    }
  },[cafeId])


  useImperativeHandle(ref,()=>({
    setMarkerdata,
  }))

  useEffect(()=>{
    var mapContainer = document.getElementById('map')
    var mapOption = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3 // 지도의 확대 레벨
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);
  },[])

  useEffect(()=>{
    if(markerdata.length>0){
      // console.log(markerdata)

      var mapContainer = document.getElementById('map')

      while(mapContainer.hasChildNodes()){
        mapContainer.removeChild(mapContainer.firstChild);
      }
      
      var mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5 // 지도의 확대 레벨
      };
      var map = new kakao.maps.Map(mapContainer, mapOption);

      var imageSrc = `${process.env.PUBLIC_URL}/image/marker.png`; 

      var bounds = new kakao.maps.LatLngBounds();
      
      let newinfoarr = new Array(markerdata.length);
      for (let i = 0; i < markerdata.length; i++) {
        var imageSize = new kakao.maps.Size(24, 35); 

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
          map:map,
          title: markerdata[i].place_name,
          position:new kakao.maps.LatLng(markerdata[i].y, markerdata[i].x),
          image:markerImage
        })

        var content = `
        <div id='mape_modal'>
          <h6 id='map_modal_cafename'>${markerdata[i].place_name}</h6>
          <p id='map_modal_content'>${markerdata[i].address_name}</p>
          <p id='map_modal_content'>${markerdata[i].phone}</p>
          <p id='map_modal_content ${markerdata[i].id}'>검색</p>
        </div>
        `
        var infowindow = new kakao.maps.InfoWindow({
          content : content,
          removable : true,
        });

        newinfoarr[i] = [marker,infowindow]

        bounds.extend(new kakao.maps.LatLng(markerdata[i].y, markerdata[i].x))
      }
      for (let i = 0; i < newinfoarr.length; i++) {
        kakao.maps.event.addListener(newinfoarr[i][0],'click',function(){
          newinfoarr[i][1].open(map,newinfoarr[i][0])
          props.setSelected(i)
          const searchtag = document.getElementById(`map_modal_content ${markerdata[i].id}`);
          const id = Number(document.getElementById(`map_modal_content ${markerdata[i].id}`).id.split(' ')[1]);
          searchtag.addEventListener("click",()=>{
            //여기서부터 해야함 ㅇㅋ?
            const url = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIyMDEyNzE0MTY1MTExMjE4Nzg=
            &keyword=${markerdata[i].address_name}&resultType=json`
            let rnMgtSn = "" //도로명코드
            let admCd = "" //행정구역코드
            let buldMnnm = 0 //건물본번
            let buldSlno = 0 //건물부번
            axios.get(url).then(res=>{
            rnMgtSn = res.data.results.juso[0].rnMgtSn
            admCd = res.data.results.juso[0].admCd
            buldMnnm = res.data.results.juso[0].buldMnnm
            buldSlno = res.data.results.juso[0].buldSlno
            const url2 = `https://www.juso.go.kr/addrlink/addrCoordApi.do?confmKey=devU01TX0FVVEgyMDIyMDEyNzE2MzYwNjExMjE4ODk=&rnMgtSn=${rnMgtSn}&admCd=${admCd}&buldMnnm=${buldMnnm}&buldSlno=${buldSlno}&resultType=json&udrtYn=0`
            axios.get(url2).then(res=>{
                let beforex = res.data.results.juso[0].entX;
                let beforey = res.data.results.juso[0].entY;
                const url3 = `http://i6c104.p.ssafy.io:8080/cafe`
                axios.get(url3,{
                  params:{
                    cafeX:Number(beforex),
                    cafeY:Number(beforey)
                  }
                }).then(res=>{
                  if(res.data=="empty"){
                    alert('카페등록x')
                  }else{
                    setCafeId([res.data,id,markerdata[i].place_name])
                  }
                })
            })
            })
          })

          for (let j = 0; j < newinfoarr.length; j++) {
            if(i!==j){
              newinfoarr[j][1].close(map,newinfoarr[j][0])
            }
          }

        })
      }
      map.setBounds(bounds)
    }
  },[markerdata])




    return (
        <div id='mapContainer'>
        	<div id="map" style={{width:"100%", height:"550px"}}></div> 
        </div>
    )
})

export default Map;

import o from"./index.DTBlZltY.js";import{_ as t,c,o as n}from"./framework.BLxSbdXe.js";const p={BASE_URL:"/cropperjs/v2/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},{BASE_URL:s}=p,a={name:"CropperExample",data(){return{src:`${s}picture.jpg`}},mounted(){const e=new Image;e.src=this.src,e.alt="Picture";const r=new o(e,{container:".cropper-container"});console.log(r)}},_={class:"cropper-container"};function i(e,r,m,l,d,u){return n(),c("div",_)}const v=t(a,[["render",i],["__scopeId","data-v-a6b95e1c"]]);export{v as default};
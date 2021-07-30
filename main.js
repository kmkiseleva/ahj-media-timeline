(()=>{"use strict";const t=document.getElementById("main");new class{constructor(t){this.container=t}init(){this.registerEvents()}registerEvents(){document.querySelector(".footer__input").addEventListener("keydown",(t=>{13===t.keyCode&&this.createPost(t)}));document.querySelector(".form__input").addEventListener("keydown",(t=>{13===t.keyCode&&(t.preventDefault(),this.createPostWithManualCoords(t))}))}markupPost(t,e,o){return`\n    <div class="tweets__post">\n    <div class="post__header">${t}</div>\n    <div class="post__body">\n      <div class="post__text">${e}</div>\n    </div>\n    <div class="post__coordinates"><span class="post__icon"></span>${o}</div>\n    </div>\n    `}async createPost(t){const e=(new Date).toLocaleString(),o=t.target.value,n=await this.coordinates(),s=document.querySelector(".modal");let r="",a="",i="";if(n){a=n.coords.latitude.toFixed(5),i=n.coords.longitude.toFixed(5),r=`${a}, ${i}`;const s=this.markupPost(e,o,r);document.querySelector(".tweets__content").insertAdjacentHTML("afterbegin",s),t.target.value=""}else s.classList.remove("hidden")}createPostWithManualCoords(t){const e=document.querySelector(".footer__input"),o=document.querySelector(".modal"),n=(new Date).toLocaleString();if(this.validateCoordinates(t.target.value)){const s=this.markupPost(n,e.value,t.target.value);document.querySelector(".tweets__content").insertAdjacentHTML("afterbegin",s),o.classList.add("hidden"),t.target.value="",e.value=""}else alert("Enter the coordinates of the following type: 00.00000, 0.00000")}async coordinates(){try{return await this.getGeolocation()}catch(t){return null}}getGeolocation(){return new Promise(((t,e)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition((e=>t(e)),(t=>e(t))):e(new Error("Your browser doesn't support Geolocation"))}))}validateCoordinates(t){return/^\[?([-+]?\d{1,2}[.]\d+),\s*([-+]?\d{1,3}[.]\d+)\]?$/gm.test(t)}}(t).init()})();
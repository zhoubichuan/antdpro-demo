(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[5362],{64335:function(le,w,n){"use strict";var T=n(67294),z=(0,T.createContext)({});w.Z=z},85224:function(le,w,n){"use strict";var T=n(28991),z=n(84305),P=n(39559),M=n(81253),U=n(85893),Q=n(94184),Z=n.n(Q),G=n(97435),I=n(67294),R=n(64335),N=n(56264),F=n.n(N),ee=["children","className","extra","style","renderContent"],l=function(S){var $=S.children,X=S.className,Y=S.extra,ne=S.style,V=S.renderContent,oe=(0,M.Z)(S,ee),ue=(0,I.useContext)(P.ZP.ConfigContext),ve=ue.getPrefixCls,k=S.prefixCls||ve("pro"),me="".concat(k,"-footer-bar"),p=(0,I.useContext)(R.Z),se=(0,I.useMemo)(function(){var te=p.hasSiderMenu,q=p.isMobile,re=p.siderWidth;if(!!te)return re?q?"100%":"calc(100% - ".concat(re,"px)"):"100%"},[p.collapsed,p.hasSiderMenu,p.isMobile,p.siderWidth]),de=(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("div",{className:"".concat(me,"-left"),children:Y}),(0,U.jsx)("div",{className:"".concat(me,"-right"),children:$})]});return(0,I.useEffect)(function(){return!p||!(p==null?void 0:p.setHasFooterToolbar)?function(){}:(p==null||p.setHasFooterToolbar(!0),function(){var te;p==null||(te=p.setHasFooterToolbar)===null||te===void 0||te.call(p,!1)})},[]),(0,U.jsx)("div",(0,T.Z)((0,T.Z)({className:Z()(X,"".concat(me)),style:(0,T.Z)({width:se},ne)},(0,G.Z)(oe,["prefixCls"])),{},{children:V?V((0,T.Z)((0,T.Z)((0,T.Z)({},S),p),{},{leftWidth:se}),de):de}))};w.Z=l},21349:function(le,w,n){"use strict";var T=n(84305),z=n(39559),P=n(85893),M=n(94184),U=n.n(M),Q=n(67294),Z=n(64335),G=n(53645),I=n.n(G),R=function(F){var ee=(0,Q.useContext)(Z.Z),l=F.children,A=F.contentWidth,S=F.className,$=F.style,X=(0,Q.useContext)(z.ZP.ConfigContext),Y=X.getPrefixCls,ne=F.prefixCls||Y("pro"),V=A||ee.contentWidth,oe="".concat(ne,"-grid-content");return(0,P.jsx)("div",{className:U()(oe,S,{wide:V==="Fixed"}),style:$,children:(0,P.jsx)("div",{className:"".concat(ne,"-grid-content-children"),children:l})})};w.Z=R},75362:function(le,w,n){"use strict";n.d(w,{ZP:function(){return Dt}});var T=n(38663),z=n(70883),P=n(22122),M=n(96156),U=n(6610),Q=n(5991),Z=n(10379),G=n(60446),I=n(90484),R=n(94184),N=n.n(R),F=n(48717),ee=n(98423),l=n(67294),A=n(53124),S=n(85061),$=n(75164);function X(o){var e,r=function(i){return function(){e=null,o.apply(void 0,(0,S.Z)(i))}},t=function(){if(e==null){for(var i=arguments.length,s=new Array(i),d=0;d<i;d++)s[d]=arguments[d];e=(0,$.Z)(r(s))}};return t.cancel=function(){$.Z.cancel(e),e=null},t}function Y(){return function(e,r,t){var a=t.value,i=!1;return{configurable:!0,get:function(){if(i||this===e.prototype||this.hasOwnProperty(r))return a;var d=X(a.bind(this));return i=!0,Object.defineProperty(this,r,{value:d,configurable:!0,writable:!0}),i=!1,d}}}}var ne=n(64019);function V(o){return o!==window?o.getBoundingClientRect():{top:0,bottom:window.innerHeight}}function oe(o,e,r){if(r!==void 0&&e.top>o.top-r)return r+e.top}function ue(o,e,r){if(r!==void 0&&e.bottom<o.bottom+r){var t=window.innerHeight-e.bottom;return r+t}}var ve=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],k=[];function me(){return k}function p(o,e){if(!!o){var r=k.find(function(t){return t.target===o});r?r.affixList.push(e):(r={target:o,affixList:[e],eventHandlers:{}},k.push(r),ve.forEach(function(t){r.eventHandlers[t]=(0,ne.Z)(o,t,function(){r.affixList.forEach(function(a){a.lazyUpdatePosition()})})}))}}function se(o){var e=k.find(function(r){var t=r.affixList.some(function(a){return a===o});return t&&(r.affixList=r.affixList.filter(function(a){return a!==o})),t});e&&e.affixList.length===0&&(k=k.filter(function(r){return r!==e}),ve.forEach(function(r){var t=e.eventHandlers[r];t&&t.remove&&t.remove()}))}var de=function(o,e,r,t){var a=arguments.length,i=a<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,r):t,s;if((typeof Reflect=="undefined"?"undefined":(0,I.Z)(Reflect))==="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(o,e,r,t);else for(var d=o.length-1;d>=0;d--)(s=o[d])&&(i=(a<3?s(i):a>3?s(e,r,i):s(e,r))||i);return a>3&&i&&Object.defineProperty(e,r,i),i};function te(){return typeof window!="undefined"?window:null}var q;(function(o){o[o.None=0]="None",o[o.Prepare=1]="Prepare"})(q||(q={}));var re=function(o){(0,Z.Z)(r,o);var e=(0,G.Z)(r);function r(){var t;return(0,U.Z)(this,r),t=e.apply(this,arguments),t.state={status:q.None,lastAffix:!1,prevTarget:null},t.getOffsetTop=function(){var a=t.props,i=a.offsetBottom,s=a.offsetTop;return i===void 0&&s===void 0?0:s},t.getOffsetBottom=function(){return t.props.offsetBottom},t.savePlaceholderNode=function(a){t.placeholderNode=a},t.saveFixedNode=function(a){t.fixedNode=a},t.measure=function(){var a=t.state,i=a.status,s=a.lastAffix,d=t.props.onChange,u=t.getTargetFunc();if(!(i!==q.Prepare||!t.fixedNode||!t.placeholderNode||!u)){var v=t.getOffsetTop(),h=t.getOffsetBottom(),x=u();if(!!x){var c={status:q.None},b=V(x),f=V(t.placeholderNode),E=oe(f,b,v),O=ue(f,b,h);f.top===0&&f.left===0&&f.width===0&&f.height===0||(E!==void 0?(c.affixStyle={position:"fixed",top:E,width:f.width,height:f.height},c.placeholderStyle={width:f.width,height:f.height}):O!==void 0&&(c.affixStyle={position:"fixed",bottom:O,width:f.width,height:f.height},c.placeholderStyle={width:f.width,height:f.height}),c.lastAffix=!!c.affixStyle,d&&s!==c.lastAffix&&d(c.lastAffix),t.setState(c))}}},t.prepareMeasure=function(){if(t.setState({status:q.Prepare,affixStyle:void 0,placeholderStyle:void 0}),!1)var a},t}return(0,Q.Z)(r,[{key:"getTargetFunc",value:function(){var a=this.context.getTargetContainer,i=this.props.target;return i!==void 0?i:a!=null?a:te}},{key:"componentDidMount",value:function(){var a=this,i=this.getTargetFunc();i&&(this.timeout=setTimeout(function(){p(i(),a),a.updatePosition()}))}},{key:"componentDidUpdate",value:function(a){var i=this.state.prevTarget,s=this.getTargetFunc(),d=(s==null?void 0:s())||null;i!==d&&(se(this),d&&(p(d,this),this.updatePosition()),this.setState({prevTarget:d})),(a.offsetTop!==this.props.offsetTop||a.offsetBottom!==this.props.offsetBottom)&&this.updatePosition(),this.measure()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout),se(this),this.updatePosition.cancel(),this.lazyUpdatePosition.cancel()}},{key:"updatePosition",value:function(){this.prepareMeasure()}},{key:"lazyUpdatePosition",value:function(){var a=this.getTargetFunc(),i=this.state.affixStyle;if(a&&i){var s=this.getOffsetTop(),d=this.getOffsetBottom(),u=a();if(u&&this.placeholderNode){var v=V(u),h=V(this.placeholderNode),x=oe(h,v,s),c=ue(h,v,d);if(x!==void 0&&i.top===x||c!==void 0&&i.bottom===c)return}}this.prepareMeasure()}},{key:"render",value:function(){var a=this,i=this.state,s=i.affixStyle,d=i.placeholderStyle,u=this.props,v=u.affixPrefixCls,h=u.children,x=N()((0,M.Z)({},v,!!s)),c=(0,ee.Z)(this.props,["prefixCls","offsetTop","offsetBottom","target","onChange","affixPrefixCls"]);return l.createElement(F.Z,{onResize:function(){a.updatePosition()}},l.createElement("div",(0,P.Z)({},c,{ref:this.savePlaceholderNode}),s&&l.createElement("div",{style:d,"aria-hidden":"true"}),l.createElement("div",{className:x,ref:this.saveFixedNode,style:s},l.createElement(F.Z,{onResize:function(){a.updatePosition()}},h))))}}]),r}(l.Component);re.contextType=A.E_,de([Y()],re.prototype,"updatePosition",null),de([Y()],re.prototype,"lazyUpdatePosition",null);var We=l.forwardRef(function(o,e){var r=o.prefixCls,t=l.useContext(A.E_),a=t.getPrefixCls,i=a("affix",r),s=(0,P.Z)((0,P.Z)({},o),{affixPrefixCls:i});return l.createElement(re,(0,P.Z)({},s,{ref:e}))}),Fe=We,_t=n(84305),xe=n(39559),Xt=n(59903),Yt=n(94233),Vt=n(81262),Jt=n(59250),Qt=n(30887),kt=n(49111),Ce=n(28481),m=n(28991),He={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"},Ke=He,Pe=n(27029),ye=function(e,r){return l.createElement(Pe.Z,(0,m.Z)((0,m.Z)({},e),{},{ref:r,icon:Ke}))};ye.displayName="ArrowLeftOutlined";var we=l.forwardRef(ye),ze={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"},$e=ze,be=function(e,r){return l.createElement(Pe.Z,(0,m.Z)((0,m.Z)({},e),{},{ref:r,icon:$e}))};be.displayName="ArrowRightOutlined";var Ge=l.forwardRef(be),_e=n(30470),Xe=n(51890),Ye=n(50344),Ve=n(28682),Je=n(96159),Qe=n(57254),ke=n(81555),qe=function(o,e){var r={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(r[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(o);a<t.length;a++)e.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(o,t[a])&&(r[t[a]]=o[t[a]]);return r},Ee=function(e){var r=e.prefixCls,t=e.separator,a=t===void 0?"/":t,i=e.children,s=e.menu,d=e.overlay,u=e.dropdownProps,v=qe(e,["prefixCls","separator","children","menu","overlay","dropdownProps"]),h=l.useContext(A.E_),x=h.getPrefixCls,c=x("breadcrumb",r),b=function(O){if(s||d){var g=(0,P.Z)({},u);return"overlay"in e&&(g.overlay=d),l.createElement(ke.Z,(0,P.Z)({menu:s,placement:"bottom"},g),l.createElement("span",{className:"".concat(c,"-overlay-link")},O,l.createElement(Qe.Z,null)))}return O},f;return"href"in v?f=l.createElement("a",(0,P.Z)({className:"".concat(c,"-link")},v),i):f=l.createElement("span",(0,P.Z)({className:"".concat(c,"-link")},v),i),f=b(f),i!=null?l.createElement("li",null,f,a&&l.createElement("span",{className:"".concat(c,"-separator")},a)):null};Ee.__ANT_BREADCRUMB_ITEM=!0;var pe=Ee,Oe=function(e){var r=e.children,t=l.useContext(A.E_),a=t.getPrefixCls,i=a("breadcrumb");return l.createElement("span",{className:"".concat(i,"-separator")},r||"/")};Oe.__ANT_BREADCRUMB_SEPARATOR=!0;var et=Oe,tt=function(o,e){var r={};for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&e.indexOf(t)<0&&(r[t]=o[t]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(o);a<t.length;a++)e.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(o,t[a])&&(r[t[a]]=o[t[a]]);return r};function rt(o,e){if(!o.breadcrumbName)return null;var r=Object.keys(e).join("|"),t=o.breadcrumbName.replace(new RegExp(":(".concat(r,")"),"g"),function(a,i){return e[i]||a});return t}function at(o,e,r,t){var a=r.indexOf(o)===r.length-1,i=rt(o,e);return a?l.createElement("span",null,i):l.createElement("a",{href:"#/".concat(t.join("/"))},i)}var Ze=function(e,r){return e=(e||"").replace(/^\//,""),Object.keys(r).forEach(function(t){e=e.replace(":".concat(t),r[t])}),e},nt=function(e,r,t){var a=(0,S.Z)(e),i=Ze(r||"",t);return i&&a.push(i),a},he=function(e){var r=e.prefixCls,t=e.separator,a=t===void 0?"/":t,i=e.style,s=e.className,d=e.routes,u=e.children,v=e.itemRender,h=v===void 0?at:v,x=e.params,c=x===void 0?{}:x,b=tt(e,["prefixCls","separator","style","className","routes","children","itemRender","params"]),f=l.useContext(A.E_),E=f.getPrefixCls,O=f.direction,g,B=E("breadcrumb",r);if(d&&d.length>0){var D=[];g=d.map(function(C){var H=Ze(C.path,c);H&&D.push(H);var W;C.children&&C.children.length&&(W=l.createElement(Ve.Z,{items:C.children.map(function(K){return{key:K.path||K.breadcrumbName,label:h(K,c,d,nt(D,K.path,c))}})}));var _={separator:a};return W&&(_.overlay=W),l.createElement(pe,(0,P.Z)({},_,{key:H||C.breadcrumbName}),h(C,c,d,D))})}else u&&(g=(0,Ye.Z)(u).map(function(C,H){return C&&(0,Je.Tm)(C,{separator:a,key:H})}));var j=N()(B,(0,M.Z)({},"".concat(B,"-rtl"),O==="rtl"),s);return l.createElement("nav",(0,P.Z)({className:j,style:i},b),l.createElement("ol",null,g))};he.Item=pe,he.Separator=et;var ot=he,it=ot,lt=n(42051),st=n(19650),dt=n(34952),ct=function(e,r,t){return!r||!t?null:l.createElement(lt.Z,{componentName:"PageHeader"},function(a){return l.createElement("div",{className:"".concat(e,"-back")},l.createElement(dt.Z,{onClick:function(s){t==null||t(s)},className:"".concat(e,"-back-button"),"aria-label":a.back},r))})},ft=function(e){return l.createElement(it,(0,P.Z)({},e))},ut=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"ltr";return e.backIcon!==void 0?e.backIcon:r==="rtl"?l.createElement(Ge,null):l.createElement(we,null)},vt=function(e,r){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"ltr",a=r.title,i=r.avatar,s=r.subTitle,d=r.tags,u=r.extra,v=r.onBack,h="".concat(e,"-heading"),x=a||s||d||u;if(!x)return null;var c=ut(r,t),b=ct(e,c,v),f=b||i||x;return l.createElement("div",{className:h},f&&l.createElement("div",{className:"".concat(h,"-left")},b,i&&l.createElement(Xe.C,(0,P.Z)({},i)),a&&l.createElement("span",{className:"".concat(h,"-title"),title:typeof a=="string"?a:void 0},a),s&&l.createElement("span",{className:"".concat(h,"-sub-title"),title:typeof s=="string"?s:void 0},s),d&&l.createElement("span",{className:"".concat(h,"-tags")},d)),u&&l.createElement("span",{className:"".concat(h,"-extra")},l.createElement(st.Z,null,u)))},mt=function(e,r){return r?l.createElement("div",{className:"".concat(e,"-footer")},r):null},ht=function(e,r){return l.createElement("div",{className:"".concat(e,"-content")},r)},gt=function(e){var r=(0,_e.Z)(!1),t=(0,Ce.Z)(r,2),a=t[0],i=t[1],s=function(u){var v=u.width;i(v<768,!0)};return l.createElement(A.C,null,function(d){var u,v=d.getPrefixCls,h=d.pageHeader,x=d.direction,c,b=e.prefixCls,f=e.style,E=e.footer,O=e.children,g=e.breadcrumb,B=e.breadcrumbRender,D=e.className,j=!0;"ghost"in e?j=e.ghost:h&&"ghost"in h&&(j=h.ghost);var C=v("page-header",b),H=function(){return(g==null?void 0:g.routes)?ft(g):null},W=H(),_=g&&"props"in g,K=(c=B==null?void 0:B(e,W))!==null&&c!==void 0?c:W,L=_?g:K,ie=N()(C,D,(u={"has-breadcrumb":!!L,"has-footer":!!E},(0,M.Z)(u,"".concat(C,"-ghost"),j),(0,M.Z)(u,"".concat(C,"-rtl"),x==="rtl"),(0,M.Z)(u,"".concat(C,"-compact"),a),u));return l.createElement(F.Z,{onResize:s},l.createElement("div",{className:ie,style:f},L,vt(C,e,x),O&&ht(C,O),mt(C,E)))})},xt=gt,Re=n(81253),qt=n(18106),Ne=n(95562),y=n(85893),Te=n(64335),Ct=n(85224),Pt=n(21349),yt=n(83832),bt=function(e){if(!e)return 1;var r=e.backingStorePixelRatio||e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return(window.devicePixelRatio||1)/r},Et=function(e){var r=e.children,t=e.style,a=e.className,i=e.markStyle,s=e.markClassName,d=e.zIndex,u=d===void 0?9:d,v=e.gapX,h=v===void 0?212:v,x=e.gapY,c=x===void 0?222:x,b=e.width,f=b===void 0?120:b,E=e.height,O=E===void 0?64:E,g=e.rotate,B=g===void 0?-22:g,D=e.image,j=e.content,C=e.offsetLeft,H=e.offsetTop,W=e.fontStyle,_=W===void 0?"normal":W,K=e.fontWeight,L=K===void 0?"normal":K,ie=e.fontColor,ge=ie===void 0?"rgba(0,0,0,.15)":ie,Me=e.fontSize,Be=Me===void 0?16:Me,De=e.fontFamily,Ae=De===void 0?"sans-serif":De,At=e.prefixCls,St=(0,l.useContext)(xe.ZP.ConfigContext),jt=St.getPrefixCls,Se=jt("pro-layout-watermark",At),Lt=N()("".concat(Se,"-wrapper"),a),It=N()(Se,s),Ut=(0,l.useState)(""),je=(0,Ce.Z)(Ut,2),Le=je[0],Ie=je[1];return(0,l.useEffect)(function(){var ce=document.createElement("canvas"),J=ce.getContext("2d"),ae=bt(J),Wt="".concat((h+f)*ae,"px"),Ft="".concat((c+O)*ae,"px"),Ht=C||h/2,Kt=H||c/2;if(ce.setAttribute("width",Wt),ce.setAttribute("height",Ft),J){J.translate(Ht*ae,Kt*ae),J.rotate(Math.PI/180*Number(B));var wt=f*ae,Ue=O*ae;if(D){var fe=new Image;fe.crossOrigin="anonymous",fe.referrerPolicy="no-referrer",fe.src=D,fe.onload=function(){J.drawImage(fe,0,0,wt,Ue),Ie(ce.toDataURL())}}else if(j){var zt=Number(Be)*ae;J.font="".concat(_," normal ").concat(L," ").concat(zt,"px/").concat(Ue,"px ").concat(Ae),J.fillStyle=ge,Array.isArray(j)?j==null||j.forEach(function($t,Gt){return J.fillText($t,0,Gt*50)}):J.fillText(j,0,0),Ie(ce.toDataURL())}}else console.error("\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301Canvas")},[h,c,C,H,B,_,L,f,O,Ae,ge,D,j,Be]),(0,y.jsxs)("div",{style:(0,m.Z)({position:"relative"},t),className:Lt,children:[r,(0,y.jsx)("div",{className:It,style:(0,m.Z)((0,m.Z)({zIndex:u,position:"absolute",left:0,top:0,width:"100%",height:"100%",backgroundSize:"".concat(h+f,"px"),pointerEvents:"none",backgroundRepeat:"repeat"},Le?{backgroundImage:"url('".concat(Le,"')")}:null),i)})]})},pt=Et,er=n(12395),Ot=["title","content","pageHeaderRender","header","prefixedClassName","extraContent","style","prefixCls","breadcrumbRender"],Zt=["children","loading","className","style","footer","affixProps","ghost","fixedHeader","breadcrumbRender"];function Rt(o){return(0,I.Z)(o)==="object"?o:{spinning:o}}var Nt=function(e){var r=e.tabList,t=e.tabActiveKey,a=e.onTabChange,i=e.tabBarExtraContent,s=e.tabProps,d=e.prefixedClassName;return Array.isArray(r)||i?(0,y.jsx)(Ne.Z,(0,m.Z)((0,m.Z)({className:"".concat(d,"-tabs"),activeKey:t,onChange:function(v){a&&a(v)},tabBarExtraContent:i},s),{},{children:r==null?void 0:r.map(function(u,v){return(0,l.createElement)(Ne.Z.TabPane,(0,m.Z)((0,m.Z)({},u),{},{tab:u.tab,key:u.key||v}))})})):null},Tt=function(e,r,t){return!e&&!r?null:(0,y.jsx)("div",{className:"".concat(t,"-detail"),children:(0,y.jsx)("div",{className:"".concat(t,"-main"),children:(0,y.jsxs)("div",{className:"".concat(t,"-row"),children:[e&&(0,y.jsx)("div",{className:"".concat(t,"-content"),children:e}),r&&(0,y.jsx)("div",{className:"".concat(t,"-extraContent"),children:r})]})})})},tr=function(e){var r=useContext(RouteContext);return _jsx("div",{style:{height:"100%",display:"flex",alignItems:"center"},children:_jsx(_Breadcrumb,_objectSpread(_objectSpread(_objectSpread({},r==null?void 0:r.breadcrumb),r==null?void 0:r.breadcrumbProps),e))})},Mt=function(e){var r,t=(0,l.useContext)(Te.Z),a=e.title,i=e.content,s=e.pageHeaderRender,d=e.header,u=e.prefixedClassName,v=e.extraContent,h=e.style,x=e.prefixCls,c=e.breadcrumbRender,b=(0,Re.Z)(e,Ot),f=(0,l.useMemo)(function(){if(!!c)return c},[c]);if(s===!1)return null;if(s)return(0,y.jsxs)(y.Fragment,{children:[" ",s((0,m.Z)((0,m.Z)({},e),t))]});var E=a;!a&&a!==!1&&(E=t.title);var O=(0,m.Z)((0,m.Z)((0,m.Z)({},t),{},{title:E},b),{},{footer:Nt((0,m.Z)((0,m.Z)({},b),{},{breadcrumbRender:c,prefixedClassName:u}))},d),g=O.breadcrumb,B=(!g||!(g==null?void 0:g.itemRender)&&!(g==null||(r=g.routes)===null||r===void 0?void 0:r.length))&&!c;return["title","subTitle","extra","tags","footer","avatar","backIcon"].every(function(D){return!O[D]})&&B&&!i&&!v?null:(0,y.jsx)("div",{className:"".concat(u,"-warp"),children:(0,y.jsx)(xt,(0,m.Z)((0,m.Z)({},O),{},{breadcrumb:c===!1?void 0:(0,m.Z)((0,m.Z)({},O.breadcrumb),t.breadcrumbProps),breadcrumbRender:f,prefixCls:x,children:(d==null?void 0:d.children)||Tt(i,v,u)}))})},Bt=function(e){var r,t,a=e.children,i=e.loading,s=i===void 0?!1:i,d=e.className,u=e.style,v=e.footer,h=e.affixProps,x=e.ghost,c=e.fixedHeader,b=e.breadcrumbRender,f=(0,Re.Z)(e,Zt),E=(0,l.useContext)(Te.Z),O=(0,l.useContext)(xe.ZP.ConfigContext),g=O.getPrefixCls,B=e.prefixCls||g("pro"),D="".concat(B,"-page-container"),j=N()(D,d,(r={},(0,M.Z)(r,"".concat(B,"-page-container-ghost"),x),(0,M.Z)(r,"".concat(B,"-page-container-with-footer"),v),r)),C=(0,l.useMemo)(function(){return a?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{className:"".concat(D,"-children-content"),children:a}),E.hasFooterToolbar&&(0,y.jsx)("div",{style:{height:48,marginTop:24}})]}):null},[a,D,E.hasFooterToolbar]),H=(0,l.useMemo)(function(){var L;return b==!1?!1:b||(f==null||(L=f.header)===null||L===void 0?void 0:L.breadcrumbRender)},[b,f==null||(t=f.header)===null||t===void 0?void 0:t.breadcrumbRender]),W=(0,y.jsx)(Mt,(0,m.Z)((0,m.Z)({},f),{},{breadcrumbRender:H,ghost:x,prefixCls:void 0,prefixedClassName:D})),_=(0,l.useMemo)(function(){if(l.isValidElement(s))return s;if(typeof s=="boolean"&&!s)return null;var L=Rt(s);return L.spinning?(0,y.jsx)(yt.Z,(0,m.Z)({},L)):null},[s]),K=(0,l.useMemo)(function(){var L=_||C;if(e.waterMarkProps||E.waterMarkProps){var ie=(0,m.Z)((0,m.Z)({},E.waterMarkProps),e.waterMarkProps);return(0,y.jsx)(pt,(0,m.Z)((0,m.Z)({},ie),{},{children:L}))}return L},[e.waterMarkProps,E.waterMarkProps,_,C]);return(0,y.jsxs)("div",{style:u,className:j,children:[c&&W?(0,y.jsx)(Fe,(0,m.Z)((0,m.Z)({offsetTop:E.hasHeader&&E.fixedHeader?E.headerHeight:0},h),{},{children:W})):W,K&&(0,y.jsx)(Pt.Z,{children:K}),v&&(0,y.jsx)(Ct.Z,{prefixCls:B,children:v})]})},Dt=Bt},56264:function(){},53645:function(){},12395:function(){},70883:function(){},81262:function(){},59903:function(){},34952:function(le,w,n){"use strict";var T=n(22122),z=n(15105),P=n(67294),M=function(Z,G){var I={};for(var R in Z)Object.prototype.hasOwnProperty.call(Z,R)&&G.indexOf(R)<0&&(I[R]=Z[R]);if(Z!=null&&typeof Object.getOwnPropertySymbols=="function")for(var N=0,R=Object.getOwnPropertySymbols(Z);N<R.length;N++)G.indexOf(R[N])<0&&Object.prototype.propertyIsEnumerable.call(Z,R[N])&&(I[R[N]]=Z[R[N]]);return I},U={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},Q=P.forwardRef(function(Z,G){var I=function($){var X=$.keyCode;X===z.Z.ENTER&&$.preventDefault()},R=function($){var X=$.keyCode,Y=Z.onClick;X===z.Z.ENTER&&Y&&Y()},N=Z.style,F=Z.noStyle,ee=Z.disabled,l=M(Z,["style","noStyle","disabled"]),A={};return F||(A=(0,T.Z)({},U)),ee&&(A.pointerEvents="none"),A=(0,T.Z)((0,T.Z)({},A),N),P.createElement("div",(0,T.Z)({role:"button",tabIndex:0,ref:G},l,{onKeyDown:I,onKeyUp:R,style:A}))});w.Z=Q},97435:function(le,w){"use strict";function n(T,z){for(var P=Object.assign({},T),M=0;M<z.length;M+=1){var U=z[M];delete P[U]}return P}w.Z=n}}]);

//# sourceMappingURL=5362.a235e2aa.async.js.map
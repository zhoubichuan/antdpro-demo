(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[8803],{31962:function(o){o.exports={main:"main___2kx2N",password:"password___2JDrd",getCaptcha:"getCaptcha___1oboe",submit:"submit___34wM2",login:"login___1qBuj",success:"success___3hl98",warning:"warning___2i2r2",error:"error___3JfQo","progress-pass":"progress-pass___BM1Xu",progress:"progress___2s68u"}},54502:function(o,a,s){"use strict";s.r(a);var n=s(17051),m=s(4701),g=s(79030),M=s(97231),os=s(52916),O=s(34636),is=s(10131),W=s(16812),ds=s(51437),K=s(60041),cs=s(44710),L=s(88038),E=s(83405),Es=s(14013),i=s(41023),vs=s(65023),C=s(94938),Ps=s(66043),h=s(29291),v=s(59301),f=s(42213),y=s(80444),Z=s(26675),S=s(31962),t=s.n(S),e=s(37712),d=h.Z.Item,A=C.Z.Option,N=i.Z.Group,w={ok:(0,e.jsx)("div",{className:t().success,children:(0,e.jsx)("span",{children:"\u5F3A\u5EA6\uFF1A\u5F3A"})}),pass:(0,e.jsx)("div",{className:t().warning,children:(0,e.jsx)("span",{children:"\u5F3A\u5EA6\uFF1A\u4E2D"})}),poor:(0,e.jsx)("div",{className:t().error,children:(0,e.jsx)("span",{children:"\u5F3A\u5EA6\uFF1A\u592A\u77ED"})})},z={ok:"success",pass:"normal",poor:"exception"},V=function(){var G=(0,v.useState)(0),x=(0,E.Z)(G,2),p=x[0],B=x[1],$=(0,v.useState)(!1),j=(0,E.Z)($,2),D=j[0],F=j[1],J=(0,v.useState)("86"),I=(0,E.Z)(J,2),Q=I[0],X=I[1],H=(0,v.useState)(!1),R=(0,E.Z)(H,2),Y=R[0],b=R[1],k=!1,P,q=h.Z.useForm(),ss=(0,E.Z)(q,1),l=ss[0];(0,v.useEffect)(function(){return function(){clearInterval(P)}},[P]);var es=function(){var _=59;B(_),P=window.setInterval(function(){_-=1,B(_),_===0&&clearInterval(P)},1e3)},T=function(){var _=l.getFieldValue("password");return _&&_.length>9?"ok":_&&_.length>5?"pass":"poor"},U=(0,f.QT)(Z.U,{manual:!0,onSuccess:function(_,r){_.status==="ok"&&(L.default.success("\u6CE8\u518C\u6210\u529F\uFF01"),f.m8.push({pathname:"/user/register-result",state:{account:r.email}}))}}),_s=U.loading,rs=U.run,ts=function(_){rs(_)},as=function(_,r){var c=Promise;return r&&r!==l.getFieldValue("password")?c.reject("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u5339\u914D!"):c.resolve()},ns=function(_,r){var c=Promise;return r?(D||F(!!r),b(!Y),r.length<6?c.reject(""):(r&&k&&l.validateFields(["confirm"]),c.resolve())):(F(!!r),c.reject("\u8BF7\u8F93\u5165\u5BC6\u7801!"))},us=function(_){X(_)},ls=function(){var _=l.getFieldValue("password"),r=T();return _&&_.length?(0,e.jsx)("div",{className:t()["progress-".concat(r)],children:(0,e.jsx)(K.Z,{status:z[r],className:t().progress,strokeWidth:6,percent:_.length*10>100?100:_.length*10,showInfo:!1})}):null};return(0,e.jsxs)("div",{className:t().main,children:[(0,e.jsx)("h3",{children:"\u6CE8\u518C"}),(0,e.jsxs)(h.Z,{form:l,name:"UserRegister",onFinish:ts,children:[(0,e.jsx)(d,{name:"mail",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740!"},{type:"email",message:"\u90AE\u7BB1\u5730\u5740\u683C\u5F0F\u9519\u8BEF!"}],children:(0,e.jsx)(i.Z,{size:"large",placeholder:"\u90AE\u7BB1"})}),(0,e.jsx)(W.Z,{getPopupContainer:function(_){return _&&_.parentNode?_.parentNode:_},content:D&&(0,e.jsxs)("div",{style:{padding:"4px 0"},children:[w[T()],ls(),(0,e.jsx)("div",{style:{marginTop:10},children:(0,e.jsx)("span",{children:"\u8BF7\u81F3\u5C11\u8F93\u5165 6 \u4E2A\u5B57\u7B26\u3002\u8BF7\u4E0D\u8981\u4F7F\u7528\u5BB9\u6613\u88AB\u731C\u5230\u7684\u5BC6\u7801\u3002"})})]}),overlayStyle:{width:240},placement:"right",visible:D,children:(0,e.jsx)(d,{name:"password",className:l.getFieldValue("password")&&l.getFieldValue("password").length>0&&t().password,rules:[{validator:ns}],children:(0,e.jsx)(i.Z,{size:"large",type:"password",placeholder:"\u81F3\u5C116\u4F4D\u5BC6\u7801\uFF0C\u533A\u5206\u5927\u5C0F\u5199"})})}),(0,e.jsx)(d,{name:"confirm",rules:[{required:!0,message:"\u786E\u8BA4\u5BC6\u7801"},{validator:as}],children:(0,e.jsx)(i.Z,{size:"large",type:"password",placeholder:"\u786E\u8BA4\u5BC6\u7801"})}),(0,e.jsxs)(N,{compact:!0,children:[(0,e.jsxs)(C.Z,{size:"large",value:Q,onChange:us,style:{width:"20%"},children:[(0,e.jsx)(A,{value:"86",children:"+86"}),(0,e.jsx)(A,{value:"87",children:"+87"})]}),(0,e.jsx)(d,{style:{width:"80%"},name:"mobile",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7!"},{pattern:/^\d{11}$/,message:"\u624B\u673A\u53F7\u683C\u5F0F\u9519\u8BEF!"}],children:(0,e.jsx)(i.Z,{size:"large",placeholder:"\u624B\u673A\u53F7"})})]}),(0,e.jsxs)(m.Z,{gutter:8,children:[(0,e.jsx)(O.Z,{span:16,children:(0,e.jsx)(d,{name:"captcha",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801!"}],children:(0,e.jsx)(i.Z,{size:"large",placeholder:"\u9A8C\u8BC1\u7801"})})}),(0,e.jsx)(O.Z,{span:8,children:(0,e.jsx)(M.Z,{size:"large",disabled:!!p,className:t().getCaptcha,onClick:es,children:p?"".concat(p," s"):"\u83B7\u53D6\u9A8C\u8BC1\u7801"})})]}),(0,e.jsxs)(d,{children:[(0,e.jsx)(M.Z,{size:"large",loading:_s,className:t().submit,type:"primary",htmlType:"submit",children:(0,e.jsx)("span",{children:"\u6CE8\u518C"})}),(0,e.jsx)(y.rU,{className:t().login,to:"/user/login",children:(0,e.jsx)("span",{children:"\u4F7F\u7528\u5DF2\u6709\u8D26\u6237\u767B\u5F55"})})]})]})]})};a.default=V},34636:function(o,a,s){"use strict";var n=s(34047);a.Z=n.Z},52916:function(o,a,s){"use strict";var n=s(78446),m=s.n(n),g=s(50028)},4701:function(o,a,s){"use strict";var n=s(46728);a.Z=n.Z},17051:function(o,a,s){"use strict";var n=s(78446),m=s.n(n),g=s(50028)}}]);

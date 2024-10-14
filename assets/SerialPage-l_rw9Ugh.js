import{Q as aa}from"./QSelect-BdO_8FQQ.js";import{af as Qe,t as w,a as r,aD as ta,aE as Se,j as la,ad as Ue,aF as Ee,g as Be,aG as ra,h as o,aj as He,aH as Oe,c as ze,aI as na,w as qe,as as oa,aJ as ua,aK as sa,aL as ia,aM as $e,aN as Te,aO as we,aP as ca,aQ as Re,a2 as O,P as da,ai as Ie,aR as va,A as ba,x as ga,_ as ma,C as ee,D as De,E as fa,F as G,Q as Le,aS as pa,M as Ve,U as ha,O as ka,N as xa,an as Ca,ao as ya}from"./index-CkmlDq5s.js";import{T as je}from"./TouchPan-BwH27kv1.js";import{b as K}from"./format-BvkBI9bc.js";import{c as ae,Q as Pe,a as Me,b as _a,u as Sa}from"./QTabPanels-PmZjQGGT.js";import{Q as wa}from"./QPage-BJDcQjnb.js";import{u as Va}from"./use-quasar-DX_ntCHW.js";import{s as Ma,h as qa}from"./managers-DDv6KUjV.js";import"./QChip-CRAwVKBI.js";import"./QItem-C5ZHiONh.js";import"./QItemLabel-aXRmSGyF.js";import"./QMenu-1odQJaNg.js";import"./position-engine-D_l0NjWU.js";import"./selection-oP5RpDT_.js";import"./rtl-DFPa-2ov.js";import"./touch-BjYP5sR0.js";import"./QResizeObserver-COOC36Sn.js";import"./i18n-DDsdsaPU.js";import"./vue-i18n.runtime-CmCsUbpb.js";import"./common-DE0SbnG8.js";const Fe="q-slider__marker-labels",Ba=l=>({value:l}),Aa=({marker:l})=>o("div",{key:l.value,style:l.style,class:l.classes},l.label),We=[34,37,40,33,39,38],$a={...Ue,...Ee,min:{type:Number,default:0},max:{type:Number,default:100},innerMin:Number,innerMax:Number,step:{type:Number,default:1,validator:l=>l>=0},snap:Boolean,vertical:Boolean,reverse:Boolean,color:String,markerLabelsClass:String,label:Boolean,labelColor:String,labelTextColor:String,labelAlways:Boolean,switchLabelSide:Boolean,markers:[Boolean,Number],markerLabels:[Boolean,Array,Object,Function],switchMarkerLabelsSide:Boolean,trackImg:String,trackColor:String,innerTrackImg:String,innerTrackColor:String,selectionColor:String,selectionImg:String,thumbSize:{type:String,default:"20px"},trackSize:{type:String,default:"4px"},disable:Boolean,readonly:Boolean,dense:Boolean,tabindex:[String,Number],thumbColor:String,thumbPath:{type:String,default:"M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"}},Ta=["pan","update:modelValue","change"];function Ra({updateValue:l,updatePosition:h,getDragging:R,formAttrs:u}){const{props:a,emit:k,slots:C,proxy:{$q:g}}=Be(),V=Qe(a,g),q=Oe(u),m=w(!1),D=w(!1),n=w(!1),b=w(!1),B=r(()=>a.vertical===!0?"--v":"--h"),A=r(()=>"-"+(a.switchLabelSide===!0?"switched":"standard")),S=r(()=>a.vertical===!0?a.reverse===!0:a.reverse!==(g.lang.rtl===!0)),L=r(()=>isNaN(a.innerMin)===!0||a.innerMin<a.min?a.min:a.innerMin),x=r(()=>isNaN(a.innerMax)===!0||a.innerMax>a.max?a.max:a.innerMax),y=r(()=>a.disable!==!0&&a.readonly!==!0&&L.value<x.value),P=r(()=>{if(a.step===0)return i=>i;const t=(String(a.step).trim().split(".")[1]||"").length;return i=>parseFloat(i.toFixed(t))}),N=r(()=>a.step===0?1:a.step),se=r(()=>y.value===!0?a.tabindex||0:-1),z=r(()=>a.max-a.min),te=r(()=>x.value-L.value),j=r(()=>Z(L.value)),X=r(()=>Z(x.value)),F=r(()=>a.vertical===!0?S.value===!0?"bottom":"top":S.value===!0?"right":"left"),E=r(()=>a.vertical===!0?"height":"width"),W=r(()=>a.vertical===!0?"width":"height"),J=r(()=>a.vertical===!0?"vertical":"horizontal"),ie=r(()=>{const t={role:"slider","aria-valuemin":L.value,"aria-valuemax":x.value,"aria-orientation":J.value,"data-step":a.step};return a.disable===!0?t["aria-disabled"]="true":a.readonly===!0&&(t["aria-readonly"]="true"),t}),_=r(()=>`q-slider q-slider${B.value} q-slider--${m.value===!0?"":"in"}active inline no-wrap `+(a.vertical===!0?"row":"column")+(a.disable===!0?" disabled":" q-slider--enabled"+(y.value===!0?" q-slider--editable":""))+(n.value==="both"?" q-slider--focus":"")+(a.label||a.labelAlways===!0?" q-slider--label":"")+(a.labelAlways===!0?" q-slider--label-always":"")+(V.value===!0?" q-slider--dark":"")+(a.dense===!0?" q-slider--dense q-slider--dense"+B.value:""));function H(t){const i="q-slider__"+t;return`${i} ${i}${B.value} ${i}${B.value}${A.value}`}function le(t){const i="q-slider__"+t;return`${i} ${i}${B.value}`}const ce=r(()=>{const t=a.selectionColor||a.color;return"q-slider__selection absolute"+(t!==void 0?` text-${t}`:"")}),de=r(()=>le("markers")+" absolute overflow-hidden"),ve=r(()=>le("track-container")),be=r(()=>H("pin")),re=r(()=>H("label")),ge=r(()=>H("text-container")),me=r(()=>H("marker-labels-container")+(a.markerLabelsClass!==void 0?` ${a.markerLabelsClass}`:"")),fe=r(()=>"q-slider__track relative-position no-outline"+(a.trackColor!==void 0?` bg-${a.trackColor}`:"")),pe=r(()=>{const t={[W.value]:a.trackSize};return a.trackImg!==void 0&&(t.backgroundImage=`url(${a.trackImg}) !important`),t}),he=r(()=>"q-slider__inner absolute"+(a.innerTrackColor!==void 0?` bg-${a.innerTrackColor}`:"")),ne=r(()=>{const t=X.value-j.value,i={[F.value]:`${100*j.value}%`,[E.value]:t===0?"2px":`${100*t}%`};return a.innerTrackImg!==void 0&&(i.backgroundImage=`url(${a.innerTrackImg}) !important`),i});function ke(t){const{min:i,max:f,step:p}=a;let T=i+t*(f-i);if(p>0){const U=(T-L.value)%p;T+=(Math.abs(U)>=p/2?(U<0?-1:1)*p:0)-U}return T=P.value(T),K(T,L.value,x.value)}function Z(t){return z.value===0?0:(t-a.min)/z.value}function e(t,i){const f=ra(t),p=a.vertical===!0?K((f.top-i.top)/i.height,0,1):K((f.left-i.left)/i.width,0,1);return K(S.value===!0?1-p:p,j.value,X.value)}const s=r(()=>ta(a.markers)===!0?a.markers:N.value),d=r(()=>{const t=[],i=s.value,f=a.max;let p=a.min;do t.push(p),p+=i;while(p<f);return t.push(f),t}),v=r(()=>{const t=` ${Fe}${B.value}-`;return Fe+`${t}${a.switchMarkerLabelsSide===!0?"switched":"standard"}${t}${S.value===!0?"rtl":"ltr"}`}),$=r(()=>a.markerLabels===!1?null:M(a.markerLabels).map((t,i)=>({index:i,value:t.value,label:t.label||t.value,classes:v.value+(t.classes!==void 0?" "+t.classes:""),style:{...Q(t.value),...t.style||{}}}))),c=r(()=>({markerList:$.value,markerMap:oe.value,classes:v.value,getStyle:Q})),I=r(()=>{const t=te.value===0?"2px":100*s.value/te.value;return{...ne.value,backgroundSize:a.vertical===!0?`2px ${t}%`:`${t}% 2px`}});function M(t){if(t===!1)return null;if(t===!0)return d.value.map(Ba);if(typeof t=="function")return d.value.map(f=>{const p=t(f);return Se(p)===!0?{...p,value:f}:{value:f,label:p}});const i=({value:f})=>f>=a.min&&f<=a.max;return Array.isArray(t)===!0?t.map(f=>Se(f)===!0?f:{value:f}).filter(i):Object.keys(t).map(f=>{const p=t[f],T=Number(f);return Se(p)===!0?{...p,value:T}:{value:T,label:p}}).filter(i)}function Q(t){return{[F.value]:`${100*(t-a.min)/z.value}%`}}const oe=r(()=>{if(a.markerLabels===!1)return null;const t={};return $.value.forEach(i=>{t[i.value]=i}),t});function ue(){if(C["marker-label-group"]!==void 0)return C["marker-label-group"](c.value);const t=C["marker-label"]||Aa;return $.value.map(i=>t({marker:i,...c.value}))}const xe=r(()=>[[je,Ge,void 0,{[J.value]:!0,prevent:!0,stop:!0,mouse:!0,mouseAllDir:!0}]]);function Ge(t){t.isFinal===!0?(b.value!==void 0&&(h(t.evt),t.touch===!0&&l(!0),b.value=void 0,k("pan","end")),m.value=!1,n.value=!1):t.isFirst===!0?(b.value=R(t.evt),h(t.evt),l(),m.value=!0,k("pan","start")):(h(t.evt),l())}function Ae(){n.value=!1}function Ye(t){h(t,R(t)),l(),D.value=!0,m.value=!0,document.addEventListener("mouseup",Ce,!0)}function Ce(){D.value=!1,m.value=!1,l(!0),Ae(),document.removeEventListener("mouseup",Ce,!0)}function Ke(t){h(t,R(t)),l(!0)}function Xe(t){We.includes(t.keyCode)&&l(!0)}function Je(t){if(a.vertical===!0)return null;const i=g.lang.rtl!==a.reverse?1-t:t;return{transform:`translateX(calc(${2*i-1} * ${a.thumbSize} / 2 + ${50-100*i}%))`}}function Ze(t){const i=r(()=>D.value===!1&&(n.value===t.focusValue||n.value==="both")?" q-slider--focus":""),f=r(()=>`q-slider__thumb q-slider__thumb${B.value} q-slider__thumb${B.value}-${S.value===!0?"rtl":"ltr"} absolute non-selectable`+i.value+(t.thumbColor.value!==void 0?` text-${t.thumbColor.value}`:"")),p=r(()=>({width:a.thumbSize,height:a.thumbSize,[F.value]:`${100*t.ratio.value}%`,zIndex:n.value===t.focusValue?2:void 0})),T=r(()=>t.labelColor.value!==void 0?` text-${t.labelColor.value}`:""),U=r(()=>Je(t.ratio.value)),ye=r(()=>"q-slider__text"+(t.labelTextColor.value!==void 0?` text-${t.labelTextColor.value}`:""));return()=>{const _e=[o("svg",{class:"q-slider__thumb-shape absolute-full",viewBox:"0 0 20 20","aria-hidden":"true"},[o("path",{d:a.thumbPath})]),o("div",{class:"q-slider__focus-ring fit"})];return(a.label===!0||a.labelAlways===!0)&&(_e.push(o("div",{class:be.value+" absolute fit no-pointer-events"+T.value},[o("div",{class:re.value,style:{minWidth:a.thumbSize}},[o("div",{class:ge.value,style:U.value},[o("span",{class:ye.value},t.label.value)])])])),a.name!==void 0&&a.disable!==!0&&q(_e,"push")),o("div",{class:f.value,style:p.value,...t.getNodeData()},_e)}}function ea(t,i,f,p){const T=[];a.innerTrackColor!=="transparent"&&T.push(o("div",{key:"inner",class:he.value,style:ne.value})),a.selectionColor!=="transparent"&&T.push(o("div",{key:"selection",class:ce.value,style:t.value})),a.markers!==!1&&T.push(o("div",{key:"marker",class:de.value,style:I.value})),p(T);const U=[He("div",{key:"trackC",class:ve.value,tabindex:i.value,...f.value},[o("div",{class:fe.value,style:pe.value},T)],"slide",y.value,()=>xe.value)];if(a.markerLabels!==!1){const ye=a.switchMarkerLabelsSide===!0?"unshift":"push";U[ye](o("div",{key:"markerL",class:me.value},ue()))}return U}return la(()=>{document.removeEventListener("mouseup",Ce,!0)}),{state:{active:m,focus:n,preventFocus:D,dragging:b,editable:y,classes:_,tabindex:se,attributes:ie,roundValueFn:P,keyStep:N,trackLen:z,innerMin:L,innerMinRatio:j,innerMax:x,innerMaxRatio:X,positionProp:F,sizeProp:E,isReversed:S},methods:{onActivate:Ye,onMobileClick:Ke,onBlur:Ae,onKeyup:Xe,getContent:ea,getThumbRenderFn:Ze,convertRatioToModel:ke,convertModelToRatio:Z,getDraggingRatio:e}}}const Ia=()=>({}),Y=ze({name:"QSlider",props:{...$a,modelValue:{required:!0,default:null,validator:l=>typeof l=="number"||l===null},labelValue:[String,Number]},emits:Ta,setup(l,{emit:h}){const{proxy:{$q:R}}=Be(),{state:u,methods:a}=Ra({updateValue:B,updatePosition:S,getDragging:A,formAttrs:na(l)}),k=w(null),C=w(0),g=w(0);function V(){g.value=l.modelValue===null?u.innerMin.value:K(l.modelValue,u.innerMin.value,u.innerMax.value)}qe(()=>`${l.modelValue}|${u.innerMin.value}|${u.innerMax.value}`,V),V();const q=r(()=>a.convertModelToRatio(g.value)),m=r(()=>u.active.value===!0?C.value:q.value),D=r(()=>{const y={[u.positionProp.value]:`${100*u.innerMinRatio.value}%`,[u.sizeProp.value]:`${100*(m.value-u.innerMinRatio.value)}%`};return l.selectionImg!==void 0&&(y.backgroundImage=`url(${l.selectionImg}) !important`),y}),n=a.getThumbRenderFn({focusValue:!0,getNodeData:Ia,ratio:m,label:r(()=>l.labelValue!==void 0?l.labelValue:g.value),thumbColor:r(()=>l.thumbColor||l.color),labelColor:r(()=>l.labelColor),labelTextColor:r(()=>l.labelTextColor)}),b=r(()=>u.editable.value!==!0?{}:R.platform.is.mobile===!0?{onClick:a.onMobileClick}:{onMousedown:a.onActivate,onFocus:L,onBlur:a.onBlur,onKeydown:x,onKeyup:a.onKeyup});function B(y){g.value!==l.modelValue&&h("update:modelValue",g.value),y===!0&&h("change",g.value)}function A(){return k.value.getBoundingClientRect()}function S(y,P=u.dragging.value){const N=a.getDraggingRatio(y,P);g.value=a.convertRatioToModel(N),C.value=l.snap!==!0||l.step===0?N:a.convertModelToRatio(g.value)}function L(){u.focus.value=!0}function x(y){if(!We.includes(y.keyCode))return;oa(y);const P=([34,33].includes(y.keyCode)?10:1)*u.keyStep.value,N=([34,37,40].includes(y.keyCode)?-1:1)*(u.isReversed.value===!0?-1:1)*(l.vertical===!0?-1:1)*P;g.value=K(u.roundValueFn.value(g.value+N),u.innerMin.value,u.innerMax.value),B()}return()=>{const y=a.getContent(D,u.tabindex,b,P=>{P.push(n())});return o("div",{ref:k,class:u.classes.value+(l.modelValue===null?" q-slider--no-value":""),...u.attributes.value,"aria-valuenow":l.modelValue},y)}}}),Da=["rgb(255,204,204)","rgb(255,230,204)","rgb(255,255,204)","rgb(204,255,204)","rgb(204,255,230)","rgb(204,255,255)","rgb(204,230,255)","rgb(204,204,255)","rgb(230,204,255)","rgb(255,204,255)","rgb(255,153,153)","rgb(255,204,153)","rgb(255,255,153)","rgb(153,255,153)","rgb(153,255,204)","rgb(153,255,255)","rgb(153,204,255)","rgb(153,153,255)","rgb(204,153,255)","rgb(255,153,255)","rgb(255,102,102)","rgb(255,179,102)","rgb(255,255,102)","rgb(102,255,102)","rgb(102,255,179)","rgb(102,255,255)","rgb(102,179,255)","rgb(102,102,255)","rgb(179,102,255)","rgb(255,102,255)","rgb(255,51,51)","rgb(255,153,51)","rgb(255,255,51)","rgb(51,255,51)","rgb(51,255,153)","rgb(51,255,255)","rgb(51,153,255)","rgb(51,51,255)","rgb(153,51,255)","rgb(255,51,255)","rgb(255,0,0)","rgb(255,128,0)","rgb(255,255,0)","rgb(0,255,0)","rgb(0,255,128)","rgb(0,255,255)","rgb(0,128,255)","rgb(0,0,255)","rgb(128,0,255)","rgb(255,0,255)","rgb(245,0,0)","rgb(245,123,0)","rgb(245,245,0)","rgb(0,245,0)","rgb(0,245,123)","rgb(0,245,245)","rgb(0,123,245)","rgb(0,0,245)","rgb(123,0,245)","rgb(245,0,245)","rgb(214,0,0)","rgb(214,108,0)","rgb(214,214,0)","rgb(0,214,0)","rgb(0,214,108)","rgb(0,214,214)","rgb(0,108,214)","rgb(0,0,214)","rgb(108,0,214)","rgb(214,0,214)","rgb(163,0,0)","rgb(163,82,0)","rgb(163,163,0)","rgb(0,163,0)","rgb(0,163,82)","rgb(0,163,163)","rgb(0,82,163)","rgb(0,0,163)","rgb(82,0,163)","rgb(163,0,163)","rgb(92,0,0)","rgb(92,46,0)","rgb(92,92,0)","rgb(0,92,0)","rgb(0,92,46)","rgb(0,92,92)","rgb(0,46,92)","rgb(0,0,92)","rgb(46,0,92)","rgb(92,0,92)","rgb(255,255,255)","rgb(205,205,205)","rgb(178,178,178)","rgb(153,153,153)","rgb(127,127,127)","rgb(102,102,102)","rgb(76,76,76)","rgb(51,51,51)","rgb(25,25,25)","rgb(0,0,0)"],Ne="M5 5 h10 v10 h-10 v-10 z",La="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAwZkAFZ5G5jPRRgOYEVDeB3EBjBQBOZwTVugIGyAAAAABJRU5ErkJggg==",Pa=ze({name:"QColor",props:{...Ue,...Ee,modelValue:String,defaultValue:String,defaultView:{type:String,default:"spectrum",validator:l=>["spectrum","tune","palette"].includes(l)},formatModel:{type:String,default:"auto",validator:l=>["auto","hex","rgb","hexa","rgba"].includes(l)},palette:Array,noHeader:Boolean,noHeaderTabs:Boolean,noFooter:Boolean,square:Boolean,flat:Boolean,bordered:Boolean,disable:Boolean,readonly:Boolean},emits:["update:modelValue","change"],setup(l,{emit:h}){const{proxy:R}=Be(),{$q:u}=R,a=Qe(l,u),{getCache:k}=Sa(),C=w(null),g=w(null),V=r(()=>l.formatModel==="auto"?null:l.formatModel.indexOf("hex")!==-1),q=r(()=>l.formatModel==="auto"?null:l.formatModel.indexOf("a")!==-1),m=w(l.formatModel==="auto"?l.modelValue===void 0||l.modelValue===null||l.modelValue===""||l.modelValue.startsWith("#")?"hex":"rgb":l.formatModel.startsWith("hex")?"hex":"rgb"),D=w(l.defaultView),n=w(E(l.modelValue||l.defaultValue)),b=r(()=>l.disable!==!0&&l.readonly!==!0),B=r(()=>l.modelValue===void 0||l.modelValue===null||l.modelValue===""||l.modelValue.startsWith("#")),A=r(()=>V.value!==null?V.value:B.value),S=r(()=>({type:"hidden",name:l.name,value:n.value[A.value===!0?"hex":"rgb"]})),L=Oe(S),x=r(()=>q.value!==null?q.value:n.value.a!==void 0),y=r(()=>({backgroundColor:n.value.rgb||"#000"})),P=r(()=>`q-color-picker__header-content q-color-picker__header-content--${(n.value.a!==void 0&&n.value.a<65?!0:ua(n.value)>.4)?"light":"dark"}`),N=r(()=>({background:`hsl(${n.value.h},100%,50%)`})),se=r(()=>({top:`${100-n.value.v}%`,[u.lang.rtl===!0?"right":"left"]:`${n.value.s}%`})),z=r(()=>l.palette!==void 0&&l.palette.length!==0?l.palette:Da),te=r(()=>"q-color-picker"+(l.bordered===!0?" q-color-picker--bordered":"")+(l.square===!0?" q-color-picker--square no-border-radius":"")+(l.flat===!0?" q-color-picker--flat no-shadow":"")+(l.disable===!0?" disabled":"")+(a.value===!0?" q-color-picker--dark q-dark":"")),j=r(()=>l.disable===!0?{"aria-disabled":"true"}:{}),X=r(()=>[[je,ce,void 0,{prevent:!0,stop:!0,mouse:!0}]]);qe(()=>l.modelValue,e=>{const s=E(e||l.defaultValue);s.hex!==n.value.hex&&(n.value=s)}),qe(()=>l.defaultValue,e=>{if(!l.modelValue&&e){const s=E(e);s.hex!==n.value.hex&&(n.value=s)}});function F(e,s){n.value.hex=$e(e),n.value.rgb=Te(e),n.value.r=e.r,n.value.g=e.g,n.value.b=e.b,n.value.a=e.a;const d=n.value[A.value===!0?"hex":"rgb"];h("update:modelValue",d),s===!0&&h("change",d)}function E(e){const s=q.value!==void 0?q.value:l.formatModel==="auto"?null:l.formatModel.indexOf("a")!==-1;if(typeof e!="string"||e.length===0||sa.anyColor(e.replace(/ /g,""))!==!0)return{h:0,s:0,v:0,r:0,g:0,b:0,a:s===!0?100:void 0,hex:void 0,rgb:void 0};const d=ia(e);return s===!0&&d.a===void 0&&(d.a=100),d.hex=$e(d),d.rgb=Te(d),Object.assign(d,we(d))}function W(e,s,d){const v=C.value;if(v===null)return;const $=v.clientWidth,c=v.clientHeight,I=v.getBoundingClientRect();let M=Math.min($,Math.max(0,e-I.left));u.lang.rtl===!0&&(M=$-M);const Q=Math.min(c,Math.max(0,s-I.top)),oe=Math.round(100*M/$),ue=Math.round(100*Math.max(0,Math.min(1,-(Q/c)+1))),xe=Re({h:n.value.h,s:oe,v:ue,a:x.value===!0?n.value.a:void 0});n.value.s=oe,n.value.v=ue,F(xe,d)}function J(e,s){const d=Math.round(e),v=Re({h:d,s:n.value.s,v:n.value.v,a:x.value===!0?n.value.a:void 0});n.value.h=d,F(v,s)}function ie(e){J(e,!0)}function _(e,s,d,v,$){if(v!==void 0&&O(v),!/^[0-9]+$/.test(e)){$===!0&&R.$forceUpdate();return}const c=Math.floor(Number(e));if(c<0||c>d){$===!0&&R.$forceUpdate();return}const I={r:s==="r"?c:n.value.r,g:s==="g"?c:n.value.g,b:s==="b"?c:n.value.b,a:x.value===!0?s==="a"?c:n.value.a:void 0};if(s!=="a"){const M=we(I);n.value.h=M.h,n.value.s=M.s,n.value.v=M.v}if(F(I,$),v!==void 0&&$!==!0&&v.target.selectionEnd!==void 0){const M=v.target.selectionEnd;Ie(()=>{v.target.setSelectionRange(M,M)})}}function H(e,s){let d;const v=e.target.value;if(O(e),m.value==="hex"){if(v.length!==(x.value===!0?9:7)||!/^#[0-9A-Fa-f]+$/.test(v))return!0;d=va(v)}else{let c;if(v.endsWith(")"))if(x.value!==!0&&v.startsWith("rgb(")){if(c=v.substring(4,v.length-1).split(",").map(I=>parseInt(I,10)),c.length!==3||!/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.test(v))return!0}else if(x.value===!0&&v.startsWith("rgba(")){if(c=v.substring(5,v.length-1).split(","),c.length!==4||!/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/.test(v))return!0;for(let M=0;M<3;M++){const Q=parseInt(c[M],10);if(Q<0||Q>255)return!0;c[M]=Q}const I=parseFloat(c[3]);if(I<0||I>1)return!0;c[3]=I}else return!0;else return!0;if(c[0]<0||c[0]>255||c[1]<0||c[1]>255||c[2]<0||c[2]>255||x.value===!0&&(c[3]<0||c[3]>1))return!0;d={r:c[0],g:c[1],b:c[2],a:x.value===!0?c[3]*100:void 0}}const $=we(d);if(n.value.h=$.h,n.value.s=$.s,n.value.v=$.v,F(d,s),s!==!0){const c=e.target.selectionEnd;Ie(()=>{e.target.setSelectionRange(c,c)})}}function le(e){const s=E(e),d={r:s.r,g:s.g,b:s.b,a:s.a};d.a===void 0&&(d.a=n.value.a),n.value.h=s.h,n.value.s=s.s,n.value.v=s.v,F(d,!0)}function ce(e){e.isFinal?W(e.position.left,e.position.top,!0):de(e)}const de=ca(e=>{W(e.position.left,e.position.top)},20);function ve(e){W(e.pageX-window.pageXOffset,e.pageY-window.pageYOffset,!0)}function be(e){W(e.pageX-window.pageXOffset,e.pageY-window.pageYOffset)}function re(e){g.value!==null&&(g.value.$el.style.opacity=e?1:0)}function ge(e){m.value=e}function me(){const e=[];return l.noHeaderTabs!==!0&&e.push(o(Pe,{class:"q-color-picker__header-tabs",modelValue:m.value,dense:!0,align:"justify","onUpdate:modelValue":ge},()=>[o(ae,{label:"HEX"+(x.value===!0?"A":""),name:"hex",ripple:!1}),o(ae,{label:"RGB"+(x.value===!0?"A":""),name:"rgb",ripple:!1})])),e.push(o("div",{class:"q-color-picker__header-banner row flex-center no-wrap"},[o("input",{class:"fit",value:n.value[m.value],...b.value!==!0?{readonly:!0}:{},...k("topIn",{onInput:s=>{re(H(s)===!0)},onChange:O,onBlur:s=>{H(s,!0)===!0&&R.$forceUpdate(),re(!1)}})}),o(da,{ref:g,class:"q-color-picker__error-icon absolute no-pointer-events",name:u.iconSet.type.negative})])),o("div",{class:"q-color-picker__header relative-position overflow-hidden"},[o("div",{class:"q-color-picker__header-bg absolute-full"}),o("div",{class:P.value,style:y.value},e)])}function fe(){return o(_a,{modelValue:D.value,animated:!0},()=>[o(Me,{class:"q-color-picker__spectrum-tab overflow-hidden",name:"spectrum"},ne),o(Me,{class:"q-pa-md q-color-picker__tune-tab",name:"tune"},ke),o(Me,{class:"q-color-picker__palette-tab",name:"palette"},Z)])}function pe(e){D.value=e}function he(){return o("div",{class:"q-color-picker__footer relative-position overflow-hidden"},[o(Pe,{class:"absolute-full",modelValue:D.value,dense:!0,align:"justify","onUpdate:modelValue":pe},()=>[o(ae,{icon:u.iconSet.colorPicker.spectrum,name:"spectrum",ripple:!1}),o(ae,{icon:u.iconSet.colorPicker.tune,name:"tune",ripple:!1}),o(ae,{icon:u.iconSet.colorPicker.palette,name:"palette",ripple:!1})])])}function ne(){const e={ref:C,class:"q-color-picker__spectrum non-selectable relative-position cursor-pointer"+(b.value!==!0?" readonly":""),style:N.value,...b.value===!0?{onClick:ve,onMousedown:be}:{}},s=[o("div",{style:{paddingBottom:"100%"}}),o("div",{class:"q-color-picker__spectrum-white absolute-full"}),o("div",{class:"q-color-picker__spectrum-black absolute-full"}),o("div",{class:"absolute",style:se.value},[n.value.hex!==void 0?o("div",{class:"q-color-picker__spectrum-circle"}):null])],d=[o(Y,{class:"q-color-picker__hue non-selectable",modelValue:n.value.h,min:0,max:360,trackSize:"8px",innerTrackColor:"transparent",selectionColor:"transparent",readonly:b.value!==!0,thumbPath:Ne,"onUpdate:modelValue":J,onChange:ie})];return x.value===!0&&d.push(o(Y,{class:"q-color-picker__alpha non-selectable",modelValue:n.value.a,min:0,max:100,trackSize:"8px",trackColor:"white",innerTrackColor:"transparent",selectionColor:"transparent",trackImg:La,readonly:b.value!==!0,hideSelection:!0,thumbPath:Ne,...k("alphaSlide",{"onUpdate:modelValue":v=>_(v,"a",100),onChange:v=>_(v,"a",100,void 0,!0)})})),[He("div",e,s,"spec",b.value,()=>X.value),o("div",{class:"q-color-picker__sliders"},d)]}function ke(){return[o("div",{class:"row items-center no-wrap"},[o("div","R"),o(Y,{modelValue:n.value.r,min:0,max:255,color:"red",dark:a.value,readonly:b.value!==!0,...k("rSlide",{"onUpdate:modelValue":e=>_(e,"r",255),onChange:e=>_(e,"r",255,void 0,!0)})}),o("input",{value:n.value.r,maxlength:3,readonly:b.value!==!0,onChange:O,...k("rIn",{onInput:e=>_(e.target.value,"r",255,e),onBlur:e=>_(e.target.value,"r",255,e,!0)})})]),o("div",{class:"row items-center no-wrap"},[o("div","G"),o(Y,{modelValue:n.value.g,min:0,max:255,color:"green",dark:a.value,readonly:b.value!==!0,...k("gSlide",{"onUpdate:modelValue":e=>_(e,"g",255),onChange:e=>_(e,"g",255,void 0,!0)})}),o("input",{value:n.value.g,maxlength:3,readonly:b.value!==!0,onChange:O,...k("gIn",{onInput:e=>_(e.target.value,"g",255,e),onBlur:e=>_(e.target.value,"g",255,e,!0)})})]),o("div",{class:"row items-center no-wrap"},[o("div","B"),o(Y,{modelValue:n.value.b,min:0,max:255,color:"blue",readonly:b.value!==!0,dark:a.value,...k("bSlide",{"onUpdate:modelValue":e=>_(e,"b",255),onChange:e=>_(e,"b",255,void 0,!0)})}),o("input",{value:n.value.b,maxlength:3,readonly:b.value!==!0,onChange:O,...k("bIn",{onInput:e=>_(e.target.value,"b",255,e),onBlur:e=>_(e.target.value,"b",255,e,!0)})})]),x.value===!0?o("div",{class:"row items-center no-wrap"},[o("div","A"),o(Y,{modelValue:n.value.a,color:"grey",readonly:b.value!==!0,dark:a.value,...k("aSlide",{"onUpdate:modelValue":e=>_(e,"a",100),onChange:e=>_(e,"a",100,void 0,!0)})}),o("input",{value:n.value.a,maxlength:3,readonly:b.value!==!0,onChange:O,...k("aIn",{onInput:e=>_(e.target.value,"a",100,e),onBlur:e=>_(e.target.value,"a",100,e,!0)})})]):null]}function Z(){const e=s=>o("div",{class:"q-color-picker__cube col-auto",style:{backgroundColor:s},...b.value===!0?k("palette#"+s,{onClick:()=>{le(s)}}):{}});return[o("div",{class:"row items-center q-color-picker__palette-rows"+(b.value===!0?" q-color-picker__palette-rows--editable":"")},z.value.map(e))]}return()=>{const e=[fe()];return l.name!==void 0&&l.disable!==!0&&L(e,"push"),l.noHeader!==!0&&e.unshift(me()),l.noFooter!==!0&&e.push(he()),o("div",{class:te.value,...j.value},e)}}}),Fa=ba({__name:"SerialPage",setup(l,{expose:h}){h();const{notify:R}=Va(),u=[{label:"110",value:110},{label:"300",value:300},{label:"600",value:600},{label:"1200",value:1200},{label:"2400",value:2400},{label:"4800",value:4800},{label:"9600",value:9600},{label:"19200",value:19200},{label:"38400",value:38400},{label:"57600",value:57600},{label:"115200",value:115200},{label:"230400",value:230400},{label:"460800",value:460800},{label:"921600",value:921600}],a=ga({6:"#000000",5:"#000000",4:"#000000",3:"#000000",2:"#000000",1:"#000000",12:"#000000",11:"#000000",10:"#000000",9:"#000000",8:"#000000",7:"#000000",18:"#000000",17:"#000000",16:"#000000",15:"#000000",14:"#000000",13:"#000000",24:"#000000",23:"#000000",22:"#000000",21:"#000000",20:"#000000",19:"#000000",30:"#000000",29:"#000000",28:"#000000",27:"#000000",26:"#000000",25:"#000000",36:"#000000",35:"#000000",34:"#000000",33:"#000000",32:"#000000",31:"#000000"}),k=w(115200),C=w(!1),g=w(!1),V=w(),q=w(""),m=w([{name:"left",data:[]},{name:"right",data:[]},{name:"diff",data:[]}]),D=async()=>{if(V.value=await Ma.connect(k.value),!V.value){console.error("Failed to connect");return}R({type:"positive",message:"Connected"}),V.value.addMessageCallback("main",A=>{m.value.find(S=>S.name==="left")?.data.push({x:Date.now(),y:Number(A.split(",")[0])}),m.value[0].data.length>500&&m.value[0].data.shift(),m.value.find(S=>S.name==="right")?.data.push({x:Date.now(),y:Number(A.split(",")[1])}),m.value[1].data.length>500&&m.value[1].data.shift(),m.value.find(S=>S.name==="diff")?.data.push({x:Date.now(),y:Number(A.split(",")[0])-Number(A.split(",")[1])}),m.value[2].data.length>500&&m.value[2].data.shift()})},n=A=>{const S=A.toString(16).padStart(2,"0");q.value=`0401${S}${a[A].substring(1)}`,g.value=!0,b()};let b=()=>{if(!V.value){console.error("Not connected");return}g.value?V.value.write(new Uint8Array(qa(q.value))):V.value.write(new TextEncoder().encode(q.value))};const B={notify:R,baudRates:u,colorMatrix:a,baudRate:k,isColorData:C,isHexData:g,portWrapper:V,sendData:q,sensorDataList:m,connect:D,setColor:n,get write(){return b},set write(A){b=A}};return Object.defineProperty(B,"__isScriptSetup",{enumerable:!1,value:!0}),B}}),Na={key:0,class:"row justify-center q-pb-xl"},Qa={class:"col-6 row"},Ua={key:1,class:"row q-gutter-x-md"};function Ea(l,h,R,u,a,k){return ee(),De(wa,{class:"column q-gutter-y-lg q-pa-lg"},{default:fa(()=>[G(aa,{label:"Baud Rate",options:u.baudRates,outlined:"",modelValue:u.baudRate,"onUpdate:modelValue":h[0]||(h[0]=C=>u.baudRate=C)},null,8,["modelValue"]),G(Le,{color:"primary",label:"Connect",onClick:u.connect}),G(pa,{label:"Color Data",modelValue:u.isColorData,"onUpdate:modelValue":h[1]||(h[1]=C=>u.isColorData=C)},null,8,["modelValue"]),u.isColorData?(ee(),Ve("div",Na,[ha("div",Qa,[(ee(!0),Ve(ka,null,xa(u.colorMatrix,(C,g,V)=>(ee(),De(Pa,{key:V,class:"col-2","format-model":"hex","no-header":"","no-footer":"",modelValue:u.colorMatrix[g],"onUpdate:modelValue":[q=>u.colorMatrix[g]=q,q=>u.setColor(g)]},null,8,["modelValue","onUpdate:modelValue"]))),128))])])):(ee(),Ve("div",Ua,[G(Ca,{class:"col-grow",outlined:"",modelValue:u.sendData,"onUpdate:modelValue":h[2]||(h[2]=C=>u.sendData=C)},null,8,["modelValue"]),G(ya,{label:"Hex Value",modelValue:u.isHexData,"onUpdate:modelValue":h[3]||(h[3]=C=>u.isHexData=C)},null,8,["modelValue"]),G(Le,{color:"primary",label:"Send",onClick:u.write},null,8,["onClick"])]))]),_:1})}const it=ma(Fa,[["render",Ea],["__file","SerialPage.vue"]]);export{it as default};

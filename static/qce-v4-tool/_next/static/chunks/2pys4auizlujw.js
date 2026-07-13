(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,28508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},29900,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return v},MissingStaticPage:function(){return j},NormalizeError:function(){return h},PageNotFoundError:function(){return b},SP:function(){return m},ST:function(){return x},WEB_VITALS:function(){return i},execOnce:function(){return s},getDisplayName:function(){return d},getLocationOrigin:function(){return c},getURL:function(){return l},isAbsoluteUrl:function(){return u},isResSent:function(){return f},loadGetInitialProps:function(){return g},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return E}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let a=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,u=e=>a.test(e);function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function l(){let{href:e}=window.location,t=c();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function g(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await g(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let m="u">typeof performance,x=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class h extends Error{}class b extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class v extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function E(e){return JSON.stringify({message:e.message,stack:e.stack})}},93193,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return u},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return a}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function i(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function s(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function a(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,s(e));else t.set(r,s(n));return t}function u(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},18536,e=>{"use strict";var t=e.i(73551),r=e.i(13084);e.s(["default",0,function({error:e,reset:n}){let[o,i]=(0,r.useState)({message:"",digest:"",stack:"",url:"",userAgent:"",time:""});return(0,r.useEffect)(()=>{i({message:e.message||"未知错误",digest:e.digest||"",stack:e.stack||"",url:window.location.href,userAgent:"u">typeof navigator?navigator.userAgent:"",time:new Date().toISOString()}),console.error("全局错误:",e)},[e]),(0,t.jsx)("html",{lang:"zh-CN",children:(0,t.jsx)("body",{style:{margin:0,fontFamily:"system-ui, -apple-system, sans-serif"},children:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#fafafa",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"},children:(0,t.jsxs)("div",{style:{width:"100%",maxWidth:"400px"},children:[(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"24px"},children:[(0,t.jsx)("h1",{style:{fontSize:"20px",fontWeight:600,color:"#171717",marginBottom:"6px"},children:"出了点问题"}),(0,t.jsx)("p",{style:{fontSize:"14px",color:"#737373",margin:0},children:"应用遇到了意外错误"})]}),(0,t.jsxs)("div",{style:{background:"#fff",border:"1px solid #e5e5e5",borderRadius:"16px",padding:"20px"},children:[(0,t.jsxs)("div",{style:{background:"#fafafa",border:"1px solid #e5e5e5",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[(0,t.jsx)("div",{style:{fontSize:"12px",fontWeight:500,color:"#737373",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"8px"},children:"Error"}),(0,t.jsx)("div",{style:{fontSize:"14px",color:"#171717",lineHeight:1.5,wordBreak:"break-word"},children:o.message}),o.digest&&(0,t.jsxs)("div",{style:{fontSize:"11px",color:"#a3a3a3",fontFamily:"monospace",marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #e5e5e5"},children:["digest: ",o.digest]})]}),(0,t.jsx)("button",{onClick:n,style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"12px",borderRadius:"10px",background:"#171717",color:"#fff",fontSize:"14px",fontWeight:500,border:"none",cursor:"pointer",marginBottom:"10px"},children:"重试"}),(0,t.jsx)("button",{onClick:()=>{let e=encodeURIComponent(`[BUG] 全局错误: ${o.message.slice(0,50)}`),t=encodeURIComponent(`## 🐛 错误信息

\`\`\`
${o.message}
\`\`\`

## 📋 错误详情

- **错误摘要**: ${o.digest||"无"}
- **时间**: ${o.time}
- **URL**: ${o.url}

## 📜 堆栈跟踪

\`\`\`
${o.stack||"无"}
\`\`\`

## 💻 环境信息

- **浏览器**: ${o.userAgent}
- **QCE 版本**: v5.0.x

## 🔄 复现步骤

1. 
2. 
3. 

## ✨ 期望结果

应用正常运行，不出现错误。
`);window.open(`https://github.com/shuakami/qq-chat-exporter/issues/new?title=${e}&body=${t}&labels=bug`,"_blank")},style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"12px",borderRadius:"10px",background:"transparent",color:"#525252",fontSize:"14px",fontWeight:500,border:"1px solid #e5e5e5",cursor:"pointer"},children:"反馈问题"})]})]})})})})}])}]);
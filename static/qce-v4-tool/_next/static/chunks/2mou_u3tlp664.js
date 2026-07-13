(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18536,e=>{"use strict";var t=e.i(73551),i=e.i(13084);e.s(["default",0,function({error:e,reset:n}){let[o,s]=(0,i.useState)({message:"",digest:"",stack:"",url:"",userAgent:"",time:""});return(0,i.useEffect)(()=>{s({message:e.message||"未知错误",digest:e.digest||"",stack:e.stack||"",url:window.location.href,userAgent:"u">typeof navigator?navigator.userAgent:"",time:new Date().toISOString()}),console.error("全局错误:",e)},[e]),(0,t.jsx)("html",{lang:"zh-CN",children:(0,t.jsx)("body",{style:{margin:0,fontFamily:"system-ui, -apple-system, sans-serif"},children:(0,t.jsx)("div",{style:{minHeight:"100vh",background:"#fafafa",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"},children:(0,t.jsxs)("div",{style:{width:"100%",maxWidth:"400px"},children:[(0,t.jsxs)("div",{style:{textAlign:"center",marginBottom:"24px"},children:[(0,t.jsx)("h1",{style:{fontSize:"20px",fontWeight:600,color:"#171717",marginBottom:"6px"},children:"出了点问题"}),(0,t.jsx)("p",{style:{fontSize:"14px",color:"#737373",margin:0},children:"应用遇到了意外错误"})]}),(0,t.jsxs)("div",{style:{background:"#fff",border:"1px solid #e5e5e5",borderRadius:"16px",padding:"20px"},children:[(0,t.jsxs)("div",{style:{background:"#fafafa",border:"1px solid #e5e5e5",borderRadius:"12px",padding:"16px",marginBottom:"16px"},children:[(0,t.jsx)("div",{style:{fontSize:"12px",fontWeight:500,color:"#737373",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"8px"},children:"Error"}),(0,t.jsx)("div",{style:{fontSize:"14px",color:"#171717",lineHeight:1.5,wordBreak:"break-word"},children:o.message}),o.digest&&(0,t.jsxs)("div",{style:{fontSize:"11px",color:"#a3a3a3",fontFamily:"monospace",marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #e5e5e5"},children:["digest: ",o.digest]})]}),(0,t.jsx)("button",{onClick:n,style:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",padding:"12px",borderRadius:"10px",background:"#171717",color:"#fff",fontSize:"14px",fontWeight:500,border:"none",cursor:"pointer",marginBottom:"10px"},children:"重试"}),(0,t.jsx)("button",{onClick:()=>{let e=encodeURIComponent(`[BUG] 全局错误: ${o.message.slice(0,50)}`),t=encodeURIComponent(`## 🐛 错误信息

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
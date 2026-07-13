(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88820,e=>{"use strict";let t=(0,e.i(39953).default)("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);e.s(["ExternalLink",0,t],88820)},20539,e=>{"use strict";let t=(0,e.i(39953).default)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["RefreshCw",0,t],20539)},17954,e=>{"use strict";var t=e.i(73551),r=e.i(13084),a=e.i(18889),s=e.i(20539),n=e.i(88820);e.s(["default",0,function({error:e,reset:l}){let[i,d]=(0,r.useState)({message:"",digest:"",stack:"",url:"",userAgent:"",time:""});return(0,r.useEffect)(()=>{d({message:e.message||"未知错误",digest:e.digest||"",stack:e.stack||"",url:window.location.href,userAgent:"u">typeof navigator?navigator.userAgent:"",time:new Date().toISOString()}),console.error("应用错误:",e)},[e]),(0,t.jsx)("div",{className:"min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-6",children:(0,t.jsxs)(a.motion.div,{className:"w-full max-w-[400px]",initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.3},children:[(0,t.jsxs)("div",{className:"text-center mb-6",children:[(0,t.jsx)("h1",{className:"text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5",children:"出了点问题"}),(0,t.jsx)("p",{className:"text-sm text-neutral-500 dark:text-neutral-400",children:"应用遇到了意外错误"})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5",children:[(0,t.jsxs)("div",{className:"bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 mb-4",children:[(0,t.jsx)("div",{className:"text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-2",children:"Error"}),(0,t.jsx)("div",{className:"text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed break-words",children:i.message}),i.digest&&(0,t.jsxs)("div",{className:"text-[11px] text-neutral-400 dark:text-neutral-500 font-mono mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800",children:["digest: ",i.digest]})]}),(0,t.jsxs)("button",{onClick:l,className:"w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium hover:opacity-90 transition-opacity mb-2.5",children:[(0,t.jsx)(s.RefreshCw,{className:"w-4 h-4"}),"重试"]}),(0,t.jsxs)("button",{onClick:()=>{let e=encodeURIComponent(`[BUG] 应用错误: ${i.message.slice(0,50)}`),t=encodeURIComponent(`## 🐛 错误信息

\`\`\`
${i.message}
\`\`\`

## 📋 错误详情

- **错误摘要**: ${i.digest||"无"}
- **时间**: ${i.time}
- **URL**: ${i.url}

## 📜 堆栈跟踪

\`\`\`
${i.stack||"无"}
\`\`\`

## 💻 环境信息

- **浏览器**: ${i.userAgent}
- **QCE 版本**: v5.0.x

## 🔄 复现步骤

1. 
2. 
3. 

## ✨ 期望结果

应用正常运行，不出现错误。
`);window.open(`https://github.com/shuakami/qq-chat-exporter/issues/new?title=${e}&body=${t}&labels=bug`,"_blank")},className:"w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors",children:[(0,t.jsx)(n.ExternalLink,{className:"w-4 h-4"}),"反馈问题"]})]})]})})}])}]);
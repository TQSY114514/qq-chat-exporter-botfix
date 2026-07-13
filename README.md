# qq-chat-exporter-botfix

> ⚠️ **非官方修改版**。这是基于 [shuakami/qq-chat-exporter](https://github.com/shuakami/qq-chat-exporter) 完整包 **v5.5.79**（NapCat v4.18.8 + QCE 5.5.79，TypeScript 版）的修改版，**仅修复「QQ 机器人 / 非好友单聊会话识别不到」一个问题**。与原作者无关，不代表官方。

## 这是什么

[QQ Chat Exporter (QCE)](https://github.com/shuakami/qq-chat-exporter) 是一个运行在 [NapCat](https://github.com/NapNeko/NapCatQQ) 之上的插件，用来把 QQ 聊天记录导出为 HTML / JSON / TXT / Excel。

本仓库 = 官方 v5.5.79 完整包 + 针对一个具体问题的修复。**上游 master 分支已用 Rust 重写**，本仓库基于的是更早的 TypeScript 版完整包，适合仍在用 TS 版的用户。

## 解决了什么问题

**症状**：QCE 的好友/会话列表里只能看到真人好友，**识别不到 QQ 机器人**（以及任何"非好友的单聊会话"：某些服务号、临时会话等），无法选中导出。

**根因**（不是某行 filter 显式丢弃，是分类与前端过滤的衔接漏洞）：

后端 `/api/recent-contacts` 把最近联系人按 chatType 归类时，"非好友的 `chatType=1` 单聊"被标成 `classification='private'`，而前端只合并 `classification='special'` 的会话。**QQ 机器人在 NTQQ 内部 chatType 往往就是 1（普通 C2C 私聊），只是对方不在好友列表**——于是它被夹在 `private` 这个"谁都不要"的分类里，列表里看不到。

## 改了什么（4 处，全部在 QCE 插件后端 TS 源码，前端 bundle 未改）

| # | 文件 | 改动 |
|---|------|------|
| 1 | `plugins/napcat-plugin-qce/lib/api/ApiServer.ts` | `/api/recent-contacts` 在 `includeAll=true` 时，把"非好友的 chatType=1 单聊"从 `private` 升级为 `special`，让前端能合并显示 |
| 2 | 同上 | `/api/recent-contacts` 在 `includeAll=true` 时额外调用无 count 的 `getRecentContactListSync` / `getRecentContactList`，把快照窗口之外、但本地 NTQQ DB 仍存在的会话并入并去重；limit 上限 500→2000 |
| 3 | `plugins/napcat-plugin-qce/lib/api/peerResolution.ts` | `resolvePeerUid` 原来只对 `chatType===1` 做 QQ号→uid 转换，改为对所有单聊型 chatType（复用 `isPrivateLikeChatType`，自动排除群聊 chatType=2）转换 |
| 4 | 同 ApiServer.ts | 给未命名的 special 会话补可读显示名（上限 30，2s 超时，全容错） |

测试：`plugins/napcat-plugin-qce/__tests__/unit/peerResolution.test.ts` 补了 7 个用例（chatType 100/118/201/9 转换、群不转的回归守卫等），`npm test` 在插件目录下 peerResolution 14/14 通过。

> 详细说明见提交历史里的 commit message。

## 怎么用

和官方完整包完全一样：

1. 解压（或 clone）到任意目录。
2. 运行 `launcher-user.bat`（需登录 QQ，支持导出新记录）。
   - 或 `start-standalone.bat`（无需登录，仅浏览已导出文件）。
3. 浏览器访问 `http://localhost:40653/qce-v4-tool`（完整模式需输入控制台显示的访问令牌）。
4. 在好友/会话列表里，原本识别不到的机器人会话现在会出现（可能带"其他/临时会话/服务号"琥珀标签），选中即可导出。

系统要求、常见问题等通用说明请看官方 README 和包内 `NapCat-QCE-Windows-x64/README.txt`。

> **注意**：`launcher.bat` 在"未以管理员身份运行 + 系统未装 Windows Terminal (wt.exe)"时会秒退。请用 `launcher-user.bat`，或以管理员身份运行 `launcher.bat`，或把 `launcher.bat` 第 11 行的 `wt.exe` 改成 `cmd.exe`。

## 和上游的关系

- 上游官方仓库：<https://github.com/shuakami/qq-chat-exporter>
- 本仓库基于的版本：完整包 v5.5.79（NapCat v4.18.8 + QCE 5.5.79），TypeScript 实现。
- 上游 master 已用 **Rust 重写**，架构与本仓库不同。本仓库的 TS 改动**不能直接 patch 到上游**。已就问题根因和修复方向向上游提交 Issue。

**欢迎的使用方式**：直接用本仓库的完整包；或把修复思路移植到上游 Rust 版。

## 致谢

- 原作者 **shuakami**：<https://github.com/shuakami> 及 [qq-chat-exporter](https://github.com/shuakami/qq-chat-exporter) 项目。
- [NapCat / NapNeko](https://github.com/NapNeko/NapCatQQ)。

本仓库的修改部分同样以 GPL-3.0 发布（见下）。

## License

本项目遵循上游声明的 **GPL-3.0** 许可证。原项目版权归原作者 shuakami 所有，本仓库的修改部分以 GPL-3.0 发布。完整许可证文本见 [LICENSE](LICENSE)。



问题反馈:https://github.com/shuakami/qq-chat-exporter/issues/537
现已解决:https://github.com/shuakami/qq-chat-exporter/pull/540 感谢采纳我的意见

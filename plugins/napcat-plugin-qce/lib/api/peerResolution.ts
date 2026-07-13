/**
 * 私聊导出时把数字 QQ 号解析为真正的 NTQQ uid。
 *
 * 旧版 NapCat / 部分 QQNT 客户端没有 UserApi.getUidByUinV2，旧实现里直接调用
 * 会抛 TypeError 让整条导出路径返回 500（issue #353）。这里把解析过程隔离，
 * 任何缺失 / 异常 / 空返回都安全降级到原始 peerUid，让下游用 QQ 号继续尝试。
 *
 * issue #365 之后判定口径与 chatTypeClassification 对齐：只要不是群聊
 * （chatType === 2）都按单聊处理。临时会话（100）、官方 Bot / 服务号
 * （118 / 201）、频道（4 / 9 / 16）等单聊型会话，当 peerUid 是纯数字 QQ 号
 * 时也走 uin→uid 转换；群聊（2）的 groupCode 本身就是数字，必须原样返回。
 */
import { isPrivateLikeChatType } from './chatTypeClassification.js';

export interface PeerLike {
    chatType: number;
    peerUid: string;
}

export interface UserApiLike {
    getUidByUinV2?: (uin: string) => Promise<string | undefined | null>;
}

export interface LoggerLike {
    log: (msg: string) => void;
}

export async function resolvePeerUid(
    peer: PeerLike,
    userApi: UserApiLike | undefined | null,
    logger?: LoggerLike,
): Promise<string> {
    if (!isPrivateLikeChatType(peer.chatType) || !/^\d+$/.test(peer.peerUid)) {
        return peer.peerUid;
    }

    const fn = userApi?.getUidByUinV2;
    if (typeof fn !== 'function') {
        logger?.log(
            `[QCE] UserApi.getUidByUinV2 不可用，沿用原始 peerUid: ${peer.peerUid}`,
        );
        return peer.peerUid;
    }

    try {
        const uid = await fn.call(userApi, peer.peerUid);
        if (uid) {
            logger?.log(`[QCE] chatType=${peer.chatType} QQ号 ${peer.peerUid} 转换为 uid: ${uid}`);
            return uid;
        }
        return peer.peerUid;
    } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        logger?.log(
            `[QCE] chatType=${peer.chatType} QQ号 ${peer.peerUid} 转换 uid 失败，沿用原值: ${msg}`,
        );
        return peer.peerUid;
    }
}

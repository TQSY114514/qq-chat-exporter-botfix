import test from 'node:test';
import assert from 'node:assert/strict';
import { resolvePeerUid } from '../../lib/api/peerResolution.js';

const PRIVATE = 1;
const GROUP = 2;
const TEMP = 100;
const SERVICE = 118;
const SERVICE_201 = 201;
const GUILD = 9;

function recorder() {
    const lines: string[] = [];
    return { log: (msg: string) => lines.push(msg), lines };
}

/** 记录是否被调用过的 userApi mock。 */
function trackingUserApi(impl: (uin: string) => string) {
    const calls: string[] = [];
    return {
        calls,
        api: { getUidByUinV2: async (uin: string) => { calls.push(uin); return impl(uin); } },
    };
}

test('peerResolution: 群聊直接返回 peerUid', async () => {
    const log = recorder();
    const out = await resolvePeerUid(
        { chatType: GROUP, peerUid: '12345' },
        { getUidByUinV2: async () => 'never' },
        log,
    );
    assert.equal(out, '12345');
    assert.equal(log.lines.length, 0);
});

test('peerResolution: peerUid 非纯数字直接返回原值', async () => {
    const out = await resolvePeerUid(
        { chatType: PRIVATE, peerUid: 'u_AbCd123' },
        { getUidByUinV2: async () => 'never' },
    );
    assert.equal(out, 'u_AbCd123');
});

test('peerResolution: getUidByUinV2 返回有效 uid 时使用新值', async () => {
    const log = recorder();
    const out = await resolvePeerUid(
        { chatType: PRIVATE, peerUid: '10001' },
        { getUidByUinV2: async (uin: string) => `u_${uin}_uid` },
        log,
    );
    assert.equal(out, 'u_10001_uid');
    assert.match(log.lines[0]!, /10001/);
});

test('peerResolution: getUidByUinV2 返回空字符串时降级到原 peerUid', async () => {
    const out = await resolvePeerUid(
        { chatType: PRIVATE, peerUid: '10001' },
        { getUidByUinV2: async () => '' },
    );
    assert.equal(out, '10001');
});

test('peerResolution: getUidByUinV2 缺失时降级到原 peerUid（issue #353 回归）', async () => {
    const log = recorder();
    const out = await resolvePeerUid(
        { chatType: PRIVATE, peerUid: '10001' },
        // 旧版 NapCat 上 UserApi 上根本没有 getUidByUinV2
        {},
        log,
    );
    assert.equal(out, '10001');
    assert.equal(log.lines.length, 1);
    assert.match(log.lines[0]!, /\u4e0d\u53ef\u7528/);
});

test('peerResolution: userApi 整体为 undefined 时降级到原 peerUid', async () => {
    const out = await resolvePeerUid(
        { chatType: PRIVATE, peerUid: '10001' },
        undefined,
    );
    assert.equal(out, '10001');
});

test('peerResolution: getUidByUinV2 抛异常时不向上抛，降级到原 peerUid', async () => {
    const log = recorder();
    const out = await resolvePeerUid(
        { chatType: PRIVATE, peerUid: '10001' },
        {
            getUidByUinV2: async () => {
                throw new Error('boom');
            },
        },
        log,
    );
    assert.equal(out, '10001');
    assert.match(log.lines[0]!, /boom/);
});

// issue #365: 临时会话(100) / 官方 Bot 服务号(118/201) / 频道(9) 等单聊型会话，
// 当 peerUid 是纯数字 QQ 号时也要走 uin→uid 转换（issue #364 机器人导出）。

test('peerResolution: 临时会话 chatType=100 数字 peerUid 转换 uid', async () => {
    const log = recorder();
    const out = await resolvePeerUid(
        { chatType: TEMP, peerUid: '123456' },
        { getUidByUinV2: async (uin: string) => `u_${uin}` },
        log,
    );
    assert.equal(out, 'u_123456');
    assert.match(log.lines[0]!, /chatType=100/);
});

test('peerResolution: 服务号 chatType=118 数字 peerUid 转换 uid', async () => {
    const out = await resolvePeerUid(
        { chatType: SERVICE, peerUid: '888' },
        { getUidByUinV2: async (uin: string) => `u_${uin}` },
    );
    assert.equal(out, 'u_888');
});

test('peerResolution: 服务号 chatType=201 数字 peerUid 转换 uid', async () => {
    const out = await resolvePeerUid(
        { chatType: SERVICE_201, peerUid: '999' },
        { getUidByUinV2: async (uin: string) => `u_${uin}` },
    );
    assert.equal(out, 'u_999');
});

test('peerResolution: 频道 chatType=9 数字 peerUid 转换 uid', async () => {
    const out = await resolvePeerUid(
        { chatType: GUILD, peerUid: '777' },
        { getUidByUinV2: async (uin: string) => `u_${uin}` },
    );
    assert.equal(out, 'u_777');
});

// 关键回归守卫：群聊(chatType=2)的 groupCode 也是纯数字，但绝不能被当成
// QQ 号去转 uid——否则群消息抓取会拿到错误 peer。
test('peerResolution: 群聊 chatType=2 数字 peerUid 不调用 getUidByUinV2', async () => {
    const tracker = trackingUserApi(() => 'should-not-be-used');
    const log = recorder();
    const out = await resolvePeerUid(
        { chatType: GROUP, peerUid: '987654321' },
        tracker.api,
        log,
    );
    assert.equal(out, '987654321');
    assert.equal(tracker.calls.length, 0, '群聊不应触发 uin→uid 转换');
    assert.equal(log.lines.length, 0, '群聊原样返回不应记日志');
});

test('peerResolution: 临时会话 chatType=100 但 peerUid 是 u_ 前缀 uid 时原样返回', async () => {
    const tracker = trackingUserApi(() => 'should-not-be-used');
    const out = await resolvePeerUid(
        { chatType: TEMP, peerUid: 'u_aBcD123' },
        tracker.api,
    );
    assert.equal(out, 'u_aBcD123');
    assert.equal(tracker.calls.length, 0, '已是 uid 不应再转换');
});

test('peerResolution: 临时会话 chatType=100 上 getUidByUinV2 缺失时降级（issue #353 回归）', async () => {
    const log = recorder();
    const out = await resolvePeerUid(
        { chatType: TEMP, peerUid: '10001' },
        {},
        log,
    );
    assert.equal(out, '10001');
    assert.equal(log.lines.length, 1);
    assert.match(log.lines[0]!, /不可用/);
});

#!/usr/bin/env node
/**
 * QCE 独立模式启动脚本
 * 无需 NapCat 登录即可运行，用于浏览已导出的聊天记录和资源
 */

async function main() {
    const port = parseInt(process.argv[2]) || 40653;
    
    console.log('[QCE] 正在启动独立模式...');
    
    try {
        // 使用 tsx 加载 TypeScript
        const tsx = await import('tsx/esm/api');
        tsx.register();
        
        // 动态导入 StandaloneServer
        const { startStandaloneServer } = await import('./lib/api/StandaloneServer.ts');
        
        await startStandaloneServer(port);
        
        // 保持进程运行
        process.on('SIGINT', () => {
            console.log('\n[QCE] 正在关闭...');
            process.exit(0);
        });
    } catch (error) {
        console.error('[QCE] 启动失败:', error);
        process.exit(1);
    }
}

main();

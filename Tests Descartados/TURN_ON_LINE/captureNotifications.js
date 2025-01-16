// captureNotifications.js
export async function captureNotifications(page, testInfo) {
    const viewportWidth = await page.evaluate(() => {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    });

    if (viewportWidth >= 1024) {
        // Desktop mode
        const notificationElement = await page.locator('[data-test-id="notification-main"]');
        if (notificationElement) {
            await notificationElement.hover();
        }
        await testInfo.attach('DesktopNotifications', {
            body: await page.screenshot({ fullPage: true }),
            contentType: 'image/png'
        });
        const notificationDiv = await page.locator('[data-test-id="notification-div"]').first();
        if (notificationDiv) {
            await testInfo.attach('LastNotification', {
                body: await notificationDiv.screenshot(),
                contentType: 'image/png'
            });
        }
    } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        // Tablet in portrait mode
        const notificationElement = await page.locator('[data-test-id="notification-main"]');
        if (notificationElement) {
            await notificationElement.click();
        }
        await testInfo.attach('TabletNotifications', {
            body: await page.screenshot({ fullPage: true }),
            contentType: 'image/png'
        });
    } else {
        // Mobile mode
        await page.click('mwc-icon-button.menu');
        await page.click('mwc-list-item#dashboardnotifications');
        await testInfo.attach('NotificationsMobile', {
            body: await page.screenshot({ fullPage: true }),
            contentType: 'image/png'
        });
    }
}

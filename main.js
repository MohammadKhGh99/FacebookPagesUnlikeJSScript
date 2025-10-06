let stopFlag = false;

async function autoRemove() {
    while (!stopFlag) {
        // 1. Tick the "Select all" checkbox
        const selectAll = document.querySelector('input[name="comet_activity_log_select_all_checkbox"]');
        if (selectAll && selectAll.getAttribute("aria-checked") === "false") {
            selectAll.click();
            console.log("✅ 'Select all' checkbox clicked");
            await new Promise(r => setTimeout(r, 1500));
        }

        // 2. Click the main Remove button
        const removeBtn = [...document.querySelectorAll('div[role="button"], button')]
            .find(el => el.innerText.trim().toLowerCase() === "remove");
        if (removeBtn) {
            removeBtn.click();
            console.log("🗑️ Main Remove button clicked");
            await new Promise(r => setTimeout(r, 2500)); // wait for popup
        }

        // 3. Click the popup Remove (inside the dialog "Remove Interaction?")
        const popup = document.querySelector('div[role="dialog"][aria-label="Remove Interaction?"]');
        if (popup) {
            const confirmBtn = [...popup.querySelectorAll('div[role="button"], button')]
                .find(el => el.innerText.trim().toLowerCase() === "remove");
            if (confirmBtn) {
                confirmBtn.click();
                console.log("✅ Popup Remove confirmed");
                await new Promise(r => setTimeout(r, 4000)); // wait for removal to process
            }
        }

        // 4. Scroll to load more
        window.scrollBy(0, 1000);
        console.log("⬇️ Scrolled down...");
        await new Promise(r => setTimeout(r, 5000)); // wait for new content
    }
}

// Start
autoRemove();

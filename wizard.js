/**
 * Riser Fitness Music Setup Wizard
 * 
 * This script handles the wizard state management and UI interactions.
 * 
 * State Variables:
 * - currentSetup: 'sonos' | 'mobile' | 'computer' | 'hardware'
 * - sonosControl: 'mobile' | 'desktop'
 * - mobileDeviceType: 'ios' | 'android' | 'fire'
 * - computerType: 'windows' | 'mac'
 * 
 * Placeholder URLs to replace:
 * - {SOUNDTRACK_LOGIN_URL}
 * - {SONOS_MOBILE_VIDEO_URL}
 * - {SONOS_DESKTOP_VIDEO_URL}
 * - {MOBILE_PLAYER_VIDEO_URL}
 * - {DESKTOP_PLAYER_VIDEO_URL}
 * - {PLAYERONE_VIDEO_URL}
 * - {REMOTE_APP_IOS_URL}
 * - {REMOTE_APP_ANDROID_URL}
 * - {RISER_SUPPORT_PHONE}
 * - {RISER_SUPPORT_EMAIL}
 */

(function() {
    'use strict';

    // =========================================
    // STATE MANAGEMENT
    // =========================================
    const state = {
        currentStep: 1,
        currentSetup: null,      // 'sonos' | 'mobile' | 'computer' | 'hardware'
        sonosControl: null,      // 'mobile' | 'desktop'
        mobileDeviceType: null,  // 'ios' | 'android' | 'fire'
        computerType: null       // 'windows' | 'mac'
    };

    // =========================================
    // DOM REFERENCES
    // =========================================
    const elements = {
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        step3: document.getElementById('step3'),
        progressIndicators: document.querySelectorAll('.step-indicator'),
        step1Cards: document.querySelectorAll('#step1 .setup-card'),
        hardwareContinueBtn: document.getElementById('hardware-continue')
    };

    // Step 2 content sections
    const step2Sections = {
        sonos: document.getElementById('step2-sonos'),
        mobile: document.getElementById('step2-mobile'),
        computer: document.getElementById('step2-computer'),
        hardware: document.getElementById('step2-hardware')
    };

    // Step 3 content sections
    const step3Sections = {
        'sonos-mobile': document.getElementById('step3-sonos-mobile'),
        'sonos-desktop': document.getElementById('step3-sonos-desktop'),
        'mobile': document.getElementById('step3-mobile'),
        'computer': document.getElementById('step3-computer'),
        'hardware': document.getElementById('step3-hardware')
    };

    // =========================================
    // UTILITY FUNCTIONS
    // =========================================
    
    /**
     * Scroll to element with offset
     */
    function scrollToElement(element, offset = 100) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Update progress indicator
     */
    function updateProgressIndicator(step) {
        elements.progressIndicators.forEach((indicator, index) => {
            const stepNum = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNum < step) {
                indicator.classList.add('completed');
            } else if (stepNum === step) {
                indicator.classList.add('active');
            }
        });
    }

    /**
     * Show a wizard step
     */
    function showStep(stepNumber) {
        state.currentStep = stepNumber;
        
        // Update step visibility
        elements.step1.dataset.active = stepNumber >= 1 ? 'true' : 'false';
        elements.step2.dataset.active = stepNumber >= 2 ? 'true' : 'false';
        elements.step3.dataset.active = stepNumber >= 3 ? 'true' : 'false';
        
        updateProgressIndicator(stepNumber);
    }

    /**
     * Hide all Step 2 sections
     */
    function hideAllStep2Sections() {
        Object.values(step2Sections).forEach(section => {
            if (section) section.dataset.visible = 'false';
        });
    }

    /**
     * Hide all Step 3 sections
     */
    function hideAllStep3Sections() {
        Object.values(step3Sections).forEach(section => {
            if (section) section.dataset.visible = 'false';
        });
    }

    /**
     * Clear all card selections in a container
     */
    function clearCardSelections(container) {
        const cards = container.querySelectorAll('.setup-card');
        cards.forEach(card => card.classList.remove('selected'));
    }

    // =========================================
    // STEP 1 HANDLERS
    // =========================================
    
    function handleStep1Selection(option) {
        state.currentSetup = option;
        
        // Clear previous selections
        clearCardSelections(elements.step1);
        
        // Mark selected card
        const selectedCard = document.querySelector(`#step1 .setup-card[data-option="${option}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // Reset Step 2 and 3 state
        state.sonosControl = null;
        state.mobileDeviceType = null;
        state.computerType = null;
        hideAllStep2Sections();
        hideAllStep3Sections();
        
        // Show appropriate Step 2 section
        showStep(2);
        
        if (step2Sections[option]) {
            step2Sections[option].dataset.visible = 'true';
            
            // Clear any previous selections in Step 2
            clearCardSelections(step2Sections[option]);
            
            // Scroll to Step 2
            setTimeout(() => {
                scrollToElement(elements.step2);
            }, 100);
        }
    }

    // =========================================
    // STEP 2 HANDLERS
    // =========================================
    
    function handleSonosStep2Selection(control) {
        state.sonosControl = control;
        
        // Clear previous selections
        clearCardSelections(step2Sections.sonos);
        
        // Mark selected card
        const selectedCard = step2Sections.sonos.querySelector(`.setup-card[data-option="sonos-${control}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // Show Step 3
        hideAllStep3Sections();
        showStep(3);
        
        const step3Key = `sonos-${control}`;
        if (step3Sections[step3Key]) {
            step3Sections[step3Key].dataset.visible = 'true';
            
            setTimeout(() => {
                scrollToElement(elements.step3);
            }, 100);
        }
    }

    function handleMobileStep2Selection(deviceType) {
        state.mobileDeviceType = deviceType;
        
        // Clear previous selections
        clearCardSelections(step2Sections.mobile);
        
        // Mark selected card
        const selectedCard = step2Sections.mobile.querySelector(`.setup-card[data-option="mobile-${deviceType}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // Update mobile device label and app links
        updateMobileDeviceInfo(deviceType);
        
        // Show Step 3
        hideAllStep3Sections();
        showStep(3);
        
        if (step3Sections.mobile) {
            step3Sections.mobile.dataset.visible = 'true';
            
            setTimeout(() => {
                scrollToElement(elements.step3);
            }, 100);
        }
    }

    function handleComputerStep2Selection(computerType) {
        state.computerType = computerType;
        
        // Clear previous selections
        clearCardSelections(step2Sections.computer);
        
        // Mark selected card
        const selectedCard = step2Sections.computer.querySelector(`.setup-card[data-option="computer-${computerType}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }
        
        // Update computer type label and info
        updateComputerTypeInfo(computerType);
        
        // Show Step 3
        hideAllStep3Sections();
        showStep(3);
        
        if (step3Sections.computer) {
            step3Sections.computer.dataset.visible = 'true';
            
            setTimeout(() => {
                scrollToElement(elements.step3);
            }, 100);
        }
    }

    function handleHardwareContinue() {
        // Show Step 3 for hardware/PlayerOne
        hideAllStep3Sections();
        showStep(3);
        
        if (step3Sections.hardware) {
            step3Sections.hardware.dataset.visible = 'true';
            
            setTimeout(() => {
                scrollToElement(elements.step3);
            }, 100);
        }
    }

    // =========================================
    // DYNAMIC CONTENT UPDATES
    // =========================================
    
    function updateMobileDeviceInfo(deviceType) {
        const deviceLabels = {
            'ios': 'iPhone / iPad (iOS)',
            'android': 'Android Phone / Tablet',
            'fire': 'Amazon Fire Tablet'
        };
        
        // Update badge label
        const label = document.getElementById('mobile-device-label');
        if (label) {
            label.textContent = deviceLabels[deviceType] || 'Mobile Device';
        }
        
        // Update app download links
        const appLinksContainer = document.getElementById('mobile-app-links');
        if (appLinksContainer) {
            let linksHTML = '';
            
            switch (deviceType) {
                case 'ios':
                    linksHTML = `
                        <a href="#" class="app-link" target="_blank">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            Download from App Store
                        </a>
                    `;
                    break;
                case 'android':
                    linksHTML = `
                        <a href="#" class="app-link" target="_blank">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M3.18 23l8.82-5.09V6.09L3.18 1v22zM12 6.09v11.82L20.82 23V1L12 6.09z"/>
                            </svg>
                            Download from Google Play
                        </a>
                    `;
                    break;
                case 'fire':
                    linksHTML = `
                        <a href="#" class="app-link" target="_blank">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                            Download from Amazon Appstore
                        </a>
                    `;
                    break;
            }
            
            appLinksContainer.innerHTML = linksHTML;
        }
    }

    function updateComputerTypeInfo(computerType) {
        const typeLabels = {
            'windows': 'Windows PC',
            'mac': 'Mac'
        };
        
        // Update badge label
        const label = document.getElementById('computer-type-label');
        if (label) {
            label.textContent = typeLabels[computerType] || 'Computer';
        }
        
        // Update app download links
        const appLinksContainer = document.getElementById('computer-app-links');
        if (appLinksContainer) {
            let linksHTML = `
                <p>You can use either the desktop app or web browser:</p>
            `;
            
            if (computerType === 'windows') {
                linksHTML += `
                    <a href="#" class="app-link" target="_blank">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z"/>
                        </svg>
                        Download Soundtrack for Windows
                    </a>
                    <a href="#" class="app-link" target="_blank">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        Use Web Player
                    </a>
                `;
            } else {
                linksHTML += `
                    <a href="#" class="app-link" target="_blank">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        Download Soundtrack for Mac
                    </a>
                    <a href="#" class="app-link" target="_blank">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                        Use Web Player
                    </a>
                `;
            }
            
            appLinksContainer.innerHTML = linksHTML;
        }
        
        // Update power settings list
        const powerSettingsList = document.getElementById('power-settings-list');
        if (powerSettingsList) {
            let settingsHTML = '';
            
            if (computerType === 'windows') {
                settingsHTML = `
                    <li>Go to Settings → System → Power & sleep</li>
                    <li>Set "Screen" and "Sleep" to "Never" when plugged in</li>
                    <li>Consider creating a power plan for business hours</li>
                `;
            } else {
                settingsHTML = `
                    <li>Go to System Settings → Battery (or Energy Saver)</li>
                    <li>Disable "Put hard disks to sleep when possible"</li>
                    <li>Set display sleep to a longer duration or "Never"</li>
                    <li>Uncheck "Enable Power Nap"</li>
                `;
            }
            
            powerSettingsList.innerHTML = settingsHTML;
        }
    }

    // =========================================
    // BACK NAVIGATION HANDLERS
    // =========================================
    
    function handleBackToStep(targetStep) {
        if (targetStep === 1) {
            // Reset all state
            state.currentSetup = null;
            state.sonosControl = null;
            state.mobileDeviceType = null;
            state.computerType = null;
            
            // Clear all selections
            clearCardSelections(elements.step1);
            hideAllStep2Sections();
            hideAllStep3Sections();
            
            // Show only Step 1
            showStep(1);
            
            setTimeout(() => {
                scrollToElement(elements.step1);
            }, 100);
        } else if (targetStep === 2) {
            // Reset Step 2 selections but keep Step 1
            state.sonosControl = null;
            state.mobileDeviceType = null;
            state.computerType = null;
            
            hideAllStep3Sections();
            showStep(2);
            
            // Clear Step 2 selections
            if (state.currentSetup && step2Sections[state.currentSetup]) {
                clearCardSelections(step2Sections[state.currentSetup]);
            }
            
            setTimeout(() => {
                scrollToElement(elements.step2);
            }, 100);
        }
    }

    // =========================================
    // EVENT LISTENERS
    // =========================================
    
    function initEventListeners() {
        // Step 1 card clicks
        elements.step1Cards.forEach(card => {
            card.addEventListener('click', () => {
                const option = card.dataset.option;
                if (option) {
                    handleStep1Selection(option);
                }
            });
        });

        // Step 2 Sonos card clicks
        if (step2Sections.sonos) {
            const sonosCards = step2Sections.sonos.querySelectorAll('.setup-card');
            sonosCards.forEach(card => {
                card.addEventListener('click', () => {
                    const option = card.dataset.option;
                    if (option === 'sonos-mobile') {
                        handleSonosStep2Selection('mobile');
                    } else if (option === 'sonos-desktop') {
                        handleSonosStep2Selection('desktop');
                    }
                });
            });
        }

        // Step 2 Mobile card clicks
        if (step2Sections.mobile) {
            const mobileCards = step2Sections.mobile.querySelectorAll('.setup-card');
            mobileCards.forEach(card => {
                card.addEventListener('click', () => {
                    const option = card.dataset.option;
                    if (option === 'mobile-ios') {
                        handleMobileStep2Selection('ios');
                    } else if (option === 'mobile-android') {
                        handleMobileStep2Selection('android');
                    } else if (option === 'mobile-fire') {
                        handleMobileStep2Selection('fire');
                    }
                });
            });
        }

        // Step 2 Computer card clicks
        if (step2Sections.computer) {
            const computerCards = step2Sections.computer.querySelectorAll('.setup-card');
            computerCards.forEach(card => {
                card.addEventListener('click', () => {
                    const option = card.dataset.option;
                    if (option === 'computer-windows') {
                        handleComputerStep2Selection('windows');
                    } else if (option === 'computer-mac') {
                        handleComputerStep2Selection('mac');
                    }
                });
            });
        }

        // Hardware continue button
        if (elements.hardwareContinueBtn) {
            elements.hardwareContinueBtn.addEventListener('click', handleHardwareContinue);
        }

        // Back links
        document.querySelectorAll('.back-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetStep = parseInt(link.dataset.back, 10);
                if (targetStep) {
                    handleBackToStep(targetStep);
                }
            });
        });

        // Keyboard navigation for cards
        document.querySelectorAll('.setup-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    // =========================================
    // VIDEO MODAL
    // =========================================
    
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const openVideoModalBtn = document.getElementById('openVideoModal');
    
    // Store previously focused element for focus restoration
    let previouslyFocusedElement = null;
    
    function openVideoModal() {
        if (!videoModal || !modalVideo) return;
        
        // Store the currently focused element
        previouslyFocusedElement = document.activeElement;
        
        // Show modal
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus the close button for accessibility
        const closeBtn = videoModal.querySelector('.video-modal-close');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
        
        // Try to play video (respects autoplay policies)
        modalVideo.play().catch(() => {
            // Autoplay blocked, user will need to click play
            console.log('Autoplay blocked by browser policy');
        });
    }
    
    function closeVideoModal() {
        if (!videoModal || !modalVideo) return;
        
        // Pause and reset video
        modalVideo.pause();
        modalVideo.currentTime = 0;
        
        // Hide modal
        videoModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Restore focus to the element that opened the modal
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }
    
    function handleModalKeydown(e) {
        if (videoModal.getAttribute('aria-hidden') === 'true') return;
        
        // Close on Escape
        if (e.key === 'Escape') {
            closeVideoModal();
            return;
        }
        
        // Trap focus within modal
        if (e.key === 'Tab') {
            const focusableElements = videoModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
    
    function initVideoModal() {
        if (!videoModal) return;
        
        // Open modal button (Sonos Mobile)
        if (openVideoModalBtn) {
            openVideoModalBtn.addEventListener('click', openVideoModal);
        }
        
        // Open modal button (Sonos Desktop) - uses same modal for now
        const openVideoModalDesktopBtn = document.getElementById('openVideoModalDesktop');
        if (openVideoModalDesktopBtn) {
            openVideoModalDesktopBtn.addEventListener('click', openVideoModal);
        }
        
        // Close modal on overlay or close button click
        videoModal.querySelectorAll('[data-close-modal]').forEach(el => {
            el.addEventListener('click', closeVideoModal);
        });
        
        // Keyboard handling
        document.addEventListener('keydown', handleModalKeydown);
    }

    // =========================================
    // INITIALIZATION
    // =========================================
    
    function init() {
        // Set initial state
        showStep(1);
        updateProgressIndicator(1);
        
        // Initialize event listeners
        initEventListeners();
        
        // Initialize video modal
        initVideoModal();
        
        // Log initialization (can be removed in production)
        console.log('Riser Fitness Music Setup Wizard initialized');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


/**
 * Edge Light — Installation Landing Page Interactivity
 * Features:
 * - Single-open FAQ accordion behavior
 * - Instant download toast notifications & feedback
 * - Smooth scroll navigation for all anchor links & top brand link
 * - Copy UPI ID with instant toast confirmation
 * - Robust, fault-tolerant Razorpay checkout modal & payment link fallback
 */

(function () {
  'use strict';

  // Prevent multiple initializations if script is evaluated more than once
  if (window.__edgeLightLandingInit) return;
  window.__edgeLightLandingInit = true;

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initFAQ();
    initDownloadFeedback();
    initRazorpayCheckout();
    initCopyUPI();
  });

  /* ─── Universal Smooth Scrolling & Back-to-Top ─────────────────── */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#' || targetId === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        let targetEl = null;
        try {
          targetEl = document.getElementById(targetId.slice(1)) || document.querySelector(targetId);
        } catch (_) {
          targetEl = document.getElementById(targetId.slice(1));
        }

        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, targetId);
          }
        }
      });
    });
  }

  /* ─── FAQ Accordion (Single-Open Focus) ─────────────────────────── */
  function initFAQ() {
    const allDetails = document.querySelectorAll('.faq-accordion details');
    allDetails.forEach((targetDetail) => {
      const summary = targetDetail.querySelector('summary');
      if (!summary) return;
      summary.addEventListener('click', () => {
        // Let browser toggle target, then close other open items
        requestAnimationFrame(() => {
          if (targetDetail.hasAttribute('open')) {
            allDetails.forEach((otherDetail) => {
              if (otherDetail !== targetDetail && otherDetail.hasAttribute('open')) {
                otherDetail.removeAttribute('open');
              }
            });
          }
        });
      });
    });
  }

  /* ─── Download Toast & Feedback ───────────────────────────────── */
  function initDownloadFeedback() {
    const downloadButtons = document.querySelectorAll('a[download]');
    downloadButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const fileName = btn.getAttribute('download') || 'Edge.Light.Setup.1.0.12.exe';
        showToast(`Starting download for ${fileName}...`);
      });
    });
  }

  /* ─── Copy UPI ID to Clipboard ────────────────────────────────── */
  function initCopyUPI() {
    const copyElements = document.querySelectorAll('.copy-upi, #copyUpiCode');
    copyElements.forEach((el) => {
      el.addEventListener('click', async (e) => {
        e.preventDefault();
        const rawText = el.getAttribute('data-upi') || el.textContent || 'edgelight@upi';
        const upiText = rawText.replace(/[^\w@.-]/g, '').trim() || 'edgelight@upi';
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(upiText);
          } else {
            const tempInput = document.createElement('input');
            tempInput.style.position = 'fixed';
            tempInput.style.opacity = '0';
            tempInput.value = upiText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
          }
          showToast(`📋 Copied "${upiText}" to clipboard!`);
        } catch (_) {
          showToast(`UPI ID: ${upiText}`);
        }
      });
    });
  }

  /* ─── Toast Notification System ───────────────────────────────── */
  function showToast(message) {
    let toast = document.getElementById('landingToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'landingToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '28px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      toast.style.backgroundColor = 'rgba(18, 20, 29, 0.92)';
      toast.style.border = '1px solid rgba(255, 178, 102, 0.4)';
      toast.style.color = '#ffffff';
      toast.style.padding = '12px 24px';
      toast.style.borderRadius = '999px';
      toast.style.fontSize = '14px';
      toast.style.fontWeight = '500';
      toast.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 178, 102, 0.2)';
      toast.style.backdropFilter = 'blur(12px)';
      toast.style.webkitBackdropFilter = 'blur(12px)';
      toast.style.zIndex = '9999';
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1)';
      toast.style.pointerEvents = 'none';
      toast.style.display = 'flex';
      toast.style.alignItems = 'center';
      toast.style.gap = '8px';
      document.body.appendChild(toast);
    }

    const cleanMsg = message.replace(/^[✨📋⚡]\s*/, '');
    const icon = message.startsWith('📋') ? '📋' : message.startsWith('⚡') ? '⚡' : '✨';
    toast.innerHTML = `<span style="color:#ffb266">${icon}</span> ${cleanMsg}`;

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 3500);
  }

  /* ─── Razorpay Live API Checkout Modal & Seamless Fallback ────── */
  const RAZORPAY_CONFIG = {
    key: 'rzp_live_TbF2T3PxIu4EAn',
    plans: {
      monthly: { amount: 2900, name: 'Monthly Pass', price: 29, link: 'https://rzp.io/rzp/WY3lkA6' },
      quarterly: { amount: 4900, name: '3-Month Pass', price: 49, link: 'https://rzp.io/rzp/01mOm4K' },
      lifetime: { amount: 9900, name: 'Lifetime Pro', price: 99, link: 'https://rzp.io/rzp/K30Pa9v' }
    }
  };

  function initRazorpayCheckout() {
    const payButtons = document.querySelectorAll('.rzp-pay-btn');
    payButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const planId = btn.dataset.plan || 'quarterly';
        const plan = RAZORPAY_CONFIG.plans[planId] || RAZORPAY_CONFIG.plans.quarterly;
        const targetUrl = plan.link || btn.getAttribute('href') || 'https://rzp.io/l/edgelight-3months';

        showToast(`⚡ Launching ${plan.name} (₹${plan.price}) checkout...`);

        if (typeof Razorpay !== 'undefined') {
          try {
            const options = {
              key: RAZORPAY_CONFIG.key,
              amount: plan.amount,
              currency: 'INR',
              name: 'Edge Light',
              description: `${plan.name} License`,
              notes: {
                plan: planId
              },
              theme: {
                color: '#ff9f43'
              },
              handler: function (response) {
                showToast(`Payment successful! ID: ${response.razorpay_payment_id}. License is active.`);
              },
              modal: {
                ondismiss: function () {
                  showToast('Checkout window closed.');
                }
              }
            };

            const rzp = new Razorpay(options);
            rzp.on('payment.failed', function () {
              window.open(targetUrl, '_blank');
            });
            rzp.open();
            return;
          } catch (err) {
            console.warn('[Razorpay] Modal initialization failed, falling back to direct link:', err);
          }
        }

        window.open(targetUrl, '_blank');
      });
    });
  }
})();

$(document).ready(function(){
    console.log("jQuery is ready! - Nur's Module");
    console.log("Pages: booking-form.html, confirmation.html");
    
    // Initialize all tasks
    initAnimatedCounters();    // Task 5
    initLoadingSpinner();      // Task 6
    initCopyToClipboard();     // Task 8
});


// TASK 5: Animated Number Counter
function initAnimatedCounters() {
    console.log("Task 5: Initializing Animated Counters...");
    
    // Check if we're on booking-form page
    if ($('.booking-stats').length === 0) {
        console.log("Stats section not found on this page");
        return;
    }
    
    let statsAnimated = false;
    
    function animateCounter($element) {
        let target = parseInt($element.data('target'));
        
        $({count: 0}).animate({count: target}, {
            duration: 2500,
            easing: 'swing',
            step: function() {
                $element.text(Math.floor(this.count).toLocaleString());
            },
            complete: function() {
                $element.text(target.toLocaleString() + '+');
                console.log('✅ Counter animated to: ' + target);
            }
        });
    }
    
    // Trigger animation when stats section comes into view
    $(window).on('scroll', function() {
        let $stats = $('.booking-stats');
        let statsTop = $stats.offset().top;
        let windowBottom = $(window).scrollTop() + $(window).height();
        
        if (statsTop < windowBottom - 100 && !statsAnimated) {
            console.log('Starting counter animations...');
            animateCounter($('#movieCount'));
            animateCounter($('#userCount'));
            animateCounter($('#bookingCount'));
            statsAnimated = true;
        }
    });
    
    // Trigger immediately if already visible
    $(window).trigger('scroll');
}


// TASK 6: Loading Spinner on Submit
function initLoadingSpinner() {
    
    // Check if booking form exists
    if ($('#bookingForm').length === 0 && $('#customerForm').length === 0) {
        console.log("Booking form not found on this page");
        return;
    }
    
    // Handle form submission
    let $form = $('#bookingForm').length ? $('#bookingForm') : $('#customerForm');
    
    $form.on('submit', function(e) {
        e.preventDefault();
        
        let $btn = $('#submitBtn');
        let $btnText = $('.btn-text');
        let $btnSpinner = $('.btn-spinner');
        
        // Disable button and show spinner
        $btn.prop('disabled', true);
        $btn.addClass('loading');
        $btnText.hide();
        $btnSpinner.show();
        
        // Simulate server call (2 seconds)
        setTimeout(function() {
            // Re-enable button
            $btn.prop('disabled', false);
            $btn.removeClass('loading');
            $btnText.show();
            $btnSpinner.hide();
            
            console.log('✅ Form submitted successfully!');
            
            // Show success notification (if available)
            if (typeof showToast === 'function') {
                showToast('Booking submitted successfully!', 'success');
            } else {
                alert('Booking submitted successfully!');
            }
            
        }, 2000);
    });
}



//TASK 8: Copy to Clipboard Button
function initCopyToClipboard() {    
    // Check if we're on confirmation page
    if ($('#copyBtn').length === 0) {
        console.log("Copy button not found on this page");
        return;
    }
    
    $('#copyBtn').on('click', function() {
        let $btn = $(this);
        let bookingCode = $('#bookingCode').text();
        
        console.log('Attempting to copy: ' + bookingCode);
        
        // Copy to clipboard using modern API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(bookingCode).then(function() {
                // Success - change button appearance
                $btn.addClass('copied');
                $btn.find('.copy-icon').text('✓');
                $btn.find('.copy-text').text('Copied!');
                
                console.log('✅ Copied to clipboard: ' + bookingCode);
                
                // Show tooltip
                let $tooltip = $('<div class="copy-tooltip">Copied to clipboard!</div>')
                    .appendTo('body')
                    .css({
                        position: 'absolute',
                        top: $btn.offset().top - 40 + 'px',
                        left: $btn.offset().left + 'px'
                    })
                    .fadeIn(200);
                
                // Reset button after 2 seconds
                setTimeout(function() {
                    $btn.removeClass('copied');
                    $btn.find('.copy-icon').text('📋');
                    $btn.find('.copy-text').text('Copy');
                    $tooltip.fadeOut(200, function() {
                        $(this).remove();
                    });
                }, 2000);
                
            }).catch(function(err) {
                console.error('❌ Failed to copy:', err);
                alert('Failed to copy. Please select and copy manually.');
            });
        } else {
            // Fallback for older browsers
            console.log('⚠️ Using fallback copy method');
            let $temp = $('<input>');
            $('body').append($temp);
            $temp.val(bookingCode).select();
            document.execCommand('copy');
            $temp.remove();
            
            alert('✅ Booking code copied: ' + bookingCode);
        }
    });
    
}


// ============================================
// Helper Functions
// ============================================

// Show toast notification (reusable)
function showToast(message, type = 'success') {
    let icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    let $toast = $('<div class="jquery-toast">')
        .addClass('toast-' + type)
        .html(`
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `)
        .appendTo('body');
    
    $toast.fadeIn(300).delay(3000).fadeOut(300, function() {
        $(this).remove();
    });
    
    console.log('🔔 Toast shown: ' + message + ' (' + type + ')');
}

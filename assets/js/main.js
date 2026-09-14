/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

/*
	WeSellPC.ca Form Validation & Async Submission Handler
	Integrates cleanly into HTML5 UP Solid State architecture
*/
(function() {
    'use strict';

    // 1. Locate the footer form elements
    const footerForm = document.querySelector('#footer form');
    if (!footerForm) return;

    // 2. Attach submission event interception
    footerForm.addEventListener('submit', function(event) {
        // Prevent default submission page reload redirect
        event.preventDefault();

        const submitButton = footerForm.querySelector('input[type="submit"]');
        const originalButtonText = submitButton.value;

        // 3. Client-Side Validation Checks
        const emailField = document.getElementById('email');
        const provinceField = document.getElementById('province');
        const hardwareField = document.getElementById('hardware-type');

        // Ensure a valid Canadian corporate email structure (basic validation fallback)
        if (!emailField.value.includes('@') || emailField.value.trim().length < 5) {
            alert('Please enter a valid business email address.');
            emailField.focus();
            return false;
        }

        // Ensure selectors are picked
        if (provinceField.value === "" || hardwareField.value === "") {
            alert('Please complete all selection dropdown criteria before submitting.');
            return false;
        }

        // 4. Update UI State to "Sending..."
        submitButton.disabled = true;
        submitButton.value = 'Sending Quote Request...';
        submitButton.style.backgroundColor = '#0070f3'; // Matches enterprise theme accent

        // 5. Package form data securely
        const formData = new FormData(footerForm);

        // 6. Execute modern asynchronous Fetch request to your endpoint action URL
        fetch(footerForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success Handling: Inject an animated confirmation block
                footerForm.innerHTML = `
                    <div style="padding: 2.5rem; text-align: center; border: 2px dashed #00cca3; border-radius: 8px; background: rgba(0, 204, 163, 0.05);">
                        <h3 style="color: #00cca3; margin-bottom: 0.5rem;" class="major">🚀 Quote Request Received!</h3>
                        <p style="margin-bottom: 0;">Thank you. Our Canadian procurement specialists are reviewing your configuration request. A custom PDF quote will be dispatched to <strong>${emailField.value}</strong> within 1 business hour.</p>
                    </div>
                `;
            } else {
                // Backend-level response rejection handler
                throw new Error('Server rejected submission data form bundle.');
            }
        })
        .catch(error => {
            // Error Handling Strategy: Restore form stability so user can re-try
            alert('Oops! There was an issue processing your submission connection. Please try again or reach us directly at sales@wesellpc.ca.');
            submitButton.disabled = false;
            submitButton.value = originalButtonText;
            submitButton.style.backgroundColor = ''; 
            console.error('Form submission diagnostic error:', error);
        });
    });
})();

})(jQuery);
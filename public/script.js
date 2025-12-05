document.querySelectorAll('nav a').forEach(link => {
link.addEventListener('click', e => {
e.preventDefault();
const target = document.querySelector('#' + link.textContent.toLowerCase().replace(/ /g, '-'));
if (target) {
window.scrollTo({ top: target.offsetTop - 50, behavior: 'smooth' });
}
});
});

document.querySelectorAll('.btn').forEach(btn => {
btn.addEventListener('click', () => {
console.log('Button clicked:', btn.textContent);
});
});

// Position the decorative pepper so its center aligns with the seam between
// .footer-cta (purple) and .footer-links (white). This computes the seam
// and sets the absolute top on the pepper element. Runs on load and resize.
function positionDecorPepper() {
	const pepper = document.querySelector('.decor-pepper');
	const footerCta = document.querySelector('.footer-cta');
	const footer = document.querySelector('footer');
	if (!pepper || !footerCta || !footer) return;

	// Compute seam position relative to the footer container
	const ctaRect = footerCta.getBoundingClientRect();
	const footerRect = footer.getBoundingClientRect();
	// seamY is distance from top of footer to bottom of footer-cta
	const seamY = (ctaRect.bottom - footerRect.top);

	// Set pepper top so its center is at seamY (use translateY(-50%) in CSS)
	pepper.style.top = Math.round(seamY) + 'px';

	// Ensure pepper is visible and not interfering with pointer events
	pepper.style.pointerEvents = 'none';
}

window.addEventListener('DOMContentLoaded', positionDecorPepper);
window.addEventListener('resize', () => {
	// throttle a little for performance
	clearTimeout(window._pepperTimer);
	window._pepperTimer = setTimeout(positionDecorPepper, 120);
});
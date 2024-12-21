import './style.scss';

const el_body = document.body;
const el = document.documentElement;

const fullScreenFn = el.requestFullscreen;
	// || el.webkitMatchesSelector
	// || el.mozRequestFullScreen
	// || el.msRequestFullscreen;

const toggleBrightness = () => {
	if (!el_body.classList.contains('on')) {
		el_body.classList.add('on');
	} else {
		el_body.classList.remove('on');
	}
};

const toggleFullscreen = async () => {
	if (document.fullscreenElement === null) {
		await fullScreenFn.call(el);
	} else {
		await document.exitFullscreen();
	}
};

const main = () => {
	if (fullScreenFn !== null) {
		el_body.addEventListener('click', toggleFullscreen);
	}
		el_body.addEventListener('click', toggleBrightness);

};
main();

import { Notify } from 'quasar';

export default ({ Vue }) => {
	Notify.setDefaults({
		position: 'top'
	});

	Vue.prototype.$q.notify.positive = (message, position) => {
		let params = {
			message,
			type: 'positive',
			actions: [{ icon: 'close', color: 'white' }]
		};
		if (position) {
			params.position = position;
		}
		Notify.create(params);
	};

	Vue.prototype.$q.notify.negative = (message, position) => {
		let params = {
			message,
			type: 'negative',
			actions: [{ icon: 'close', color: 'white' }]
		};
		if (position) {
			params.position = position;
		}
		Notify.create(params);
	};

	Vue.prototype.$q.notify.info = (message, position) => {
		let params = {
			message,
			type: 'info',
			actions: [{ icon: 'close', color: 'white' }]
		};
		if (position) {
			params.position = position;
		}
		Notify.create(params);
	};

	Vue.prototype.$q.notify.warning = (message, position) => {
		let params = {
			message,
			type: 'warning',
			actions: [{ icon: 'close', color: 'black' }]
		};
		if (position) {
			params.position = position;
		}
		Notify.create(params);
	};
};

<template>
	<q-layout view="lHh Lpr lFf">
		<q-page-container>
<!--			<router-view/>-->
			<sub-converter/>
		</q-page-container>
	</q-layout>
</template>

<script>
import SubConverter from 'pages/SubConverter';
export default {
	name: 'MainLayout',
	components: { SubConverter },
	data () {
		return {};
	}
};
</script>

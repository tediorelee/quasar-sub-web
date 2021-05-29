<template>
	<q-page padding>
		<q-card class="shadow-1">
			<q-card-section
				class="row q-mx-sm q-px-lg q-py-none justify-between flex-center card-header"
			>
				<div class="row q-col-gutter-md">
					<span>🚀订阅转换</span>
					<q-icon size="xs" @click="toGitHub">
						<svg t="1622295842279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4086" width="200" height="200"><path d="M511.968 73.152q119.424 0 220.288 58.848t159.712 159.712 58.848 220.288q0 143.424-83.712 258.016t-216.288 158.56q-15.424 2.848-22.848-4t-7.424-17.152q0-1.728 0.288-43.712t0.288-76.864q0-55.424-29.728-81.152 32.576-3.424 58.56-10.272t53.728-22.272 46.272-38.016 30.272-60 11.712-86.016q0-68-45.152-117.728 21.152-52-4.576-116.576-16-5.152-46.272 6.272t-52.576 25.152l-21.728 13.728q-53.152-14.848-109.728-14.848t-109.728 14.848q-9.152-6.272-24.288-15.424t-47.712-22.016-48.576-7.712q-25.728 64.576-4.576 116.576-45.152 49.728-45.152 117.728 0 48.576 11.712 85.728t30.016 60 46.016 38.272 53.728 22.272 58.56 10.272q-22.272 20.576-28 58.848-12 5.728-25.728 8.576t-32.576 2.848-37.44-12.288-31.712-35.712q-10.848-18.272-27.712-29.728t-28.288-13.728l-11.424-1.728q-12 0-16.576 2.56t-2.848 6.56 5.152 8 7.424 6.848l4 2.848q12.576 5.728 24.864 21.728t18.016 29.152l5.728 13.152q7.424 21.728 25.152 35.136t38.272 17.152 39.712 4 31.712-2.016l13.152-2.272q0 21.728 0.288 50.56t0.288 31.136q0 10.272-7.424 17.152t-22.848 4q-132.576-44-216.288-158.56t-83.712-258.016q0-119.424 58.848-220.288t159.712-159.712 220.288-58.848zM239.392 703.424q1.728-4-4-6.848-5.728-1.728-7.424 1.152-1.728 4 4 6.848 5.152 3.424 7.424-1.152zM257.12 722.848q4-2.848-1.152-9.152-5.728-5.152-9.152-1.728-4 2.848 1.152 9.152 5.728 5.728 9.152 1.728zM274.272 748.576q5.152-4 0-10.848-4.576-7.424-9.728-3.424-5.152 2.848 0 10.272t9.728 4zM298.272 772.576q4.576-4.576-2.272-10.848-6.848-6.848-11.424-1.728-5.152 4.576 2.272 10.848 6.848 6.848 11.424 1.728zM330.848 786.848q1.728-6.272-7.424-9.152-8.576-2.272-10.848 4t7.424 8.576q8.576 3.424 10.848-3.424zM366.848 789.728q0-7.424-9.728-6.272-9.152 0-9.152 6.272 0 7.424 9.728 6.272 9.152 0 9.152-6.272zM399.968 784q-1.152-6.272-10.272-5.152-9.152 1.728-8 8.576t10.272 4.576 8-8z" p-id="4087"></path></svg>
					</q-icon>
				</div>
				<div>
					<q-btn flat round :icon="darkModeIcon" color="primary" @click="darkModeToggle"/>
					<q-btn flat round icon="language" color="primary" @click="lang = !lang"/>
				</div>
			</q-card-section>
			<q-separator/>
			<q-card-section class="q-mx-sm q-pa-lg">
				<div class="row q-col-gutter-sm justify-between q-mb-md">
					<div>
						<q-toggle :disable="advanced" v-model="advanced" :label="$t('sub.text.advanced')"/>
						<q-toggle v-model="form.emoji" :label="$t('sub.text.emoji')"/>
						<q-toggle v-model="form.tpl.clash.doh" :label="$t('sub.text.clashDOH')"/>
						<q-toggle v-model="form.new_name" :label="$t('sub.text.clashNewFiled')"/>
						<q-toggle v-model="form.udp" :label="$t('sub.text.enableUDP')"/>
						<q-checkbox v-model="form.nodeList" :label="$t('sub.text.outputNodeList')"/>
					</div>
					<div>
						<q-btn
							color="negative"
							class="q-mr-sm"
							:label="$t('sub.text.generate')"
							@click="generateURL"
						/>
						<q-btn
							color="primary"
							:label="$t('sub.text.importToClash')"
							:disable="customSubUrl.length === 0"
							@click="importClash"
							/>
					</div>
				</div>
				<div class="row q-col-gutter-lg">
					<q-input filled hide-bottom-space
						type="textarea"
						class="col-12"
						v-model="$v.form.sourceSubUrl.$model"
						:label="$t('sub.text.subLink')"
						:hint="$t('sub.text.subLinkDesc')"
						:error="$v.form.sourceSubUrl.$anyError"
						:error-message="$t('sub.text.error')"
					/>
					<q-select filled hide-bottom-space
						map-options emit-value clearable
						class="col-12"
						v-model="form.clientType"
						:label="$t('sub.text.client')"
						:options="options.clientTypes"
						:hint="$t('sub.text.clientDesc')"
					/>
					<q-select filled hide-bottom-space
						map-options emit-value disable
						class="col-12"
						v-model="form.remoteConfig"
						:label="$t('sub.text.remoteConfig')"
						:options="options.remoteConfig"
					/>
					<q-input filled hide-bottom-space
						class="col-12"
						v-model="form.filename"
						:label="$t('sub.text.fileName')"
						:hint="$t('sub.text.customFileName')"
					/>
				</div>
				<q-separator class="q-my-lg"/>
				<q-input filled hide-bottom-space
					class="col-12"
					v-model="customSubUrl"
					:label="$t('sub.text.subURL')"
				>
					<template v-slot:append>
						<q-btn round dense flat icon="content_copy" @click="copyLink" :disable="customSubUrl.length === 0"/>
					</template>
				</q-input>
			</q-card-section>
		</q-card>
	</q-page>
</template>

<script>
import { copyToClipboard, openURL } from 'quasar';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
// const project = process.env.VUE_APP_PROJECT;

const defaultBackend =
	'https://api.wcc.best' + '/sub?';

export default {
	name: 'SubConverter',
	mixins: [validationMixin],
	data () {
		return {
			advanced: true,
			customSubUrl: '',
			lang: false,
			form: {
				sourceSubUrl: '',
				clientType: '',
				customBackend: '',
				remoteConfig: 'https://tedioreleeblog.pek3b.qingstor.com/clash.ini',
				excludeRemarks: '',
				includeRemarks: '',
				filename: '',
				emoji: true,
				nodeList: false,
				extraset: false,
				sort: false,
				udp: false,
				tfo: false,
				scv: false,
				fdn: false,
				appendType: false,
				insert: false, // 是否插入默认订阅的节点，对应配置项 insert_url
				new_name: true, // 是否使用 Clash 新字段

				// tpl 定制功能
				tpl: {
					surge: {
						doh: false // dns 查询是否使用 DoH
					},
					clash: {
						doh: true
					}
				}
			},
			options: {
				clientTypes: [
					{
						label: 'Clash',
						value: 'clash'
					},
					{
						label: 'Surge4',
						value: 'surge&ver=4'
					},
					{
						label: 'QuantumultX',
						value: 'quanx'
					}
				],
				backendOptions: [{ value: 'http://127.0.0.1:25500/sub?' }],
				remoteConfig: [
					{
						label: 'TEDIORELEE',
						value:
							'https://tedioreleeblog.pek3b.qingstor.com/clash.ini'
					}
				]
			}
		};
	},
	validations () {
		return {
			form: {
				sourceSubUrl: {
					required
				},
				clientType: {},
				customBackend: {},
				remoteConfig: {},
				excludeRemarks: {},
				includeRemarks: {},
				filename: {},
				emoji: {},
				nodeList: {},
				extraset: {},
				sort: {},
				udp: {},
				tfo: {},
				scv: {},
				fdn: {},
				appendType: {},
				insert: {}, // 是否插入默认订阅的节点，对应配置项 insert_url
				new_name: {}, // 是否使用 Clash 新字段

				// tpl 定制功能
				tpl: {
					surge: {
						doh: {} // dns 查询是否使用 DoH
					},
					clash: {
						doh: {}
					}
				}
			}
		};
	},
	computed: {
		darkModeIcon () {
			return this.$q.dark.isActive ? 'light_mode' : 'dark_mode';
		},
		languages () {
			return [
				{
					label: 'English',
					labelShort: 'EN',
					code: 'en-us'
				},
				{
					label: '简体中文',
					labelShort: '中',
					code: 'zh-cn'
				}
			];
		}
	},
	watch: {
		'lang' () {
			if (this.lang) {
				this.$i18n.locale = 'zh-hans';
			} else {
				this.$i18n.locale = 'en-us';
			}
		}
	},
	mounted () {
		this.form.clientType = 'clash';
		this.welcomeMsg();
	},
	methods: {
		darkModeToggle () {
			this.$q.dark.toggle();
		},
		copyLink () {
			copyToClipboard(this.customSubUrl).then(() => {
				this.$q.notify.positive(this.$t('sub.text.linkCopiedMsg'));
			});
		},
		generateURL () {
			this.$v.form.$touch();
			if (this.$v.form.$error || this.$v.form.$anyError) {
				// this.$q.notify.negative(this.$t('sub.text.error'));
				return false;
			}

			let sourceSub = this.form.sourceSubUrl;
			sourceSub = sourceSub.replace(/(\n|\r|\n\r)/g, '|');

			this.customSubUrl =
				defaultBackend +
				'target=' +
				this.form.clientType +
				'&url=' +
				encodeURIComponent(sourceSub) +
				'&insert=' +
				this.form.insert;

			if (this.advanced) {
				if (this.form.remoteConfig !== '') {
					this.customSubUrl +=
						'&config=' + encodeURIComponent(this.form.remoteConfig);
				}
				if (this.form.excludeRemarks !== '') {
					this.customSubUrl +=
						'&exclude=' + encodeURIComponent(this.form.excludeRemarks);
				}
				if (this.form.includeRemarks !== '') {
					this.customSubUrl +=
						'&include=' + encodeURIComponent(this.form.includeRemarks);
				}
				if (this.form.filename !== '') {
					this.customSubUrl +=
						'&filename=' + encodeURIComponent(this.form.filename);
				}
				if (this.form.appendType) {
					this.customSubUrl += '&append_type=' + this.form.appendType.toString();
				}

				this.customSubUrl +=
					'&emoji=' +
					this.form.emoji.toString() +
					'&list=' +
					this.form.nodeList.toString() +
					'&tfo=' +
					this.form.tfo.toString() +
					'&scv=' +
					this.form.scv.toString() +
					'&fdn=' +
					this.form.fdn.toString() +
					'&sort=' +
					this.form.sort.toString();

				if (this.form.udp) {
					this.customSubUrl += '&udp=' + this.form.udp.toString();
				}

				if (this.form.tpl.surge.doh) {
					this.customSubUrl += '&surge.doh=true';
				}

				if (this.form.clientType === 'clash') {
					if (this.form.tpl.clash.doh) {
						this.customSubUrl += '&clash.doh=true';
					}

					this.customSubUrl += '&new_name=' + this.form.new_name.toString();
				}
			}
		},
		welcomeMsg () {
			this.$q.notify.info(this.$t('本服务基于@CareyWang/sub-web搭建，请输入你的订阅链接，选择对应的远程即可。'));
		},
		importClash () {
			const url = 'clash://install-config?url=';
			openURL(url + encodeURIComponent(this.customSubUrl));
		},
		toGitHub () {
			openURL('https://github.com/tediorelee/quasar-sub-web');
		}
	}
};
</script>

<style scoped>

</style>

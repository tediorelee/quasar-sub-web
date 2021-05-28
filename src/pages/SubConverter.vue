<template>
	<q-page padding>
		<q-card class="shadow-1">
			<q-card-section
				class="row q-mx-sm q-px-lg q-py-none justify-between flex-center card-header"
			>
				<div class="row q-col-gutter-md">
					<span>🚀订阅转换</span>
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
						v-model="form.sourceSubUrl"
						:label="$t('sub.text.subLink')"
						:hint="$t('sub.text.subLinkDesc')"
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
						hint="返回的订阅文件名"
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

// const project = process.env.VUE_APP_PROJECT;

const defaultBackend =
	'https://api.wcc.best' + '/sub?';

export default {
	name: 'SubConverter',
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
						doh: false
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
			if (this.form.sourceSubUrl === '' || this.form.clientType === '') {
				this.$q.notify.negative(this.$t('sub.text.error'));
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
		}
	}
};
</script>

<style scoped>

</style>

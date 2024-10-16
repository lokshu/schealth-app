<template>
	<view class="privacy-page">
		<view class="bg-qian-purple pf public-top" style="max-width: 800px; top: 0; left: 0; right: 0; margin: auto; z-index: 10;">
			<view class="flex align-center justify-between" style="padding: 20rpx 15rpx;">
				<view class="" style="width: 20%;">
					<uni-icons type="back" class="top-back-btn color-purple1" size="" style="font-size: 45rpx; margin-right: 20rpx; margin-top: -5rpx;"
						@click="$back"></uni-icons>
				</view>
				<view class="text-center font-bold color-purple1" style="font-size: 40rpx; width: 60%;">
					隱私權政策
				</view>
				<view class="" style="width: 20%;"></view>
			</view>
		</view>
		<view class="public-top" style="height: 120rpx;"></view>
		<text class="bg-view"
			style="width: 95%; margin: 0 auto; display: block; overflow: hidden; padding: 30rpx; box-sizing: border-box; border-radius: 30rpx;">
			
			SC Health 致力為每位病人提供個人化的優質服務。不論性別、語言、種族、信奉的宗教、身體狀況、以及其社會及經濟狀況， 病人均擁有以下的權利和責任。
			
			1.收集個人資料的目的將在收集之前或收集時確定
			
			2.收集的所有個人資料將僅用於收集該等資料的目的、或直接相關的目的、或協助閣下進行查詢或預約、或用於其他相符目的、或閣下和SC Health 之間可能同意的任何其他目的，除非SC Health 獲得有關人士的同意或被法律或法院命令要求
			
			3.SC Health 會保存個人資料至達到與上述收集資料的目的爲止，除非上述個人資料可根據任何適用法規或合約規定須予以保存。
			
			4.SC Health 將採取切實可行的步驟，以確保在顧及有關的個人資料被使用於或會被使用於的目的下，該個人資料是準確的。
			
			5.電腦數據存放在取用資料受嚴格監管的電腦系統及儲存媒體內。在SC Health 持有、使用及/或傳送閣下的個人資料的情況下，將有足夠的保護措施防止個人資料意外的及/或未獲准許的存取、披露、複製、使用、銷毀或修改。
			
			6.我們所持有的全部個人資料將予以保密，然而SC Health 可在有需要披露該等資料以達到收集該等資料之目的時，向下述人士披露該等資料：
			
			a.任何附屬公司、控股公司、聯繫公司、關聯公司／人士，或由SC Health 控制的公司；
			
			b.任何代表SC Health 或與SC Health 聯營的個人或公司，以達到提供該等資料之目的;
			
			c.有責任為SC Health 對上述資料保密的任何其他人士或公司，而該人士或公司已承諾將該等資料予以保密及有法定的權利取用該等資料;
			
			d.SC Health 的經銷商、代理、承辦商、供應商及其他電訊、資訊服務商和內容供應商;
			
			e.SC Health 的專業顧問，包括會計師、審計師及律師
			
			f.由法律或法院命令規定或授權的政府和監管機關及其他組織。如在該披露下個人資料將轉移至香港境外，我們將就該轉移先徵詢閣下的書面同意。凡假使該資料在香港以某方式收集、持有、處理或以任何方式使用，便會屬違反《個人資料(私隱)條例》（第486章）（「條例」）下的規定，SC Health 會採取所有合理的預防措施及作出所有應作出的努力，以確保該資料不會在該地方以該方式收集、持有、處理或以任何方式使用。
			
			7.個人資料可能根據任何法定或合約責任或法院要求被披露予任何人，但他／他們須證明其取用該等資料的權利或權能。
			
			8.個人資料亦可能根據條例第VIII部分被披露，其中有關個人資料獲條例之條文豁免。
			
			9.閣下有權確定SC Health 是否持有閣下的任何個人資料。如SC Health 持有，閣下有權獲取該等資料的副本，並要求SC Health 更正其所擁有的不準確的個人資料
			
			10.SC Health 將隨時向客戶提供我們有關個人資料管理的政策和實務的資料
			
			11.SC Health 可使用閣下的個人資料發出直接促銷傳訊，我們會先徵詢閣下的同意，並提供機會予閣下選擇不接收該等傳訊。在隨後每一次向閣下發出的直接促銷傳訊，SC Health 會提供機會予閣下選擇停止將個人資料用於其後的促銷
			
			12.如此私隱政策聲明的英文版本與其中文版本有任何不一致或不清晰之處，應以英文版本爲準
			
			閣下可根據條例致函SC Health 提出書面要求，以要求查閱及/或更正閣下的個人資料。
			SC Health 保留在無需作任何事先通知的情況下不時修改或更改本政策的權利。本私隱政策聲明的任何更改在發布後立即生效。
			
			
		</text>
		<view class="" style="height: 50rpx;"></view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				content: '',
			}
		},
		onLoad() {
			//this.inner()
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop;
		},
		methods: {
			inner() {
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.request({
					url: "/api/news/detail?id=11",
					method: 'GET',
					data: {},
					dataType: 'json',
					success: res => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						if (res.data.code == 0) {
							this.content = res.data.data.content;

						} else {
							app.globalData.showToast(res.data.message);

						}
					},
					fail: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
						app.globalData.showToast('服务器请求出错');
					}
				});

			},
			back() {
				// uni.navigateBack();
				let canNavBack = getCurrentPages();
				if (canNavBack && canNavBack.length > 1) {
					uni.navigateBack({
						delta: 1
					});
				} else {
					history.back();
				}
			}
		}
	}
</script>

<style>

</style>

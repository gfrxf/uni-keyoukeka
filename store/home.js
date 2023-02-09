import {
	defineStore
} from 'pinia'
import {
	getHomeMutidata,
	getMyData,
	getAllData,

} from '@/service/home'



export const useHomeStore = defineStore('home', {
	state: () => {
		return {
			mydata: [],
			alldata: []

		}
	},
	actions: {

		// 获取首页轮播图和推荐栏的数据(异步的action)
		// async fetchHomeMultidata() {
		// 	const res = await getHomeMutidata()
		// 	console.log(res.data,'store');
		// 	this.banners = res.data.banner.list || []
		// 	this.recommends = res.data.recommend.list || []
		// },
		async fetchMyData(openId) {
			const res = await getMyData(openId)
			this.mydata = res.data || []
			// this.mydata = []
			// console.log(res, 'my');
			console.log(this.mydata);
		},
		async fetchAllData() {
			const res = await getAllData()
			this.alldata = res.data || []
			// console.log(res, 'all');
			// console.log(this.alldata.value);
		},


	}
})

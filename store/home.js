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
			alldata: [],
			isAdd: false

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
		async fetchMyData(openid) {
			console.log(111);
			const res = await getMyData(openid)
			if (res.data.length !== undefined) {

				this.changeAdd()
				console.log(this.isAdd, 'isadd');
			}
			this.mydata = res.data || []
			console.log(this.mydata);
			// this.mydata = []



		},
		async fetchAllData() {
			const res = await getAllData()
			this.alldata = res.data || []
			// console.log(res, 'all');
			// console.log(this.alldata.value);
		},
		changeAdd() {
			this.isAdd = true;
		}


	}
})

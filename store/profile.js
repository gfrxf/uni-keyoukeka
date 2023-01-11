import { defineStore } from 'pinia'
import { getHomeMutidata } from '@/service/home'



export const useProfileStore = defineStore('profile', {
	state: () => {
		return {
			nickName : "",
			avatarUrl : "",
			openid:""
		}
	},
	actions: {
		
		// 修改用户名，和头像,openid
		setnickName (name){
			this.nickName = name
			console.log(this.nickName,'nicname');
		},
		setavatarUrl (url){
			this.avatarUrl = url
			console.log(this.avatarUrl,'avatar')
		},
		setopenid(id){
			this.openid = id
			console.log(this.openid,'storeopenid');
		}
		
	}
})
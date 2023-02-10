import DxRequest from './index.js'

export const getDakaData = () => {
	return DxRequest.get('/user/clockIndex', {})
}

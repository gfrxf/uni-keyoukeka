import DxRequest from './index.js'

export const getDakaData = () => {
	return DxRequest.get('/user/clockIndex', {})
}

export const daka = () => {
	return DxRequest.post('/user/clock', {})
}

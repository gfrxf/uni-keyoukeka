import DxRequest from './index.js'

export const getHomeMutidata = () => {
	return DxRequest.get('/home/multidata', {})
}

export const getMyData = (openId) => {
	return DxRequest.get('/article/list', {
		openId
	})

}

export const getAllData = () => {
	return DxRequest.get('/article/list', {

	})
}

export const getDetails = (id) => {
	return DxRequest.get('/article/detail', {
		id
	})
}
export const addDisease = (arr) => {
	console.log(arr, 'arr');
	return DxRequest.post('/article/addMyArticle', {
		arr
	})
}


// import hyRequest from './index.js'

// // http://152.136.185.210:7878/api/hy66/home/multidata
// export const getHomeMutidata = () => {
// 	return hyRequest.get('/home/multidata', {})
// }

// // http://152.136.185.210:7878/api/hy66/home/data?type=pop&page=20
// export const getHomeData = (type, page) => {
// 	return hyRequest.get('/home/data', {
// 		type,
// 		page
// 	})
// }

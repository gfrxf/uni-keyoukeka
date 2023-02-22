import DxRequest from './index.js'

export const changenickname = (chatName) => {
	console.log(chatName, 'chatName.');
	return DxRequest.post('/user/editChatName', chatName)
}

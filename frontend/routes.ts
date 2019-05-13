const route = require('next-routes')()

route
.add('info')
.add('post/all', '/post')
.add('post', '/post/:postId')
.add('board/subcategory', '/board/:category/:subcategory/:page')
.add('board/category', '/board/:category/:page')
.add('post/list', '/post/list/:page')

module.exports = route
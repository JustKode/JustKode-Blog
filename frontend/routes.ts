const route = require('next-routes')()

route
.add('info')
.add('post/all', '/post')
.add('post', '/post/:postId')
.add('post/list/subcategory', '/post/list/:category/:subcategory/:page')
.add('post/list/category', '/post/list/:category/:page')
.add('post/list', '/post/list/:page')

module.exports = route
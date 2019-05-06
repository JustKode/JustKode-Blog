const route = require('next-routes')()

route
.add('info')
.add('post', '/post/:postId')

export default route
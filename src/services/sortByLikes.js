const sortBlogs = (blogs) => {
    return blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
}

export default { sortBlogs }
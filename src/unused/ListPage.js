import Post from './Post.js'

const ListPage = ({ searchResults }) => {

	const results = searchResults.map(post => <Post key={post.id} post={post} />)


	const content = results?.length ? results : <article><p>No Matching Posts</p></article>

	return (
		<main>{content}</main>
	)
}

export default ListPage
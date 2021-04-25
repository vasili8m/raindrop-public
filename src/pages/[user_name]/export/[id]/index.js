import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { getHTML } from '~pages/api/oembed/collection'

import Page from '~co/page'
import Path from '~co/raindrops/path'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name } }) {
	const [ collection, user ] = await Promise.all([
		Api.collection.get(id),
		Api.user.getByName(user_name)
	])

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!collection || !user || user._id != collection.user?.$id)
		return {
			props: {
				statusCode: 404
			},
			revalidate: 10
		}

    const html = getHTML({ user, collection })

	return {
		props: {
			collection,
            user,
            html
		},
		revalidate: 3
	}
}

export default function EmbedScreen({ statusCode, collection, user, html }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap accentColor={collection.color}>
			<Head>
				<title>Export {collection.title}</title>
				<meta name='robots' content='noindex' />
			</Head>

			<Path 
				self
				collection={collection}
				user={user} />

			<Page.Header.Wrap>
				<Page.Header.Title>Export & Embed</Page.Header.Title>
			</Page.Header.Wrap>

			<Page.Content>
				<textarea value={html} readOnly />

				<div dangerouslySetInnerHTML={{__html: html}} />
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}
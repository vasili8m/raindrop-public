import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { getHTML } from '../../oembed/[id]'

import Page from '~co/page'
import Link from 'next/link'
import Button from '~co/button'
import Icon from '~co/icon'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name } }) {
	const collection = await Api.collection.get(id)

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!collection)
		return {
			props: {
				statusCode: 404
			},
			revalidate: 10
		}

    const html = getHTML(user_name, collection)

	return {
		props: {
			collection,
            user_name,
            html
		},
		revalidate: 3
	}
}

export default function EmbedScreen({ statusCode, collection, user_name, html }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap accentColor={collection.color}>
			<Head>
				<title>Export {collection.title}</title>
				<meta name='robots' content='noindex' />
			</Head>

			<Page.Header.Wrap>
				<Page.Header.Title>
					<h2>
						<Icon name='arrow-left' size='small' />

						<Link href={`/${user_name}/${collection.slug}-${collection._id}`}>
							<a>{collection.title}</a>
						</Link>
					</h2>

					<h1>Export & Embed</h1>
				</Page.Header.Title>
			</Page.Header.Wrap>

			<Page.Content>
				<textarea value={html} />

				<div dangerouslySetInnerHTML={{__html: html}} />
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}
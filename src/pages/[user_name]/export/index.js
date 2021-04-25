import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { getHTML } from '~pages/api/oembed/user'

import Page from '~co/page'
import Path from '~co/raindrops/path'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name } }) {
	const user = await Api.user.getByName(user_name)

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!user)
		return {
			props: {
				statusCode: 404
			},
			revalidate: 10
		}

    const html = getHTML({ user })

	return {
		props: {
            user,
            html
		},
		revalidate: 3
	}
}

export default function EmbedUserScreen({ statusCode, user, html }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap>
			<Head>
				<title>Embed {user.name}</title>
				<meta name='robots' content='noindex' />
			</Head>

			<Path user={user} />

			<Page.Header.Wrap>
				<Page.Header.Title>Embed User Profile</Page.Header.Title>
			</Page.Header.Wrap>

			<Page.Content>
				<textarea value={html} readOnly />

				<div dangerouslySetInnerHTML={{__html: html}} />
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}
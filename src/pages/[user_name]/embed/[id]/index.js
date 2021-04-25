import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'

import Page from '~co/page'
import Button from '~co/button'
import Icon, { Avatar } from '~co/icon'
import CollectionCover from '~co/collections/cover'
import Raindrops from '~co/raindrops/listing'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, options } }) {
	options = Object.fromEntries(new URLSearchParams(options))
	options.sort = options.sort || '-created'
	options.perpage = 15

	const [ collection, raindrops, user ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, options),
		Api.user.getByName(user_name)
	])

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!collection || !user)
		return {
			props: {
				statusCode: 404
			},
			revalidate: 10
		}

	return {
		props: {
			collection,
			raindrops,
			user
		},
		revalidate: 3
	}
}

export default function EmbedCollectionScreen({ statusCode, collection, raindrops, user }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap 
			wide
			embed
			accentColor={collection.color}>
			<Head>
				<meta name='robots' content='noindex' />
			</Head>

			<Page.Header.Wrap>
				<Page.Header.Icon>
					<CollectionCover 
						{...collection}
						size='large' />
				</Page.Header.Icon>

				<Page.Header.Title>{collection.title}</Page.Header.Title>

				<Page.Header.Buttons>
					{!!user.avatar && (
						<Button 
							variant='flat' 
							href={`/${user.name}`}
							title={user.name}
							target='_blank'>
							<Avatar 
								src={user.avatar} 
								alt={user.name}
								size='large' />
						</Button>
					)}

					<Button 
						href={`/${user.name}/${collection.slug}-${collection._id}`}
						target='_blank'>
						Show all
						<Icon name='arrow-right-up' />
					</Button>
				</Page.Header.Buttons>
			</Page.Header.Wrap>

			<Page.Content>
				<Raindrops 
					target='_blank'
					collection={collection}
					items={raindrops.items}
					user={user} />
			</Page.Content>
		</Page.Wrap>
	)
}
import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import find from 'lodash/find'

import Page from '~co/page'
import Button from '~co/button'
import Icon, { Avatar } from '~co/icon'
import CollectionCover from '~co/collections/cover'
import Raindrops from '~co/raindrops/listing'
import Toolbar from '~co/layout/toolbar'

export const config = {
	unstable_runtimeJS: false
}

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, options } }) {
	options = Object.fromEntries(new URLSearchParams(options))
	options.sort = options.sort || '-created'
	options.perpage = 50

	const [ collections, raindrops, user ] = await Promise.all([
		Api.collections.getByUserName(user_name),
		Api.raindrops.get(id, options),
		Api.user.getByName(user_name)
	])

	const collection = find(collections, ['_id', parseInt(id)])

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
			collections,
			raindrops,
			user,
			options
		},
		revalidate: 3
	}
}

export default function EmbedCollectionScreen({ statusCode, collection, collections, raindrops, user, options }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap 
			wide
			embed
			theme={options.theme}
			accentColor={collection.color}>
			<Head>
				<meta name='robots' content='noindex' />
			</Head>

			{!options['no-header'] && (
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
			)}

			<Page.Content>
				{!!options.search && !options['no-header'] && (
					<Toolbar.Wrap>
						<Toolbar.Title>{options.search}</Toolbar.Title>
					</Toolbar.Wrap>
				)}

				<Raindrops 
					target='_blank'
					collection={collection}
					collections={collections}
					items={raindrops.items}
					user={user} />
			</Page.Content>
		</Page.Wrap>
	)
}
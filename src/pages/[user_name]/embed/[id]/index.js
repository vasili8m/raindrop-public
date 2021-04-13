import s from './index.module.css'
import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'

import Page from '~co/page'
import Button from '~co/button'
import Icon from '~co/icon'
import CollectionAuthor from '~co/collections/author'
import CollectionCover from '~co/collections/cover'
import Raindrops from '~co/raindrops/listing'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, options } }) {
	options = Object.fromEntries(new URLSearchParams(options))
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

export default function EmbedScreen({ statusCode, collection, raindrops, user }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap 
			full
			accentColor={collection.color}
			className={s.page}>
			<Head>
				<meta name='robots' content='noindex' />
			</Head>

			<Page.Header.Wrap className={s.header}>
				<Page.Header.Title>
					<h1>
						<CollectionCover 
							{...collection}
							size='large' />

						{collection.title}
					</h1>
				</Page.Header.Title>

				<Page.Header.Buttons>
					<Button 
						variant='flat' 
						href={`/${user.name}/${collection.slug}-${collection._id}/search`}
						title='Search'
						target='_blank'>
						<Icon name='search' />
					</Button>

					<Button 
						variant='ghost'
						href={`/${user.name}/${collection.slug}-${collection._id}`}
						target='_blank'>
						<Icon name='arrow-right-up' />
					</Button>
				</Page.Header.Buttons>
			</Page.Header.Wrap>

			<Page.Description>
				<CollectionAuthor
					target='_blank'
					collection={collection}
					user={user} />
			</Page.Description>

			<Page.Content>
				<Raindrops 
					target='_blank'
					collection={collection}
					items={raindrops.items} />

				<Button 
					block
					size='large'
					href={`/${user.name}/${collection.slug}-${collection._id}`}
					prefetch={false}
					target='_blank'>
					Show more…
				</Button>
			</Page.Content>
		</Page.Wrap>
	)
}
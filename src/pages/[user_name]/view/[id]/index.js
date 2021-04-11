import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'

import Page from '~co/page'
import Button from '~co/button'
import Icon, { Logo, Image } from '~co/icon'
import CollectionAuthor from '~co/collections/author'
import Childrens from '~co/collections/childrens'
import Path from '~co/collections/path'
import Raindrops from '~co/raindrops/listing'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, query={} } }) {
	query.perpage = RAINDROPS_PER_PAGE

	const [ collection, raindrops, user ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, query),
		Api.user.get(user_name)
	])

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!collection || !user)
		return {
			props: {
				statusCode: 404
			},
			revalidate: 10
		}

	const collections = await Api.collections.get(user._id)

	return {
		props: {
			collection,
			collections,
			raindrops,
			user,
			query
		},
		revalidate: 3
	}
}

export default function ViewScreen({ statusCode, collection, raindrops, user, collections, query }) {
	if (statusCode)
		return <Error statusCode={statusCode} />

	const pathname = `/${user.name}/${collection.slug}-${collection._id}`

	return (
		<Page.Wrap 
			full={collection.view == 'grid' || collection.view == 'masonry'}
			accentColor={collection.color}>
			<Head>
				<link rel='canonical' href={`https://raindrop.io${pathname}`} />
				<meta name='twitter:url' content={`https://raindrop.io${pathname}`} />
				<meta name='og:url' content={`https://raindrop.io${pathname}`} />

				<title>{collection.title}</title>
				<meta name='twitter:title' content={collection.title} />
				<meta name='og:title' content={collection.title} />

				<meta name='description' content={collection.description} />
				<meta name='twitter:description' content={collection.description} />
				<meta name='og:description' content={collection.description} />

				<meta name='twitter:label1' content='Created by' />
				<meta name='twitter:data1' content={user.name} />

				{!!collection.cover?.length && (
					<>
						<link rel='icon' type='image/png' href={collection.cover[0]} />
						<meta name='twitter:image' content={collection.cover[0]} />
						<meta name='og:image' content={collection.cover[0]} />
					</>
				)}
			</Head>

			<Page.Header.Wrap>
				<Page.Header.Title>
					<Path 
						collection={collection}
						collections={collections}
						user={user} />

					<h1>
						{!!collection.cover?.length && (
							<Image 
								src={collection.cover[0]}
								alt={collection.title}
								size='large' />
						)}

						{collection.title}
					</h1>
				</Page.Header.Title>

				<Page.Header.Buttons>
					<Button 
						variant='flat' 
						href={`/${user.name}/${collection.slug}-${collection._id}/export`}
						title='Export & Share'>
						<Icon name='upload-2' />
					</Button>

					<Button 
						variant='flat' 
						href={`/${user.name}/${collection.slug}-${collection._id}/search`}
						title='Search'>
						<Icon name='search' />
					</Button>

					<Button 
						variant='flat' 
						href='https://raindrop.io'
						title='Raindrop.io'>
						<Logo />
					</Button>
				</Page.Header.Buttons>
			</Page.Header.Wrap>

			<Page.Description>
				<CollectionAuthor
					collection={collection}
					user={user} />
			</Page.Description>

			<Page.Content>
				{!parseInt(query.page) && (
					<Childrens 
						collection={collection}
						collections={collections}
						user={user} />
				)}

				<Raindrops 
					collection={collection}
					collections={collections}
					user={user}
					items={raindrops.items} />
			</Page.Content>

			<Page.Pagination 
				prefix={`${pathname}/page:`}
				page={query.page}
				perpage={query.perpage}
				count={raindrops.count} />

			<Page.Footer />
		</Page.Wrap>
	)
}
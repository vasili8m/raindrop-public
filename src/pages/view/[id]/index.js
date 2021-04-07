import Head from 'next/head'
import Page from '~co/page'
import Link from 'next/link'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'

import Button from '~co/button'
import Icon, { Logo, Image } from '~co/icon'
import CollectionAuthor from '~co/collections/author'
import Childrens from '~co/collections/childrens'
import Path from '~co/collections/path'
import Raindrops from '~co/raindrops/listing'
import Pagination from '~co/pagination'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, query={} } }) {
	const [ collection, raindrops ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, {
			...query,
			perpage: RAINDROPS_PER_PAGE
		})
	])

	if (!collection)
		return { notFound: true }

	const user = await Api.user.get(collection.user.$id)
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

export default function Home({ collection, raindrops, user, collections, query }) {
	const pathname = `/${collection.slug}-${collection._id}`

	return (
		<Page.Wrap full={collection.view == 'grid' || collection.view == 'masonry'}>
			<Head>
				<link rel='canonical' href={`https://${user.name}.raindrop.io${pathname}`} />

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
						collections={collections} />

					<h1>
						{!!collection.cover?.length && (
							<Image 
								src={collection.cover[0]}
								size='large' />
						)}

						{collection.title}
					</h1>
				</Page.Header.Title>

				<Page.Header.Buttons>
					<Button 
						variant='flat' 
						href={`/${collection.slug}-${collection._id}/export`}
						title='Export & Share'>
						<Icon name='upload-2' />
					</Button>

					<Button 
						variant='flat' 
						href={`/${collection.slug}-${collection._id}/search`}
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
						collections={collections} />
				)}

				<Raindrops 
					collection={collection}
					collections={collections}
					items={raindrops.items} />

				<Pagination 
					prefix={`${pathname}/page:`}
					page={query.page}
					perpage={RAINDROPS_PER_PAGE}
					count={raindrops.count} />
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}
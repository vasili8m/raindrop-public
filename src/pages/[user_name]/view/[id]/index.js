import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'

import Page from '~co/page'
import Button from '~co/button'
import Icon, { Logo } from '~co/icon'
import CollectionAuthor from '~co/collections/author'
import CollectionCover from '~co/collections/cover'
import Path from '~co/collections/path'
import Raindrops from '~co/raindrops/listing'
import Filters from '~co/raindrops/filters'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, options } }) {
	options = Object.fromEntries(new URLSearchParams(options))
	options.perpage = RAINDROPS_PER_PAGE

	const [ collection, raindrops, filters, user ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, options),
		Api.filters.get(id),
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

	const collections = await Api.collections.get(user._id)

	return {
		props: {
			collection,
			collections,
			raindrops,
			filters,
			user,
			options
		},
		revalidate: 3
	}
}

export default function ViewScreen({ statusCode, collection, collections, raindrops, filters, user, options }) {
	if (statusCode)
		return <Error statusCode={statusCode} />

	const url = `https://raindrop.io/${user.name}/${collection.slug}-${collection._id}`

	return (
		<Page.Wrap 
			full={collection.view == 'grid' || collection.view == 'masonry'}
			accentColor={collection.color}>
			<Head>
				<link 
					rel='alternate'
					type='application/json+oembed'
					href={`${url}/oembed`}
  					title={collection.title} />

				<link rel='canonical' href={url} />
				<meta name='twitter:url' content={url} />
				<meta name='og:url' content={url} />

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
						<CollectionCover 
							{...collection}
							size='large'
							fallback={false} />

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
					collection={{...collection, count: raindrops.count}}
					user={user} />
			</Page.Description>

			{!parseInt(options.page) && (
				<Page.Toolbar>
					<Filters 
						collection={collection}
						collections={collections}
						filters={filters}
						user={user} />
				</Page.Toolbar>
			)}

			<Page.Content>
				<Raindrops 
					collection={collection}
					collections={collections}
					user={user}
					items={raindrops.items} />
			</Page.Content>

			<Page.Pagination 
				page={options.page}
				perpage={options.perpage}
				count={raindrops.count} />

			<Page.Footer />
		</Page.Wrap>
	)
}
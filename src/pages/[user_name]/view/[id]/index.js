import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'

import Page from '~co/page'
import Button from '~co/button'
import Icon, { Logo } from '~co/icon'
import CollectionCover from '~co/collections/cover'
import Path from '~co/raindrops/path'
import Raindrops from '~co/raindrops/listing'
import Collections from '~co/collections/compact'
import { useChildrens } from '~co/collections/hooks' 
import Toolbar from '~co/layout/toolbar'
import Sort from '~co/raindrops/sort'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, options } }) {
	options = Object.fromEntries(new URLSearchParams(options))
	options.sort = options.sort || '-created'
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
			options,

			site_url: process.env.SITE_URL || ''
		},
		revalidate: 3
	}
}

export default function ViewScreen({ statusCode, collection, collections, raindrops, filters, user, options, site_url }) {
	if (statusCode)
		return <Error statusCode={statusCode} />

	const url = `https://raindrop.io/${user.name}/${collection.slug}-${collection._id}`

	const childrens = useChildrens(collections, collection)

	return (
		<Page.Wrap 
			wide={collection.view == 'grid' || collection.view == 'masonry'}
			accentColor={collection.color}>
			<Head>
				<link 
					rel='alternate'
					type='application/json+oembed'
					href={`${site_url}/api/oembed?url=${encodeURIComponent(url)}`}
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

			<Path 
				collection={collection}
				collections={collections}
				user={user} />

			<Page.Header.Wrap>
				<Page.Header.Icon>
					<CollectionCover 
						{...collection}
						size='large'
						fallback={false} />
				</Page.Header.Icon>
				
				<Page.Header.Title>{collection.title}</Page.Header.Title>

				<Page.Header.Buttons>
					<Button 
						variant='flat'
						href={`/${user.name}/${collection.slug}-${collection._id}/share`}
						bold>
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

			<Page.Subheader>
				{!!collection.description && (
					<h2>
						{collection.description}
					</h2>
				)}

				{!parseInt(options.page) && (
					<Collections
						items={childrens}
						user={user} />
				)}
			</Page.Subheader>

			<Page.Content>
				<Toolbar.Wrap>
					<Toolbar.Title>
						{options.search ? options.search : raindrops.count+' bookmarks'}
					</Toolbar.Title>

					{!!raindrops.items.length && (
						<Toolbar.Buttons>
							<Sort options={options} />
						</Toolbar.Buttons>
					)}
				</Toolbar.Wrap>

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